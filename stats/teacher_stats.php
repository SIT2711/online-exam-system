<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include "../config/db.php";

$data = json_decode(file_get_contents("php://input"), true);
$teacher_id = $data['user_id'] ?? '';

error_log("[teacher_stats] Received user_id: " . $teacher_id);

if (!$teacher_id) {
    echo json_encode(["status" => "error", "message" => "Missing user_id"]);
    exit;
}

// TOTAL EXAMS
$res1 = mysqli_query($conn, "SELECT COUNT(*) as total FROM exams WHERE teacher_id='$teacher_id'");
$total_exams = $res1 ? (int)mysqli_fetch_assoc($res1)['total'] : 0;
error_log("[teacher_stats] total_exams query result: " . $total_exams);

// TOTAL STUDENTS (distinct students who completed teacher's exams)
$res2 = mysqli_query($conn, "SELECT COUNT(*) as total FROM exam_attempts ea JOIN exams e ON ea.exam_id = e.exam_id WHERE e.teacher_id='$teacher_id' AND TRIM(ea.status)='completed'");
$total_students = $res2 ? (int)mysqli_fetch_assoc($res2)['total'] : 0;
error_log("[teacher_stats] total_students query result: " . $total_students);

// AVG PERCENTAGE (calculated from actual correct answers / total questions)
$res3 = mysqli_query($conn, "
    SELECT AVG(IFNULL(sa.correct_count, 0) / q.total_questions * 100) as avg_percentage
    FROM exam_attempts ea
    JOIN exams e ON ea.exam_id = e.exam_id
    JOIN (
        SELECT exam_id, COUNT(*) AS total_questions
        FROM questions
        GROUP BY exam_id
    ) q ON q.exam_id = ea.exam_id
    LEFT JOIN (
        SELECT attempt_id, COUNT(*) AS correct_count
        FROM student_answers
        WHERE is_correct = 1
        GROUP BY attempt_id
    ) sa ON sa.attempt_id = ea.attempt_id
    WHERE e.teacher_id='$teacher_id' AND TRIM(ea.status)='completed'
");
$avg = 0;
if ($res3) {
    $row = mysqli_fetch_assoc($res3);
    $avg = $row['avg_percentage'] !== null ? (float)$row['avg_percentage'] : 0;
}
error_log("[teacher_stats] avg_percentage query result: " . $avg);

$result = [
    "status" => "success",
    "total_exams" => $total_exams,
    "total_students" => $total_students,
    "avg_percentage" => round($avg, 2)
];
error_log("[teacher_stats] Response: " . json_encode($result));
echo json_encode($result);
?>
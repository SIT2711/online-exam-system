<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include "../config/db.php";

$data = json_decode(file_get_contents("php://input"), true);
$student_id = $data['user_id'] ?? '';

error_log("[student_stats] Received user_id: " . $student_id);

if (!$student_id) {
    echo json_encode(["status" => "error", "message" => "Missing user_id"]);
    exit;
}

// TOTAL ATTEMPT (ALL rows)
$res1 = mysqli_query($conn, "SELECT COUNT(*) as total FROM exam_attempts WHERE student_id='$student_id'");
$total = $res1 ? (int)mysqli_fetch_assoc($res1)['total'] : 0;
error_log("[student_stats] total_attempted query result: " . $total);

// COMPLETED
$res2 = mysqli_query($conn, "SELECT COUNT(*) as completed FROM exam_attempts WHERE student_id='$student_id' AND TRIM(status)='completed'");
$completed = $res2 ? (int)mysqli_fetch_assoc($res2)['completed'] : 0;
error_log("[student_stats] completed query result: " . $completed);

// LAST PERCENTAGE (calculated from actual correct answers / total questions)
$res3 = mysqli_query($conn, "
    SELECT IFNULL(sa.correct_count, 0) / q.total_questions * 100 AS percentage
    FROM exam_attempts ea
    JOIN exams e ON e.exam_id = ea.exam_id
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
    WHERE ea.student_id='$student_id' AND ea.status='completed'
    ORDER BY ea.end_time DESC
    LIMIT 1
");
$last_percentage = 0;
if ($res3 && mysqli_num_rows($res3) > 0) {
    $row = mysqli_fetch_assoc($res3);
    $last_percentage = $row['percentage'] !== null ? (float)$row['percentage'] : 0;
}
error_log("[student_stats] last_percentage query result: " . $last_percentage);

$result = [
    "status" => "success",
    "total_attempted" => $total,
    "completed" => $completed,
    "last_percentage" => $last_percentage
];
error_log("[student_stats] Response: " . json_encode($result));
echo json_encode($result);
?>
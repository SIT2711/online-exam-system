<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Content-Type: application/json");

include("../config/db.php");

// ✅ Validate input
if (!isset($_GET['user_id']) || !isset($_GET['role'])) {
    echo json_encode([
        "status" => "error",
        "message" => "Missing user_id or role"
    ]);
    exit();
}

$user_id = intval($_GET['user_id']);
$role = $_GET['role'];

// ✅ FIXED SQL (using teacher_id)
$sql = "SELECT 
            s.full_name AS student_name,
            t.full_name AS teacher_name,
            e.exam_title AS exam_name,
            r.total_marks AS total_questions,
            r.obtained_marks AS correct_answers,
            r.percentage AS score,
            r.created_at
        FROM results r
        JOIN exam_attempts ea ON r.attempt_id = ea.attempt_id
        JOIN users s ON ea.student_id = s.user_id
        JOIN exams e ON ea.exam_id = e.exam_id
        JOIN users t ON e.teacher_id = t.user_id";

// ✅ Role-based filtering
if ($role === "student") {
    $sql .= " WHERE s.user_id = $user_id";
} elseif ($role === "teacher") {
    $sql .= " WHERE e.teacher_id = $user_id";
}
// admin = no filter (see all)

// ✅ Execute
$result = $conn->query($sql);

if (!$result) {
    echo json_encode([
        "status" => "error",
        "message" => $conn->error
    ]);
    exit();
}

$data = [];

while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode([
    "status" => "success",
    "data" => $data
]);

$conn->close();
?>
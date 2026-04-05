<?php
// ✅ Headers
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Content-Type: application/json");

// ✅ Include DB
include("../config/db.php");

// ✅ Check required parameters
if (!isset($_GET['user_id']) || !isset($_GET['role'])) {
    echo json_encode([
        "status" => "error",
        "message" => "User ID and role are required"
    ]);
    exit();
}

$user_id = intval($_GET['user_id']);
$role = $_GET['role']; // expected: 'student', 'teacher', 'admin'

// ✅ Base SQL
$sql = "SELECT 
            u.full_name AS student_name,
            e.exam_title AS exam_name,
            r.total_marks AS total_questions,
            r.obtained_marks AS correct_answers,
            r.percentage AS score,
            r.created_at
        FROM results r
        JOIN exam_attempts ea ON r.attempt_id = ea.attempt_id
        JOIN users u ON ea.student_id = u.user_id
        JOIN exams e ON ea.exam_id = e.exam_id";

// ✅ Add condition for student
if ($role === "student") {
    $sql .= " WHERE ea.student_id = $user_id";
}

// ✅ Execute query
$result = $conn->query($sql);

$data = [];

if ($result) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    echo json_encode([
        "status" => "success",
        "data" => $data
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => $conn->error
    ]);
}

$conn->close();
?>
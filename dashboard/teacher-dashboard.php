<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

include("../config/db.php");

// Get teacher id
$teacher_id = $_GET['teacher_id'];

// ✅ FIXED: use teacher_id instead of created_by
$examQuery = "SELECT COUNT(*) as count FROM exams WHERE teacher_id = '$teacher_id'";
$examResult = mysqli_query($conn, $examQuery);
$createdExams = mysqli_fetch_assoc($examResult)['count'];

// ❗ For questions (you DON'T have teacher_id in questions table)
$questionQuery = "SELECT COUNT(*) as count FROM questions WHERE exam_id IN (
    SELECT exam_id FROM exams WHERE teacher_id = '$teacher_id'
)";
$questionResult = mysqli_query($conn, $questionQuery);
$questionsAdded = mysqli_fetch_assoc($questionResult)['count'];

// Return JSON
echo json_encode([
    "createdExams" => $createdExams,
    "questionsAdded" => $questionsAdded
]);
?>
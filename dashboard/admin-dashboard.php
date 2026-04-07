<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

// include existing DB connection
include("../config/db.php");

// Total Exams
$examQuery = "SELECT COUNT(*) as count FROM exams";
$examResult = mysqli_query($conn, $examQuery);
$totalExams = mysqli_fetch_assoc($examResult)['count'];

// Total Students
$studentQuery = "SELECT COUNT(*) as count FROM users WHERE role='student'";
$studentResult = mysqli_query($conn, $studentQuery);
$totalStudents = mysqli_fetch_assoc($studentResult)['count'];

// Total Teachers
$teacherQuery = "SELECT COUNT(*) as count FROM users WHERE role='teacher'";
$teacherResult = mysqli_query($conn, $teacherQuery);
$totalTeachers = mysqli_fetch_assoc($teacherResult)['count'];

// Total Questions
$questionQuery = "SELECT COUNT(*) as count FROM questions";
$questionResult = mysqli_query($conn, $questionQuery);
$totalQuestions = mysqli_fetch_assoc($questionResult)['count'];

// Return JSON
echo json_encode([
    "totalExams" => $totalExams,
    "totalStudents" => $totalStudents,
    "totalTeachers" => $totalTeachers,
    "totalQuestions" => $totalQuestions
]);
?>
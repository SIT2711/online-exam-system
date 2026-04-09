<?php
header("Content-Type: application/json");
include("../config/db.php");

$totalExams = mysqli_fetch_assoc(mysqli_query($conn, "SELECT COUNT(*) as count FROM exams"))['count'];
$totalStudents = mysqli_fetch_assoc(mysqli_query($conn, "SELECT COUNT(*) as count FROM users WHERE role='student'"))['count'];
$totalTeachers = mysqli_fetch_assoc(mysqli_query($conn, "SELECT COUNT(*) as count FROM users WHERE role='teacher'"))['count'];
$totalQuestions = mysqli_fetch_assoc(mysqli_query($conn, "SELECT COUNT(*) as count FROM questions"))['count'];

echo json_encode([
  "totalExams"=>$totalExams,
  "totalStudents"=>$totalStudents,
  "totalTeachers"=>$totalTeachers,
  "totalQuestions"=>$totalQuestions
]);
?>
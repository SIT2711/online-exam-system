<?php
header("Content-Type: application/json");
include("../config/db.php");

$student_id = $_GET['student_id'];

// ✅ Completed exams
$completed = mysqli_fetch_assoc(mysqli_query($conn,
"SELECT COUNT(DISTINCT exam_id) as count 
 FROM exam_attempts 
 WHERE student_id='$student_id' AND status='completed'"
))['count'];

// ✅ Results
$results = mysqli_fetch_assoc(mysqli_query($conn,
"SELECT COUNT(*) as count 
 FROM results r
 JOIN exam_attempts ea ON r.attempt_id = ea.attempt_id
 WHERE ea.student_id='$student_id'"
))['count'];

// ✅ 🔥 Upcoming exams
$upcoming = mysqli_fetch_assoc(mysqli_query($conn,
"SELECT COUNT(*) as count 
 FROM exams 
 WHERE start_date > NOW()
 AND exam_id NOT IN (
   SELECT exam_id FROM exam_attempts WHERE student_id='$student_id'
 )"
))['count'];

echo json_encode([
  "completedExams"=>$completed,
  "resultsPublished"=>$results,
  "upcomingExams"=>$upcoming
]);
?>
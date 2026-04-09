<?php
header("Content-Type: application/json");
include("../config/db.php");

$teacher_id = $_GET['teacher_id'];

// ✅ Exams created
$exams = mysqli_fetch_assoc(mysqli_query($conn,
"SELECT COUNT(*) as count FROM exams WHERE teacher_id='$teacher_id'"
))['count'];

// ✅ Questions added
$questions = mysqli_fetch_assoc(mysqli_query($conn,
"SELECT COUNT(*) as count FROM questions 
 WHERE exam_id IN (
   SELECT exam_id FROM exams WHERE teacher_id='$teacher_id'
 )"
))['count'];

echo json_encode([
  "createdExams"=>$exams,
  "questionsAdded"=>$questions
]);
?>
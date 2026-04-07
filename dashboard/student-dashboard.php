<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

include("../config/db.php");

// Get student id
$student_id = $_GET['student_id'];

// ✅ Completed Exams (DISTINCT exams)
$completedQuery = "
SELECT COUNT(DISTINCT exam_id) as count 
FROM exam_attempts 
WHERE student_id = '$student_id' AND status = 'completed'
";
$completedResult = mysqli_query($conn, $completedQuery);
$completedExams = mysqli_fetch_assoc($completedResult)['count'];

// ✅ Upcoming Exams (not attempted)
$upcomingQuery = "
SELECT COUNT(*) as count 
FROM exams 
WHERE exam_id NOT IN (
    SELECT exam_id FROM exam_attempts WHERE student_id = '$student_id'
)";
$upcomingResult = mysqli_query($conn, $upcomingQuery);
$upcomingExams = mysqli_fetch_assoc($upcomingResult)['count'];

// ✅ Results Published (same as completed)
$resultsPublished = $completedExams;

// Return JSON
echo json_encode([
    "upcomingExams" => $upcomingExams,
    "completedExams" => $completedExams,
    "resultsPublished" => $resultsPublished
]);
?>
<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

include "../config/db.php";


$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode([
        "status" => "error",
        "message" => "Invalid JSON data"
    ]);
    exit;
}


$teacher_id = $data['teacher_id'];
$exam_title = $data['exam_title'];
$subject = $data['subject'];
$duration = $data['duration'];
$total_marks = $data['total_marks'];
$start_date = $data['start_date'];
$end_date = $data['end_date'];


$sql = "INSERT INTO exams 
(teacher_id, exam_title, subject, duration, total_marks, start_date, end_date)
VALUES 
($teacher_id, '$exam_title', '$subject', $duration, $total_marks, '$start_date', '$end_date')";

if (mysqli_query($conn, $sql)) {
    echo json_encode([
        "status" => "success",
        "message" => "Exam created successfully"
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => mysqli_error($conn)
    ]);
}
?>
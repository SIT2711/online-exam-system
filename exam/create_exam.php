<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

include "../config/db.php";

function generateExamCode($length = 6) {
    return strtoupper(substr(str_shuffle("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"), 0, $length));
}


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

do {
    $exam_code = generateExamCode();
    $check = mysqli_query($conn, "SELECT * FROM exams WHERE exam_code='$exam_code'");
} while (mysqli_num_rows($check) > 0);


$sql = "INSERT INTO exams 
(teacher_id, exam_title, subject, duration, total_marks, start_date, end_date, exam_code)
VALUES 
($teacher_id, '$exam_title', '$subject', $duration, $total_marks, '$start_date', '$end_date', '$exam_code')";

if (mysqli_query($conn, $sql)) {
    echo json_encode([
    "status" => "success",
    "message" => "Exam created successfully",
    "exam_code" => $exam_code
]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => mysqli_error($conn)
    ]);
}
?>
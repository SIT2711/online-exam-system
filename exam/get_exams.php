<?php
include "../config/db.php";

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

// Fetch exams
$sql = "SELECT exam_id, exam_title, subject, duration, total_marks, start_date, end_date, teacher_id FROM exams";
$result = mysqli_query($conn, $sql);

if ($teacher_id) {
    // Only get exams belonging to this teacher
    $sql = "SELECT exam_id, exam_title FROM exams WHERE teacher_id = '$teacher_id'";
} else {
    echo json_encode(["status" => "error", "message" => "Missing teacher ID"]);
    exit();
}

$result = mysqli_query($conn, $sql);
$exams = [];

while ($row = mysqli_fetch_assoc($result)) {
    $exams[] = $row;
}

echo json_encode([
    "status" => "success",
    "data" => $exams
]);
?>

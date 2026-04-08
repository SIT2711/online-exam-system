<?php
include "../config/db.php";

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

// Fetch exams
$sql = "SELECT exam_id, exam_title, subject, duration, total_marks, start_date, end_date, teacher_id FROM exams";
$result = mysqli_query($conn, $sql);

$exams = [];

if ($result) {
    while ($row = mysqli_fetch_assoc($result)) {
        $exams[] = $row;
    }
}

echo json_encode([
    "status" => "success",
    "data" => $exams
]);
?>

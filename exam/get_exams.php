<?php
include "../config/db.php";

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

// Get the ID from the URL (React will send this)
$teacher_id = isset($_GET['teacher_id']) ? mysqli_real_escape_string($conn, $_GET['teacher_id']) : '';

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

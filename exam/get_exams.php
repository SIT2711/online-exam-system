<?php
include "../config/db.php";

header("Content-Type: application/json");

// Fetch exams
$sql = "SELECT exam_id, exam_title FROM exams";
$result = mysqli_query($conn, $sql);

$exams = [];

if ($result) {
    while ($row = mysqli_fetch_assoc($result)) {
        $exams[] = $row;
    }
}

echo json_encode($exams);
?>
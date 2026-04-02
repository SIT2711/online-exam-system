<?php
include "../config/db.php";

header("Content-Type: application/json");


if (!isset($_GET['exam_id'])) {
    echo json_encode(["error" => "exam_id is required"]);
    exit();
}

$exam_id = $_GET['exam_id'];

// Query
$sql = "SELECT * FROM questions WHERE exam_id = '$exam_id'";
$result = mysqli_query($conn, $sql);

$questions = [];

// Fetch data
while ($row = mysqli_fetch_assoc($result)) {
    $questions[] = $row;
}

// Return JSON
echo json_encode($questions);
?>
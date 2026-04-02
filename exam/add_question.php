<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include "../config/db.php";

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["status" => "error", "message" => "No data received"]);
    exit();
}

$exam_id = $data['exam_id'];
$question_text = $data['question_text'];
$question_type = $data['question_type'];
$marks = $data['marks'];

if (empty($exam_id) || empty($question_text)) {
    echo json_encode([
        "status" => "error",
        "message" => "Exam and Question are required"
    ]);
    exit();
}

$sql = "INSERT INTO questions (exam_id, question_text, question_type, marks)
VALUES ('$exam_id', '$question_text', '$question_type', '$marks')";

if (mysqli_query($conn, $sql)) {
    echo json_encode([
        "status" => "success",
        "message" => "Question added successfully"
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => mysqli_error($conn)
    ]);
}
?>
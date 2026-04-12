<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include "../config/db.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["exam_code"])) {
    echo json_encode([
        "status" => "error",
        "message" => "Exam code required"
    ]);
    exit;
}

$exam_code = $data["exam_code"];

$sql = "SELECT * FROM exams WHERE exam_code = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $exam_code);
$stmt->execute();

$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $exam = $result->fetch_assoc();

    echo json_encode([
        "status" => "success",
        "data" => $exam
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Invalid exam code"
    ]);
}

$stmt->close();
$conn->close();
?>
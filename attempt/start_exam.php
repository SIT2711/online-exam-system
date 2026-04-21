<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include "../config/db.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!is_array($data)) {
    echo json_encode(["status" => "error", "message" => "Invalid JSON"]);
    exit;
}

$exam_id = intval($data['exam_id'] ?? 0);
$student_id = intval($data['student_id'] ?? 0);

if ($exam_id <= 0 || $student_id <= 0) {
    echo json_encode(["status" => "error", "message" => "Invalid IDs"]);
    exit;
}

$stmt = $conn->prepare("
    SELECT status FROM exam_attempts 
    WHERE exam_id=? AND student_id=? 
    ORDER BY attempt_id DESC LIMIT 1
");

$stmt->bind_param("ii", $exam_id, $student_id);
$stmt->execute();
$res = $stmt->get_result();

if ($res->num_rows > 0) {
    $row = $res->fetch_assoc();

    if ($row['status'] === 'completed') {
        echo json_encode(["status" => "completed"]);
        exit;
    }

    if ($row['status'] === 'in_progress') {
        echo json_encode(["status" => "exists"]);
        exit;
    }
}

$insert = $conn->prepare("
    INSERT INTO exam_attempts (exam_id, student_id, start_time, status)
    VALUES (?, ?, NOW(), 'in_progress')
");

$insert->bind_param("ii", $exam_id, $student_id);

if ($insert->execute()) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error", "message" => "DB insert failed"]);
}
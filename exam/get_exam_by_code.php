<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include "../config/db.php";

// 🔥 READ INPUT SAFELY
$data = json_decode(file_get_contents("php://input"), true);

if (!is_array($data)) {
    echo json_encode([
        "status" => "error",
        "message" => "Invalid JSON input"
    ]);
    exit;
}

$exam_code = trim($data['exam_code'] ?? '');

if ($exam_code === '') {
    echo json_encode([
        "status" => "error",
        "message" => "Exam code required"
    ]);
    exit;
}

// 🔥 SAFE ESCAPE
$exam_code = mysqli_real_escape_string($conn, $exam_code);

// 🔥 QUERY
$sql = "SELECT * FROM exams WHERE exam_code='$exam_code' LIMIT 1";
$result = mysqli_query($conn, $sql);

// ❌ DB ERROR HANDLING (IMPORTANT FIX)
if (!$result) {
    echo json_encode([
        "status" => "error",
        "message" => mysqli_error($conn)
    ]);
    exit;
}

// 🔥 RESPONSE
if (mysqli_num_rows($result) > 0) {
    $row = mysqli_fetch_assoc($result);

    echo json_encode([
        "status" => "success",
        "data" => $row
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => "No exam found"
    ]);
}
?>
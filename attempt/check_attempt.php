<?php
include "../config/db.php";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// ✅ GET JSON SAFELY
$data = json_decode(file_get_contents("php://input"), true);

$exam_id = isset($data['exam_id']) ? (int)$data['exam_id'] : 0;
$student_id = isset($data['student_id']) ? (int)$data['student_id'] : 0;

// ❌ VALIDATION FIX
if ($exam_id <= 0 || $student_id <= 0) {
    echo json_encode([
        "status" => "error",
        "message" => "Missing exam_id or student_id"
    ]);
    exit;
}

// ✅ QUERY
$sql = "SELECT status FROM exam_attempts 
        WHERE exam_id='$exam_id' AND student_id='$student_id'
        ORDER BY attempt_id DESC LIMIT 1";

$result = mysqli_query($conn, $sql);

// ❌ QUERY ERROR HANDLING (VERY IMPORTANT)
if (!$result) {
    echo json_encode([
        "status" => "error",
        "message" => mysqli_error($conn)
    ]);
    exit;
}

// ✅ RESPONSE LOGIC
if (mysqli_num_rows($result) > 0) {
    $row = mysqli_fetch_assoc($result);

    echo json_encode([
        "status" => $row['status']
    ]);
} else {
    echo json_encode([
        "status" => "not_attempted"
    ]);
}
?>
<?php
// ✅ MUST BE FIRST LINES (before include)

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: *");

// ✅ HANDLE PREFLIGHT (VERY IMPORTANT)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include "../config/db.php";

header("Content-Type: application/json");

// READ INPUT
$data = json_decode(file_get_contents("php://input"));

$student_id = $data->student_id ?? 0;
$exam_id = $data->exam_id ?? 0;

// QUERY
$sql = "SELECT * FROM exam_attempts 
        WHERE student_id = ? AND exam_id = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $student_id, $exam_id);
$stmt->execute();

$result = $stmt->get_result();

// RESPONSE
echo json_encode([
    "exists" => $result->num_rows > 0
]);
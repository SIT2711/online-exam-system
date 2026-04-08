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

$id = $data['id'];
$examName = $data['examName'];
$subject = $data['subject'];
$duration = $data['duration'];
$totalmarks = $data['totalmarks'];
$startDate = $data['startDate'];
$endDate = $data['endDate'];

$sql = "UPDATE exams 
SET exam_title=?, subject=?, duration=?, total_marks=?, start_date=?, end_date=?
WHERE exam_id=?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ssiissi", $examName, $subject, $duration, $totalmarks, $startDate, $endDate, $id);

if ($stmt->execute()) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => $stmt->error
    ]);
}
?>

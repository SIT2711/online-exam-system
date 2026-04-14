<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");

include "../config/db.php";

// ✅ Handle JSON safely
$rawData = file_get_contents("php://input");
$data = json_decode($rawData, true);

$exam_code = null;

// ✅ Check if POST JSON exists
if (!empty($data) && isset($data['exam_code'])) {
    $exam_code = $data['exam_code'];
}

// 🔍 If exam_code present → filter
if ($exam_code) {
    $stmt = $conn->prepare("SELECT * FROM exams WHERE exam_code = ?");
    
    if (!$stmt) {
        echo json_encode(["status" => "error", "message" => $conn->error]);
        exit;
    }

    $stmt->bind_param("s", $exam_code);
    $stmt->execute();
    $result = $stmt->get_result();

} else {
    // ✅ OLD functionality (unchanged)
    $sql = "SELECT exam_id, exam_title, subject, duration, total_marks, start_date, end_date, teacher_id FROM exams";
    $result = mysqli_query($conn, $sql);
}

$exams = [];

if ($result) {
    while ($row = mysqli_fetch_assoc($result)) {
        $exams[] = $row;
    }
}

echo json_encode([
    "status" => "success",
    "data" => $exams
]);
?>
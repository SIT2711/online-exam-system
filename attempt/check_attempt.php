<?php
include "../config/db.php";

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// ✅ GET JSON
$data = json_decode(file_get_contents("php://input"), true);

$exam_id = $data['exam_id'] ?? '';
$student_id = $data['student_id'] ?? '';

if (!$exam_id || !$student_id) {
    echo json_encode(["status" => "error"]);
    exit;
}

// ✅ CHECK ATTEMPT
$sql = "SELECT status FROM exam_attempts 
        WHERE exam_id='$exam_id' AND student_id='$student_id' 
        ORDER BY attempt_id DESC LIMIT 1";

$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    $row = mysqli_fetch_assoc($result);

    if ($row['status'] === 'completed') {
        echo json_encode(["status" => "completed"]);
    } else {
        echo json_encode(["status" => "in_progress"]);
    }
} else {
    echo json_encode(["status" => "not_attempted"]);
}
?>
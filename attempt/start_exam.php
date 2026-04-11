<?php
include "../config/db.php";

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

// ✅ GET JSON OR FORM DATA
$data = json_decode(file_get_contents("php://input"), true);

$exam_id = $data['exam_id'] ?? $_POST['exam_id'] ?? '';
$student_id = $data['student_id'] ?? $_POST['student_id'] ?? '';

if (!$exam_id || !$student_id) {
    echo json_encode([
        "status" => "error",
        "message" => "Missing data"
    ]);
    exit;
}

// ✅ CHECK LAST ATTEMPT
$check = "SELECT status FROM exam_attempts 
          WHERE exam_id='$exam_id' AND student_id='$student_id'
          ORDER BY attempt_id DESC LIMIT 1";

$res = mysqli_query($conn, $check);

if (mysqli_num_rows($res) > 0) {
    $row = mysqli_fetch_assoc($res);

    // ❌ IF COMPLETED → BLOCK
    if ($row['status'] === 'completed') {
        echo json_encode([
            "status" => "completed",
            "message" => "You have already completed this exam"
        ]);
        exit;
    }

    // ⚠️ IF IN PROGRESS → DO NOT INSERT AGAIN
    if ($row['status'] === 'in_progress') {
        echo json_encode([
            "status" => "exists",
            "message" => "Exam already started"
        ]);
        exit;
    }
}

// ✅ INSERT NEW ATTEMPT
$sql = "INSERT INTO exam_attempts 
        (exam_id, student_id, start_time, status)
        VALUES ('$exam_id', '$student_id', NOW(), 'in_progress')";

if (mysqli_query($conn, $sql)) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Failed to start exam"
    ]);
}
?>
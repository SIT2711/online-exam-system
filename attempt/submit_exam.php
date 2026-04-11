<?php
include "../config/db.php";

// ✅ CORS (MUST BE FIRST)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// ✅ HANDLE PREFLIGHT
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

header("Content-Type: application/json");

// ✅ SUPPORT JSON INPUT
$data = json_decode(file_get_contents("php://input"), true);

$exam_id = $data['exam_id'] ?? $_POST['exam_id'] ?? '';
$student_id = $data['student_id'] ?? $_POST['student_id'] ?? '';
$answers = $data['answers'] ?? [];
$score = $data['score'] ?? $_POST['score'] ?? 0;

// ✅ VALIDATION
if (!$exam_id || !$student_id) {
    echo json_encode([
        "status" => "error",
        "message" => "Missing data"
    ]);
    exit;
}

// ✅ UPDATE attempt
$sql = "UPDATE exam_attempts 
        SET 
          end_time = NOW(),
          status = 'completed',
          score = '$score'
        WHERE exam_id='$exam_id' 
        AND student_id='$student_id' 
        AND status='in_progress'";

if (mysqli_query($conn, $sql)) {

    // ✅ CHECK if row actually updated
    if (mysqli_affected_rows($conn) == 0) {
        echo json_encode([
            "status" => "error",
            "message" => "No active attempt found"
        ]);
        exit;
    }

    // ✅ SAVE ANSWERS
    if (!empty($answers)) {
        foreach ($answers as $question_id => $answer) {
            $q_id = mysqli_real_escape_string($conn, $question_id);
            $ans = mysqli_real_escape_string($conn, $answer);

            $insert = "INSERT INTO student_answers 
                       (exam_id, student_id, question_id, answer)
                       VALUES ('$exam_id', '$student_id', '$q_id', '$ans')";
            mysqli_query($conn, $insert);
        }
    }

    echo json_encode(["status" => "success"]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => mysqli_error($conn)
    ]);
}
?>
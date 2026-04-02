<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include "../config/db.php";

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["status" => "error", "message" => "No data received"]);
    exit();
}

$exam_id = $data['exam_id'];
$question_text = $data['question_text'];
$question_type = $data['question_type'];
$marks = $data['marks'];
$options = $data['options']; 

if (empty($exam_id) || empty($question_text)) {
    echo json_encode([
        "status" => "error",
        "message" => "Exam and Question are required"
    ]);
    exit();
}

/* =========================
   STEP 1: INSERT QUESTION
========================= */
$sql = "INSERT INTO questions (exam_id, question_text, question_type, marks)
VALUES ('$exam_id', '$question_text', '$question_type', '$marks')";

if (mysqli_query($conn, $sql)) {

    // Get inserted question ID
    $question_id = mysqli_insert_id($conn);

    /* =========================
       STEP 2: INSERT OPTIONS
    ========================= */
    if (!empty($options) && is_array($options)) {

        foreach ($options as $opt) {

            $option_text = $opt['option_text'];
            $is_correct = $opt['is_correct'] ? 1 : 0;

            $sql2 = "INSERT INTO options (question_id, option_text, is_correct)
                     VALUES ('$question_id', '$option_text', '$is_correct')";

            mysqli_query($conn, $sql2);
        }
    }

    echo json_encode([
        "status" => "success",
        "message" => "Question and options added successfully"
    ]);

} else {
    echo json_encode([
        "status" => "error",
        "message" => mysqli_error($conn)
    ]);
}
?>
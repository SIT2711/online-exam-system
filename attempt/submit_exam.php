<?php

error_reporting(E_ALL);
ini_set('display_errors', 0);

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include "../config/db.php";

$data = json_decode(file_get_contents("php://input"), true);

$exam_id = intval($data['exam_id'] ?? 0);
$student_id = intval($data['student_id'] ?? 0);
$answers = $data['answers'] ?? [];

$score = 0;

/* GET ATTEMPT */
$q = mysqli_query($conn, "
    SELECT attempt_id 
    FROM exam_attempts 
    WHERE exam_id=$exam_id AND student_id=$student_id 
    ORDER BY attempt_id DESC 
    LIMIT 1
");

if (!$q || mysqli_num_rows($q) == 0) {
    echo json_encode(["status"=>"error","message"=>"No attempt found"]);
    exit;
}

$row = mysqli_fetch_assoc($q);
$attempt_id = intval($row['attempt_id']);

/* PROCESS ANSWERS */
foreach ($answers as $question_id => $option_id) {

    $question_id = intval($question_id);
    $option_id = intval($option_id);

    if ($question_id <= 0 || $option_id <= 0) continue;

    $opt = mysqli_query($conn, "
        SELECT option_text, is_correct
        FROM options
        WHERE option_id = $option_id
        LIMIT 1
    ");

    if (!$opt || mysqli_num_rows($opt) == 0) continue;

    $row = mysqli_fetch_assoc($opt);

    $is_correct = intval($row['is_correct']);
    $answer_text = $row['option_text'];

    if ($is_correct === 1) {
        $score++;
    }

    mysqli_query($conn, "
        INSERT INTO student_answers
        (attempt_id, question_id, selected_option_id, answer_text, is_correct, exam_id, student_id)
        VALUES
        ($attempt_id, $question_id, $option_id, '$answer_text', $is_correct, $exam_id, $student_id)
    ");
}

/* UPDATE SCORE */
mysqli_query($conn, "
    UPDATE exam_attempts
    SET score=$score, status='completed', end_time=NOW()
    WHERE attempt_id=$attempt_id
");

echo json_encode([
    "status" => "success",
    "score" => $score
]);

?>
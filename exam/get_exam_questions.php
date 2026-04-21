<?php
include "../config/db.php";

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$exam_id = $_GET['exam_id'] ?? null;

if (!$exam_id) {
    echo json_encode(["status" => "error", "message" => "Exam ID missing"]);
    exit;
}

// exam duration
$exam = mysqli_query($conn, "SELECT duration FROM exams WHERE exam_id='$exam_id'");
$examRow = mysqli_fetch_assoc($exam);
$duration = $examRow['duration'] ?? 0;

// questions
$qRes = mysqli_query($conn, "
    SELECT question_id, question_text 
    FROM questions 
    WHERE exam_id='$exam_id'
");

$questions = [];

while ($q = mysqli_fetch_assoc($qRes)) {

    $qid = $q['question_id'];

    $optRes = mysqli_query($conn, "
        SELECT option_id, option_text 
        FROM options 
        WHERE question_id='$qid'
    ");

    $options = [];

    while ($opt = mysqli_fetch_assoc($optRes)) {
        $options[] = [
            "option_id" => intval($opt['option_id']),
            "option_text" => $opt['option_text']
        ];
    }

    $questions[] = [
        "question_id" => intval($qid),
        "question_text" => $q['question_text'],
        "options" => $options
    ];
}

echo json_encode([
    "status" => "success",
    "duration" => $duration,
    "questions" => $questions
]);
?>
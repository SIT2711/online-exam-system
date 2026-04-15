<?php
header("Content-Type: application/json");
include "../config/db.php";

$exam_id = $_GET['exam_id'];

// ✅ GET EXAM (FOR TIMER)
$examQuery = "SELECT * FROM exams WHERE exam_id = '$exam_id'";
$examResult = mysqli_query($conn, $examQuery);
$exam = mysqli_fetch_assoc($examResult);

// ✅ GET QUESTIONS
$questions = [];

$qQuery = "SELECT * FROM questions WHERE exam_id = '$exam_id'";
$qResult = mysqli_query($conn, $qQuery);

while ($q = mysqli_fetch_assoc($qResult)) {

    $qid = $q['question_id'];

    // ✅ GET OPTIONS FOR EACH QUESTION
    $optQuery = "SELECT * FROM options WHERE question_id = '$qid'";
    $optResult = mysqli_query($conn, $optQuery);

    $options = [];

    while ($opt = mysqli_fetch_assoc($optResult)) {
        $options[] = $opt;
    }

    $q['options'] = $options;
    $questions[] = $q;
}

// ✅ FINAL RESPONSE
echo json_encode([
    "status" => "success",
    "duration" => $exam['duration'],
    "questions" => $questions
]);
?>
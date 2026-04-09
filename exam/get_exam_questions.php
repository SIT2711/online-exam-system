<?php
include "../config/db.php";

header("Content-Type: application/json");

if (!isset($_GET['exam_id'])) {
    echo json_encode([
        "status" => "error",
        "message" => "exam_id is required"
    ]);
    exit();
}

$exam_id = $_GET['exam_id'];

// ✅ Get Questions
$sql = "SELECT * FROM questions WHERE exam_id = '$exam_id'";
$result = mysqli_query($conn, $sql);

$questions = [];

while ($q = mysqli_fetch_assoc($result)) {

    $question_id = $q['question_id'];

    // ✅ Get options for each question
    $opt_sql = "SELECT option_text, is_correct FROM options WHERE question_id = '$question_id'";
    $opt_result = mysqli_query($conn, $opt_sql);

    $options = [];
    while ($opt = mysqli_fetch_assoc($opt_result)) {
        $options[] = $opt;
    }

    // Attach options to question
    $q['options'] = $options;

    $questions[] = $q;
}


echo json_encode([
    "status" => "success",
    "questions" => $questions
]);
?>
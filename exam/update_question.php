<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

include("../config/db.php");

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['id'])) {
    echo json_encode([
        "status" => "error",
        "message" => "Missing ID"
    ]);
    exit;
}

$id = $data['id'];

$question = $data['question_text'];
$optionA = $data['optionA'];
$optionB = $data['optionB'];
$optionC = $data['optionC'];
$optionD = $data['optionD'];
$correct = $data['correctAnswer'];

// update question
mysqli_query($conn, "UPDATE questions SET question_text='$question' WHERE question_id=$id");

// delete old options
mysqli_query($conn, "DELETE FROM options WHERE question_id=$id");

// insert new options
$options = [$optionA, $optionB, $optionC, $optionD];

foreach ($options as $opt) {
    $isCorrect = ($opt == $correct) ? 1 : 0;

    mysqli_query($conn, "INSERT INTO options (question_id, option_text, is_correct)
    VALUES ($id, '$opt', $isCorrect)");
}

echo json_encode([
    "status" => "success",
    "message" => "Question updated successfully"
]);
?>
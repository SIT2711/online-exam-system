<?php
header("Content-Type: application/json");
include("../config/db.php");

if (!isset($_GET['id'])) {
    echo json_encode([
        "status" => "error",
        "message" => "Question ID required"
    ]);
    exit;
}

$id = $_GET['id'];

// Get question
$q1 = mysqli_query($conn, "SELECT * FROM questions WHERE question_id = $id");

if (mysqli_num_rows($q1) == 0) {
    echo json_encode([
        "status" => "error",
        "message" => "Question not found"
    ]);
    exit;
}

$question = mysqli_fetch_assoc($q1);

// Get options
$q2 = mysqli_query($conn, "SELECT * FROM options WHERE question_id = $id");

$options = [];
$correctAnswer = "";

while ($row = mysqli_fetch_assoc($q2)) {
    $options[] = [
        "option_text" => $row['option_text'],
        "is_correct" => $row['is_correct']
    ];

    if ($row['is_correct'] == 1) {
        $correctAnswer = $row['option_text'];
    }
}

echo json_encode([
    "status" => "success",
    "question" => [
        "question_text" => $question['question_text'],
        "optionA" => $options[0]['option_text'] ?? "",
        "optionB" => $options[1]['option_text'] ?? "",
        "optionC" => $options[2]['option_text'] ?? "",
        "optionD" => $options[3]['option_text'] ?? "",
        "correctAnswer" => $correctAnswer
    ]
]);
?>
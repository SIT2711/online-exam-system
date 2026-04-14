<?php

include "../config/db.php";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// 🔥 GET exam_id safely
$exam_id = isset($_GET['exam_id']) ? (int)$_GET['exam_id'] : 0;

if ($exam_id <= 0) {
    echo json_encode([
        "status" => "error",
        "message" => "exam_id is required"
    ]);
    exit();
}

// 🔥 MAIN QUERY
$sql = "SELECT * FROM questions WHERE exam_id = $exam_id";
$result = mysqli_query($conn, $sql);

// ❌ DB ERROR HANDLING (IMPORTANT FIX)
if (!$result) {
    echo json_encode([
        "status" => "error",
        "message" => mysqli_error($conn)
    ]);
    exit();
}

$questions = [];

while ($q = mysqli_fetch_assoc($result)) {

    $question_id = (int)$q['question_id'];

    // 🔥 FIX: check option query failure
    $opt_sql = "SELECT option_text, is_correct 
                FROM options 
                WHERE question_id = $question_id";

    $opt_result = mysqli_query($conn, $opt_sql);

    $options = [];

    if ($opt_result) {
        while ($opt = mysqli_fetch_assoc($opt_result)) {
            $options[] = $opt;
        }
    }

    $q['options'] = $options;
    $questions[] = $q;
}

// 🔥 SAFE OUTPUT
echo json_encode([
    "status" => "success",
    "questions" => $questions
]);
?>
<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

include("../config/db.php");

// handle preflight request (CORS)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

// get JSON input
$data = json_decode(file_get_contents("php://input"), true);

// check ID
if (!isset($data['id'])) {
    echo json_encode([
        "status" => "error",
        "message" => "Missing ID"
    ]);
    exit;
}

$id = intval($data['id']);

// STEP 1: delete options first (important due to foreign key relation)
$deleteOptions = mysqli_query(
    $conn,
    "DELETE FROM options WHERE question_id = $id"
);

// STEP 2: delete question
$deleteQuestion = mysqli_query(
    $conn,
    "DELETE FROM questions WHERE question_id = $id"
);

// STEP 3: response
if ($deleteOptions && $deleteQuestion) {
    echo json_encode([
        "status" => "success",
        "message" => "Question deleted successfully"
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Database delete failed"
    ]);
}
?>
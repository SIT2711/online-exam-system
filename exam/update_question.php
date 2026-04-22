<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

include("../config/db.php");

// PREFLIGHT
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// GET DATA
$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["status"=>"error","message"=>"No data received"]);
    exit;
}

$id = intval($data['id']);

$question = mysqli_real_escape_string($conn, $data['question_text']);
$optionA = mysqli_real_escape_string($conn, $data['optionA']);
$optionB = mysqli_real_escape_string($conn, $data['optionB']);
$optionC = mysqli_real_escape_string($conn, $data['optionC']);
$optionD = mysqli_real_escape_string($conn, $data['optionD']);
$correct = mysqli_real_escape_string($conn, $data['correctAnswer']);

// ✅ UPDATE QUESTION
mysqli_query($conn, "
    UPDATE questions 
    SET question_text='$question' 
    WHERE question_id=$id
");

// ✅ GET EXISTING OPTIONS (IMPORTANT)
$res = mysqli_query($conn, "
    SELECT option_id FROM options 
    WHERE question_id=$id
    ORDER BY option_id ASC
");

$optionIds = [];
while ($row = mysqli_fetch_assoc($res)) {
    $optionIds[] = $row['option_id'];
}

// ✅ SAFETY CHECK
if (count($optionIds) < 4) {
    echo json_encode(["status"=>"error","message"=>"Options missing"]);
    exit;
}

// ✅ UPDATE OPTIONS (NO DELETE ❌)
$options = [$optionA, $optionB, $optionC, $optionD];

for ($i = 0; $i < 4; $i++) {

    $optText = $options[$i];
    $optId = $optionIds[$i];

    $isCorrect = ($optText == $correct) ? 1 : 0;

    mysqli_query($conn, "
        UPDATE options 
        SET option_text='$optText', is_correct=$isCorrect 
        WHERE option_id=$optId
    ");
}

echo json_encode([
    "status" => "success",
    "message" => "Question updated successfully"
]);
?>
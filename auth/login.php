
<?php
include("../config/db.php");

$data = json_decode(file_get_contents("php://input"), true);

$name = $data['full_name'];
$email = $data['email'];
$password = password_hash($data['password'], PASSWORD_DEFAULT);
$role = $data['role'];

$sql = "INSERT INTO users (full_name, email, password, role)
        VALUES ('$name', '$email', '$password', '$role')";

if ($conn->query($sql)) {
    echo json_encode(["message" => "User registered successfully"]);
} else {
    echo json_encode(["error" => $conn->error]);
}
?>
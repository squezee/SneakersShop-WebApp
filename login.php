<?php 
class Response{
    public $message;
}
$postData = file_get_contents('php://input');
$data = json_decode($postData, true);
$conn = new PDO("mysql:host=localhost;dbname=shopdb", "root", "Nike7363");
$stmt = $conn->prepare("SELECT * FROM Users WHERE (username = :username) OR (email = :username)");
$stmt->bindValue(":username", $data["username"]);
$stmt->execute();
file_put_contents(__DIR__ . '/log.txt', json_encode($data['username']." -usernameEbat'") . PHP_EOL, FILE_APPEND);

if (!$stmt->rowCount()) {
    echo "Database error: unknown user";
    die;
}
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if (password_verify($data['password'], $user['password'])) {
    if (password_needs_rehash($user['password'], PASSWORD_DEFAULT)) {
        $newHash = password_hash($data['password'], PASSWORD_DEFAULT);
        $stmt = $conn->prepare('UPDATE Users SET password = :password WHERE (username = :username) OR (email = :username)');
        $stmt->execute([
            ':username' => $data['username'],
            ':password' => $newHash,
        ]);
    }
    session_start();
    $_SESSION['user_id'] = $user['id'];
    $response = new Response();
    $response->message="ok";
    echo json_encode($response);
    die;
}
?>
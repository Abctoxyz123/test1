<?php
require 'db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  header('Location: register.html');
  exit;
}

$username = trim($_POST['username'] ?? '');
$email    = trim($_POST['email'] ?? '');
$password = $_POST['password'] ?? '';

// Validation cơ bản
if ($username === '' || $email === '' || $password === '') {
  header('Location: register.html?error=empty');
  exit;
}

// ✅ Chỉ kiểm tra email không rỗng, bỏ filter_var để test dễ hơn
// Nếu bạn vẫn muốn kiểm tra chuẩn thì bật lại filter_var
/*
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  header('Location: register.html?error=email');
  exit;
}
*/

$email = trim($_POST['email']);
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "<script>alert('Email không hợp lệ!');</script>";
    exit;
}


// Kiểm tra tồn tại username/email
$stmt = $pdo->prepare('SELECT id FROM users WHERE username = ? OR email = ? LIMIT 1');
$stmt->execute([$username, $email]);
if ($stmt->fetch()) {
  header('Location: register.html?error=exists');
  exit;
}

// Lưu user (hash password)
$hash = password_hash($password, PASSWORD_DEFAULT);
$stmt = $pdo->prepare('INSERT INTO users (username, email, password) VALUES (?, ?, ?)');
$stmt->execute([$username, $email, $hash]);

// Chuyển về trang đăng nhập
header('Location: login.html?registered=1');
exit;

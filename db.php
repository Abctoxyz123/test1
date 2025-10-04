<?php
// db.php - Kết nối đến database MỚI
$host = 'sql104.infinityfree.com';
$db   = 'if0_40063373_menu_app';  // Database MỚI
$user = 'if0_40063373';
$pass = '6ywLIz2YYk2';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
  PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
  PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
  PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
  $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
  error_log($e->getMessage());
  exit('Kết nối DB lỗi.');
}

<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    header('Location: login.html');
    exit;
}

$username = $_SESSION['username'];
?>

<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Dashboard - Ngân sách hợp lý</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body { background: #f8f9fa; }
        header {
            background: linear-gradient(90deg, #ff7e5f, #feb47b);
            padding: 15px;
            color: white;
        }
        .menu-card { cursor: pointer; }
        .menu-card:hover { transform: scale(1.05); transition: 0.3s; }
    </style>
</head>
<body>
    <!-- Header -->
    <header class="d-flex justify-content-between align-items-center px-3">
        <h1>Ngân sách hợp lý - Bữa ăn hợp ý</h1>
        <nav>
            <span class="text-white me-2">Xin chào, <?php echo htmlspecialchars($username); ?>!</span>
            <a href="index.html" class="btn btn-light btn-sm me-2">Trang chủ</a>
            <a href="logout.php" class="btn btn-light btn-sm">Đăng xuất</a>
        </nav>
    </header>

    <main class="container py-5">
        <!-- Form gợi ý CHO THÀNH VIÊN -->
        <section class="mb-5">
            <h2 class="text-center fw-bold text-primary mb-4">Nhập ngân sách của bạn</h2>
            
            <form action="save.php" method="POST" class="row g-3 justify-content-center needs-validation" novalidate>
                <!-- Hidden field - tự động lấy username từ session -->
                <input type="hidden" name="username" value="<?php echo htmlspecialchars($username); ?>">
                
                <div class="col-md-3">
                    <label class="form-label">Ngân sách (VNĐ)</label>
                    <input type="number" name="budget" class="form-control" placeholder="Nhập ngân sách" min="10000" required>
                </div>
                
                <div class="col-md-3">
                    <label class="form-label">Số người ăn</label>
                    <input type="number" name="people" class="form-control" placeholder="Nhập số người" min="1" required>
                </div>
                
                <div class="col-md-3">
                    <label class="form-label">Chế độ ăn</label>
                    <select name="diet" class="form-select">
                        <option value="TietKiem">Tiết kiệm</option>
                        <option value="Protein">Giàu protein</option>
                        <option value="Chay">Ăn chay</option>
                        <option value="ItDauMo">Ít dầu mỡ</option>
                    </select>
                </div>
                
                <div class="col-12 text-center">
                    <button type="submit" class="btn btn-primary btn-lg">✅ Lưu thông tin</button>
                </div>
            </form>
        </section>
    </main>
</body>
</html>
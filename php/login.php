<?php
require_once __DIR__ . '/includes/session.php';

if (is_logged_in()) {
    header('Location: account.php');
    exit;
}

$flash = get_flash_message();
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sign In - ShopEase</title>
  <link rel="stylesheet" href="../style.css">
</head>
<body>

  <header>
    <div>
      <h1>ShopEase</h1>
      <small>Authentication Services</small>
    </div>
    <div class="portal-nav">
      <a href="index.php">Portal Home</a>
      <a href="../index.html">Store</a>
    </div>
  </header>

  <div class="auth-container">
    <div class="card">
      <h2>Sign In</h2>

      <?php if ($flash): ?>
        <div class="alert alert-<?= htmlspecialchars($flash['type']) ?>">
          <?= htmlspecialchars($flash['message']) ?>
        </div>
      <?php endif; ?>

      <form action="handlers/login_process.php" method="POST">
        <div class="form-group">
          <label class="form-label" for="email">Email address</label>
          <input class="form-input" type="email" id="email" name="email" required autocomplete="email" placeholder="name@example.com">
        </div>

        <div class="form-group">
          <label class="form-label" for="password">Password</label>
          <input class="form-input" type="password" id="password" name="password" required autocomplete="current-password" placeholder="••••••••">
        </div>

        <button type="submit" class="btn-success">Sign in</button>
      </form>

      <div class="auth-footer">
        Do not have an account? <a href="create-account.php">Create account</a>
      </div>
    </div>
  </div>

</body>
</html>

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
  <title>Create Account - ShopEase</title>
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
      <h2>Create Account</h2>

      <?php if ($flash): ?>
        <div class="alert alert-<?= htmlspecialchars($flash['type']) ?>">
          <?= htmlspecialchars($flash['message']) ?>
        </div>
      <?php endif; ?>

      <form action="handlers/create_process.php" method="POST">
        <div class="form-group">
          <label class="form-label" for="name">Full name</label>
          <input class="form-input" type="text" id="name" name="name" required placeholder="John Doe">
        </div>

        <div class="form-group">
          <label class="form-label" for="email">Email address</label>
          <input class="form-input" type="email" id="email" name="email" required autocomplete="email" placeholder="name@example.com">
        </div>

        <div class="form-group">
          <label class="form-label" for="password">Password</label>
          <input class="form-input" type="password" id="password" name="password" required minlength="6" placeholder="At least 6 characters">
        </div>

        <div class="form-group">
          <label class="form-label" for="confirm_password">Confirm password</label>
          <input class="form-input" type="password" id="confirm_password" name="confirm_password" required minlength="6" placeholder="Repeat password">
        </div>

        <button type="submit" class="btn-success">Create account</button>
      </form>

      <div class="auth-footer">
        Already have an account? <a href="login.php">Sign in</a>
      </div>
    </div>
  </div>

</body>
</html>

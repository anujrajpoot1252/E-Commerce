<?php
require_once __DIR__ . '/includes/session.php';

require_login('login.php');

$user = get_session_user();
$token = get_auth_token();
$flash = get_flash_message();
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Account - ShopEase</title>
  <link rel="stylesheet" href="../style.css">
</head>
<body>

  <header>
    <div>
      <h1>ShopEase</h1>
      <small>User Dashboard</small>
    </div>
    <div class="portal-nav">
      <a href="index.php">Portal Home</a>
      <a href="../index.html">Store</a>
      <a href="logout.php" style="color: #b91c1c;">Sign out</a>
    </div>
  </header>

  <?php if ($flash): ?>
    <div class="alert alert-<?= htmlspecialchars($flash['type']) ?>">
      <?= htmlspecialchars($flash['message']) ?>
    </div>
  <?php endif; ?>

  <div class="account-grid">
    <div>
      <div class="card">
        <h2>Navigation</h2>
        <ul style="list-style: none;">
          <li style="margin-bottom: 12px;"><a href="account.php" style="color: #0f172a; font-weight: 600; text-decoration: none;">Account profile</a></li>
          <li style="margin-bottom: 12px;"><a href="../index.html" style="color: #64748b; text-decoration: none;">Product catalog</a></li>
          <li style="margin-bottom: 12px;"><a href="logout.php" style="color: #b91c1c; text-decoration: none;">Sign out</a></li>
        </ul>
      </div>
    </div>

    <div>
      <div class="card">
        <h2>Profile Details</h2>
        <div class="profile-item">
          <span class="profile-label">Name</span>
          <span class="profile-value"><?= htmlspecialchars($user['name'] ?? 'N/A') ?></span>
        </div>
        <div class="profile-item">
          <span class="profile-label">Email</span>
          <span class="profile-value"><?= htmlspecialchars($user['email'] ?? 'N/A') ?></span>
        </div>
        <div class="profile-item">
          <span class="profile-label">Role</span>
          <span class="profile-value"><?= htmlspecialchars(ucfirst($user['role'] ?? 'customer')) ?></span>
        </div>
        <div class="profile-item">
          <span class="profile-label">User ID</span>
          <span class="profile-value" style="font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 13px;"><?= htmlspecialchars($user['id'] ?? 'N/A') ?></span>
        </div>
      </div>

      <div class="card">
        <h2>Session Security</h2>
        <p style="font-size: 13px; color: #64748b; margin-bottom: 12px;">
          Authenticated JSON Web Token for REST API transactions:
        </p>
        <div class="token-box">
          <?= htmlspecialchars($token ? substr($token, 0, 36) . '...' . substr($token, -16) : 'No token stored in current session') ?>
        </div>
      </div>
    </div>
  </div>

</body>
</html>

<?php
require_once __DIR__ . '/includes/session.php';

$loggedIn = is_logged_in();
$user = get_session_user();
$flash = get_flash_message();
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Services Portal - ShopEase</title>
  <link rel="stylesheet" href="../style.css">
</head>
<body>

  <header>
    <div>
      <h1>ShopEase</h1>
      <small>PHP Backend and Session Services</small>
    </div>
    <div class="portal-nav">
      <?php if ($loggedIn): ?>
        <span style="color: #64748b; font-size: 13px;">Signed in as <strong><?= htmlspecialchars($user['name'] ?? 'User') ?></strong></span>
        <a href="account.php">Account</a>
        <a href="logout.php" style="color: #b91c1c;">Sign out</a>
      <?php else: ?>
        <a href="login.php">Sign in</a>
        <a href="create-account.php">Create account</a>
      <?php endif; ?>
    </div>
  </header>

  <?php if ($flash): ?>
    <div class="alert alert-<?= htmlspecialchars($flash['type']) ?>">
      <?= htmlspecialchars($flash['message']) ?>
    </div>
  <?php endif; ?>

  <div class="card">
    <h2>Services Overview</h2>
    <p style="color: #64748b; font-size: 13px; margin-bottom: 12px;">
      This PHP service layer manages server-rendered sessions, authenticates forms, and communicates with the Node.js REST API via cURL.
    </p>
    <div class="badge" style="display: inline-flex;">
      Session: <?= $loggedIn ? 'Active' : 'Guest' ?>
    </div>
  </div>

  <div class="feature-grid">
    <div class="feature-card">
      <div>
        <h3>Storefront Demo</h3>
        <p>Browse products, manage shopping cart items, test inventory deduction, and simulate checkout orders.</p>
      </div>
      <a href="../index.html" style="text-decoration: none;"><button style="width: 100%;">Open storefront</button></a>
    </div>

    <div class="feature-card">
      <div>
        <h3>User Authentication</h3>
        <p>Access user login, registration, and persistent session cookie management.</p>
      </div>
      <?php if ($loggedIn): ?>
        <a href="account.php" style="text-decoration: none;"><button style="width: 100%;">View account</button></a>
      <?php else: ?>
        <a href="login.php" style="text-decoration: none;"><button style="width: 100%;">Sign in or create account</button></a>
      <?php endif; ?>
    </div>

    <div class="feature-card">
      <div>
        <h3>REST API Integration</h3>
        <p>Backend communication helper using PHP cURL to query Node.js endpoints with Bearer token authentication.</p>
      </div>
      <a href="../index.html" style="text-decoration: none;"><button style="width: 100%; background: #ffffff; color: #0f172a; border: 1px solid #cbd5e1;">View inventory console</button></a>
    </div>
  </div>

</body>
</html>

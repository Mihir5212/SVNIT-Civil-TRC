<?php
$activePage = 'team';
$pageTitle = 'Our Team | TRC SVNIT Surat';
$pageDesc = 'Meet the professors, research scholars, and consulting engineers driving road safety and transportation engineering at SVNIT Surat.';
include 'includes/meta.php';
include 'includes/header.php';
?>
<main id="main">

  <!-- Page Hero Banner -->
  <div class="page-hero">
    <div class="page-hero-content">
      <h1 class="page-hero-title">Our Team &amp; Faculty</h1>
      <p class="page-hero-breadcrumb"><a href="index.php">Home</a> &rsaquo; Team</p>
    </div>
  </div>

  <section class="section">
    <div class="wrap">
      <div id="team-groups">
        <!-- Rendered dynamically by main.js pages.team() -->
      </div>
    </div>
  </section>

</main>
<?php include 'includes/footer.php'; ?>

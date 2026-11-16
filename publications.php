<?php
$activePage = 'publications';
$pageTitle = 'Publications | TRC SVNIT Surat';
$pageDesc = 'Explore research publications, peer-reviewed journal papers, and conference proceedings authored by the TRC research team at SVNIT Surat.';
include 'includes/meta.php';
include 'includes/header.php';
?>
<main id="main">

  <!-- Page Hero Banner -->
  <div class="page-hero">
    <div class="page-hero-content">
      <h1 class="page-hero-title">Publications &amp; Research Papers</h1>
      <p class="page-hero-breadcrumb"><a href="index.php">Home</a> &rsaquo; Publications</p>
    </div>
  </div>

  <section class="section">
    <div class="wrap">
      <!-- Filter Chips -->
      <div class="chips-row" id="type-chips">
        <!-- Rendered dynamically by main.js -->
      </div>

      <!-- Publications List by Year -->
      <div id="pub-years">
        <!-- Rendered dynamically by main.js -->
      </div>
    </div>
  </section>

</main>
<?php include 'includes/footer.php'; ?>

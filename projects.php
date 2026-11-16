<?php
$activePage = 'projects';
$pageTitle = 'Research & Projects | TRC SVNIT Surat';
$pageDesc = 'Explore TRC\'s comprehensive portfolio of completed and ongoing highway research, road safety audits, and traffic planning consultancy projects.';
include 'includes/meta.php';
include 'includes/header.php';
?>
<main id="main">

  <!-- Page Hero Banner -->
  <div class="page-hero">
    <div class="page-hero-content">
      <h1 class="page-hero-title">Research &amp; Projects</h1>
      <p class="page-hero-breadcrumb"><a href="index.php">Home</a> &rsaquo; Projects</p>
    </div>
  </div>

  <section class="section">
    <div class="wrap">
      <!-- Filter Toolbar -->
      <div style="display:flex;align-items:center;justify-content:space-between;gap:1.5rem;flex-wrap:wrap;margin-bottom:2.5rem;background:var(--concrete);padding:1.25rem 1.75rem;border-radius:14px;">
        <div class="chips-row" id="status-chips" style="margin-bottom:0;">
          <!-- Rendered dynamically by main.js -->
        </div>
        <div style="display:flex;align-items:center;gap:1rem;">
          <select id="sector-select" style="border:1.5px solid #d1d5db;border-radius:8px;padding:0.5rem 1rem;font-size:0.9rem;font-weight:500;color:var(--text);background:var(--white);cursor:pointer;outline:none;">
            <option value="">All areas</option>
          </select>
          <span id="result-count" style="color:var(--muted);font-size:0.875rem;font-weight:600;white-space:nowrap;"></span>
        </div>
      </div>

      <!-- Project Grid -->
      <div class="project-grid" id="project-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:2rem;">
        <!-- Rendered dynamically by main.js -->
      </div>
      <div id="projects-empty" style="text-align:center;padding:3rem 0;"></div>
    </div>
  </section>

</main>
<?php include 'includes/footer.php'; ?>

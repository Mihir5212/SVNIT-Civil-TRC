<?php
$activePage = 'projects';
require_once 'includes/projects-data.php';

$projects = getTRCProjects();
$id = isset($_GET['id']) ? (int)$_GET['id'] : 1;
if (!isset($projects[$id])) {
    $id = 1;
}
$p = $projects[$id];

$pageTitle = htmlspecialchars($p['title']) . ' | TRC SVNIT Surat';
$pageDesc = htmlspecialchars($p['summary']);

// 2 related projects for bottom showcase
$relatedProjects = [];
foreach ($projects as $otherId => $otherProj) {
    if ($otherId !== $id) {
        $relatedProjects[] = $otherProj;
        if (count($relatedProjects) >= 2) break;
    }
}

$methods = array_values(array_filter(array_map('trim', explode(',', $p['methodologies']))));

// Faculty investigators matched cleanly to existing portraits in images/team/
$investigators = [
    ['name' => 'Dr. Gaurang J. Joshi', 'role' => 'Professor · Principal Investigator', 'photo' => 'images/team/gaurang-joshi.jpg'],
    ['name' => 'Dr. Shriniwas S. Arkatkar', 'role' => 'Professor · Safety & ITS Lead', 'photo' => 'images/team/shriniwas-arkatkar.jpg'],
];
if (in_array($p['sector'], ['safety', 'highways', 'surveying'], true)) {
    $investigators[] = ['name' => 'Dr. Ashish Dhamaniya', 'role' => 'Professor · Geometrics & Operations', 'photo' => 'images/team/ashish-dhamaniya.jpg'];
}

include 'includes/meta.php';
include 'includes/header.php';
?>
<main id="main" class="trc-subpage trc-pd-page">
  <div class="trc-shell trc-pd-stack">

    <!-- ========================================================= -->
    <!-- BREADCRUMB & STATUS BAR                                   -->
    <!-- ========================================================= -->
    <div class="trc-pd-topbar">
      <div class="trc-pd-crumbs">
        <a href="projects.php" class="trc-pd-back-pill">
          <span class="material-symbols-outlined trc-arrow-icon" aria-hidden="true">arrow_back</span>
          <span>All Projects</span>
        </a>
        <span class="trc-pd-sep" aria-hidden="true">/</span>
        <span class="trc-pd-sector-txt"><?php echo htmlspecialchars($p['sector_label']); ?></span>
        <span class="trc-pd-sep" aria-hidden="true">/</span>
        <span class="trc-pd-cur"><?php echo htmlspecialchars($p['title']); ?></span>
      </div>

      <span class="trc-pd-status-pill">
        <span class="trc-pd-status-dot" aria-hidden="true"></span>
        <span><?php echo htmlspecialchars($p['status_label']); ?> &bull; Final Report Submitted</span>
      </span>
    </div>

    <!-- ========================================================= -->
    <!-- 1. PROJECT HERO SPLIT CARD                                -->
    <!-- ========================================================= -->
    <section class="trc-pd-hero-card">
      <div class="trc-pd-hero-grid">

        <!-- Left Overview + Key Specs (7 cols) -->
        <div class="trc-pd-hero-left">
          <div class="trc-pd-hero-copy">
            <div class="trc-pd-hero-badges">
              <span class="trc-pd-badge-emerald">SVNIT Consultancy Mandate</span>
              <span class="trc-pd-badge-slate"><?php echo htmlspecialchars($p['sector_label']); ?></span>
            </div>

            <h1><?php echo htmlspecialchars($p['title']); ?></h1>

            <p class="trc-pd-lead"><?php echo htmlspecialchars($p['summary']); ?></p>
          </div>

          <!-- 4-Column Key Specification Strip -->
          <div class="trc-pd-specs-row">
            <div>
              <span class="trc-pd-spec-label">Client Agency</span>
              <strong class="trc-pd-spec-val"><?php echo htmlspecialchars($p['client']); ?></strong>
            </div>
            <div>
              <span class="trc-pd-spec-label">Location</span>
              <strong class="trc-pd-spec-val"><?php echo htmlspecialchars($p['location']); ?></strong>
            </div>
            <div>
              <span class="trc-pd-spec-label">Completion Year</span>
              <strong class="trc-pd-spec-val"><?php echo htmlspecialchars($p['year']); ?></strong>
            </div>
            <div>
              <span class="trc-pd-spec-label">Status</span>
              <strong class="trc-pd-spec-val is-emerald"><?php echo htmlspecialchars($p['status_label']); ?></strong>
            </div>
          </div>
        </div>

        <!-- Right Hero Photo (5 cols) -->
        <div class="trc-pd-hero-media">
          <img src="<?php echo htmlspecialchars($p['image']); ?>" alt="<?php echo htmlspecialchars($p['title']); ?>" loading="eager" />
          <div class="trc-pd-hero-scrim" aria-hidden="true"></div>
          <div class="trc-pd-hero-caption">
            <span>PROJECT CORRIDOR</span>
            <p><?php echo htmlspecialchars($p['location']); ?></p>
          </div>
        </div>

      </div>
    </section>

    <!-- ========================================================= -->
    <!-- 2. TWO-COLUMN TECHNICAL BREAKDOWN                         -->
    <!-- ========================================================= -->
    <section class="trc-pd-body-grid">

      <!-- Left Narrative & Technical Blocks (8 cols) -->
      <div class="trc-pd-main-col">

        <!-- 01. Engineering Mandate & Context -->
        <div class="trc-pd-panel">
          <span class="trc-pd-kicker">01 &bull; Project Context &amp; Mandate</span>
          <h2>Commissioned Technical Investigation</h2>
          <p>
            Commissioned by <strong><?php echo htmlspecialchars($p['client']); ?></strong> at <strong><?php echo htmlspecialchars($p['location']); ?></strong>, this mandate addressed critical operational, geometric, and safety performance challenges under empirical Indian traffic conditions and national IRC compliance frameworks.
          </p>
        </div>

        <!-- 02. Three-Stage Diagnostic Protocol -->
        <div class="trc-pd-panel">
          <div>
            <span class="trc-pd-kicker">02 &bull; Field Methodology</span>
            <h2>Three-Stage Diagnostic Protocol</h2>
          </div>

          <div class="trc-pd-stages-grid">
            <div class="trc-pd-stage-card">
              <span class="trc-pd-stage-icon">
                <span class="material-symbols-outlined" aria-hidden="true">analytics</span>
              </span>
              <h3>Empirical Field Survey</h3>
              <p>Multi-day sensor, speed, geometry, and classified volume logging calibrated at site conditions.</p>
            </div>

            <div class="trc-pd-stage-card">
              <span class="trc-pd-stage-icon">
                <span class="material-symbols-outlined" aria-hidden="true">videocam</span>
              </span>
              <h3>Simulation &amp; Modeling</h3>
              <p>Analytical conflict extraction, network modeling, and structural evaluation per IRC codes.</p>
            </div>

            <div class="trc-pd-stage-card">
              <span class="trc-pd-stage-icon">
                <span class="material-symbols-outlined" aria-hidden="true">verified</span>
              </span>
              <h3>Compliance Validation</h3>
              <p>Ranked actionable engineering remedies vetted by SVNIT Civil Engineering faculty.</p>
            </div>
          </div>
        </div>

        <!-- 03. Scope of Work & Countermeasures -->
        <div class="trc-pd-panel">
          <div>
            <span class="trc-pd-kicker">03 &bull; Scope &amp; Deliverables</span>
            <h2>Scope of Investigation &amp; Solutions</h2>
          </div>

          <div class="trc-pd-scope-grid">
            <?php foreach ($p['scope'] as $item): ?>
            <div class="trc-pd-scope-card">
              <span class="material-symbols-outlined trc-pd-check-icon" aria-hidden="true">check_circle</span>
              <p><?php echo htmlspecialchars($item); ?></p>
            </div>
            <?php endforeach; ?>
          </div>
        </div>

        <!-- 04. Key Outcomes & Measured Impact -->
        <div class="trc-pd-panel trc-pd-outcome-panel">
          <span class="trc-pd-kicker">04 &bull; Measured Outcomes &amp; Impact</span>
          <h2>Key Engineering Results</h2>
          <p class="trc-pd-outcome-text"><?php echo htmlspecialchars($p['outcomes']); ?></p>
        </div>

      </div>

      <!-- Right Technical Dossier Sidebar (4 cols) -->
      <aside class="trc-pd-sidebar">

        <!-- Standards & Codes Applied -->
        <div class="trc-pd-side-card">
          <h3>Standards &amp; Codes Applied</h3>
          <div class="trc-pd-tags-wrap">
            <?php foreach ($methods as $m): ?>
            <span class="trc-pd-code-pill"><?php echo htmlspecialchars($m); ?></span>
            <?php endforeach; ?>
          </div>
        </div>

        <!-- Faculty Investigators -->
        <div class="trc-pd-side-card">
          <h3>Faculty Investigators</h3>
          <div class="trc-pd-inv-list">
            <?php foreach ($investigators as $inv): ?>
            <div class="trc-pd-inv-item">
              <img src="<?php echo htmlspecialchars($inv['photo']); ?>" alt="<?php echo htmlspecialchars($inv['name']); ?>" loading="lazy" />
              <div>
                <div class="trc-pd-inv-name"><?php echo htmlspecialchars($inv['name']); ?></div>
                <div class="trc-pd-inv-role"><?php echo htmlspecialchars($inv['role']); ?></div>
              </div>
            </div>
            <?php endforeach; ?>
          </div>
        </div>

        <!-- Deliverables Submitted -->
        <div class="trc-pd-side-card">
          <h3>Deliverables Submitted</h3>
          <ul class="trc-pd-deliv-list">
            <li>
              <span class="material-symbols-outlined" aria-hidden="true">description</span>
              <span>Vetted Technical Consultancy Report</span>
            </li>
            <li>
              <span class="material-symbols-outlined" aria-hidden="true">map</span>
              <span>Corridor Field Diagnostics &amp; Strip Plans</span>
            </li>
            <li>
              <span class="material-symbols-outlined" aria-hidden="true">architecture</span>
              <span>CAD Countermeasure &amp; Geometry Drawings</span>
            </li>
          </ul>
        </div>

        <!-- Deep Emerald Consultation CTA Card -->
        <div class="trc-pd-cta-card">
          <h3>Need a similar safety audit or DPR review?</h3>
          <p>
            Engage SVNIT’s Transportation Engineering &amp; Planning Cell for IRC-compliant field diagnostics.
          </p>
          <a href="contact.php" class="trc-pd-cta-btn">
            <span>Request Technical Proposal</span>
            <span class="material-symbols-outlined trc-arrow-icon" aria-hidden="true">arrow_forward</span>
          </a>
        </div>

      </aside>

    </section>

    <!-- ========================================================= -->
    <!-- 3. OTHER CONSULTANCY PROJECTS PREVIEW                     -->
    <!-- ========================================================= -->
    <?php if (!empty($relatedProjects)): ?>
    <section class="trc-pd-related">
      <div class="trc-pr-grid-head">
        <h2>Explore Related Projects</h2>
        <a href="projects.php" class="trc-stitch-read-link">
          <span>All Projects</span>
          <span class="material-symbols-outlined trc-arrow-icon" aria-hidden="true">arrow_forward</span>
        </a>
      </div>

      <div class="trc-pd-rel-grid">
        <?php foreach ($relatedProjects as $rp): ?>
        <article class="trc-pr-card">
          <div class="trc-pr-card-top">
            <div class="trc-pr-card-media">
              <img src="<?php echo htmlspecialchars($rp['image']); ?>" alt="<?php echo htmlspecialchars($rp['title']); ?>" loading="lazy" />
              <span class="trc-pr-card-badge"><?php echo htmlspecialchars($rp['sector_label']); ?></span>
            </div>
            <div class="trc-pr-card-body">
              <div class="trc-pr-card-client">
                <?php echo htmlspecialchars($rp['client']); ?> &bull; <?php echo htmlspecialchars($rp['year']); ?>
              </div>
              <h3><?php echo htmlspecialchars($rp['title']); ?></h3>
              <p><?php echo htmlspecialchars($rp['summary']); ?></p>
            </div>
          </div>

          <div class="trc-pr-card-foot">
            <span class="trc-pr-card-loc"><?php echo htmlspecialchars($rp['location']); ?></span>
            <a href="project.php?id=<?php echo urlencode((string)$rp['id']); ?>" class="trc-stitch-card-btn">
              <span>View Brief</span>
              <span class="material-symbols-outlined trc-arrow-icon" aria-hidden="true">arrow_forward</span>
            </a>
          </div>
        </article>
        <?php endforeach; ?>
      </div>
    </section>
    <?php endif; ?>

  </div>
</main>
<?php include 'includes/footer.php'; ?>
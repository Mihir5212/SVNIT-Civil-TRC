# TRC website: preview version (HTML, CSS, JavaScript)

Preview of the **TEP Research & Consultancy Cell (TRC)** website, Department of Civil Engineering, SVNIT Surat.
It is for sharing a link and collecting feedback. It began with the same pages as the PHP version, which will be used later on the SVNIT server. The present designs were made on this version first.

- No server, database or PHP needed
- All content (capabilities, research and projects, news, publications, team, contact details) is in **one file: `assets/js/data.js`**
- Publish free on **GitHub Pages** and share the link

---

## 1. See it on your computer

Unzip the folder and **double-click `index.html`**. It opens in your browser. All pages and links work like this.
(Keep the internet on so the fonts and the map load.)

---

## 2. Publish on GitHub Pages and get a link

1. Sign in at **github.com** (create a free account if needed).
2. Click **+ → New repository**. Name it, for example, `trc-website`. Choose **Public** (free GitHub Pages needs a public repository). Click **Create repository**.
3. On the new repository page, click **uploading an existing file**.
4. Open the unzipped folder, select **everything inside it** (`index.html`, the other `.html` files, and the `assets` and `images` folders) and drag it into the GitHub page.
   `index.html` must be at the top level of the repository, not inside another folder.
5. Click **Commit changes**.
6. Go to **Settings → Pages**. Under **Build and deployment**, set **Source** to **Deploy from a branch**, choose **main** and **/ (root)**, then click **Save**.
7. Wait 1–2 minutes and refresh the Settings → Pages screen. Your link appears at the top, like:
   **`https://<your-github-username>.github.io/trc-website/`**
8. Share that link.

---

## 3. Change the content

Open `assets/js/data.js`. On GitHub you can edit it directly: open the file, click the **pencil icon**, make changes, then **Commit changes**. The live site updates in a minute or two (press **Ctrl + F5** to reload without the old copy).

The top of `data.js` explains the rules. In short:
- Change only the text inside quotes `'...'` or backticks `` `...` ``
- Keep the commas and brackets
- For an apostrophe inside `'...'`, type `\'` (e.g. `'SVNIT\'s'`), or use backticks
- In long text (inside backticks), leave a blank line between paragraphs and start a line with `- ` for a bullet point

| To change | Edit in `data.js` |
|---|---|
| Email, phone, address, office hours, map | `site` |
| Yellow "preview" bar at the top | `site.previewNotice` (set to `''` to hide it) |
| Our capabilities (About page, form) and the Our Expertise board on the Home page | `capabilities` |
| Research & Projects | `projects` (the first one with `featured: true` appears on the Featured Project board on the Home page; `associatedWith` is the organisation you worked with) |
| News | `news` (newest date appears first; `featured: true` chooses the story on the Featured News board on the Home page, whose "All news" link opens the full list, as News is not in the menu) |
| Publications | `publications` |
| Team | `team` (`order`: lower numbers appear first) |
| Our Associations & Collaboration board on the Home page | `associations` (one line per organisation; the first six are shown; with `associations: []` the board keeps only its title and button) |
| Gallery photos and their captions | `gallery` (shown in the order listed; the filter buttons come from `galleryCategories`) |

**Text that is in the HTML files instead:** the Home page welcome, About TEP and Vision & Mission boards (`index.html`), and the About page (`about.html`).

**The Home page** is a drive through a 3D world: scrolling moves along a road from a rural highway by day, through a town at golden hour, into a city at night, with each section on an overhead board. Arrows on the boards take the side roads to other pages. It has its own styles inside `index.html` and does not use `style.css` or `main.js`; its lists come from `data.js`, and the world is built by the files in `assets/js/drive/`. Visitors who ask for less motion, and very short screens, see the boards as a simple list over a still picture. So do browsers that cannot run the 3D world, which keep the boards on the road instead.

Where each arrow on a board leads is set in `index.html` by its `href`, and which way it turns by `data-turn` (`left`, `right` or `straight`). Each board's junction must have a road on that side: `ARMS` in `assets/js/drive/route.js` lists them.

### Adding photos
1. On GitHub, open the `images/projects` folder (or `images/news`, `images/team`) and use **Add file → Upload files**.
2. In `data.js`, set the item's `image` (or `photo` for team) to the path, e.g. `image: 'images/projects/ring-road.jpg'`.

For the logos in Our Associations, use the `images/associations` folder and set `logo`, e.g. `logo: 'images/associations/organisation-name.png'`. A PNG with a transparent background, around 400 px wide, works best.

For the gallery, use the `images/gallery` folder and add one line to `gallery` in `data.js` for each photo:
`{ image: 'images/gallery/ring-road-survey.jpg', title: 'Video survey on the ring road', category: 'field', place: 'Surat', year: 2026 },`
Wide (landscape) photos work best, because the gallery shows them in a 3:2 frame and trims anything that does not fit; the full photo appears when it is opened. About 1600 px wide and under 500 KB each is plenty. Delete the `sample-*.svg` drawings and their lines once real photos are in. To hide the gallery photos altogether, use `gallery: []`.

Keep photos under about 500 KB each so pages load quickly. Wide (landscape) photos suit projects; square photos suit team members.

### The design of the other pages
A clean research-centre look, with each page opening on its own drawing. Most of it follows your content by itself:

| On the site | What controls it |
|---|---|
| Project markers on the corridor at the top of Research & Projects: yellow while ongoing, green once completed | `status` of each item in `projects` |
| Dates on the line at the top of News | `date` of each item in `news` |
| Photos at the top of Gallery and Team | The first five in `gallery`, and everyone in `team` |
| The small drawing on a project card, until it has a photo | `sector` of the project, or words such as "signal" or "impact" in its title |

So when a project finishes, change its `status` to `'completed'` and it changes everywhere.

A new capability shows the traffic-survey drawing until you choose another: add its `id` to `CAP` in `assets/js/art.js`.

---

## 4. The contact form

By default, pressing **Send enquiry** opens the visitor's email app with the enquiry filled in, addressed to `site.email`. The visitor then presses Send in their email app.

To receive enquiries **without** the visitor's email app, use a free form tool such as Formspree:
1. Create an account and a new form there. It gives you a link like `https://formspree.io/f/abcdwxyz`.
2. Paste that link into `site.formEndpoint` in `data.js`.
Enquiries are then emailed to you directly. The form has a hidden spam trap that these tools recognise.

---

## 5. Collecting feedback

Ask reviewers to mention the **page** and **section** with each comment (e.g. "Home, Featured Project board: …").
If your reviewers use GitHub, they can also open an **Issue** in the repository for each comment.

---

## 6. Moving to the PHP version later

The PHP version (`trc-website.zip`) has the same design, plus an admin panel and a database. When it goes on the SVNIT server, the content from `data.js` is entered through its admin panel:
- `projects` → Admin → Projects
- `news` → Admin → News
- `publications` → Admin → Publications
- `team` → Admin → Team
- `capabilities` → `includes/content.php`
- `site` (contact details) → `includes/config.php`

The present page designs, the SVNIT logo, the 3D Home page, the Gallery page and the move of the capabilities into the About page were made after the PHP version. They changed the structure of the pages as well as `assets/css/style.css`, so copying the stylesheet alone will not be enough: the PHP templates need the same changes as `assets/js/main.js` and the HTML files here. The Home page itself can be copied across unchanged, with its `assets` folder.

---

## 7. Troubleshooting

| Problem | What to do |
|---|---|
| Page shows only the header or is blank after editing `data.js` | A comma, quote or bracket is missing. Undo your last change (on GitHub: open the file → **History**), or check the line you edited. |
| A message says the content file could not be read | Same as above: `data.js` has a typing mistake. |
| The live site did not change | Wait 1–2 minutes, then press **Ctrl + F5**. Check **Actions** on GitHub for a failed run. |
| GitHub link shows "404" | Check **Settings → Pages** is set to `main` and `/ (root)`, and that `index.html` is at the top level of the repository. |
| Photo does not show | Check the path and file name in `data.js` exactly match the uploaded file, including capital letters (`Photo.JPG` ≠ `photo.jpg`). |
| The Home page shows the boards but no moving 3D road | The browser has WebGL turned off or the graphics chip is not supported. Everything still works; the road shows as a still picture. |

---

## 8. Files

```
index.html, about.html, projects.html, project.html,
publications.html, news.html, news-item.html, gallery.html, team.html, contact.html, 404.html
assets/
  js/data.js      ← all the content
  js/main.js      builds the pages from data.js (all except Home)
  js/art.js       the drawings on those pages
  js/drive/       the 3D world on the Home page
    route.js        where the road, boards and junctions go, and the time of day along the way
    stage.js        scrolling, the boards, the arrows and turning off the road
    atmosphere.js   sky, sun, haze and time of day
    roadworks.js    road surface, markings, kerbs, footpaths, fields and the ground
    buildings.js    houses, shops, flats and commercial blocks
    flora.js        trees, palms, crops and grass
    furniture.js    gantries, signals, street lights, barriers, signs and poles
    traffic.js      vehicles and people, which move only with the scroll
    plan.js         what stands where along the road
    materials.js, kit.js, post.js, world.js, engine.js   how it is all drawn
  js/vendor/      three.js, the 3D library (MIT licence)
  textures/       photo materials for the 3D world, as script files (CC0, see CREDITS.txt)
  css/style.css   the design of all pages except Home
  img/road-still.jpg  the picture shown while the 3D world loads, or when it cannot run
  img/logo-mark.svg   placeholder logo (replace with the official one, same file name)
  img/svnit-logo.png  SVNIT logo, shown beside the TRC logo in the header and footer
images/           photos for projects, news, team and the gallery, and logos for Our Associations
.nojekyll         tells GitHub Pages to serve the files as they are
```

# TRC website: preview version (HTML, CSS, JavaScript)

Preview of the **TEP Research & Consultancy Cell (TRC)** website, Department of Civil Engineering, SVNIT Surat.
It is for sharing a link and collecting feedback. It began with the same pages as the PHP version, which will be used later on the SVNIT server. The road-sign design was made on this version first.

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

**The Home page** is a night drive: scrolling moves along a road from a rural highway into the city, with each section on an overhead board. It has its own styles inside `index.html` and does not use `style.css` or `main.js`; its lists come from `data.js`, and the road is drawn by `assets/js/night-road.js`. Visitors who ask for less motion, and very short screens, see the boards as a simple list.

### Adding photos
1. On GitHub, open the `images/projects` folder (or `images/news`, `images/team`) and use **Add file → Upload files**.
2. In `data.js`, set the item's `image` (or `photo` for team) to the path, e.g. `image: 'images/projects/ring-road.jpg'`.

For the logos in Our Associations, use the `images/associations` folder and set `logo`, e.g. `logo: 'images/associations/organisation-name.png'`. A PNG with a transparent background, around 400 px wide, works best.

For the gallery, use the `images/gallery` folder and add one line to `gallery` in `data.js` for each photo:
`{ image: 'images/gallery/ring-road-survey.jpg', title: 'Video survey on the ring road', category: 'field', place: 'Surat', year: 2026 },`
Wide (landscape) photos work best, because the gallery shows them in a 3:2 frame and trims anything that does not fit; the full photo appears when it is opened. About 1600 px wide and under 500 KB each is plenty. Delete the `sample-*.svg` drawings and their lines once real photos are in. To hide the gallery photos altogether, use `gallery: []`.

Keep photos under about 500 KB each so pages load quickly. Wide (landscape) photos suit projects; square photos suit team members.

### The road-sign design
The whole site is built from road furniture. Each kind has one job, and most of them follow your content by themselves:

| On the site | Used for | What controls it |
|---|---|---|
| Green direction board | Completed projects, page titles, the last call to action | A project's `status: 'completed'` |
| Yellow work-zone board | Ongoing projects, on their cards and their own pages | A project's `status: 'ongoing'` |
| Small traffic signal | Project status (amber or green lamp) and the filter buttons | A project's `status` |
| Blue facility sign with a white picture square | Our capabilities, team and contact details | Automatic |
| Km-stone | News dates, publication years and the steps on the About page | `date` in `news`, `year` in `publications` |
| Red ring signs | The numbers on the About page | Counted from your lists |

So when a project finishes, change its `status` to `'completed'` and its board turns green everywhere.

A new capability shows a traffic cone until you choose its picture: add its `id` to `CAPABILITY_PICTS` in `assets/js/main.js`.

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

The road-sign design, the SVNIT logo, the night-drive Home page, the Gallery page and the move of the capabilities into the About page were made after the PHP version. They changed the structure of the pages as well as `assets/css/style.css`, so copying the stylesheet alone will not be enough: the PHP templates need the same changes as `assets/js/main.js` and the HTML files here.

---

## 7. Troubleshooting

| Problem | What to do |
|---|---|
| Page shows only the header or is blank after editing `data.js` | A comma, quote or bracket is missing. Undo your last change (on GitHub: open the file → **History**), or check the line you edited. |
| A message says the content file could not be read | Same as above: `data.js` has a typing mistake. |
| The live site did not change | Wait 1–2 minutes, then press **Ctrl + F5**. Check **Actions** on GitHub for a failed run. |
| GitHub link shows "404" | Check **Settings → Pages** is set to `main` and `/ (root)`, and that `index.html` is at the top level of the repository. |
| Photo does not show | Check the path and file name in `data.js` exactly match the uploaded file, including capital letters (`Photo.JPG` ≠ `photo.jpg`). |

---

## 8. Files

```
index.html, about.html, projects.html, project.html,
publications.html, news.html, news-item.html, gallery.html, team.html, contact.html, 404.html
assets/
  js/data.js      ← all the content
  js/main.js      builds the pages from data.js (all except Home)
  js/night-road.js draws the night road on the Home page
  css/style.css   the road-sign design (all pages except Home)
  img/logo-mark.svg   placeholder logo (replace with the official one, same file name)
  img/svnit-logo.png  SVNIT logo, shown beside the TRC logo in the header and footer
images/           photos for projects, news, team and the gallery, and logos for Our Associations
.nojekyll         tells GitHub Pages to serve the files as they are
```

# TRC website: preview version (HTML, CSS, JavaScript)

Preview of the **Transportation Research & Consultancy (TRC)** website, Department of Civil Engineering, SVNIT Surat.
It is for sharing a link and collecting feedback. It has the same pages as the PHP version, which will be used later on the SVNIT server. The road-sign design was made on this version first.

- No server, database or PHP needed
- All content (services, projects, news, publications, team, contact details) is in **one file: `assets/js/data.js`**
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
| Services (Home, Services page, form) | `services` (the first four appear on the green sign on the Home page) |
| Projects | `projects` (`featured: true` puts one on the Home page; the first featured one is shown large) |
| News | `news` (newest date appears first) |
| Publications | `publications` |
| Team | `team` (`order`: lower numbers appear first) |
| Client logos moving across the Home page | `clients` (add one line per client; `clients: []` hides the strip) |

**Text that is in the HTML files instead:** the Home page headline and intro (`index.html`), and the About page (`about.html`).

### Adding photos
1. On GitHub, open the `images/projects` folder (or `images/news`, `images/team`) and use **Add file → Upload files**.
2. In `data.js`, set the item's `image` (or `photo` for team) to the path, e.g. `image: 'images/projects/ring-road.jpg'`.

For client logos, use the `images/clients` folder and set `logo`, e.g. `logo: 'images/clients/client-name.png'`. A PNG with a transparent background, around 400 px wide, works best.

Keep photos under about 500 KB each so pages load quickly. Wide (landscape) photos suit projects; square photos suit team members.

### The road-sign design
The whole site is built from road furniture. Each kind has one job, and most of them follow your content by themselves:

| On the site | Used for | What controls it |
|---|---|---|
| Green direction board | Completed projects, page titles, the last call to action | A project's `status: 'completed'` |
| Yellow work-zone board | Ongoing projects, on their cards and their own pages | A project's `status: 'ongoing'` |
| Small traffic signal | Project status (amber or green lamp) and the filter buttons | A project's `status` |
| Blue facility sign with a white picture square | Services, team and contact details | Automatic |
| Km-stone | News dates, publication years and the steps on the About page | `date` in `news`, `year` in `publications` |
| Red ring signs | The numbers on the About page | Counted from your lists |

So when a project finishes, change its `status` to `'completed'` and its board turns green everywhere.

A new service shows a traffic cone until you choose its picture: add its `id` to `SERVICE_PICTS` in `assets/js/main.js`.

---

## 4. The contact form

By default, pressing **Send enquiry** opens the visitor's email app with the enquiry filled in, addressed to `site.email`. The visitor then presses Send in their email app.

To receive enquiries **without** the visitor's email app, use a free form service such as Formspree:
1. Create an account and a new form there. It gives you a link like `https://formspree.io/f/abcdwxyz`.
2. Paste that link into `site.formEndpoint` in `data.js`.
Enquiries are then emailed to you directly. The form has a hidden spam trap that these services recognise.

---

## 5. Collecting feedback

Ask reviewers to mention the **page** and **section** with each comment (e.g. "Home, Selected projects: …").
If your reviewers use GitHub, they can also open an **Issue** in the repository for each comment.

---

## 6. Moving to the PHP version later

The PHP version (`trc-website.zip`) has the same design, plus an admin panel and a database. When it goes on the SVNIT server, the content from `data.js` is entered through its admin panel:
- `projects` → Admin → Projects
- `news` → Admin → News
- `publications` → Admin → Publications
- `team` → Admin → Team
- `services` → `includes/content.php`
- `site` (contact details) → `includes/config.php`

The road-sign design, the SVNIT logo and the moving client strip were made after the PHP version. They changed the structure of the pages as well as `assets/css/style.css`, so copying the stylesheet alone will not be enough: the PHP templates need the same changes as `assets/js/main.js` and the HTML files here.

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
index.html, about.html, services.html, projects.html, project.html,
publications.html, news.html, news-item.html, team.html, contact.html, 404.html
assets/
  js/data.js      ← all the content
  js/main.js      builds the pages from data.js
  css/style.css   the road-sign design
  img/logo-mark.svg   placeholder logo (replace with the official one, same file name)
  img/svnit-logo.png  SVNIT logo, shown beside the TRC logo in the header and footer
images/           photos for projects, news and team, and client logos
.nojekyll         tells GitHub Pages to serve the files as they are
```

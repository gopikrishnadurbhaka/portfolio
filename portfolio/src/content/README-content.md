# How to edit the website content

Everything written on the website comes from **one file**: `src/content/content.ts`.
You never need to touch any other file to change text, links, contact details or pictures.

## 1. Golden rules

- Change only the text **between the quotes**: `"title": "Change this text"`.
- Keep every quote `"`, comma `,`, and bracket `[ ] { }` exactly where it is.
- A missing comma or quote stops the site from building — if that happens, compare with the lines around it.
- Empty text `""` is hidden automatically.
- `"url": ""` means "no link yet". Paste a full address starting with `https://`.

## 2. Contact details

Find the `"contact"` block and edit:

| Field | What it shows |
| --- | --- |
| `email` | Email address (header button, contact section, footer) |
| `phone` | Mobile number |
| `showPhone` | `false` (default) hides the phone number everywhere; `true` shows it |
| `location` | City / country |
| `links` | LinkedIn, Google Scholar, ResearchGate… (label + url) |

## 3. Adding an item (article, publication, patent, talk, media feature, episode)

1. Find the list (for example `"publications": [ ... ]`).
2. Copy one whole `{ ... }` block from that list.
3. Paste it after the previous block, with a comma between blocks.
4. Change the text. Lists show in the order you write them — put newest first.

## 4. Placeholders ("sample")

- `"sample": true` marks a placeholder or something still to be confirmed. It is **not shown** on the site.
- To publish an item, change it to `"sample": false`.
- For reviewing only: `"showDraftNote": true` in `"settings"` shows a draft note and the sample items with a
  dashed **Sample** tag. It is `false` now, so the site looks finished.

## 5. Pictures

- Pictures live in the `public/` folder. Write their path starting from there, e.g. `"/images/expertise/aiot.jpg"`.
- **Portrait:** the site shows `public/profile-cutout.webp`, your photo with the background removed so you stand
  directly on the headline background. Your original is kept as `public/profile.jpg`.
  To change it, add a new photo with a transparent background (PNG or WebP) to `public/` and set `"photo"` to its
  path, or set `"photo": "/profile.jpg"` to use a normal photo. If the proportions differ, update `photoWidth`
  and `photoHeight` in `"person"` (currently 1290 × 1913).
- **Background behind the headline:** `backgroundImage` in `"person"`.
- **Expertise cards:** the `image` field on each card. Replace the file or point to a new one.

## 6. Menu links and buttons

Links starting with `#` jump to a section of the home page:
`#about #expertise #thought-leadership #research #patents #speaking #media #podcast #advisory #contact`.
Each section also has its own page (`/about`, `/research`, …) for sharing.

## 7. Contact form

- In `settings`, set `scheduleEnabled: true` to show Schedule a Consultation and enable enquiry forms.
  Set `scheduleEnabled: false` to hide that button and all forms; contact details and downloads remain.
  Speaking invitations then lead to the contact details rather than opening a form.
- Preferred dates allow today or later in IST; past dates cannot be selected or submitted through the form.
- If `"formEndpoint"` in `"settings"` is empty, enquiries are saved to the site's Lovable Cloud database.
- To use a form service instead (needed for purely static hosting such as GitHub Pages), create a form at
  a service like Formspree and paste its address: `"formEndpoint": "https://formspree.io/f/xxxxabcd"`.

## 8. Check your change

Run `bun run dev` and open http://localhost:8080 — or simply look at the Lovable preview.
Optional: `bunx vitest run` checks the content rules (full name, hidden placeholders, no employer name).

## 9. Resume, saved contact and disclaimer

- Put `Resume.pdf` and `contact.vcf` in `public/assets/downloads/` (capitalisation matters).
- A ready-to-copy vCard block is in `contact.vcf.example.txt` there. Copy only BEGIN:VCARD through END:VCARD,
  check your details, and save as `contact.vcf`. Add your real phone only if you want it in the saved contact.
- In `settings.downloads`, each download has `enabled`, `url`, `label` and `contactLabel`.
  Both are disabled now because the actual PDF and vCard have not been supplied. Enable only after uploading.
- `settings.disclaimer.enabled` shows/hides the footer note. Edit `settings.disclaimer.text` to change the wording.
  The current text is suggested wording, not a legal statement supplied by you.

## 10. Speaking and media lists

- Every “Invite Me to Speak” button opens a form with Speaking Opportunities selected.
- Add past talks to `speaking.past` using fields `event`, `talk`, `date`, `year`, `location`, `url`, `sample`.
  Keep `year` as quoted text, e.g. `"2026"`. The list is hidden when empty; filters appear when it contains entries.
- Media entries require `group: "Press"` or `group: "Features"`. Edit the tab names in `media.groups`.
- Media search appears after six total entries. Each tab shows six entries before “More coverage +”.
- Other long lists show five entries before “Show more +”. Entries remain in the order written here.
- The `ui` block holds the labels for search, filters, copy buttons, downloads and expandable lists.

## Changing the two top images
- **Background:** put your image in `public/images/` and set `person.backgroundImage` (e.g. `"/images/my-background.jpg"`). Wide 1920×1088 works best; keep the left side darker for text.
- **Portrait:** put a background-removed PNG/WEBP in `public/` and set `person.photo`, then update `photoWidth`/`photoHeight` to its pixel size.

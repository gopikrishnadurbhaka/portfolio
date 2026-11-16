# Dr. Gopi Krishna Durbhaka — Portfolio Website

Engineering Intelligence for the Physical & Industrial World.

Built with React + TypeScript (TanStack Start), Tailwind CSS v4 and Lovable Cloud (contact form storage).

## Folder structure

```
src/
  content/
    content.ts         ← ALL website text, links, contact details and image paths (edit this one file)
    README-content.md  ← plain-language editing guide
    navigation.ts      ← menu items (section anchors + standalone pages)
    types.ts           ← shape of content.ts (no need to edit)
  components/site/     ← presentation only — reads everything from content.ts
  routes/              ← "/" is the single scrolling page; /about, /research, … are shareable section pages
  lib/                 ← contact form validation + server function, SEO helper
public/
  profile.jpg          ← original portrait (1290 × 1913)
  profile-cutout.webp  ← same portrait with the background removed (shown on the site)
  images/              ← headline background and expertise pictures
```

## Run locally

```
bun install
bun run dev        # http://localhost:8080
bunx vitest run    # content-rule & form tests
```

## Updating content

Open `src/content/content.ts` and follow `src/content/README-content.md`. In short:

- Change only the text between quotes; empty text (`""`) is hidden.
- Add items by copying a `{ ... }` block in the same list.
- `"sample": true` marks placeholders; they stay hidden while `settings.showDraftNote` is `false` (current setting).
- `contact.showPhone` (default `false`) controls whether the phone number appears.
- Pictures are paths from `public/`, e.g. `/images/expertise/aiot.jpg`.

## Contact enquiries

With `settings.formEndpoint` empty, form submissions are validated on the server and stored in the Lovable Cloud
database (`contact_enquiries` table). A success message is only shown when the enquiry is actually saved.
Setting `formEndpoint` to a form-service URL (e.g. Formspree) sends submissions there instead.

## Hosting

- **Lovable:** click Publish — everything, including the database-backed form, works.
- **Your own host via GitHub:** connect the project to GitHub from Lovable, then deploy the repo.
  The app is a TanStack Start server app (Cloudflare Worker target by default; `bun run build`).
  - Cloudflare Workers / Netlify / Vercel: set `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
    and `VITE_SUPABASE_*` environment variables for the built-in form. For Netlify/Vercel switch the TanStack Start
    deployment preset per its hosting docs.
  - Static-only hosting (GitHub Pages): the built-in server form cannot run there — set `settings.formEndpoint`
    to a form-service URL.

## SEO

Every page sets its own title, description and Open Graph tags. The home page includes Person schema (JSON-LD). `/sitemap.xml` is generated automatically from the navigation; `public/robots.txt` allows all crawlers.

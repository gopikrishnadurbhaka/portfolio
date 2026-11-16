<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Project rules

- All site copy, contact details, links and image paths live in the single object `src/content/content.ts` (typed by `types.ts`, guide in `README-content.md`); components in `src/components/site/` only render it. Why: the owner edits one file, mirroring his own content.js, without touching presentation code.
- `/` renders every section in one scrolling page; header menu items are plain anchors to `/#section` with scroll-spy active state (TanStack `Link` would mark every item active on `/`), and the URL hash is updated only on `scrollend`. Each section also keeps its own route file for SEO and sharing. Why: owner wants single-page scrolling plus shareable section URLs.
- Contact form submits through `submitEnquiry` (createServerFn) which validates with the shared zod schema and inserts via the admin client into `contact_enquiries` (RLS on, no anon/auth policies). Why: no public read/write surface; success is shown only after a confirmed insert.
- Unverified or placeholder records carry `sample: true` instead of being deleted; they render with a tag only while `settings.showDraftNote` is true (false for the finished site) and are hidden otherwise; the phone shows only when `contact.showPhone` is true, via `visiblePhone`; `src/test/content-rules.test.ts` guards this. Why: the owner's own content model.
- Images the content file references live in `public/` as plain paths, not bundled imports. Why: the owner edits paths as text and may host elsewhere.
- A non-empty `settings.formEndpoint` makes the contact form POST to that external service; empty uses `submitEnquiry`. Why: lets static hosting work without weakening the Cloud path.
- Shared portfolio controls render content-configured downloads and speaking dialogs; dialogs reuse ContactForm with a speaking default. Why: every invitation follows the same validated form flow.
- Gate all enquiry forms and scheduling triggers with the shared content setting; keep IST calendar-date checks in a browser-safe helper and theme the inline form with scoped semantic tokens. Why: hosting switches cannot leave another form entry point open, and date/theme behaviour stays consistent without changing submission storage.
- Portfolio list filtering and limits live in browser-safe pure helpers with tests; repeated content lists use five-item disclosure, engagements use three, and media uses six per tab; past engagements sort descending by optional ISO sortDate or year, with year-only records after dated records in that year. Why: compact chronological lists without inventing missing dates or dropping owner content.

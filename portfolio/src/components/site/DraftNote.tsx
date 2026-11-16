import { site } from "@/lib/content";

/** Shown only while settings.showDraftNote is true in content.ts. */
export function DraftNote() {
  if (!site.settings.showDraftNote) return null;
  return (
    <div role="note" className="border-b border-dashed border-gold/50 bg-gold/10 px-4 py-2 text-center text-xs text-foreground">
      Draft preview — items tagged <span className="font-semibold">Sample</span> are placeholders and will be hidden when the content is marked final.
    </div>
  );
}

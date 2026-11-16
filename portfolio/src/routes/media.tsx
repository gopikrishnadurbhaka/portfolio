import { createFileRoute } from "@tanstack/react-router";

import { MediaSection } from "@/components/site/sections";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/media")({
  head: () => ({
    meta: pageMeta(
      "Media",
      "Dr. Gopi Krishna Durbhaka featured in TheCconnects, India Prime Times and IEEE Innovation Spotlight.",
    ),
  }),
  component: Page,
});

function Page() {
  return <MediaSection standalone />;
}

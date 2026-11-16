import { createFileRoute } from "@tanstack/react-router";

import { PodcastSection } from "@/components/site/sections";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/podcast")({
  head: () => ({
    meta: pageMeta(
      "Podcast",
      "Conversations on industrial AI, predictive maintenance and engineering intelligence with Dr. Gopi Krishna Durbhaka.",
    ),
  }),
  component: Page,
});

function Page() {
  return <PodcastSection standalone />;
}

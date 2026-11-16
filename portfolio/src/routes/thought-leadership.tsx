import { createFileRoute } from "@tanstack/react-router";

import { ThoughtSection } from "@/components/site/sections";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/thought-leadership")({
  head: () => ({
    meta: pageMeta(
      "Thought Leadership",
      "Interviews and articles by and about Dr. Gopi Krishna Durbhaka on engineering intelligence, industrial AI and predictive maintenance.",
    ),
  }),
  component: Page,
});

function Page() {
  return <ThoughtSection standalone />;
}

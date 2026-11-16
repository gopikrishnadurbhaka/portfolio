import { createFileRoute } from "@tanstack/react-router";

import { PatentsSection } from "@/components/site/sections";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/patents")({
  head: () => ({
    meta: pageMeta(
      "Patents",
      "Granted patents in India and the United States covering smart fabric, industrial valve monitoring with NFC and test optimisation.",
    ),
  }),
  component: Page,
});

function Page() {
  return <PatentsSection standalone />;
}

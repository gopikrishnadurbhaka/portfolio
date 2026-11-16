import { createFileRoute } from "@tanstack/react-router";

import { SpeakingSection } from "@/components/site/sections";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/speaking")({
  head: () => ({
    meta: pageMeta(
      "Speaking",
      "Keynotes, tutorials, panels and webinars on industrial AI, AIoT, predictive maintenance and the future of intelligent industries.",
    ),
  }),
  component: Page,
});

function Page() {
  return <SpeakingSection standalone />;
}

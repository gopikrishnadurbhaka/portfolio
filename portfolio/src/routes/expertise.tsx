import { createFileRoute } from "@tanstack/react-router";

import { ExpertiseSection } from "@/components/site/sections";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/expertise")({
  head: () => ({
    meta: pageMeta(
      "Expertise",
      "Industrial AI, AIoT systems, predictive maintenance, edge AI, signal & vibration analytics, smart sensors and cloud data platforms.",
    ),
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <ExpertiseSection standalone />
    </>
  );
}

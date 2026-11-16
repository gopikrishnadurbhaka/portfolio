import { createFileRoute } from "@tanstack/react-router";

import { ResearchSection } from "@/components/site/sections";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: pageMeta(
      "Research",
      "Selected publications in IEEE, ACM, Springer and CMC, plus research in prognostics & health management and wind turbine drivetrain reliability.",
    ),
  }),
  component: Page,
});

function Page() {
  return <ResearchSection standalone />;
}

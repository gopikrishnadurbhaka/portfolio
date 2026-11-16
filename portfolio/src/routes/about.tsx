import { createFileRoute } from "@tanstack/react-router";

import { AboutSection } from "@/components/site/sections";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: pageMeta(
      "About",
      "Biography, education and professional memberships of Dr. Gopi Krishna Durbhaka — Senior Member IEEE, Fellow ISECE, Ph.D. in Electronics Engineering.",
    ),
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <AboutSection standalone />
    </>
  );
}

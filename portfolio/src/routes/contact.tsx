import { createFileRoute } from "@tanstack/react-router";

import { ContactSection } from "@/components/site/sections";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: pageMeta(
      "Contact",
      "Contact Dr. Gopi Krishna Durbhaka by email or enquiry form for advisory, speaking invitations, research collaboration and media interviews.",
    ),
  }),
  component: Page,
});

function Page() {
  return <ContactSection standalone />;
}

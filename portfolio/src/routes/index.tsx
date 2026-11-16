import { createFileRoute } from "@tanstack/react-router";

import { SpeakerStrip } from "@/components/site/SpeakerBanner";
import {
  AboutSection,
  ContactSection,
  CredibilityStrip,
  ExpertiseSection,
  HeroSection,
  MediaSection,
  PatentsSection,
  PodcastSection,
  ResearchSection,
  SpeakingSection,
  ThoughtSection,
} from "@/components/site/sections";
import { hasText, site } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.person.name,
  honorificPrefix: "Dr.",
  description: site.person.tagline,
  knowsAbout: site.person.tags,
  memberOf: site.about.memberships,
  email: hasText(site.contact.email) ? site.contact.email : undefined,
  address: hasText(site.contact.location) ? site.contact.location : undefined,
  sameAs: [...site.contact.links.map((l) => l.url), site.research.orcidUrl].filter(hasText),
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: pageMeta(
      site.person.name,
      "Engineering Intelligence for the Physical & Industrial World. Researcher, innovator and AI strategist in Industrial AI, AIoT and predictive maintenance.",
    ),
    scripts: [{ type: "application/ld+json", children: JSON.stringify(personSchema) }],
  }),
  component: Home,
});

/** The single scrolling page: every section in menu order. */
function Home() {
  return (
    <>
      <SpeakerStrip />
      <HeroSection />
      <CredibilityStrip />
      <AboutSection />
      <ExpertiseSection />
      <ThoughtSection />
      <ResearchSection />
      <PatentsSection />
      <SpeakingSection />
      <MediaSection />
      <PodcastSection />
      <ContactSection />
    </>
  );
}

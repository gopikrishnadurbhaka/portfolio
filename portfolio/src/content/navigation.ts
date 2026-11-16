/**
 * Menu items. `id` is the section on the single scrolling home page (#id);
 * `to` is the same section as its own page (shareable link, used in the footer and sitemap).
 */
export const navItems = [
  { id: "top", to: "/", label: "Home" },
  { id: "about", to: "/about", label: "About" },
  { id: "expertise", to: "/expertise", label: "Expertise" },
  { id: "thought-leadership", to: "/thought-leadership", label: "Thought Leadership" },
  { id: "research", to: "/research", label: "Research" },
  { id: "patents", to: "/patents", label: "Patents" },
  { id: "speaking", to: "/speaking", label: "Speaking" },
  { id: "media", to: "/media", label: "Media" },
  { id: "podcast", to: "/podcast", label: "Podcast" },
  { id: "contact", to: "/contact", label: "Contact" },
] as const;

export type SectionId = (typeof navItems)[number]["id"] | "advisory";

/**
 * Shape of content.ts. You normally never need to edit this file.
 * If you add a field here, the site will not show it until a component renders it.
 */

export type Link = { label: string; url: string };

/** `sample: true` = placeholder. Shown with a dashed tag while settings.showDraftNote is true, hidden when false. */
export type Sampleable = { sample?: boolean; sampleLabel?: string };

export type SiteContent = {
  settings: {
    /** true = show the "draft preview" note and entries marked sample. Set to false when content is final. */
    showDraftNote: boolean;
    /** false hides the Schedule button and all enquiry forms; contact details remain visible. */
    scheduleEnabled: boolean;
    /** Optional Formspree (or similar) address. Empty = messages are saved in the Lovable Cloud database. */
    formEndpoint: string;
    downloads: Record<"resume" | "contact", { enabled: boolean; url: string; label: string; contactLabel: string }>;
    disclaimer: { enabled: boolean; text: string };
  };
  ui: {
    showMore: string; showLess: string; moreEngagements: string; moreCoverage: string;
    searchEngagements: string; searchCoverage: string; allYears: string; clearFilters: string;
    noResults: string; copy: string; copied: string; copyFailed: string; getInTouch: string;
    speakingTopic: string;
  };
  person: {
    name: string;
    tagline: string;
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    lead: string;
    tags: string[];
    badges: { title: string; text: string }[];
    primaryButton: { label: string; href: string };
    secondaryButton: { label: string; href: string };
    photo: string;
    photoWidth: number;
    photoHeight: number;
    photoAlt: string;
    backgroundImage: string;
    verticalText: string;
  };
  contact: {
    kicker: string;
    title: string;
    text: string;
    email: string;
    phone: string;
    /** true = show the phone number on the site. false (default) = keep it hidden. */
    showPhone: boolean;
    location: string;
    links: { label: string; text: string; url: string }[];
  };
  credibility: { title: string; text: string }[];
  about: {
    kicker: string;
    title: string;
    paragraphs: string[];
    memberships: string[];
    education: string[];
    interests: string[];
    buttonLabel: string;
    buttonUrl: string;
    roles: { title: string; text: string }[];
  };
  expertise: {
    kicker: string;
    title: string;
    cards: { title: string; text: string; image: string }[];
  };
  thought: {
    kicker: string;
    title: string;
    text: string;
    buttonLabel: string;
    buttonUrl: string;
    featured: Sampleable & {
      label: string;
      title: string;
      text: string;
      source: string;
      edition: string;
      url: string;
      tileTitle: string;
      tileText: string;
    };
    articles: (Sampleable & { date: string; source: string; title: string; text: string; url: string })[];
  };
  research: {
    kicker: string;
    title: string;
    text: string;
    profiles: Link[];
    orcidUrl: string;
    orcidLabel: string;
    publications: (Sampleable & { venue: string; year: string; title: string; authors: string; url: string })[];
    areas: { title: string; text: string }[];
    projects: { title: string; text: string }[];
  };
  patents: {
    kicker: string;
    title: string;
    text: string;
    buttonLabel: string;
    buttonUrl: string;
    items: (Sampleable & { status: string; title: string; number: string; year: string; url: string })[];
  };
  speaking: {
    kicker: string;
    title: string;
    text: string;
    buttonLabel: string;
    buttonUrl: string;
    image: string;
    formats: { title: string; text: string }[];
    upcomingTitle: string;
    pastTitle: string;
    past: (Sampleable & { event: string; talk: string; date: string; year: string; sortDate?: string; location: string; url: string })[];
    upcoming: (Sampleable & { event: string; talk: string; date: string; location: string; url: string })[];
  };
  media: {
    kicker: string;
    title: string;
    groups: { value: "Press" | "Features"; label: string }[];
    items: (Sampleable & { group: "Press" | "Features"; outlet: string; type: string; date: string; text: string; url: string })[];
  };
  podcast: {
    kicker: string;
    title: string;
    text: string;
    episodes: (Sampleable & {
      title: string;
      date: string;
      duration: string;
      description: string;
      audio: string;
      aiVoiced: boolean;
      transcriptLabel: string;
      transcriptUrl: string;
      links: Link[];
    })[];
  };
  advisory: {
    kicker: string;
    title: string;
    text: string;
    buttonLabel: string;
    bookingUrl: string;
    timezoneNote: string;
    timeSlots: string[];
    offers: { title: string; text: string }[];
  };
};

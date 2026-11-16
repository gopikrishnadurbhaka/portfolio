import { describe, expect, it } from "vitest";
import { SITE_CONTENT } from "@/content/content";
import { descendingEngagements, ENGAGEMENT_LIMIT, firstItems, matchingCoverage, matchingEngagements } from "@/lib/portfolio-lists";

describe("portfolio display rules", () => {
  it("limits long lists to five and expands all entries", () => {
    expect(firstItems([1, 2, 3, 4, 5, 6, 7], false)).toEqual([1, 2, 3, 4, 5]);
    expect(firstItems([1, 2, 3, 4, 5, 6, 7], true)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });
  it("limits media to six entries", () => {
    expect(firstItems([1, 2, 3, 4, 5, 6, 7], false, 6)).toEqual([1, 2, 3, 4, 5, 6]);
  });
  it("keeps the exact requested download filenames", () => {
    expect(SITE_CONTENT.settings.downloads.resume.url).toBe("/assets/downloads/Resume.pdf");
    expect(SITE_CONTENT.settings.downloads.contact.url).toBe("/assets/downloads/contact.vcf");
  });
  it("includes the five supplied past engagements in descending date order", () => {
    const entries = descendingEngagements([...SITE_CONTENT.speaking.past].reverse());
    expect(entries.map((e) => e.date)).toEqual(["11–12 Apr 2018", "24 Feb 2017", "12 Jan 2017", "2017", "2009"]);
    expect(entries[3]?.sortDate).toBeUndefined();
  });
  it("shows three engagements initially and all five when expanded", () => {
    expect(ENGAGEMENT_LIMIT).toBe(3);
    expect(firstItems(SITE_CONTENT.speaking.past, false, ENGAGEMENT_LIMIT)).toHaveLength(3);
    expect(firstItems(SITE_CONTENT.speaking.past, true, ENGAGEMENT_LIMIT)).toHaveLength(5);
  });
  it("filters past engagements by both year and case-insensitive search", () => {
    const entries = [
      { year: "2026", event: "Engineering forum", talk: "Industrial AI", location: "Hyderabad", date: "Nov 2026" },
      { year: "2025", event: "Engineering forum", talk: "Industrial AI", location: "Delhi", date: "Nov 2025" },
    ];
    expect(matchingEngagements(entries, "2026", "AI")).toEqual([entries[0]]);
    expect(matchingEngagements(entries, "2026", "Delhi")).toEqual([]);
    expect(matchingEngagements(entries, "", "")).toHaveLength(2);
  });
  it("groups India Prime Times under Press and the other features under Features", () => {
    expect(matchingCoverage(SITE_CONTENT.media.items, "Press", "").map((e) => e.outlet)).toEqual(["India Prime Times"]);
    expect(matchingCoverage(SITE_CONTENT.media.items, "Features", "").map((e) => e.outlet)).toEqual(["TheCconnects", "IEEE Innovation Spotlight", "IEEE Innovation Spotlight"]);
  });
  it("searches media within the selected group", () => {
    expect(matchingCoverage(SITE_CONTENT.media.items, "Features", " SMART FABRIC ").map((e) => e.outlet)).toEqual(["IEEE Innovation Spotlight"]);
    expect(matchingCoverage(SITE_CONTENT.media.items, "Press", "SMART FABRIC")).toEqual([]);
  });
});
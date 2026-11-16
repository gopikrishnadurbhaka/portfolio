import { describe, expect, it } from "vitest";

import { SITE_CONTENT } from "@/content/content";
import { visibleItems, visiblePhone } from "@/lib/content";
import { contactSchema } from "@/lib/contact-schema";

describe("content rules", () => {
  it("includes the owner's B.E. Electronics & Communication degree", () => {
    expect(SITE_CONTENT.about.education).toContain("B.E. Electronics & Communication");
  });
  it("does not show the owner's employer or job title anywhere (personal portfolio)", () => {
    const text = JSON.stringify(SITE_CONTENT);
    expect(text).not.toContain("Happiest Minds");
    expect(text).not.toContain("Principal Data Scientist");
    expect(SITE_CONTENT.contact).not.toHaveProperty("organisation");
    expect(SITE_CONTENT.contact).not.toHaveProperty("designation");
  });

  it("keeps the AStraw filing marked as a sample (status unconfirmed)", () => {
    const astraw = SITE_CONTENT.patents.items.find((p) => p.title.includes("AStraw"));
    expect(astraw?.sample).toBe(true);
  });

  it("hides sample entries once the draft note is switched off", () => {
    const finalPatents = visibleItems(SITE_CONTENT.patents.items, false);
    expect(finalPatents.some((p) => p.title.includes("AStraw"))).toBe(false);
    expect(finalPatents).toHaveLength(4);
  });

  it("shows sample entries (with their tag) while the draft note is on", () => {
    expect(visibleItems(SITE_CONTENT.patents.items, true).some((p) => p.title.includes("AStraw"))).toBe(true);
  });

  it("ships as a finished site: no draft note, so sample placeholders are hidden", () => {
    expect(SITE_CONTENT.settings.showDraftNote).toBe(false);
    expect(visibleItems(SITE_CONTENT.patents.items).some((p) => p.sample)).toBe(false);
  });

  it("hides the phone number by default", () => {
    expect(SITE_CONTENT.contact.showPhone).toBe(false);
    expect(visiblePhone(SITE_CONTENT.contact)).toBe("");
  });

  it("shows the phone number when showPhone is switched on", () => {
    expect(visiblePhone({ phone: "+91 98765 43210", showPhone: true })).toBe("+91 98765 43210");
    expect(visiblePhone({ phone: "", showPhone: true })).toBe("");
  });

  it("uses the background-removed cut-out of the owner's portrait at 1290 x 1913", () => {
    expect(SITE_CONTENT.person.photo).toBe("/profile-cutout.webp");
    expect([SITE_CONTENT.person.photoWidth, SITE_CONTENT.person.photoHeight]).toEqual([1290, 1913]);
  });

  it("uses the exact full name", () => {
    expect(SITE_CONTENT.person.name).toBe("Dr. Gopi Krishna Durbhaka");
  });
});

describe("contact form validation", () => {
  const valid = { name: "A Visitor", email: "visitor@example.com", enquiryType: "speaking", message: "Would you speak at our event?" };

  it("accepts a complete enquiry", () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });

  it("accepts a preferred date plus IST time slot", () => {
    expect(contactSchema.safeParse({ ...valid, preferredTimeIst: "2026-12-01, 09:00 - 11:00 IST" }).success).toBe(true);
  });

  it("rejects an invalid email", () => {
    expect(contactSchema.safeParse({ ...valid, email: "not-an-email" }).success).toBe(false);
  });

  it("rejects submissions that fill the hidden spam-trap field", () => {
    expect(contactSchema.safeParse({ ...valid, website: "spam.example" }).success).toBe(false);
  });
});

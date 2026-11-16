import { SITE_CONTENT } from "@/content/content";
import type { Sampleable } from "@/content/types";

/** Entries marked `sample: true` are only shown while the draft note is on. */
export function visibleItems<T extends Sampleable>(items: readonly T[], showDrafts = SITE_CONTENT.settings.showDraftNote): T[] {
  return items.filter((item) => showDrafts || !item.sample);
}

export function hasText(value: string | undefined | null): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

/** The phone number, or "" when contact.showPhone is off (the default). */
export function visiblePhone(contact: { phone: string; showPhone?: boolean }): string {
  return contact.showPhone && hasText(contact.phone) ? contact.phone : "";
}

export const site = SITE_CONTENT;

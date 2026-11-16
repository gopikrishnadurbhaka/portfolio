export const LIST_LIMIT = 5;
export const MEDIA_LIMIT = 6;
export const ENGAGEMENT_LIMIT = 3;

/** Year-only entries follow fully dated entries in that year, without inventing a date. */
export function descendingEngagements<T extends { year: string; sortDate?: string }>(items: readonly T[]): T[] {
  return [...items].sort((a, b) => (b.sortDate || b.year).localeCompare(a.sortDate || a.year));
}

export function firstItems<T>(items: readonly T[], expanded: boolean, limit = LIST_LIMIT): T[] {
  return expanded ? [...items] : items.slice(0, limit);
}

export function matchingEngagements<T extends { year: string; event: string; talk: string; location: string; date: string }>(items: readonly T[], year: string, search: string): T[] {
  const query = search.trim().toLocaleLowerCase();
  return items.filter((e) => (!year || e.year === year) && [e.event, e.talk, e.location, e.date, e.year].join(" ").toLocaleLowerCase().includes(query));
}

export function matchingCoverage<T extends { group: string; outlet: string; type: string; text: string; date: string }>(items: readonly T[], group: string, search: string): T[] {
  const query = search.trim().toLocaleLowerCase();
  return items.filter((e) => e.group === group && [e.outlet, e.type, e.text, e.date].join(" ").toLocaleLowerCase().includes(query));
}
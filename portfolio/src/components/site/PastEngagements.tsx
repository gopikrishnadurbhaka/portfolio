import { CalendarDays, Search, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { site, visibleItems } from "@/lib/content";
import { descendingEngagements, ENGAGEMENT_LIMIT, firstItems, matchingEngagements } from "@/lib/portfolio-lists";
import { MoreButton } from "./PortfolioControls";
import { SmartLink } from "./SmartLink";

export function PastEngagements() {
  const items = descendingEngagements(visibleItems(site.speaking.past));
  const [year, setYear] = useState("");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState(false);
  if (!items.length) return null;
  const filtered = matchingEngagements(items, year, search);
  return <div>
    <div className="my-5 flex flex-wrap items-center gap-3">
      <select aria-label={site.ui.allYears} value={year} onChange={(e) => { setYear(e.target.value); setExpanded(false); }} className="h-9 rounded-md border border-input bg-card px-3 text-sm text-foreground">
        <option value="">{site.ui.allYears}</option>{[...new Set(items.map((e) => e.year))].sort().reverse().map((y) => <option key={y}>{y}</option>)}
      </select>
      <div className="relative min-w-48 flex-1"><Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" /><Input aria-label={site.ui.searchEngagements} placeholder={site.ui.searchEngagements} value={search} onChange={(e) => { setSearch(e.target.value); setExpanded(false); }} className="pl-9" /></div>
      <Button variant="ghost" size="sm" onClick={() => { setYear(""); setSearch(""); setExpanded(false); }}><X />{site.ui.clearFilters}</Button>
    </div>
    <ul className="divide-y divide-border border-y border-border">{firstItems(filtered, expanded, ENGAGEMENT_LIMIT).map((e, i) => <li key={e.event + e.date + i} className="flex items-start gap-3 py-4">
      <CalendarDays className="mt-1 size-5 shrink-0 text-gold-strong" /><div className="min-w-0 flex-1"><p className="text-sm text-muted-foreground">{e.date}{e.location && ` · ${e.location}`}</p><h4 className="font-display text-xl text-primary">{e.event}</h4><p className="text-sm text-muted-foreground">{e.talk}</p></div>{e.url && <SmartLink href={e.url} className="text-sm text-primary underline underline-offset-4">{e.event}</SmartLink>}
    </li>)}</ul>
    {!filtered.length && <p role="status" className="py-5 text-muted-foreground">{site.ui.noResults}</p>}
    <MoreButton count={filtered.length} limit={ENGAGEMENT_LIMIT} expanded={expanded} onToggle={() => setExpanded(!expanded)} />
  </div>;
}
/**
 * All page sections. Each one reads its text from src/content/content.ts.
 * `standalone` = rendered as its own page (/about, /research …) instead of inside the single scrolling home page.
 */
import { CalendarDays, Compass, FlaskConical, Activity, Award, BookOpen, BrainCircuit, Cloud, Cpu, Factory, GraduationCap, Linkedin, Mic, Radio, Search, Users, Wrench, ArrowRight, ArrowUpRight, FileText, Mail, MapPin, Phone } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ENGAGEMENT_LIMIT, firstItems, matchingCoverage } from "@/lib/portfolio-lists";
import { CopyButton, DownloadLinks, MoreButton, SpeakButton } from "./PortfolioControls";
import { PastEngagements } from "./PastEngagements";
import { hasText, site, visibleItems, visiblePhone } from "@/lib/content";
import { cn } from "@/lib/utils";

import { ContactForm } from "./ContactForm";
import { PageHeader, SectionHeading } from "./PageHeader";
import { SmartLink } from "./SmartLink";
import { SpeakerCarousel } from "./SpeakerBanner";

type SectionProps = { standalone?: boolean | undefined };

const roleIcons = [BookOpen, Award, BrainCircuit, Mic];
const expertiseIcons = [Factory, Radio, Wrench, Cpu, Activity, Radio, Cloud];
const formatIcons = [Mic, GraduationCap, Users, Radio];
function TileIcon({ index, icons = roleIcons, dark = false }: { index: number; icons?: typeof roleIcons; dark?: boolean }) {
  const Icon = icons[index % icons.length] ?? BookOpen;
  return <Icon aria-hidden="true" className={cn("size-6", dark ? "text-gold-bright" : "text-gold-strong")} />;
}
function useList<T>(items: readonly T[], limit = 5) {
  const [expanded, setExpanded] = useState(false);
  return { items: firstItems(items, expanded, limit), more: <MoreButton count={items.length} limit={limit} expanded={expanded} onToggle={() => setExpanded(!expanded)} /> };
}

export function SampleTag({ item, tone = "light" }: { item: { sample?: boolean; sampleLabel?: string }; tone?: "light" | "dark" }) {
  if (!item.sample) return null;
  return (
    <span
      className={cn(
        "eyebrow inline-block rounded-sm border border-dashed px-2 py-0.5 text-[0.58rem]",
        tone === "dark" ? "border-gold/60 text-gold" : "border-gold text-gold",
      )}
    >
      {item.sampleLabel || "Sample"}
    </span>
  );
}

function SectionShell({
  id,
  kicker,
  title,
  intro,
  standalone,
  surface,
  actions,
  children,
}: {
  id: string;
  kicker: string;
  title: string;
  intro?: string | undefined;
  standalone?: boolean | undefined;
  surface?: boolean | undefined;
  actions?: ReactNode;
  children: ReactNode;
}) {
  if (standalone) {
    return (
      <>
        <PageHeader eyebrow={kicker} title={title} intro={intro}>
          {actions}
        </PageHeader>
        <section className="section-y">
          <div className="container-page">{children}</div>
        </section>
      </>
    );
  }
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn("section-y scroll-mt-10 lg:scroll-mt-[4.5rem]", surface && "bg-surface")}>
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow={kicker} title={title} intro={intro} titleId={`${id}-title`} />
          {actions}
        </div>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ Hero */

export function PortraitSlot() {
  const p = site.person;
  const [missing, setMissing] = useState(!hasText(p.photo));
  const imgRef = useRef<HTMLImageElement>(null);

  // The image can fail before hydration attaches onError, so re-check once mounted.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setMissing(true);
  }, []);

  const ratio = { aspectRatio: `${p.photoWidth} / ${p.photoHeight}` };
  if (!missing) {
    return (
      <div className="relative mx-auto w-full max-w-sm sm:max-w-md lg:max-w-none">
        <div className="portrait-glow pointer-events-none absolute -inset-x-[12%] -top-[4%] bottom-[6%]" aria-hidden="true" />
        <img
          ref={imgRef}
          src={p.photo}
          width={p.photoWidth}
          height={p.photoHeight}
          alt={p.photoAlt}
          onError={() => setMissing(true)}
          fetchPriority="high"
          style={ratio}
          className="portrait-cutout relative mx-auto block h-auto max-h-[36rem] w-auto max-w-full object-contain object-bottom lg:max-h-[46rem]"
        />
      </div>
    );
  }
  return (
    <div style={ratio} className="mx-auto flex w-full max-w-xs flex-col items-center justify-end rounded-lg bg-navy-foreground/5 p-8 text-center">
      <p className="eyebrow text-[0.6rem] text-navy-muted">Professional portrait</p>
      <p className="mt-2 text-sm text-navy-muted">To be added</p>
    </div>
  );
}

export function HeroSection() {
  const p = site.person;
  return (
    <section id="top" aria-label="Introduction" className="relative overflow-hidden bg-navy-deep text-navy-foreground">
      {hasText(p.backgroundImage) && (
        <img src={p.backgroundImage} alt="" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover" />
      )}
      <div className="bg-hero-overlay absolute inset-0" aria-hidden="true" />
      {hasText(p.verticalText) && (
        <p
          aria-hidden="true"
          className="eyebrow absolute right-4 top-1/2 hidden -translate-y-1/2 text-[0.6rem] text-navy-muted/70 [writing-mode:vertical-rl] 2xl:block"
        >
          {p.verticalText}
        </p>
      )}
      <div className="container-page relative grid items-end gap-10 pb-28 pt-16 md:pb-32 lg:min-h-[44rem] lg:grid-cols-[1.25fr_1fr] lg:pt-20">
        <div className="self-center">
          <p className="kicker animate-rise text-gold-bright">{p.eyebrow}</p>
          <h1 className="animate-rise mt-6 text-[2.6rem] font-medium leading-[0.98] sm:text-6xl lg:text-[5.2rem]">
            {p.titleLine1}
            <br />
            {p.titleLine2}
          </h1>
          <p className="animate-rise mt-4 font-display text-2xl italic text-gold-soft md:text-3xl">{p.subtitle}</p>
          <p className="animate-rise mt-7 max-w-xl text-lg leading-relaxed text-navy-muted">{p.lead}</p>
          <ul className="animate-rise mt-7 flex max-w-xl flex-wrap gap-2">
            {p.tags.map((t) => (
              <li key={t} className="rounded-sm border border-navy-foreground/20 bg-navy-deep/40 px-3 py-1.5 text-xs font-medium tracking-wide text-navy-foreground">
                {t}
              </li>
            ))}
          </ul>
          <div className="animate-rise mt-9 flex flex-wrap gap-3">
            <Button asChild variant="gold" size="xl">
              <SmartLink href={p.primaryButton.href}>
                {p.primaryButton.label} <ArrowRight />
              </SmartLink>
            </Button>
            <SpeakButton variant="onNavy" size="xl" label={p.secondaryButton.label} />
          </div>
          <DownloadLinks dark />
          {p.badges.length > 0 && (
            <dl className="animate-rise mt-10 grid max-w-2xl grid-cols-2 gap-x-6 gap-y-4 border-t border-navy-foreground/15 pt-6 sm:grid-cols-3 lg:grid-cols-5">
              {p.badges.map((b) => (
                <div key={b.title + b.text}>
                  <dt className="font-display text-xl text-gold-soft">{b.title}</dt>
                  <dd className="mt-0.5 text-xs leading-snug text-navy-muted">{b.text}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
        <div className="animate-rise -mb-28 flex justify-center self-end md:-mb-32 lg:justify-end">
          <PortraitSlot />
        </div>
      </div>
    </section>
  );
}

export function CredibilityStrip() {
  return (
    <section aria-label="Professional highlights" className="relative z-10 -mt-10 md:-mt-10">
      <div className="container-page">
        <div className="grid overflow-hidden rounded-lg border border-border bg-card shadow-lift sm:grid-cols-2 lg:grid-cols-4">
          {site.credibility.map((m, i) => (
            <div
              key={m.title}
              className={cn(
                "p-5 md:p-6",
                i > 0 && "border-t border-border sm:border-t-0",
                i % 2 === 1 && "sm:border-l",
                i >= 2 && "sm:border-t lg:border-t-0",
                i > 0 && "lg:border-l",
              )}
            >
              <p className="font-display text-2xl font-medium leading-tight text-primary md:text-3xl">{m.title}</p>
              <p className="mt-2 text-sm leading-snug text-muted-foreground">{m.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- About */

export function AboutSection({ standalone }: SectionProps) {
  const a = site.about;
  return (
    <SectionShell id="about" kicker={a.kicker} title={a.title} standalone={standalone}>
      <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:gap-12">
        <div className="space-y-6 text-lg leading-relaxed text-foreground/85">
          {a.paragraphs.map((p, i) => (
            <p key={i} className="text-lg leading-relaxed">
              {p}
            </p>
          ))}
          {hasText(a.buttonUrl) && (
            <Button asChild variant="navyOutline" className="mt-2">
              <SmartLink href={a.buttonUrl}>
                {a.buttonLabel} <ArrowUpRight />
              </SmartLink>
            </Button>
          )}
        </div>
        <aside className="space-y-10">
          <div>
            <p className="kicker text-gold-strong">Education</p>
            <ul className="mt-4 divide-y divide-border border-y border-border">
              {a.education.map((e) => (
                <li key={e} className="py-3.5 text-foreground">
                  {e}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="kicker text-gold-strong">Professional memberships</p>
            <ul className="mt-4 space-y-2.5">
              {a.memberships.map((m) => (
                <li key={m} className="flex items-center gap-3 text-foreground">
                  <span className="size-1.5 rotate-45 bg-gold" aria-hidden="true" />
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
      <div className="mt-10">
        <p className="kicker text-gold-strong">Research & professional interests</p>
        <ul className="mt-5 flex flex-wrap gap-2.5">
          {a.interests.map((t) => (
            <li key={t} className="rounded-sm border border-border bg-card px-4 py-2 text-sm text-foreground">
              {t}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-10 grid gap-px overflow-hidden rounded-lg bg-border sm:grid-cols-2 lg:grid-cols-4">
        {a.roles.map((card, i) => (
          <div key={card.title} className="reveal bg-card p-5">
            <TileIcon index={i} />
            <h3 className="mt-4 text-2xl font-medium text-primary">{card.title}</h3>
            <p className="mt-2 text-muted-foreground">{card.text}</p>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

/* ------------------------------------------------------------- Expertise */

export function ExpertiseSection({ standalone }: SectionProps) {
  const e = site.expertise;
  const cards = useList(e.cards);
  return (
    <SectionShell id="expertise" kicker={e.kicker} title={e.title} standalone={standalone} surface>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
        {cards.items.map((item, i) => {
          const span = i < 2 ? "lg:col-span-3" : i < 5 ? "lg:col-span-2" : "lg:col-span-3";
          return (
            <article
              key={item.title}
              className={cn("reveal group relative overflow-hidden rounded-lg bg-navy-deep text-navy-foreground shadow-card", span, "min-h-[15rem]")}
            >
              {hasText(item.image) && (
                <img
                  src={item.image}
                  alt=""
                  width={1024}
                  height={768}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-[1.03]"
                />
              )}
              <div className="bg-card-image-overlay absolute inset-0" aria-hidden="true" />
              <div className="relative flex h-full flex-col justify-end p-6 md:p-5">
                <TileIcon index={i} icons={expertiseIcons} dark />
                <h3 className="mt-2 text-2xl font-medium">{item.title}</h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-navy-muted">{item.text}</p>
              </div>
            </article>
          );
        })}
      </div>
      {cards.more}
    </SectionShell>
  );
}

/* ---------------------------------------------------- Thought leadership */

export function ThoughtSection({ standalone }: SectionProps) {
  const t = site.thought;
  const featured = visibleItems([t.featured])[0];
  const articleList = useList(visibleItems(t.articles));
  const articles = articleList.items;
  const action = hasText(t.buttonUrl) ? (
    <Button asChild variant={standalone ? "gold" : "navyOutline"}>
      <SmartLink href={t.buttonUrl}>
        {t.buttonLabel} <ArrowUpRight />
      </SmartLink>
    </Button>
  ) : null;
  return (
    <SectionShell id="thought-leadership" kicker={t.kicker} title={t.title} intro={t.text} standalone={standalone} actions={action}>
      {featured && (
        <article className="reveal grid overflow-hidden rounded-lg border border-border bg-card shadow-card md:grid-cols-[0.9fr_1.6fr]">
          <div className="relative flex flex-col justify-between bg-primary p-6 text-primary-foreground md:p-7">
            <div className="grid-lines pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
            <p className="kicker relative text-gold-bright">{featured.label}</p>
            <div className="relative mt-10">
              {hasText(featured.tileTitle) && <p className="font-display text-4xl">{featured.tileTitle}</p>}
              {hasText(featured.tileText) && <p className="mt-2 text-sm text-navy-muted">{featured.tileText}</p>}
            </div>
          </div>
          <div className="p-6 md:p-7">
            <p className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{featured.source}</span>
              {hasText(featured.edition) && <span>{featured.edition}</span>}
              <SampleTag item={featured} />
            </p>
            <h3 className="mt-3 text-2xl font-medium leading-snug text-primary md:text-3xl">{featured.title}</h3>
            {hasText(featured.text) && <p className="mt-4 leading-relaxed text-muted-foreground">{featured.text}</p>}
            {hasText(featured.url) && (
              <Button asChild variant="navyOutline" className="mt-8">
                <SmartLink href={featured.url}>
                  Read the {featured.label.replace(/^featured\s+/i, "").toLowerCase() || "article"} <ArrowUpRight />
                </SmartLink>
              </Button>
            )}
          </div>
        </article>
      )}
      {articleList.more}
      {articles.length > 0 && (
        <div className="mt-10">
          <p className="kicker text-gold-strong">More articles</p>
          <div className="mt-4 border-b border-border">
            {articles.map((a) => {
              const body = (
                <>
                  <div>
                    <p className="eyebrow text-[0.66rem] font-semibold text-gold-strong">{a.source}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{a.date}</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium leading-snug text-primary group-hover:underline group-hover:decoration-gold group-hover:underline-offset-4 md:text-2xl">
                      {a.title}
                    </h3>
                    {hasText(a.text) && <p className="mt-2 text-muted-foreground">{a.text}</p>}
                    <div className="mt-2">
                      <SampleTag item={a} />
                    </div>
                  </div>
                  {hasText(a.url) ? <ArrowUpRight className="hidden size-5 text-muted-foreground group-hover:text-primary md:block" /> : <span />}
                </>
              );
              const cls = "reveal group grid gap-3 border-t border-border py-5 md:grid-cols-[12rem_1fr_auto] md:items-baseline md:gap-8";
              return hasText(a.url) ? (
                <SmartLink key={a.title} href={a.url} className={cls}>
                  {body}
                </SmartLink>
              ) : (
                <div key={a.title} className={cls}>
                  {body}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </SectionShell>
  );
}

/* -------------------------------------------------------------- Research */

export function ResearchSection({ standalone }: SectionProps) {
  const r = site.research;
  const publications = useList(visibleItems(r.publications));
  const pubs = publications.items;
  const areas = useList(r.areas);
  const projects = useList(r.projects);
  const profiles = r.profiles.filter((p) => hasText(p.url));
  const action =
    profiles.length > 0 ? (
      <div className="flex flex-wrap gap-3">
        {profiles.map((p, i) => (
          <Button key={p.label} asChild variant={standalone ? (i === 0 ? "gold" : "onNavy") : "navyOutline"} size={standalone ? "lg" : "default"}>
            <SmartLink href={p.url}>
              {p.label} <ArrowUpRight />
            </SmartLink>
          </Button>
        ))}
      </div>
    ) : null;
  return (
    <SectionShell id="research" kicker={r.kicker} title={r.title} intro={r.text} standalone={standalone} actions={action} surface>
      <h3 className="text-2xl font-medium text-primary">Selected publications</h3>
      <ol className="mt-6 divide-y divide-border border-y border-border">
        {pubs.map((p) => {
          const inner = (
            <>
              <span className="font-display text-2xl font-semibold text-gold-strong">{p.year}</span>
              <span className="eyebrow text-[0.62rem] text-muted-foreground">{p.venue}</span>
              <span>
                <span className="block text-lg leading-snug text-primary group-hover:underline group-hover:decoration-gold group-hover:underline-offset-4">{p.title}</span>
                {hasText(p.authors) && <span className="mt-1 block text-sm text-muted-foreground">{p.authors}</span>}
                <SampleTag item={p} />
              </span>
              {hasText(p.url) ? <ArrowUpRight className="hidden size-4 text-muted-foreground group-hover:text-primary md:block" /> : <span />}
            </>
          );
          const cls = "group grid gap-2 py-4 md:grid-cols-[5rem_10rem_1fr_auto] md:items-baseline md:gap-6";
          return (
            <li key={p.title} className="reveal">
              {hasText(p.url) ? (
                <SmartLink href={p.url} className={cls}>
                  {inner}
                </SmartLink>
              ) : (
                <div className={cls}>{inner}</div>
              )}
            </li>
          );
        })}
      </ol>
      {publications.more}
      {hasText(r.orcidUrl) && (
        <SmartLink href={r.orcidUrl} className="mt-6 inline-flex items-center gap-2 font-medium text-primary hover:text-highlight">
          {r.orcidLabel} <ArrowUpRight className="size-4" />
        </SmartLink>
      )}
      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_2fr]">
        <div>
          <p className="kicker text-gold-strong">Research areas</p>
          {areas.more}
          <ul className="mt-6 space-y-6">
            {areas.items.map((a) => (
              <li key={a.title} className="border-l-2 border-gold pl-4">
                <p className="font-display text-xl text-primary">{a.title}</p>
                {hasText(a.text) && <p className="mt-1 text-sm text-muted-foreground">{a.text}</p>}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="kicker text-gold-strong">Selected research projects</p>
          {projects.more}
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {projects.items.map((p, i) => (
              <article key={p.title} className="reveal rounded-lg border border-border bg-card p-6 shadow-card">
                <TileIcon index={i} />
                <h4 className="mt-4 font-display text-xl font-medium leading-snug text-primary">{p.title}</h4>
                <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

/* --------------------------------------------------------------- Patents */

export function PatentsSection({ standalone }: SectionProps) {
  const p = site.patents;
  const patents = useList(visibleItems(p.items));
  const items = patents.items;
  const action = hasText(p.buttonUrl) ? (
    <Button asChild variant={standalone ? "gold" : "navyOutline"}>
      <SmartLink href={p.buttonUrl}>
        {p.buttonLabel} <ArrowUpRight />
      </SmartLink>
    </Button>
  ) : null;
  return (
    <SectionShell id="patents" kicker={p.kicker} title={p.title} intro={p.text} standalone={standalone} actions={action}>
      <div className="grid gap-6 md:grid-cols-2">
        {items.map((patent) => (
          <article key={patent.title} className="reveal flex h-full flex-col rounded-lg border border-border bg-card p-5 shadow-card transition-shadow hover:shadow-lift">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <Award className="size-6 text-gold-strong" aria-hidden="true" />
              <div className="flex flex-wrap items-center gap-2">
                <SampleTag item={patent} />
                <p className="eyebrow rounded-sm bg-accent px-2 py-1 text-[0.58rem] text-accent-foreground">{patent.status}</p>
              </div>
            </div>
            <h3 className="mt-6 text-xl font-medium leading-snug text-primary md:text-2xl">{patent.title}</h3>
            <p className="mt-4 font-mono text-sm text-foreground">{patent.number}</p>
            {hasText(patent.year) && <p className="mt-2 text-sm text-muted-foreground">{patent.year}</p>}
            {hasText(patent.url) && (
              <SmartLink href={patent.url} className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-primary hover:text-highlight">
                <FileText className="size-4" /> View patent record <ArrowUpRight className="size-3.5" />
              </SmartLink>
            )}
          </article>
        ))}
      </div>
      {patents.more}
    </SectionShell>
  );
}

/* -------------------------------------------------------------- Speaking */

export function SpeakingSection({ standalone }: SectionProps) {
  const s = site.speaking;
  const upcoming = useList(visibleItems(s.upcoming), ENGAGEMENT_LIMIT);
  const events = upcoming.items;
  const action = hasText(s.buttonUrl) ? (
    <SpeakButton variant={standalone ? "gold" : "default"} size={standalone ? "xl" : "default"} />
  ) : null;
  return (
    <SectionShell id="speaking" kicker={s.kicker} title={s.title} intro={s.text} standalone={standalone} actions={action} surface>
      {events.length > 0 && <SpeakerCarousel />}
      <div className="mt-8 grid gap-px overflow-hidden rounded-lg bg-border sm:grid-cols-2 lg:grid-cols-4">
        {s.formats.map((f, i) => (
          <div key={f.title} className="bg-card p-5">
            <TileIcon index={i} icons={formatIcons} />
            <p className="mt-4 font-display text-2xl text-primary">{f.title}</p>
            {hasText(f.text) && <p className="mt-1 text-sm text-muted-foreground">{f.text}</p>}
          </div>
        ))}
      </div>
      <Tabs defaultValue="upcoming" className="mt-10">
        <TabsList className="mb-5 grid h-auto w-full max-w-2xl grid-cols-2 items-stretch bg-transparent p-0">
          <TabsTrigger value="upcoming" className="min-h-14 whitespace-normal border-b-2 border-transparent px-2 py-3 font-display text-lg font-medium text-primary data-[state=active]:border-gold-strong data-[state=active]:shadow-none md:text-2xl">{s.upcomingTitle}</TabsTrigger>
          <TabsTrigger value="past" className="min-h-14 whitespace-normal border-b-2 border-transparent px-2 py-3 font-display text-lg font-medium text-primary data-[state=active]:border-gold-strong data-[state=active]:shadow-none md:text-2xl">{s.pastTitle}</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          <ul className="divide-y divide-border border-y border-border">
            {events.map((e, i) => (
              <li key={e.event + i} className="grid gap-2 py-4 md:grid-cols-[9rem_1fr_auto] md:items-baseline md:gap-8">
                <p className="font-display text-xl font-semibold text-gold-strong">{e.date}</p>
                <div>
                  <p className="text-xl font-medium text-primary">{e.event}</p>
                  <p className="mt-1 text-muted-foreground">
                    {e.talk}
                    {hasText(e.location) ? ` · ${e.location}` : ""}
                  </p>
                  <div className="mt-2">
                    <SampleTag item={e} />
                  </div>
                </div>
                {hasText(e.url) ? (
                  <SmartLink href={e.url} className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-highlight">
                    Details <ArrowUpRight className="size-3.5" />
                  </SmartLink>
                ) : (
                  <span />
                )}
              </li>
            ))}
          </ul>
          {upcoming.more}
        </TabsContent>
        <TabsContent value="past">
          <PastEngagements />
        </TabsContent>
      </Tabs>
    </SectionShell>
  );
}

/* ----------------------------------------------------------------- Media */

export function MediaSection({ standalone }: SectionProps) {
  const m = site.media;
  const items = visibleItems(m.items);
  const [search, setSearch] = useState("");
  const [group, setGroup] = useState("Press");
  const [expanded, setExpanded] = useState(false);
  const filtered = matchingCoverage(items, group, search);
  return (
    <SectionShell id="media" kicker={m.kicker} title={m.title} standalone={standalone}>
      <Tabs value={group} onValueChange={(value) => { setGroup(value); setExpanded(false); }}>
        <TabsList className="mb-5 grid h-auto w-full max-w-xl grid-cols-2 bg-transparent p-0">
          {m.groups.map((g) => <TabsTrigger key={g.value} value={g.value} className="min-h-11 whitespace-normal border-b-2 border-transparent px-2 py-2 data-[state=active]:border-gold-strong data-[state=active]:shadow-none">{g.label}</TabsTrigger>)}
        </TabsList>
        {items.length > 6 && <div className="relative mb-5 max-w-xl"><Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" /><Input aria-label={site.ui.searchCoverage} placeholder={site.ui.searchCoverage} value={search} onChange={(e) => { setSearch(e.target.value); setExpanded(false); }} className="pl-9" /></div>}
        <TabsContent value={group}>
      <div className="grid gap-4 md:grid-cols-3">
        {firstItems(filtered, expanded, 6).map((item) => {
          const inner = (
            <>
              <div>
                <p className="font-display text-2xl font-semibold text-primary">{item.outlet}</p>
                <p className="eyebrow mt-3 flex flex-wrap items-center gap-2 text-[0.66rem] font-semibold text-gold-strong">
                  {item.type} <SampleTag item={item} />
                </p>
              </div>
              <div>
                {hasText(item.text) && <p className="leading-snug text-foreground">{item.text}</p>}
                <p className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                  {item.date}
                  {hasText(item.url) && <ArrowUpRight className="size-4 transition-colors group-hover:text-primary" />}
                </p>
              </div>
            </>
          );
          const cls =
            "reveal group flex min-h-48 flex-col justify-between gap-5 rounded-lg border border-border bg-card p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-lift";
          return hasText(item.url) ? (
            <SmartLink key={item.outlet + item.date} href={item.url} className={cls}>
              {inner}
            </SmartLink>
          ) : (
            <div key={item.outlet + item.date} className={cls}>
              {inner}
            </div>
          );
        })}
      </div>
      {!filtered.length && <p role="status" className="py-5 text-muted-foreground">{site.ui.noResults}</p>}
      <MoreButton count={filtered.length} limit={6} expanded={expanded} onToggle={() => setExpanded(!expanded)} label={site.ui.moreCoverage} />
      </TabsContent></Tabs>
    </SectionShell>
  );
}

/* --------------------------------------------------------------- Podcast */

export function PodcastSection({ standalone }: SectionProps) {
  const p = site.podcast;
  const episodeList = useList(visibleItems(p.episodes));
  const episodes = episodeList.items;
  if (episodes.length === 0) return null;
  return (
    <SectionShell id="podcast" kicker={p.kicker} title={p.title} intro={p.text} standalone={standalone} surface>
      <div className="space-y-8">
        {episodes.map((ep) => {
          const links = ep.links.filter((l) => hasText(l.url));
          return (
            <article key={ep.title} className="reveal overflow-hidden rounded-lg border border-border bg-card shadow-card">
              <div className="grid md:grid-cols-[14rem_1fr]">
                <div className="relative flex flex-col justify-between bg-navy-deep p-5 text-navy-foreground">
                  <div className="grid-lines pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
                  <p className="kicker relative text-gold-bright">Episode</p>
                  <Mic aria-hidden="true" className="relative mt-5 size-12 text-gold-bright" />
                </div>
                <div className="p-5 md:p-9">
                  <p className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    {ep.date}
                    {hasText(ep.duration) && <span>· {ep.duration}</span>}
                    <SampleTag item={ep} />
                  </p>
                  <h3 className="mt-2 text-2xl font-medium leading-snug text-primary">{ep.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{ep.description}</p>
                  {hasText(ep.audio) && (
                    <div className="mt-6">
                      <audio controls preload="none" className="w-full" src={ep.audio}>
                        Your browser does not support audio playback.
                      </audio>
                      {ep.aiVoiced && <p className="mt-2 text-xs text-muted-foreground">AI-voiced narration.</p>}
                    </div>
                  )}
                  <div className="mt-6 flex flex-wrap gap-3">
                    {hasText(ep.transcriptUrl) && (
                      <Button asChild variant="navyOutline" size="sm">
                        <SmartLink href={ep.transcriptUrl}>
                          {ep.transcriptLabel || "Read the article"} <ArrowUpRight />
                        </SmartLink>
                      </Button>
                    )}
                    {links.map((l) => (
                      <Button key={l.label} asChild variant="outline" size="sm">
                        <SmartLink href={l.url}>
                          {l.label} <ArrowUpRight />
                        </SmartLink>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
      {episodeList.more}
    </SectionShell>
  );
}

/* --------------------------------------------------------------- Contact */

function BrandIcon({ label }: { label: string }) {
  const box = "size-5 shrink-0";
  if (label === "LinkedIn") return <svg viewBox="0 0 24 24" className={box} aria-hidden="true"><rect width="24" height="24" rx="4" fill="#0A66C2" /><path fill="#fff" d="M5.3 9.4h2.9V19H5.3zM6.8 5a1.7 1.7 0 1 1 0 3.4 1.7 1.7 0 0 1 0-3.4zM10 9.4h2.8v1.3c.4-.8 1.4-1.6 2.9-1.6 3 0 3.6 2 3.6 4.6V19h-2.9v-4.7c0-1.1 0-2.6-1.6-2.6s-1.9 1.2-1.9 2.5V19H10z" /></svg>;
  if (label.includes("Scholar")) return <svg viewBox="0 0 24 24" className={box} aria-hidden="true"><rect width="24" height="24" rx="4" fill="#4285F4" /><path fill="#fff" d="M12 4 3 10.5h4.2a5 5 0 0 0 9.6 0H21z" /><circle cx="12" cy="15" r="4.2" fill="#fff" /><circle cx="12" cy="15" r="2.6" fill="#4285F4" /></svg>;
  if (label === "ResearchGate") return <svg viewBox="0 0 24 24" className={box} aria-hidden="true"><rect width="24" height="24" rx="4" fill="#00CCBB" /><text x="12" y="16.5" textAnchor="middle" fontSize="11" fontWeight="700" fontFamily="Arial, sans-serif" fill="#fff">R<tspan fontSize="8" dy="-3">G</tspan></text></svg>;
  if (label === "ORCID") return <svg viewBox="0 0 24 24" className={box} aria-hidden="true"><circle cx="12" cy="12" r="12" fill="#A6CE39" /><text x="12" y="16.2" textAnchor="middle" fontSize="11" fontWeight="700" fontFamily="Arial, sans-serif" fill="#fff">iD</text></svg>;
  return <BookOpen aria-hidden="true" className={cn(box, "text-gold-bright")} />;
}

const offerIcons = [Compass, Mic, FlaskConical, BookOpen];

export function ContactDetails() {
  const c = site.contact;
  const details = [
    { label: "Email", value: c.email, href: hasText(c.email) ? `mailto:${c.email}` : "", Icon: Mail, copy: true },
    { label: "Phone", value: visiblePhone(c), href: `tel:${c.phone.replace(/[^\d+]/g, "")}`, Icon: Phone, copy: true },
    { label: "Location", value: c.location, href: "", Icon: MapPin, copy: false },
  ].filter((d) => hasText(d.value));
  return <div>
    <h3 className="font-display text-xl font-semibold">{site.ui.getInTouch}</h3>
    <ul className="mt-4 space-y-3">
      {details.map(({ label, value, href, Icon, copy }) => <li key={label} className="flex items-center gap-3 text-sm">
        <Icon aria-hidden="true" className="size-5 shrink-0 text-gold-bright" />
        <span className="min-w-0 break-words">{href ? <a href={href} className="hover:text-gold-bright">{value}</a> : value}</span>
        {copy && <CopyButton value={value} label={label} />}
      </li>)}
      {c.links.filter((l) => hasText(l.url)).map((l) => <li key={l.label} className="flex items-center gap-3 text-sm">
        <BrandIcon label={l.label} />
        <SmartLink href={l.url} className="min-w-0 break-words underline decoration-current/30 underline-offset-4 hover:decoration-current">{hasText(l.text) ? l.text : l.label}</SmartLink>
      </li>)}
    </ul>
    <DownloadLinks contact dark />
  </div>;
}

export function ContactSection({ standalone }: SectionProps) {
  const c = site.contact;
  const a = site.advisory;
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const openForm = () => {
    if (!site.settings.scheduleEnabled) return;
    setOpen(true);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      formRef.current?.querySelector<HTMLElement>("input:not([type=hidden]):not([tabindex='-1'])")?.focus({ preventScroll: true });
    }, 60);
  };
  const Heading = standalone ? "h1" : "h2";
  return (
    <section id="contact" aria-labelledby="contact-title" className="section-y relative scroll-mt-10 overflow-hidden bg-navy-deep text-navy-foreground lg:scroll-mt-[4.5rem]">
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />
      <div className="container-page relative grid items-start gap-10 lg:grid-cols-2">
        <div>
          <p className="kicker text-gold-bright">{c.kicker}</p>
          <Heading id="contact-title" className="mt-3 font-display text-3xl font-semibold leading-tight md:text-4xl">{c.title}</Heading>
          <p className="mt-3 max-w-xl text-navy-muted">{a.text}</p>
          <ul className="mt-7 grid gap-5 sm:grid-cols-2">
            {a.offers.map((o, i) => { const Icon = offerIcons[i % offerIcons.length] ?? BookOpen; return (
              <li key={o.title} className="flex gap-3">
                <Icon aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-gold-bright" />
                <div><p className="font-semibold">{o.title}</p><p className="text-xs text-navy-muted">{o.text}</p></div>
              </li>); })}
          </ul>
          {site.settings.scheduleEnabled && <div className="mt-8 flex flex-wrap gap-3">
            {hasText(a.bookingUrl)
              ? <Button asChild variant="gold" size="lg"><SmartLink href={a.bookingUrl}>{a.buttonLabel}<CalendarDays className="size-4" /></SmartLink></Button>
              : <Button variant="gold" size="lg" onClick={openForm} aria-expanded={open} aria-controls="consultation-form">{a.buttonLabel}<CalendarDays className="size-4" /></Button>}
          </div>}
        </div>
        <div className="rounded-lg border border-navy-line bg-navy p-6 shadow-card">
          <ContactDetails />
          {site.settings.scheduleEnabled && open && <div ref={formRef} id="consultation-form" className="consultation-form-theme mt-6 border-t border-navy-line pt-6">
            <p className="mb-4 text-sm text-navy-muted">{c.text}</p>
            <ContactForm compact />
          </div>}
        </div>
      </div>
    </section>
  );
}

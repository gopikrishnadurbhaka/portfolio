import { Mic, ArrowUpRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";

import { hasText, site, visibleItems } from "@/lib/content";

import { SmartLink } from "./SmartLink";

function useRotation(count: number, delay = 6500) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || count < 2) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), delay);
    return () => window.clearInterval(id);
  }, [paused, count, delay]);
  const go = (d: number) => setIndex((i) => (i + d + count) % count);
  return { index, setIndex, paused, setPaused, go };
}

function useEvents() {
  return visibleItems(site.speaking.upcoming);
}

function Tags({ sample, label }: { sample?: boolean | undefined; label?: string | undefined }) {
  return (
    <span className="inline-flex flex-wrap items-center gap-2">
      <span className="eyebrow rounded-sm bg-gold px-2 py-1 text-[0.6rem] text-navy-deep">Upcoming</span>
      {sample && (
        <span className="eyebrow rounded-sm border border-dashed border-navy-foreground/40 px-2 py-1 text-[0.6rem] text-navy-muted">
          {label || "Sample"}
        </span>
      )}
    </span>
  );
}

/** Slim rotating strip shown at the top of the home page. */
export function SpeakerStrip() {
  const events = useEvents();
  const { index, paused, setPaused, go } = useRotation(events.length);
  const e = events[index];
  if (!e) return null;
  const multi = events.length > 1;

  return (
    <section aria-label="Speaking engagements" className="border-b border-navy-line bg-navy text-navy-foreground">
      <div className="container-page flex min-h-14 items-center gap-3 py-2.5">
        <span className="eyebrow hidden shrink-0 text-gold md:inline">Speaking</span>
        <span className="hidden h-4 w-px bg-navy-line md:block" aria-hidden="true" />
        <div key={index} className="animate-rise flex min-w-0 flex-1 flex-wrap items-center gap-x-3 gap-y-1" aria-live={paused ? "polite" : "off"}>
          <Tags sample={e.sample} label={e.sampleLabel} />
          <p className="min-w-0 text-sm">
            <span className="font-semibold">{e.event}</span>
            <span className="text-navy-muted">
              {" "}— {e.talk} · {e.date}
              {hasText(e.location) ? ` · ${e.location}` : ""}
            </span>
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          {multi && (
            <>
              <button type="button" onClick={() => go(-1)} className="rounded p-2 text-navy-muted hover:text-navy-foreground" aria-label="Previous engagement">
                <ChevronLeft className="size-4" />
              </button>
              <button type="button" onClick={() => setPaused(!paused)} className="rounded p-2 text-navy-muted hover:text-navy-foreground" aria-label={paused ? "Resume rotation" : "Pause rotation"}>
                {paused ? <Play className="size-3.5" /> : <Pause className="size-3.5" />}
              </button>
              <button type="button" onClick={() => go(1)} className="rounded p-2 text-navy-muted hover:text-navy-foreground" aria-label="Next engagement">
                <ChevronRight className="size-4" />
              </button>
            </>
          )}
          <SmartLink href="#speaking" className="ml-1 hidden items-center gap-1 text-xs font-medium text-gold hover:text-gold-soft sm:inline-flex">
            All events <ArrowUpRight className="size-3.5" />
          </SmartLink>
        </div>
      </div>
    </section>
  );
}

/** Large feature carousel inside the Speaking section. */
export function SpeakerCarousel() {
  const events = useEvents();
  const { index, setIndex, paused, setPaused, go } = useRotation(events.length, 8000);
  const e = events[index];
  if (!e) return null;
  const image = site.speaking.image;
  const [role, ...rest] = e.talk.split(": ");
  const title = rest.join(": ");

  return (
    <div className="relative overflow-hidden rounded-lg bg-navy-deep text-navy-foreground shadow-lift" aria-roledescription="carousel" aria-label="Speaking engagements">
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />
      <div className="relative grid min-h-[16rem] md:grid-cols-[1.3fr_1fr]">
        <div key={index} className="animate-rise flex flex-col justify-between gap-6 p-6 md:p-7">
          <div>
            <Tags sample={e.sample} label={e.sampleLabel} />
            <p className="eyebrow mt-8 text-gold">{role}</p>
            <h3 className="mt-3 text-3xl font-medium leading-tight md:text-4xl">{e.event}</h3>
            {title && <p className="mt-4 font-display text-xl italic text-navy-muted md:text-2xl">“{title}”</p>}
          </div>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <dl className="flex gap-10 text-sm">
              <div>
                <dt className="eyebrow text-[0.6rem] text-navy-muted">Date</dt>
                <dd className="mt-1 font-medium">{e.date}</dd>
              </div>
              {hasText(e.location) && (
                <div>
                  <dt className="eyebrow text-[0.6rem] text-navy-muted">Location</dt>
                  <dd className="mt-1 font-medium">{e.location}</dd>
                </div>
              )}
            </dl>
            {hasText(e.url) && (
              <SmartLink href={e.url} className="inline-flex items-center gap-1.5 text-sm font-medium text-gold hover:text-gold-soft">
                Event details <ArrowUpRight className="size-4" />
              </SmartLink>
            )}
          </div>
        </div>
        <div className="relative hidden border-l border-navy-line md:block">
          {hasText(image) ? (
            <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
          ) : (
            <div className="flex h-full flex-col justify-end p-10">
              <Mic className="size-20 text-gold-bright" aria-hidden="true" />
            </div>
          )}
        </div>
      </div>
      {events.length > 1 && (
        <div className="relative flex items-center justify-between border-t border-navy-line px-6 py-3 md:px-12">
          <div className="flex gap-2">
            {events.map((ev, i) => (
              <button
                key={ev.event + i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show engagement ${i + 1}: ${ev.event}`}
                aria-current={i === index}
                className={`h-1.5 rounded-full transition-all ${i === index ? "w-8 bg-gold" : "w-4 bg-navy-foreground/25 hover:bg-navy-foreground/50"}`}
              />
            ))}
          </div>
          <div className="flex items-center gap-1">
            <button type="button" onClick={() => go(-1)} className="rounded p-2 text-navy-muted hover:text-navy-foreground" aria-label="Previous engagement">
              <ChevronLeft className="size-5" />
            </button>
            <button type="button" onClick={() => setPaused(!paused)} className="rounded p-2 text-navy-muted hover:text-navy-foreground" aria-label={paused ? "Resume rotation" : "Pause rotation"}>
              {paused ? <Play className="size-4" /> : <Pause className="size-4" />}
            </button>
            <button type="button" onClick={() => go(1)} className="rounded p-2 text-navy-muted hover:text-navy-foreground" aria-label="Next engagement">
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

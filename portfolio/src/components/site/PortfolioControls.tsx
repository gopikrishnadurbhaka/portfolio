import { Check, Copy, Download, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { hasText, site } from "@/lib/content";
import { ContactForm } from "./ContactForm";

export function DownloadLinks({ contact = false, dark = false }: { contact?: boolean; dark?: boolean }) {
  const items = Object.values(site.settings.downloads).filter((d) => d.enabled && hasText(d.url));
  if (!items.length) return null;
  return <div className={`mt-5 flex flex-wrap gap-x-5 gap-y-3 text-sm ${dark ? "text-gold-bright" : "text-gold-strong"}`}>
    {items.map((d) => <a key={d.url} href={d.url} download className="inline-flex items-center gap-2 underline decoration-current/40 underline-offset-4 hover:decoration-current"><Download className="size-4" />{contact ? d.contactLabel : d.label}</a>)}
  </div>;
}

export function SpeakButton({ variant = "default", size = "default", label = site.speaking.buttonLabel }: Pick<ButtonProps, "variant" | "size"> & { label?: string }) {
  if (!site.settings.scheduleEnabled) return <Button asChild variant={variant} size={size}><a href="/#contact">{label}</a></Button>;
  return <Dialog><DialogTrigger asChild><Button variant={variant} size={size}>{label}</Button></DialogTrigger>
    <DialogContent className="max-h-[90dvh] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto">
      <DialogHeader><DialogTitle className="text-2xl text-primary">{site.ui.speakingTopic}</DialogTitle><DialogDescription>{site.contact.text}</DialogDescription></DialogHeader>
      <ContactForm defaultType="speaking" compact />
    </DialogContent>
  </Dialog>;
}

export function MoreButton({ count, limit = 5, expanded, onToggle, label = site.ui.showMore }: { count: number; limit?: number; expanded: boolean; onToggle: () => void; label?: string }) {
  if (count <= limit) return null;
  return <Button variant="navyOutline" size="sm" className="mt-5" onClick={onToggle} aria-expanded={expanded}>{expanded ? site.ui.showLess : label}{expanded ? <Minus /> : <Plus />}</Button>;
}

export function CopyButton({ value, label }: { value: string; label: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  async function copy() {
    try { await navigator.clipboard.writeText(value); setStatus("copied"); }
    catch { setStatus("error"); }
  }
  return <span className="shrink-0">
    <Button type="button" variant="outline" size="sm" className="h-8 w-8 border-navy-line bg-transparent px-0 text-navy-foreground hover:bg-navy-line hover:text-gold-bright data-[copied=true]:w-24" data-copied={status === "copied"} title={`${site.ui.copy} ${label}`} aria-label={`${site.ui.copy} ${label}`} onClick={copy}>
      {status === "copied" ? <><Check /><span role="status">{site.ui.copied}</span></> : <Copy />}
    </Button>
    {status === "error" && <span role="alert" className="block max-w-36 text-xs text-destructive">{site.ui.copyFailed}</span>}
  </span>;
}
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contactSchema, enquiryTypes } from "@/lib/contact-schema";
import { submitEnquiry } from "@/lib/contact.functions";
import { hasText, site } from "@/lib/content";
import { isAllowedContactDate, todayIst } from "@/lib/contact-date";

type Errors = Partial<Record<string, string>>;

const selectClass =
  "flex h-11 w-full rounded-md border border-input bg-card px-3 text-sm text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring";

export function ContactForm({ defaultType = "advisory", compact = false }: { defaultType?: string; compact?: boolean }) {
  const send = useServerFn(submitEnquiry);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [minimumDate, setMinimumDate] = useState("");

  useEffect(() => {
    const refresh = () => setMinimumDate(todayIst());
    refresh();
    const timer = window.setInterval(refresh, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!site.settings.scheduleEnabled) return;
    const form = e.currentTarget;
    const fields = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    const { preferredDate = "", preferredSlot = "", ...raw } = fields;
    if (!isAllowedContactDate(preferredDate)) {
      setMinimumDate(todayIst());
      setErrors({ preferredDate: "Please choose today or a future date (IST)." });
      return;
    }
    raw["preferredTimeIst"] = [preferredDate, preferredSlot].filter(Boolean).join(", ");
    const parsed = contactSchema.safeParse(raw);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] ??= issue.message;
      setErrors(next);
      return;
    }
    setErrors({});
    setStatus("sending");
    try {
      // settings.formEndpoint in content.ts (e.g. Formspree) takes over when set; otherwise messages are saved in the Cloud database.
      const endpoint = site.settings.formEndpoint;
      const ok = hasText(endpoint)
        ? (
            await fetch(endpoint, {
              method: "POST",
              headers: { "Content-Type": "application/json", Accept: "application/json" },
              body: JSON.stringify(parsed.data),
            })
          ).ok
        : (await send({ data: parsed.data })).ok;
      if (ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (!site.settings.scheduleEnabled) return null;

  if (status === "sent") {
    return (
      <div role="status" className="rounded-lg border border-border bg-card p-10 text-center shadow-card">
        <CheckCircle2 className="mx-auto size-10 text-highlight" />
        <h3 className="mt-4 text-2xl font-medium text-primary">Thank you — your message has been received.</h3>
        <p className="mt-2 text-muted-foreground">I will respond as soon as possible.</p>
        <Button variant="navyOutline" className="mt-6" onClick={() => setStatus("idle")}>
          Send another message
        </Button>
      </div>
    );
  }

  const err = (k: string) =>
    errors[k] ? (
      <p id={`${k}-error`} className="mt-1.5 text-sm text-destructive">
        {errors[k]}
      </p>
    ) : null;

  return (
    <form onSubmit={onSubmit} noValidate className={compact ? "bg-background" : "rounded-lg border border-border bg-card p-5 shadow-card md:p-6"}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Full name *</Label>
          <Input id="name" name="name" autoComplete="name" className="mt-2 h-11" aria-invalid={!!errors["name"]} aria-describedby={errors["name"] ? "name-error" : undefined} />
          {err("name")}
        </div>
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input id="email" name="email" type="email" autoComplete="email" className="mt-2 h-11" aria-invalid={!!errors["email"]} aria-describedby={errors["email"] ? "email-error" : undefined} />
          {err("email")}
        </div>
        <div>
          <Label htmlFor="organisation">Organisation</Label>
          <Input id="organisation" name="organisation" autoComplete="organization" className="mt-2 h-11" />
          {err("organisation")}
        </div>
        <div>
          <Label htmlFor="enquiryType">Enquiry type *</Label>
          <select id="enquiryType" name="enquiryType" defaultValue={defaultType} className={`mt-2 ${selectClass}`}>
            {enquiryTypes.map((t) => (
              <option key={t.value} value={t.value}>
                {t.value === "speaking" ? site.ui.speakingTopic : t.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="preferredDate">Preferred date</Label>
          <Input id="preferredDate" name="preferredDate" type="date" min={minimumDate || undefined} className="mt-2 h-11" aria-invalid={!!errors["preferredDate"]} aria-describedby={errors["preferredDate"] ? "preferredDate-error" : undefined} />
          {err("preferredDate")}
        </div>
        <div>
          <Label htmlFor="preferredSlot">Preferred time slot</Label>
          <select id="preferredSlot" name="preferredSlot" defaultValue="" className={`mt-2 ${selectClass}`}>
            <option value="">No preference</option>
            {site.advisory.timeSlots.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <p className="-mt-2 text-xs text-muted-foreground sm:col-span-2">Optional. {site.advisory.timezoneNote} I will confirm by email.</p>
        <div className="sm:col-span-2">
          <Label htmlFor="message">Message *</Label>
          <Textarea id="message" name="message" rows={6} className="mt-2" aria-invalid={!!errors["message"]} aria-describedby={errors["message"] ? "message-error" : undefined} />
          {err("message")}
        </div>
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input id="website" name="website" tabIndex={-1} autoComplete="off" />
        </div>
      </div>
      {status === "error" && (
        <p role="alert" className="mt-5 rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">
          Sorry, your message could not be sent. Please try again in a moment.
        </p>
      )}
      <Button type="submit" size="xl" className="mt-7 w-full sm:w-auto" disabled={status === "sending"}>
        {status === "sending" ? (
          <>
            <Loader2 className="animate-spin" /> Sending…
          </>
        ) : (
          "Send enquiry"
        )}
      </Button>
    </form>
  );
}

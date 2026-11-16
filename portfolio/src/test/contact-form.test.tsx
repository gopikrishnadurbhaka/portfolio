import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

const { send } = vi.hoisted(() => ({ send: vi.fn() }));
vi.mock("@tanstack/react-start", () => ({ useServerFn: () => send }));
vi.mock("@/lib/contact.functions", () => ({ submitEnquiry: vi.fn() }));

import { ContactForm } from "@/components/site/ContactForm";
import { ContactSection } from "@/components/site/sections";
import { SpeakButton } from "@/components/site/PortfolioControls";
import { site } from "@/lib/content";
import { isAllowedContactDate, todayIst } from "@/lib/contact-date";

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.clearAllMocks();
  site.settings.scheduleEnabled = true;
});

describe("contact scheduling rules", () => {
  it("rejects past dates while allowing today, future dates and no preference in IST", () => {
    const now = new Date("2026-11-15T18:08:00Z");
    expect(isAllowedContactDate("2026-11-14", now)).toBe(false);
    expect(isAllowedContactDate("2026-11-15", now)).toBe(true);
    expect(isAllowedContactDate("2026-11-16", now)).toBe(true);
    expect(isAllowedContactDate("", now)).toBe(true);
    expect(isAllowedContactDate("2026-02-30", now)).toBe(false);
    expect(todayIst(new Date("2026-11-15T18:30:00Z"))).toBe("2026-11-16");
  });

  it("blocks a manually entered past date before sending", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-11-15T18:08:00Z"));
    const { container } = render(<ContactForm />);
    const date = screen.getByLabelText("Preferred date") as HTMLInputElement;
    expect(date.min).toBe("2026-11-15");
    fireEvent.change(date, { target: { value: "2026-11-14" } });
    const form = container.querySelector("form");
    if (!form) throw new Error("Expected enquiry form");
    fireEvent.submit(form);
    expect(date.getAttribute("aria-invalid")).toBe("true");
    expect(send).not.toHaveBeenCalled();
  });

  it("hides scheduling and all forms when the switch is off but retains contact details", () => {
    site.settings.scheduleEnabled = false;
    const { container } = render(<><ContactSection /><ContactForm /><SpeakButton /></>);
    expect(screen.queryByRole("button", { name: site.advisory.buttonLabel })).toBeNull();
    expect(container.querySelector("form")).toBeNull();
    expect(screen.getByText(site.contact.email)).toBeDefined();
    expect(screen.getByRole("link", { name: site.speaking.buttonLabel }).getAttribute("href")).toBe("/#contact");
  });
});
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/content", async (load) => {
  const actual = await load<typeof import("@/lib/content")>();
  const site = structuredClone(actual.site);
  site.settings.downloads.resume.enabled = false;
  site.settings.downloads.contact.enabled = false;
  site.speaking.past = Array.from({ length: 7 }, (_, i) => ({ event: `Test forum ${i}`, talk: i === 6 ? "Wind energy" : "Industrial AI", year: i === 6 ? "2025" : "2026", date: `Nov ${i === 6 ? "2025" : "2026"}`, location: "Hyderabad", url: "" }));
  return { ...actual, site };
});
vi.mock("@/components/site/ContactForm", () => ({ ContactForm: () => null }));

import { PastEngagements } from "@/components/site/PastEngagements";
import { DownloadLinks, MoreButton } from "@/components/site/PortfolioControls";

afterEach(cleanup);
describe("past engagement controls", () => {
  it("offers expansion only when an engagement list exceeds three", () => {
    const toggle = vi.fn();
    const { rerender } = render(<MoreButton count={2} limit={3} expanded={false} onToggle={toggle} />);
    expect(screen.queryByRole("button", { name: "Show more" })).toBeNull();
    rerender(<MoreButton count={3} limit={3} expanded={false} onToggle={toggle} />);
    expect(screen.queryByRole("button", { name: "Show more" })).toBeNull();
    rerender(<MoreButton count={4} limit={3} expanded={false} onToggle={toggle} />);
    fireEvent.click(screen.getByRole("button", { name: "Show more" }));
    expect(toggle).toHaveBeenCalledOnce();
  });
  it("shows three, expands seven, filters the year, searches, and clears filters", () => {
    const { container } = render(<PastEngagements />);
    expect(container.querySelectorAll("li")).toHaveLength(3);
    fireEvent.click(screen.getByRole("button", { name: "Show more" }));
    expect(container.querySelectorAll("li")).toHaveLength(7);
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "2025" } });
    expect(container.querySelectorAll("li")).toHaveLength(1);
    expect(screen.getByText("Wind energy")).toBeDefined();
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "Industrial AI" } });
    expect(container.querySelectorAll("li")).toHaveLength(0);
    fireEvent.click(screen.getByRole("button", { name: "Clear filters" }));
    expect(container.querySelectorAll("li")).toHaveLength(3);
    expect((screen.getByRole("textbox") as HTMLInputElement).value).toBe("");
  });
  it("does not offer downloads while both are disabled", () => {
    const { container } = render(<DownloadLinks />);
    expect(container.querySelectorAll("a")).toHaveLength(0);
  });
});
import { useRouter, useRouterState } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { useEffect, useState, type MouseEvent } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { navItems } from "@/content/navigation";
import { site } from "@/lib/content";
import { cn } from "@/lib/utils";

import { SmartLink } from "./SmartLink";

const linkBase = "relative py-2 text-[0.8rem] font-medium tracking-wide text-muted-foreground transition-colors hover:text-primary";
const linkActive = "!text-primary after:absolute after:inset-x-0 after:-bottom-[1px] after:h-[2px] after:bg-gold";

/** Which menu item is current: on the home page it follows the scroll position; on a section page it matches the URL. */
function useActiveSection() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [active, setActive] = useState("top");

  useEffect(() => {
    if (pathname !== "/") return;
    const ids = [...navItems.map((n) => n.id).filter((id) => id !== "top"), "advisory"];
    const onScroll = () => {
      const line = window.scrollY + 140;
      let current = "top";
      let best = -1;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (top <= line && top > best) {
          best = top;
          current = id;
        }
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8) current = "contact";
      setActive(current === "advisory" ? "contact" : current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  if (pathname === "/") return active;
  return navItems.find((n) => n.to !== "/" && pathname.startsWith(n.to))?.id ?? "";
}

/**
 * Menu link to a section of the single scrolling home page. A plain anchor (not a router Link) so the
 * router's own "active page" marking doesn't flag every item while on "/"; scroll-spy decides instead.
 */
function NavLink({ id, label, active, className, activeClassName, onNavigate }: { id: string; label: string; active: boolean; className: string; activeClassName: string; onNavigate?: () => void }) {
  const router = useRouter();
  const href = id === "top" ? "/" : `/#${id}`;
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    onNavigate?.();
    if (window.location.pathname !== "/") {
      void router.navigate(id === "top" ? { to: "/" } : { to: "/", hash: id });
      return;
    }
    if (id === "top") window.scrollTo({ top: 0, behavior: "smooth" });
    else document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    // Update the address bar only after scrolling stops: changing it mid-scroll makes the router interrupt the scroll.
    const syncUrl = () => window.history.replaceState(window.history.state, "", href);
    if ("onscrollend" in window) window.addEventListener("scrollend", syncUrl, { once: true });
    else setTimeout(syncUrl, 1200);
  };
  return (
    <a href={href} onClick={onClick} className={cn(className, active && activeClassName)} aria-current={active ? "location" : undefined}>
      {label}
    </a>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const active = useActiveSection();
  const name = site.person.name;

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/92 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-6 lg:h-[4.5rem]">
        <NavLink
          id="top"
          label={name}
          active={false}
          className="font-display text-[1.2rem] font-semibold leading-none text-primary sm:text-[1.35rem]"
          activeClassName=""
        />

        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-5">
            {navItems.map((item) => (
              <li key={item.id}>
                <NavLink id={item.id} label={item.label} active={active === item.id} className={linkBase} activeClassName={linkActive} />
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <SmartLink href="#contact">Let's Connect</SmartLink>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="xl:hidden" aria-label="Open menu">
                <Menu className="!size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[86vw] max-w-sm bg-navy-deep p-0 text-navy-foreground">
              <SheetTitle className="sr-only">Site navigation</SheetTitle>
              <div className="border-b border-navy-line px-6 pb-5 pt-8">
                <p className="font-display text-xl font-semibold">{name}</p>
                <p className="eyebrow mt-2 text-[0.6rem] text-gold">Engineering Intelligence</p>
              </div>
              <nav aria-label="Mobile" className="px-3 py-4">
                <ul className="flex flex-col">
                  {navItems.map((item) => (
                    <li key={item.id}>
                      <NavLink
                        id={item.id}
                        label={item.label}
                        active={active === item.id}
                        onNavigate={() => setOpen(false)}
                        className="flex items-center justify-between rounded-md px-3 py-3 text-[0.98rem] text-navy-muted transition-colors hover:bg-navy-foreground/5 hover:text-navy-foreground"
                        activeClassName="!text-navy-foreground bg-navy-foreground/5 border-l-2 border-gold"
                      />
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="px-6 pb-8">
                <Button asChild variant="gold" size="lg" className="w-full">
                  <SmartLink href="#contact" onClick={() => setOpen(false)}>
                    Let's Connect
                  </SmartLink>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

import { Link } from "@tanstack/react-router";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href: string; children: ReactNode };

/**
 * Renders a link from content.ts:
 * "#research" → scrolls to that section of the home page; "https://…" → opens in a new tab; anything else → normal link.
 */
export function SmartLink({ href, children, ...rest }: Props) {
  if (href.startsWith("#")) {
    const id = href.slice(1);
    const { className, onClick } = rest;
    return (
      <Link
        to="/"
        hash={id}
        className={className}
        onClick={(e) => {
          onClick?.(e);
          if (window.location.pathname === "/") document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        {children}
      </Link>
    );
  }
  const external = /^https?:\/\//.test(href);
  return (
    <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>
      {children}
    </a>
  );
}

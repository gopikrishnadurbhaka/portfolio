
import type { AnchorHTMLAttributes, ReactNode } from "react";

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  children: ReactNode;
};

/**
 * Handles internal section links and external URLs.
 * Internal links always resolve against the Vite deployment base.
 */
export function SmartLink({ href, children, ...rest }: Props) {
  if (href.startsWith("#")) {
    const id = href.slice(1);
    const homeUrl = `${import.meta.env.BASE_URL}#${id}`;

    return (
      <a href={homeUrl} {...rest}>
        {children}
      </a>
    );
  }

  const external = /^https?:\/\//.test(href);

  return (
    <a
      href={href}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      {...rest}
    >
      {children}
    </a>
  );
}

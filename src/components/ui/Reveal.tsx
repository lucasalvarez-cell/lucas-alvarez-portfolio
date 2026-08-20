"use client";

import { useEffect, useRef, useState } from "react";
import { clsx } from "clsx";

/**
 * Fades and slides children in once they scroll into view. Disconnects the
 * observer after the first trigger, so it never re-hides on scroll-up.
 *
 * `immediate` opts a block out of the animation entirely and paints it with the
 * server HTML. Use it for anything above the fold: an animated block starts at
 * `opacity: 0`, and a browser does not count an invisible element as painted —
 * so wrapping the H1 or the hero image defers LCP until React has hydrated and
 * the observer has fired, which on a slow mobile connection is seconds.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  immediate = false,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  immediate?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (immediate) return;

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [immediate]);

  if (immediate) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={clsx("reveal", visible && "is-visible", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

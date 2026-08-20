"use client";

import { useEffect, useState } from "react";

/**
 * Scroll progress for the article.
 *
 * On a 2.500-word guide the reader's main question at any moment is "how much
 * of this is left"; without an answer, long pages feel longer than they are.
 * Three pixels at the very top of the viewport, above the sticky header.
 */
export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? window.scrollY / scrollable : 0);
    };

    // rAF-throttled: the listener fires per scroll event, the state does not.
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[1002] h-[3px] bg-transparent"
    >
      <div
        className="h-full origin-left bg-turquoise transition-[width] duration-75 ease-out"
        style={{ width: `${(progress * 100).toFixed(2)}%` }}
      />
    </div>
  );
}

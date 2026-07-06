// hooks/use-mobile.ts
"use client";

import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  // undefined until we've actually measured the client's viewport —
  // never guess from `window` during the render body.
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    onChange(); // set the real value once mounted
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  // `!!isMobile` → `false` on the server AND on the client's very first
  // render (since isMobile is still `undefined` at that point) — so the
  // initial hydration pass matches exactly. The effect then updates it a
  // moment later, which is a normal post-hydration re-render, not a mismatch.
  return !!isMobile;
}

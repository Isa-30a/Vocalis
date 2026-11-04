"use client";

import { useEffect, useRef } from "react";

/**
 * Closes a native <details> element when the user clicks outside it or presses
 * Escape. Escape returns focus to the summary so keyboard users keep context.
 */
export function useDismissableDetails() {
  const detailsRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    function closeOnOutsidePointer(event: PointerEvent) {
      const details = detailsRef.current;

      if (
        !details?.open ||
        !(event.target instanceof Node) ||
        details.contains(event.target)
      ) {
        return;
      }

      details.open = false;
    }

    function closeOnEscape(event: KeyboardEvent) {
      const details = detailsRef.current;

      if (event.key !== "Escape" || !details?.open) {
        return;
      }

      details.open = false;
      details.querySelector<HTMLElement>("summary")?.focus();
    }

    document.addEventListener("pointerdown", closeOnOutsidePointer);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("pointerdown", closeOnOutsidePointer);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return detailsRef;
}

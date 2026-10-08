import { useEffect, useRef } from "react";

export function useInfiniteScroll(onIntersect, enabled) {
  const bottomRef = useRef(null);
  const callbackRef = useRef(onIntersect);

  // always keep the latest function
  useEffect(() => {
    callbackRef.current = onIntersect;
  });

  useEffect(() => {
    const element = bottomRef.current;
    if (!enabled || !element) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) callbackRef.current();
    });

    observer.observe(element);

    return () => observer.disconnect(); // cleanup
  }, [enabled]);

  return bottomRef;
}

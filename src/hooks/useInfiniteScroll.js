import { useEffect, useRef } from "react";

export function useInfiniteScroll(onReachBottom, canLoadMore) {
  const bottomRef = useRef(null);

  useEffect(() => {
    const bottomDiv = bottomRef.current;

    // not allowed to load or no div on the page => do nothing
    if (!canLoadMore || !bottomDiv) return;

    // the observer calls this when the bottom div is visible
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) onReachBottom();
    });

    observer.observe(bottomDiv);

    // stop watching when the effect runs again
    return () => observer.disconnect();
  }, [canLoadMore, onReachBottom]);

  return bottomRef;
}

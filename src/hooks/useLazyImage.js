import { useState, useEffect, useRef } from "react";

export function useLazyImage(src) {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoaded(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200% 300%" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, src: loaded ? src : undefined };
}

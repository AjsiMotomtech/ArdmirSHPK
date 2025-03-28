import { useState, useEffect, useRef, RefObject } from "react";

interface UseIntersectionObserverProps {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
  triggerOnce?: boolean;
}

interface UseIntersectionObserverReturn {
  ref: RefObject<HTMLElement>;
  inView: boolean;
  entry: IntersectionObserverEntry | null;
}

export function useIntersectionObserver({
  threshold = 0,
  root = null,
  rootMargin = "0px",
  triggerOnce = false,
}: UseIntersectionObserverProps = {}): UseIntersectionObserverReturn {
  const [inView, setInView] = useState(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const ref = useRef<HTMLElement>(null);
  const prevInView = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observerCallback: IntersectionObserverCallback = ([entry]) => {
      setEntry(entry);
      
      if (entry.isIntersecting !== prevInView.current) {
        setInView(entry.isIntersecting);
        prevInView.current = entry.isIntersecting;

        if (triggerOnce && entry.isIntersecting) {
          observer.unobserve(node);
        }
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold,
      root,
      rootMargin,
    });

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [threshold, root, rootMargin, triggerOnce]);

  return { ref, inView, entry };
}

"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import styles from "./NavigationProgress.module.scss";

export default function NavigationProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const intervalRef = useRef(null);
  const completionRef = useRef(null);
  const initialRenderRef = useRef(true);

  useEffect(() => {
    const startProgress = (event) => {
      if (
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      if (!(event.target instanceof Element)) return;

      const anchor = event.target.closest("a");
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) {
        return;
      }

      const destination = new URL(anchor.href, window.location.href);
      const current = new URL(window.location.href);
      const isInternal = destination.origin === current.origin;
      const isSamePage =
        destination.pathname === current.pathname &&
        destination.search === current.search;

      if (!isInternal || isSamePage) return;

      if (anchor.dataset.dropdownToggle) return;

      window.clearInterval(intervalRef.current);
      window.clearTimeout(completionRef.current);
      setVisible(true);
      setProgress(12);

      intervalRef.current = window.setInterval(() => {
        setProgress((currentProgress) => {
          if (currentProgress >= 90) {
            window.clearInterval(intervalRef.current);
            return 90;
          }
          return currentProgress + Math.max(2, (90 - currentProgress) * 0.12);
        });
      }, 180);
    };

    document.addEventListener("click", startProgress, true);
    return () => document.removeEventListener("click", startProgress, true);
  }, []);

  useEffect(() => {
    if (initialRenderRef.current) {
      initialRenderRef.current = false;
      return;
    }

    window.clearInterval(intervalRef.current);
    setProgress(100);
    completionRef.current = window.setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, 250);

    return () => window.clearTimeout(completionRef.current);
  }, [pathname, searchParams]);

  useEffect(() => {
    return () => {
      window.clearInterval(intervalRef.current);
      window.clearTimeout(completionRef.current);
    };
  }, []);

  return (
    <div
      className={`${styles.track} ${visible ? styles.visible : ""}`}
      aria-hidden="true"
    >
      <div className={styles.bar} style={{ transform: `scaleX(${progress / 100})` }} />
    </div>
  );
}

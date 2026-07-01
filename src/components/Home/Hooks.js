// hooks.js
// Small, dependency-free hooks shared by the redesigned sections.
// Drop this file next to Home.jsx (e.g. src/components/Home/hooks.js)
// and import what you need: `import { useInView, useReducedMotion, useCountUp, useTilt } from './hooks';`

import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * useReducedMotion
 * Tracks the user's `prefers-reduced-motion` setting reactively (handles OS-level
 * toggles mid-session, not just on mount). All animated hooks below read this and
 * fall back to an immediate, static end-state instead of animating.
 */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e) => setReduced(e.matches);
    // addEventListener is the modern API; addListener is the Safari <14 fallback.
    if (mq.addEventListener) mq.addEventListener('change', handler);
    else mq.addListener(handler);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', handler);
      else mq.removeListener(handler);
    };
  }, []);

  return reduced;
}

/**
 * useInView
 * Single shared IntersectionObserver pattern for scroll-triggered reveals.
 * - triggerOnce: stop observing after first intersection (avoids re-running entrance
 *   animations every time a section scrolls past, which is cheap but unnecessary work).
 * - threshold/rootMargin: tune how early content fires.
 *
 * Returns [ref, isInView] — attach ref to the DOM node you want to observe.
 */
export function useInView({ threshold = 0.2, rootMargin = '0px', triggerOnce = true } = {}) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Graceful fallback: if IntersectionObserver isn't supported, just show content.
    if (typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            if (triggerOnce) observer.unobserve(entry.target);
          } else if (!triggerOnce) {
            setIsInView(false);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return [ref, isInView];
}

/**
 * useCountUp
 * Animates a number from 0 → target once `active` becomes true. Uses a single
 * requestAnimationFrame loop per instance (cancelled on unmount/re-trigger) so it
 * never runs unbounded work in the background. Respects reduced motion by jumping
 * straight to the target value.
 */
export function useCountUp(target, active, { duration = 1400, decimals = 0 } = {}) {
  const [value, setValue] = useState(0);
  const reduced = useReducedMotion();
  const rafRef = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    if (!active) return undefined;

    if (reduced) {
      setValue(target);
      return undefined;
    }

    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

    const tick = (timestamp) => {
      if (startRef.current === null) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuart(progress);
      setValue(Number((target * eased).toFixed(decimals)));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      startRef.current = null;
    };
  }, [active, target, duration, decimals, reduced]);

  return value;
}

/**
 * useTilt
 * Lightweight pointer-driven 3D tilt for a single element. Uses CSS custom
 * properties (--tilt-x / --tilt-y) updated directly via style, NOT React state,
 * so mousemove never triggers a re-render — this keeps it cheap even on rapid
 * pointer movement. Disabled entirely under reduced motion and on touch-only
 * devices (no hover capability), where tilt has no meaningful affordance.
 */
export function useTilt({ max = 8, scale = 1.02 } = {}) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || reduced) return undefined;
    if (typeof window !== 'undefined' && window.matchMedia &&
        !window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return undefined;
    }

    let frame = null;

    const handleMove = (e) => {
      const rect = node.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;  // 0..1
      const py = (e.clientY - rect.top) / rect.height;  // 0..1
      const tiltX = (py - 0.5) * -2 * max;
      const tiltY = (px - 0.5) * 2 * max;

      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        node.style.setProperty('--tilt-x', `${tiltX.toFixed(2)}deg`);
        node.style.setProperty('--tilt-y', `${tiltY.toFixed(2)}deg`);
        node.style.setProperty('--tilt-scale', String(scale));
      });
    };

    const handleLeave = () => {
      if (frame) cancelAnimationFrame(frame);
      node.style.setProperty('--tilt-x', '0deg');
      node.style.setProperty('--tilt-y', '0deg');
      node.style.setProperty('--tilt-scale', '1');
    };

    node.addEventListener('pointermove', handleMove);
    node.addEventListener('pointerleave', handleLeave);
    return () => {
      node.removeEventListener('pointermove', handleMove);
      node.removeEventListener('pointerleave', handleLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [max, scale, reduced]);

  return ref;
}

/**
 * useFocusManagement
 * Small helper for the contact form: moves focus to a status region whenever a
 * message appears, so screen reader users (and keyboard users in general) are
 * notified of success/error without hunting for it.
 */
export function useStatusFocus(message) {
  const ref = useRef(null);
  useEffect(() => {
    if (message && ref.current) {
      ref.current.focus();
    }
  }, [message]);
  return ref;
}

/**
 * useCarouselKeyboard
 * Arrow-key navigation helper for the testimonial carousel. Returns a keydown
 * handler to spread onto the carousel's container.
 */
export function useCarouselKeyboard(count, current, setCurrent) {
  return useCallback(
    (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        setCurrent((c) => (c + 1) % count);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setCurrent((c) => (c - 1 + count) % count);
      } else if (e.key === 'Home') {
        e.preventDefault();
        setCurrent(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        setCurrent(count - 1);
      }
    },
    [count, setCurrent]
  );
}
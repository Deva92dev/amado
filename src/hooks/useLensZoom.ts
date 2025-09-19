"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type LensState = {
  enabled: boolean;
  x: number;
  y: number;
};

export const useLensZoom = ({ lensSize = 220, scale = 4 } = {}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [state, setState] = useState<LensState>({
    enabled: false,
    x: 0,
    y: 0,
  });

  const half = lensSize / 2;

  const onMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = Math.min(r.width - 1, Math.max(1, e.clientX - r.left));
    const y = Math.min(r.height - 1, Math.max(1, e.clientY - r.top));
    setState((s) => (s.enabled ? { ...s, x, y } : s));
  }, []);

  const toggle = useCallback((next?: boolean) => {
    setState((s) => ({
      ...s,
      enabled: typeof next === "boolean" ? next : !s.enabled,
    }));
  }, []);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setState((s) => ({ ...s, enabled: false }));
    };
    window.addEventListener("keydown", onEsc);
    return window.removeEventListener("keydown", onEsc);
  }, []);

  const lensStyle = useMemo<React.CSSProperties>(() => {
    if (!state.enabled) return { display: "none" };
    return {
      position: "absolute",
      width: lensSize,
      height: lensSize,
      left: state.x - half,
      top: state.y - half,
      borderRadius: "9999px",
      boxShadow: "0 0 0 2px rgba(255,255,255,.8), 0 4px 24px rgba(0,0,0,.35)",
      pointerEvents: "none",
      overflow: "hidden",
    };
  }, [half, lensSize, state.enabled, state.x, state.y]);

  const zoomedImageStyle = useMemo<React.CSSProperties>(() => {
    if (!state.enabled) return {};
    // position background image so that lens center = mouse position
    return {
      position: "absolute",
      inset: 0,
      transformOrigin: `${state.x}px ${state.y}px`,
      transform: `scale(${scale})`,
      willChange: "transform",
      transition: "transform 120ms ease-out, transform-origin 80ms ease-out",
    };
  }, [state, scale]);

  return { ref, state, onMove, toggle, lensStyle, zoomedImageStyle };
};

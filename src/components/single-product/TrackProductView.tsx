"use client";

import { useEffect } from "react";

export function TrackProductView({ productId }: { productId: string }) {
  useEffect(() => {
    fetch("/api/track/recently-viewed", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
      keepalive: true,
    }).catch(() => {});
  }, [productId]);

  return null;
}

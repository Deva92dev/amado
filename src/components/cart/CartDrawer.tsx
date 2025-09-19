"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useCartUI } from "../Store/cart-ui";
import { useCartStore } from "../Store/cart";

export default function CartDrawer() {
  const isOpen = useCartUI((s) => s.isDrawerOpen);
  const close = useCartUI((s) => s.closeDrawer);
  const totalCount = useCartStore((s) => s.totalCount());
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  // Render a wrapper with a static class ALWAYS, both SSR and CSR
  // Do not include isOpen-dependent classes in this outer div
  return (
    <div
      className="fixed inset-0 z-50 pointer-events-none"
      aria-hidden={!isOpen}
    >
      {/* Render the dynamic subtree only after mount so SSR and CSR match */}
      {mounted && (
        <>
          <div
            className={`absolute inset-0 transition-opacity duration-300 ease-out bg-black/50 backdrop-blur-md ${
              isOpen ? "opacity-100 pointer-events-auto" : "opacity-0"
            }`}
            onClick={close}
          />
          <aside
            ref={panelRef}
            className={`absolute right-0 top-0 h-full w-full max-w-md glass-effect shadow-xl border border-border transition-transform duration-300 ease-out ${
              isOpen ? "translate-x-0 pointer-events-auto" : "translate-x-full"
            }`}
            role="dialog"
            aria-modal="true"
            aria-label="Cart drawer"
          >
            <header className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="text-lg font-semibold">Your Bag</h3>
              <button
                onClick={close}
                aria-label="Close"
                className="rounded-md px-2 py-1 hover:bg-accent hover:text-accent-foreground focus-visible:outline-2 focus-visible:outline-[hsl(var(--ring))]"
              >
                ✕
              </button>
            </header>

            <div className="p-4 space-y-3">
              <p className="text-sm text-muted-foreground">
                Items in bag:{" "}
                <span className="font-medium text-foreground">
                  {totalCount}
                </span>
              </p>
              <div className="text-xs text-muted-foreground">
                Recently added items appear instantly; totals refresh on Cart.
              </div>
            </div>

            <footer className="mt-auto p-4 border-t border-border flex items-center gap-3">
              <Link
                href="/cart"
                className="w-1/2 inline-flex items-center justify-center rounded-[--radius] border border-border bg-secondary text-secondary-foreground px-4 py-2 hover:bg-accent hover:text-accent-foreground transition-colors"
                onClick={close}
              >
                View cart
              </Link>
              <Link
                href="/checkout"
                className="w-1/2 inline-flex items-center justify-center rounded-[--radius] px-4 py-2"
                onClick={close}
                style={{
                  backgroundColor: "hsl(215, 100%, 40%)",
                  color: "#fff",
                }}
              >
                Checkout
              </Link>
            </footer>
          </aside>
        </>
      )}
    </div>
  );
}

"use client";
import { create } from "zustand";

type FullScreenState = {
  open: boolean;
  image: string | null;
  alt: string | null;
  openWith: (image: string, alt: string) => void;
  close: () => void;
};

export const useFullScreen = create<FullScreenState>((set) => ({
  open: false,
  image: null,
  alt: null,
  openWith: (image, alt) => set({ open: true, image, alt }),
  close: () => set({ open: false, image: null, alt: null }),
}));

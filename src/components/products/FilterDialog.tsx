"use client";

import { useState } from "react";
import { Filter } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import ProductFilters from "./ProductFilters";

type Props = {
  categories: string[];
  currentCategory: string;
  currentSort: string;
  currentSearch: string;
  currentLayout: string;
  colors: string[];
  sizes: string[];
  currentColor?: string;
  currentSize?: string;
};

export default function FilterSheet({
  categories,
  currentCategory,
  currentSort,
  currentSearch,
  currentLayout,
  colors,
  sizes,
  currentColor,
  currentSize,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="cursor-pointer flex flex-row gap-2 glass-effect"
        >
          <Filter className="w-4 h-4" />
          Filters
        </Button>
      </SheetTrigger>
      {/* side: "right" or "left" as preferred */}
      <SheetContent
        side="top"
        className="w-screen max-w-none left-0 right-0 h-auto max-h-screen               
          rounded-t-2xl p-4 overflow-y-auto"
      >
        <SheetHeader className="px-1">
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <div className="py-4">
          <ProductFilters
            categories={categories}
            currentCategory={currentCategory}
            currentSort={currentSort}
            currentSearch={currentSearch}
            currentLayout={currentLayout}
            colors={colors}
            sizes={sizes}
            currentColor={currentColor}
            currentSize={currentSize}
          />
        </div>
        <SheetFooter className="mt-auto">
          <SheetClose asChild>
            <Button variant="secondary" className="cursor-pointer">
              Close
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

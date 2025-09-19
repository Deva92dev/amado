"use client";

import { useMemo } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

type SortOption = "price-low" | "price-high" | "name-a-z" | "name-z-a";

type Props = {
  sortBy: SortOption;
  layout: string;
  search: string;
  category: string;
};

export default function SortSelect({
  sortBy,
  layout,
  search,
  category,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const current = useMemo(
    () => ({
      layout: layout || sp.get("layout") || "grid",
      search: search || sp.get("search") || "",
      category: category || sp.get("category") || "all",
      sortBy: (sortBy || (sp.get("sortBy") as SortOption)) ?? "name-a-z",
    }),
    [layout, search, category, sortBy, sp]
  );

  const onChange = (value: string) => {
    const params = new URLSearchParams(sp.toString());
    params.set("sortBy", value);
    if (current.layout) params.set("layout", current.layout);
    if (current.search) params.set("search", current.search);
    if (current.category && current.category !== "all") {
      params.set("category", current.category);
    } else {
      params.delete("category");
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Select defaultValue={current.sortBy} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]" aria-label="Sort products">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="name-a-z">Name (A → Z)</SelectItem>
        <SelectItem value="name-z-a">Name (Z → A)</SelectItem>
        <SelectItem value="price-low">Price (Low → High)</SelectItem>
        <SelectItem value="price-high">Price (High → Low)</SelectItem>
      </SelectContent>
    </Select>
  );
}

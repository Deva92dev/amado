"use client";

import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const SearchBar = ({ currentSearch }: { currentSearch?: string }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative max-w-md mx-auto">
      <input
        type="search"
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={currentSearch}
        placeholder="Search for products..."
        className="w-full pl-4 pr-12 py-3 rounded-full border bg-card/50 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-brand-accent focus:outline-none transition-shadow"
      />
      <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
    </div>
  );
};

export default SearchBar;

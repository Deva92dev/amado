"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "../ui/input";

const NavSearch = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const [search, setSearch] = useState(
    searchParams.get("search")?.toString() || ""
  );
  const [isVisible, setIsVisible] = useState(false);

  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    replace(`/products?${params.toString()}`);
  }, 300);

  useEffect(() => {
    if (!searchParams.get("search")) {
      setSearch("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.get("search")]);

  return (
    <div className="flex items-center relative">
      {isVisible ? (
        <div className="flex items-center gap-2">
          <Input
            type="search"
            placeholder="Search Products"
            className="max-w-32 lg:max-w-xs dark:bg-muted transition-all duration-300"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              handleSearch(e.target.value);
            }}
            autoFocus
          />
          <X
            className="w-6 h-6 text-gray-500 cursor-pointer hover:text-gray-700"
            onClick={() => setIsVisible(false)}
          />
        </div>
      ) : (
        <Search
          className="w-6 h-6 text-gray-500 cursor-pointer hover:text-gray-700"
          onClick={() => setIsVisible(true)}
        />
      )}
    </div>
  );
};

export default NavSearch;

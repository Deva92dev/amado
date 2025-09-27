"use client";

import { Search, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useState, useEffect, useTransition } from "react";
import { getSearchSuggestions } from "@/utils/actions";

const SearchBar = ({
  currentSearch,
  showSuggestions = false,
}: {
  currentSearch?: string;
  showSuggestions?: boolean;
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isPending, startTransition] = useTransition();

  const searchValue = currentSearch ?? searchParams.get("search") ?? "";

  useEffect(() => {
    setInputValue(searchValue);
  }, [searchValue]);

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("search", term);
      replace(`/products?${params.toString()}`);
    } else {
      params.delete("search");
      if (pathname === "/products") {
        replace(`/products?${params.toString()}`);
      }
    }
  }, 300);

  const fetchSuggestions = useDebouncedCallback(async (term: string) => {
    if (!term || !showSuggestions || term.length < 2) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    startTransition(async () => {
      try {
        const results = await getSearchSuggestions(term);
        setSuggestions(results);
        setShowDropdown(true);
      } catch (error) {
        console.error("Failed to fetch suggestions:", error);
        setSuggestions([]);
        setShowDropdown(false);
      }
    });
  }, 200);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    handleSearch(value);

    if (showSuggestions) {
      fetchSuggestions(value);
    }
  };

  const clearSearch = () => {
    setInputValue("");
    handleSearch("");
    setSuggestions([]);
    setShowDropdown(false);
  };

  const selectSuggestion = (suggestion: string) => {
    setInputValue(suggestion);
    handleSearch(suggestion);
    setShowDropdown(false);
    setSuggestions([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setShowDropdown(false);
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <input
          type="search"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() =>
            showSuggestions &&
            inputValue &&
            suggestions.length > 0 &&
            setShowDropdown(true)
          }
          onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
          placeholder="Search for products..."
          className="w-full pl-4 pr-20 py-3 rounded-full border bg-card/50 backdrop-blur-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-brand-accent focus:outline-none transition-all duration-200 focus:bg-card/70"
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {inputValue && (
            <button
              onClick={clearSearch}
              className="p-1 hover:bg-muted/20 rounded-full transition-colors"
              aria-label="Clear search"
            >
              <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
            </button>
          )}
          {isPending ? (
            <div className="h-5 w-5 animate-spin border-2 border-brand-accent border-t-transparent rounded-full" />
          ) : (
            <Search className="h-5 w-5 text-muted-foreground pointer-events-none" />
          )}
        </div>
      </div>
      {showDropdown && suggestions.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-card/95 backdrop-blur-md rounded-xl border border-border/50 shadow-xl z-50 max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => selectSuggestion(suggestion)}
              className="w-full text-left px-4 py-3 hover:bg-muted/20 transition-colors first:rounded-t-xl last:rounded-b-xl flex items-center gap-3"
            >
              <Search className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <span className="text-foreground truncate">{suggestion}</span>
            </button>
          ))}
        </div>
      )}
      {showDropdown &&
        suggestions.length === 0 &&
        inputValue.length >= 2 &&
        !isPending &&
        showSuggestions && (
          <div className="absolute top-full mt-2 w-full bg-card/95 backdrop-blur-md rounded-xl border border-border/50 shadow-xl z-50 p-4 text-center">
            <p className="text-muted-foreground text-sm">
              No suggestions found
            </p>
          </div>
        )}
    </div>
  );
};

export default SearchBar;

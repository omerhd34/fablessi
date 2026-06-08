/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "@/lib/icons";
import { cn } from "@/lib/utils";

export function HeaderSearchBar({ open, onClose }) {
 const router = useRouter();
 const inputRef = useRef(null);
 const [query, setQuery] = useState("");

 useEffect(() => {
  if (!open) {
   setQuery("");
   return;
  }
  const timer = window.setTimeout(() => inputRef.current?.focus(), 80);
  return () => window.clearTimeout(timer);
 }, [open]);

 const handleSubmit = (event) => {
  event.preventDefault();
  const trimmed = query.trim();
  if (trimmed) {
   router.push(`/ara?q=${encodeURIComponent(trimmed)}`);
  }
  onClose();
 };

 return (
  <div
   className={cn(
    "container-premium overflow-hidden transition-[max-height,opacity] duration-300 ease-out",
    open ? "max-h-24 pb-4 opacity-100" : "pointer-events-none max-h-0 opacity-0"
   )}
   aria-hidden={!open}
  >
   <form
    onSubmit={handleSubmit}
    className="header-search-pill flex w-full items-center gap-3"
    role="search"
   >
    <input
     ref={inputRef}
     type="search"
     value={query}
     onChange={(event) => setQuery(event.target.value)}
     placeholder="Ara..."
     className="min-w-0 flex-1 bg-transparent text-base text-charcoal outline-none placeholder:text-charcoal/45"
     aria-label="Arama"
    />
    <button
     type="submit"
     className="header-search-submit flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full transition-opacity hover:opacity-65"
     aria-label="Ara"
    >
     <Search className="size-5 text-charcoal/70" aria-hidden />
    </button>
   </form>
  </div>
 );
}

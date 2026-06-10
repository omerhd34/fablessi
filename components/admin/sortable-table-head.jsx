"use client";

import { ChevronDownIcon, ChevronUpIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

export function SortableTableHead({
 label,
 columnKey,
 sortKey,
 sortDir,
 onSort,
 className,
 centered = false,
}) {
 const active = sortKey === columnKey;

 return (
  <button
   type="button"
   onClick={() => onSort(columnKey)}
   className={cn(
    "inline-flex cursor-pointer items-center gap-1 rounded-sm font-medium transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    active ? "text-foreground" : "text-muted-foreground",
    centered && "justify-center",
    className
   )}
  >
   <span>{label}</span>
   {active ? (
    sortDir === "asc" ? (
     <ChevronUpIcon className="size-4 shrink-0" aria-hidden />
    ) : (
     <ChevronDownIcon className="size-4 shrink-0" aria-hidden />
    )
   ) : centered ? null : (
    <span className="size-4 shrink-0 opacity-0" aria-hidden />
   )}
  </button>
 );
}

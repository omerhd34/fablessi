"use client";

import { useState } from "react";
import { ColorPickerPanel } from "@/components/admin/color-picker-panel";
import { colorValueToPickerHex } from "@/lib/color-value";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export function VariantColorInput({ value = "", onChange }) {
 const [open, setOpen] = useState(false);
 const pickerHex = colorValueToPickerHex(value);

 function handlePickerChange(nextHex) {
  onChange(nextHex.toLowerCase());
 }

 return (
  <Popover open={open} onOpenChange={setOpen}>
   <PopoverTrigger asChild>
    <button
     type="button"
     aria-label="Renk seçici aç"
     className={cn(
      "flex size-10 cursor-pointer items-center justify-center rounded-lg border border-border/70 bg-background p-1.5 transition-colors hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
     )}
    >
     <span
      className="block size-full rounded-[calc(var(--radius)-2px)] ring-1 ring-foreground/10"
      style={{ backgroundColor: pickerHex }}
     />
    </button>
   </PopoverTrigger>
   <PopoverContent align="start" className="w-[min(20rem,calc(100vw-2rem))] p-4">
    <ColorPickerPanel value={pickerHex} onChange={handlePickerChange} />
   </PopoverContent>
  </Popover>
 );
}

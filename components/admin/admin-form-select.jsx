"use client";

import { useMemo, useState } from "react";
import {
 DropdownMenu,
 DropdownMenuContent,
 DropdownMenuRadioGroup,
 DropdownMenuRadioItem,
 DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

const EMPTY_VALUE = "__empty__";

export function AdminFormSelect({
 id,
 value,
 onValueChange,
 options,
 placeholder = "Seçin",
 allowEmpty = false,
 emptyLabel = "Seçin",
 className,
 disabled,
}) {
 const [open, setOpen] = useState(false);
 const selectValue = value || (allowEmpty ? EMPTY_VALUE : undefined);

 const selectedLabel = useMemo(() => {
  if (!value) {
   return allowEmpty ? emptyLabel : placeholder;
  }

  return options.find((option) => option.value === value)?.label ?? placeholder;
 }, [allowEmpty, emptyLabel, options, placeholder, value]);

 function handleValueChange(nextValue) {
  onValueChange(nextValue === EMPTY_VALUE ? "" : nextValue);
  setOpen(false);
 }

 return (
  <DropdownMenu modal={false} open={open} onOpenChange={setOpen}>
   <DropdownMenuTrigger asChild disabled={disabled}>
    <button
     type="button"
     id={id}
     disabled={disabled}
     aria-haspopup="listbox"
     aria-expanded={open}
     className={cn(
      "flex h-10 w-full cursor-pointer items-center justify-between gap-1.5 rounded-lg border border-border/70 bg-background/80 px-2.5 text-sm shadow-sm transition-[border-color,box-shadow] outline-none select-none hover:border-border focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50",
      !value && "text-muted-foreground",
      className
     )}
    >
     <span className="min-w-0 truncate text-left">{selectedLabel}</span>
     <ChevronDownIcon
      className={cn(
       "size-4 shrink-0 text-muted-foreground transition-transform duration-200",
       open && "rotate-180"
      )}
      aria-hidden
     />
    </button>
   </DropdownMenuTrigger>
   <DropdownMenuContent
    align="start"
    sideOffset={6}
    onCloseAutoFocus={(event) => event.preventDefault()}
    className="max-h-72 w-(--radix-dropdown-menu-trigger-width) rounded-xl border-border/70 p-1 shadow-lg"
   >
    <DropdownMenuRadioGroup value={selectValue} onValueChange={handleValueChange}>
     {allowEmpty ? (
      <DropdownMenuRadioItem
       value={EMPTY_VALUE}
       className="cursor-pointer rounded-lg py-2.5"
      >
       {emptyLabel}
      </DropdownMenuRadioItem>
     ) : null}
     {options.map((option) => (
      <DropdownMenuRadioItem
       key={option.value}
       value={option.value}
       className="cursor-pointer rounded-lg py-2.5"
      >
       {option.label}
      </DropdownMenuRadioItem>
     ))}
    </DropdownMenuRadioGroup>
   </DropdownMenuContent>
  </DropdownMenu>
 );
}

"use client";

import { ProductsSortMenu } from "@/components/catalog/products-sort-menu";
import { Search } from "@/lib/icons";

export function ProductsCatalogToolbar({
 search,
 onSearchChange,
 sort,
 onSortChange,
 resultCount,
}) {
 return (
  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
   <form
    role="search"
    onSubmit={(event) => event.preventDefault()}
    className="header-search-pill flex min-h-12 flex-1 items-center gap-3 px-4 md:px-5"
   >
    <input
     type="search"
     value={search}
     onChange={(event) => onSearchChange(event.target.value)}
     placeholder="Ara..."
     className="min-w-0 flex-1 bg-transparent text-base text-charcoal outline-none placeholder:text-charcoal/45"
     aria-label="Ürün ara"
    />
    <Search className="size-5 shrink-0 text-charcoal/55" aria-hidden />
   </form>

   <ProductsSortMenu sort={sort} onSortChange={onSortChange} />

   <p className="text-muted-foreground text-sm lg:sr-only">
    {resultCount} ürün
   </p>
  </div>
 );
}

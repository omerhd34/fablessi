"use client";

import { ProductsSortMenu } from "@/components/catalog/products-sort-menu";
import { useTranslations } from "@/contexts/locale-provider";
import { Search, X } from "@/lib/icons";

export function ProductsMobileCatalogControls({
 search,
 onSearchChange,
 sort,
 onSortChange,
}) {
 const { t } = useTranslations();

 return (
  <div className="flex items-center gap-3 lg:hidden">
   <form
    role="search"
    onSubmit={(event) => event.preventDefault()}
    className="catalog-mobile-search flex h-11 min-w-0 flex-1 items-center gap-2.5 rounded-full border border-charcoal/12 bg-white px-4 shadow-[0_1px_2px_rgb(0_0_0/4%)]"
   >
    <Search className="size-4 shrink-0 text-charcoal/45" aria-hidden />
    <input
     type="search"
     value={search}
     onChange={(event) => onSearchChange(event.target.value)}
     placeholder={t("catalog.searchProductsPlaceholder")}
     className="min-w-0 flex-1 bg-transparent text-sm text-charcoal outline-none placeholder:text-charcoal/45"
     aria-label={t("catalog.searchProducts")}
    />
    {search ? (
     <button
      type="button"
      onClick={() => onSearchChange("")}
      className="flex size-6 cursor-pointer items-center justify-center rounded-full text-charcoal/40 transition hover:bg-charcoal/5 hover:text-charcoal"
      aria-label={t("common.clearSearch")}
     >
      <X className="size-3.5" />
     </button>
    ) : null}
   </form>

   <ProductsSortMenu sort={sort} onSortChange={onSortChange} compact />
  </div>
 );
}

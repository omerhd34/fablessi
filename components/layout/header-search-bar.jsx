/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { Folder, Search, X } from "@/lib/icons";
import { useTranslations } from "@/contexts/locale-provider";
import { getLocalizedCollectionName } from "@/lib/i18n/display-names";
import { getCategoryLabelForProduct } from "@/lib/product-category";
import { getCollectionProductsHref, getPrimaryImageUrl } from "@/lib/product-utils";
import { cn } from "@/lib/utils";

const DEBOUNCE_MS = 280;

function SearchProductCard({ product, onNavigate, dictionary }) {
 const imageUrl = getPrimaryImageUrl(product);
 const categoryLabel = getCategoryLabelForProduct(product.slug, dictionary);
 const bottomLabel =
  getLocalizedCollectionName(product.collection, dictionary) ?? product.name;

 return (
  <Link
   href={`/urunler/${product.slug}`}
   onClick={onNavigate}
   className="group block"
  >
   <div className="search-product-card relative aspect-5/4 overflow-hidden rounded-2xl">
    {imageUrl ? (
     <Image
      src={imageUrl}
      alt={product.images?.[0]?.alt ?? product.name}
      fill
      sizes="(max-width: 640px) 50vw, 25vw"
      className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
     />
    ) : (
     <div className="absolute inset-0 bg-cream/70" aria-hidden />
    )}
    <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-transparent" />
    {categoryLabel ? (
     <span className="absolute top-2 right-2 z-10 inline-flex rounded-2xl bg-white/92 px-2.5 py-1 text-[0.65rem] font-semibold text-charcoal shadow-sm backdrop-blur-sm">
      {categoryLabel}
     </span>
    ) : null}
    <div className="absolute right-2 bottom-2 left-2">
     <span className="inline-flex max-w-[85%] rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-charcoal shadow-sm backdrop-blur-sm">
      {bottomLabel}
     </span>
    </div>
   </div>
  </Link>
 );
}

export function HeaderSearchBar({ open, onClose }) {
 const { t, dictionary } = useTranslations();
 const pathname = usePathname();
 const isHome = pathname === "/";
 const inputRef = useRef(null);
 const [mounted, setMounted] = useState(false);
 const [query, setQuery] = useState("");
 const [loading, setLoading] = useState(false);
 const [results, setResults] = useState({ collections: [], products: [] });

 useEffect(() => {
  setMounted(true);
 }, []);

 useEffect(() => {
  if (!open) {
   setQuery("");
   setResults({ collections: [], products: [] });
   setLoading(false);
   return;
  }

  const timer = window.setTimeout(() => inputRef.current?.focus(), 80);
  return () => window.clearTimeout(timer);
 }, [open]);

 const trimmed = query.trim();
 const showResultsPanel = Boolean(trimmed);

 useEffect(() => {
  if (!open) {
   document.body.style.overflow = "";
   return;
  }

  document.body.style.overflow = "hidden";
  return () => {
   document.body.style.overflow = "";
  };
 }, [open]);

 useEffect(() => {
  if (!trimmed) {
   setResults({ collections: [], products: [] });
   setLoading(false);
   return;
  }

  setLoading(true);
  const controller = new AbortController();
  const timer = window.setTimeout(async () => {
   try {
    const response = await fetch(
     `/api/search?q=${encodeURIComponent(trimmed)}`,
     { signal: controller.signal }
    );
    if (!response.ok) throw new Error("Search failed");
    const data = await response.json();
    setResults({
     collections: data.collections ?? [],
     products: data.products ?? [],
    });
   } catch (error) {
    if (error.name !== "AbortError") {
     setResults({ collections: [], products: [] });
    }
   } finally {
    setLoading(false);
   }
  }, DEBOUNCE_MS);

  return () => {
   controller.abort();
   window.clearTimeout(timer);
  };
 }, [trimmed]);

 const handleNavigate = useCallback(() => {
  onClose();
 }, [onClose]);

 const handleSubmit = (event) => {
  event.preventDefault();
 };

 const hasResults =
  results.collections.length > 0 || results.products.length > 0;
 const showEmpty = trimmed && !loading && !hasResults;

 const searchForm = (
  <form
   onSubmit={handleSubmit}
   className="header-search-pill flex w-full items-center gap-2 sm:gap-3"
   role="search"
  >
   <input
    ref={inputRef}
    type="search"
    value={query}
    onChange={(event) => setQuery(event.target.value)}
    placeholder={t("common.searchPlaceholder")}
    className="min-w-0 flex-1 bg-transparent text-base text-charcoal outline-none placeholder:text-charcoal/45"
    aria-label={t("common.searchLabel")}
   />
   {query ? (
    <button
     type="button"
     onClick={() => setQuery("")}
     className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-charcoal/55 transition-opacity hover:opacity-65"
     aria-label={t("common.clearSearch")}
    >
     <X className="size-5" aria-hidden />
    </button>
   ) : null}
   <button
    type="submit"
    className="header-search-submit flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full transition-opacity hover:opacity-65"
    aria-label={t("common.search")}
   >
    <Search className="size-5 text-charcoal/70" aria-hidden />
   </button>
  </form>
 );

 return (
  <>
   {mounted && open && !showResultsPanel
    ? createPortal(
     <button
      type="button"
      className={cn(
       "search-backdrop-layer",
       isHome && "search-backdrop-layer--hero"
      )}
      onClick={onClose}
      aria-label={t("common.closeSearch")}
     />,
     document.body
    )
    : null}

   {open && !showResultsPanel ? (
    <div className="container-premium pb-4">{searchForm}</div>
   ) : null}

   {mounted && open && showResultsPanel
    ? createPortal(
     <div
      className={cn("search-overlay", isHome && "search-overlay--hero")}
      role="dialog"
      aria-modal="true"
      aria-label={t("common.searchResults")}
     >
      <button
       type="button"
       className="search-overlay-backdrop"
       onClick={onClose}
       aria-label={t("common.closeSearch")}
      />

      <div className="search-overlay-panel container-premium">
       {searchForm}

       <div
        className={cn(
         "search-overlay-results",
         (hasResults || loading || showEmpty) &&
         "search-overlay-results--visible"
        )}
       >
        {loading ? (
         <div className="search-overlay-status flex justify-center">
          <div className="search-overlay-loader" role="status" aria-label={t("common.searching")}>
           <Search className="search-overlay-loader__icon" aria-hidden />
          </div>
         </div>
        ) : null}

        {!loading && results.collections.length > 0 ? (
         <section className="search-overlay-section">
          <h3 className="search-overlay-section-title">{t("catalog.collections")}</h3>
          <ul className="flex flex-wrap gap-2">
           {results.collections.map((collection) => (
            <li key={collection.id}>
             <Link
              href={getCollectionProductsHref(collection.slug)}
              onClick={handleNavigate}
              className="search-collection-chip"
             >
              <Folder
               className="size-4 shrink-0 text-charcoal/55"
               aria-hidden
              />
              {getLocalizedCollectionName(collection, dictionary) ?? collection.name}
             </Link>
            </li>
           ))}
          </ul>
         </section>
        ) : null}

        {!loading && results.products.length > 0 ? (
         <section className="search-overlay-section">
          <h3 className="search-overlay-section-title">{t("catalog.products")}</h3>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
           {results.products.map((product) => (
            <SearchProductCard
             key={product.id}
             product={product}
             dictionary={dictionary}
             onNavigate={handleNavigate}
            />
           ))}
          </div>
         </section>
        ) : null}

        {showEmpty ? (
         <p className="search-overlay-status">
          {t("catalog.noSearchResults")}
         </p>
        ) : null}
       </div>
      </div>
     </div>,
     document.body
    )
    : null}
  </>
 );
}

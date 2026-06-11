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

function SearchProductCard({ product, onNavigate, dictionary }) {
 const imageUrl = getPrimaryImageUrl(product);
 const categoryLabel = getCategoryLabelForProduct(product, dictionary);
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
 const [submittedQuery, setSubmittedQuery] = useState("");
 const [loading, setLoading] = useState(false);
 const [results, setResults] = useState({ collections: [], products: [] });

 useEffect(() => {
  setMounted(true);
 }, []);

 useEffect(() => {
  if (!open) {
   setQuery("");
   setSubmittedQuery("");
   setResults({ collections: [], products: [] });
   setLoading(false);
   return;
  }

  const timer = window.setTimeout(() => inputRef.current?.focus(), 80);
  return () => window.clearTimeout(timer);
 }, [open]);

 const showResultsPanel = Boolean(submittedQuery);

 useEffect(() => {
  if (!submittedQuery) {
   setResults({ collections: [], products: [] });
   setLoading(false);
   return;
  }

  setLoading(true);
  const controller = new AbortController();

  (async () => {
   try {
    const response = await fetch(
     `/api/search?q=${encodeURIComponent(submittedQuery)}`,
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
  })();

  return () => controller.abort();
 }, [submittedQuery]);

 const handleNavigate = useCallback(() => {
  onClose();
 }, [onClose]);

 const handleSubmit = (event) => {
  event.preventDefault();
  setSubmittedQuery(query.trim());
 };

 const handleClear = () => {
  setQuery("");
  setSubmittedQuery("");
  setResults({ collections: [], products: [] });
  setLoading(false);
  inputRef.current?.focus();
 };

 const hasResults =
  results.collections.length > 0 || results.products.length > 0;
 const showEmpty = submittedQuery && !loading && !hasResults;

 const resultsPanel =
  showResultsPanel ? (
   <div
    className={cn(
     "search-overlay-results",
     (hasResults || loading || showEmpty) && "search-overlay-results--visible"
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
     <p className="search-overlay-status">{t("catalog.noSearchResults")}</p>
    ) : null}
   </div>
  ) : null;

 const searchForm = (
  <form
   onSubmit={handleSubmit}
   className="header-search-pill"
   role="search"
  >
   <div className="header-search-pill__field">
    <input
     ref={inputRef}
     type="text"
     inputMode="search"
     enterKeyHint="search"
     autoComplete="off"
     autoCorrect="off"
     spellCheck={false}
     value={query}
     onChange={(event) => setQuery(event.target.value)}
     placeholder={t("common.searchPlaceholder")}
     className="header-search-pill__input"
     aria-label={t("common.searchLabel")}
    />
    <div className="header-search-pill__actions">
     {query ? (
      <button
       type="button"
       onClick={handleClear}
       className="header-search-clear"
       aria-label={t("common.clearSearch")}
      >
       <X className="size-4" aria-hidden />
      </button>
     ) : null}
     <button
      type="submit"
      className="header-search-submit"
      aria-label={t("common.search")}
     >
      <Search className="size-[1.125rem]" aria-hidden />
     </button>
    </div>
   </div>
  </form>
 );

 return (
  <>
   {mounted && open
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

   {open ? (
    <div
     className="header-search-shell container-premium pb-4"
     role={showResultsPanel ? "dialog" : undefined}
     aria-modal={showResultsPanel ? "true" : undefined}
     aria-label={showResultsPanel ? t("common.searchResults") : undefined}
    >
     {searchForm}
     {resultsPanel}
    </div>
   ) : null}

   {mounted && open && showResultsPanel && !isHome
    ? createPortal(
     <button
      type="button"
      className="search-results-backdrop"
      onClick={onClose}
      aria-label={t("common.closeSearch")}
     />,
     document.body
    )
    : null}
  </>
 );
}

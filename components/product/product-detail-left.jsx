"use client";

import Link from "next/link";
import { showFavoriteToast } from "@/components/favorites/favorite-toast";
import { ProductDimensionsScrollButton } from "@/components/product/product-dimensions-scroll-button";
import { useFavorites } from "@/contexts/favorites-provider";
import { useLocale } from "@/contexts/locale-provider";
import { Heart, HeartFilled } from "@/lib/icons";
import { getColorLabel } from "@/lib/catalog-colors";
import {
 getColorSwatch,
 getProductFavoriteToastLabel,
 getProductShortName,
} from "@/lib/product-utils";
import { cn } from "@/lib/utils";

function getSegmentTextClass(hex) {
 const normalized = hex.replace("#", "");
 const r = Number.parseInt(normalized.slice(0, 2), 16);
 const g = Number.parseInt(normalized.slice(2, 4), 16);
 const b = Number.parseInt(normalized.slice(4, 6), 16);
 const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

 return luminance > 0.62 ? "text-charcoal" : "text-white";
}

function ActionButton({
 icon: Icon,
 children,
 onClick,
 className,
 "aria-pressed": ariaPressed,
}) {
 return (
  <button
   type="button"
   onClick={onClick}
   aria-pressed={ariaPressed}
   className={cn(
    "flex w-full cursor-pointer items-center gap-3 rounded-2xl border border-charcoal/10 bg-white px-4 py-3.5 text-left text-sm font-medium text-charcoal shadow-[0_1px_3px_rgb(0_0_0/4%)] transition hover:border-charcoal/18 hover:shadow-[0_4px_16px_rgb(0_0_0/6%)]",
    className
   )}
  >
   <Icon className="size-5 shrink-0 text-charcoal/55" aria-hidden />
   <span>{children}</span>
  </button>
 );
}

export function ProductDetailLeft({
 product,
 categoryLabel,
 categoryHref,
 selectedVariant,
 onVariantChange,
 onViewDimensions,
 section = "all",
 className,
}) {
 const { t, dictionary } = useLocale();
 const { isFavorite, toggleFavorite, hydrated } = useFavorites();
 const variants = product.variants ?? [];
 const favorited = hydrated && isFavorite(product.slug);

 const handleToggleFavorite = () => {
  const added = toggleFavorite(product);

  showFavoriteToast({
   added,
   title: added ? t("favorites.addedToast") : t("favorites.removedToast"),
   description: getProductFavoriteToastLabel(product, dictionary),
   closeLabel: t("common.close"),
  });
 };

 const showHeader = section === "all" || section === "header";
 const showControls = section === "all" || section === "controls";

 const header = showHeader ? (
  <div className="space-y-3">
   <nav aria-label={t("catalog.products")}>
    <ol className="text-muted-foreground flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs font-medium tracking-[0.14em] uppercase">
     <li>
      <Link href="/urunler" className="transition-colors hover:text-charcoal">
       {t("catalog.products")}
      </Link>
     </li>
     {categoryLabel ? (
      <>
       <li aria-hidden className="text-charcoal/25">
        /
       </li>
       <li>
        {categoryHref ? (
         <Link
          href={categoryHref}
          className="transition-colors hover:text-charcoal"
         >
          {categoryLabel}
         </Link>
        ) : (
         categoryLabel
        )}
       </li>
      </>
     ) : null}
    </ol>
   </nav>
   <h1 className="font-heading text-3xl font-semibold tracking-tight text-charcoal md:text-4xl">
    {getProductShortName(product, dictionary)}
   </h1>
  </div>
 ) : null;

 const controls = showControls ? (
  <>
   <div className="space-y-2.5">
    <ActionButton
     icon={favorited ? HeartFilled : Heart}
     onClick={handleToggleFavorite}
     className={favorited ? "border-charcoal/20 bg-cream/60" : undefined}
     aria-pressed={favorited}
    >
     {favorited ? t("product.removeFromFavorites") : t("product.addToFavorites")}
    </ActionButton>
    {section === "all" ? (
     <ProductDimensionsScrollButton
      product={product}
      t={t}
      onClick={onViewDimensions}
     />
    ) : null}
   </div>

   {variants.length > 0 ? (
    <div className="product-color-picker">
     <p className="text-xs font-semibold tracking-[0.14em] text-charcoal/45 uppercase">
      {t("product.color")}
     </p>
     <div
      className="product-color-picker__tray mt-3 flex h-12 w-full"
      role="listbox"
      aria-label={t("product.colorOptions")}
     >
      {variants.map((variant, index) => {
       const active = selectedVariant?.id === variant.id;
       const label = variant.color
        ? getColorLabel(variant.color, t)
        : variant.name;
       const swatch = variant.color ? getColorSwatch(variant.color) : "#d1d5db";

       return (
        <button
         key={variant.id}
         type="button"
         title={label}
         role="option"
         aria-selected={active}
         onClick={() => onVariantChange(variant)}
         className={cn(
          "product-color-segment flex min-w-0 flex-1 items-center justify-center px-2",
          index > 0 && "product-color-segment--divider"
         )}
         style={{ backgroundColor: swatch }}
         aria-label={label}
        >
         <span
          className={cn(
           "product-color-segment__label truncate text-xs font-semibold tracking-wide",
           getSegmentTextClass(swatch)
          )}
         >
          {label}
         </span>
        </button>
       );
      })}
     </div>
    </div>
   ) : null}
  </>
 ) : null;

 return (
  <aside className={cn("flex flex-col gap-8", className)}>
   {header}
   {controls}
  </aside>
 );
}

"use client";

import Link from "next/link";
import { showFavoriteToast } from "@/components/favorites/favorite-toast";
import { ProductDimensionsScrollButton } from "@/components/product/product-dimensions-scroll-button";
import { useFavorites } from "@/contexts/favorites-provider";
import { useLocale } from "@/contexts/locale-provider";
import { Heart, HeartFilled, Payments } from "@/lib/icons";
import {
 getFormattedProductPriceParts,
 getPriceItemLabel,
 getPriceItemLineTotal,
 getPriceItems,
 getProductCardLabel,
 getProductDisplayPrice,
 getProductFavoriteToastLabel,
} from "@/lib/product-utils";
import { cn } from "@/lib/utils";

function ProductDetailPrice({ product, locale, className }) {
 const { t } = useLocale();
 const priceItems = getPriceItems(product);
 const total = getProductDisplayPrice(product);

 if (priceItems.length === 0 || total == null) return null;

 const { amount, currency } = getFormattedProductPriceParts(total, locale);
 const isSingleItem = priceItems.length === 1;

 if (isSingleItem) {
  const item = priceItems[0];
  const itemLabel = getPriceItemLabel(item);
  const { amount: itemAmount } = getFormattedProductPriceParts(
   getPriceItemLineTotal(item),
   locale
  );

  return (
   <div
    className={cn(
     "product-detail-price flex w-full gap-3 rounded-3xl border border-charcoal/12 bg-white px-5 py-4 shadow-[0_1px_3px_rgb(0_0_0/4%)]",
     className
    )}
   >
    <Payments className="mt-0.5 size-5 shrink-0 text-black" aria-hidden />
    <div className="flex min-w-0 flex-1 flex-col gap-2">
     <span className="text-[0.65rem] font-semibold tracking-[0.18em] text-charcoal/40 uppercase">
      {t("product.price")}
     </span>
     {itemLabel ? (
      <p className="text-sm leading-snug font-semibold wrap-break-word text-charcoal">
       {itemLabel}
      </p>
     ) : null}
     <div className="flex items-baseline gap-2">
      <span className="font-heading text-xl font-semibold tracking-tight text-charcoal tabular-nums sm:text-2xl">
       {itemAmount}
      </span>
      <span className="text-xs font-semibold tracking-[0.14em] text-charcoal/45 uppercase">
       {currency}
      </span>
     </div>
    </div>
   </div>
  );
 }

 return (
  <div
   className={cn(
    "product-detail-price flex w-full gap-3 rounded-3xl border border-charcoal/12 bg-white px-5 py-4 shadow-[0_1px_3px_rgb(0_0_0/4%)]",
    className
   )}
  >
   <Payments className="mt-0.5 size-5 shrink-0 text-black" aria-hidden />
   <div className="flex min-w-0 flex-1 flex-col gap-3">
    <span className="text-[0.65rem] font-semibold tracking-[0.18em] text-charcoal/40 uppercase">
     {t("product.price")}
    </span>
    <ul className="flex flex-col gap-2">
     {priceItems.map((item, index) => {
      const itemLabel = getPriceItemLabel(item);
      const { amount: itemAmount } = getFormattedProductPriceParts(
       getPriceItemLineTotal(item),
       locale
      );

      return (
       <li
        key={`${item.name}-${index}`}
        className="grid gap-1 text-sm text-charcoal sm:grid-cols-[minmax(0,1fr)_auto] sm:items-baseline sm:gap-3"
       >
        <span className="font-medium wrap-break-word">
         {itemLabel ?? "—"}
        </span>
        <span className="tabular-nums text-charcoal/75 sm:text-right">
         {itemAmount} {currency}
        </span>
       </li>
      );
     })}
    </ul>
    <div className="flex items-baseline justify-between gap-3 border-t border-charcoal/10 pt-3">
     <span className="text-sm font-semibold text-charcoal">
      {t("product.priceTotal")}
     </span>
     <div className="flex items-baseline gap-2">
      <span className="font-heading text-xl font-semibold tracking-tight text-charcoal tabular-nums sm:text-2xl">
       {amount}
      </span>
      <span className="text-xs font-semibold tracking-[0.14em] text-charcoal/45 uppercase">
       {currency}
      </span>
     </div>
    </div>
   </div>
  </div>
 );
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
    "flex w-full cursor-pointer items-center gap-3 rounded-3xl border border-charcoal/12 bg-white px-5 py-4 text-left text-sm font-medium text-charcoal shadow-[0_1px_3px_rgb(0_0_0/4%)] transition hover:border-charcoal/18 hover:shadow-[0_4px_16px_rgb(0_0_0/6%)]",
    className
   )}
  >
   <Icon className="size-5 shrink-0 text-black" aria-hidden />
   <span>{children}</span>
  </button>
 );
}

export function ProductDetailLeft({
 product,
 categoryLabel,
 categoryHref,
 onViewDimensions,
 section = "all",
 className,
}) {
 const { t, dictionary, locale } = useLocale();
 const { isFavorite, toggleFavorite, hydrated } = useFavorites();
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
  <div className="min-w-0 space-y-3">
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
   <h1 className="font-heading min-w-0 text-3xl font-semibold tracking-tight wrap-break-word text-charcoal md:text-4xl">
    {getProductCardLabel(product, dictionary)}
   </h1>
  </div>
 ) : null;

 const controls = showControls ? (
  <div className="flex flex-col gap-4">
   {product.material ? (
    <div className="flex flex-col gap-1">
     <p className="text-xs font-semibold tracking-[0.14em] text-charcoal/45 uppercase">
      {t("product.material")}
     </p>
     <p className="text-sm text-charcoal/80">{product.material}</p>
    </div>
   ) : null}

   <ActionButton
    icon={favorited ? HeartFilled : Heart}
    onClick={handleToggleFavorite}
    className={favorited ? "border-charcoal/20 bg-cream/60" : undefined}
    aria-pressed={favorited}
   >
    {favorited ? t("product.removeFromFavorites") : t("product.addToFavorites")}
   </ActionButton>
   {section === "controls" ? (
    <ProductDetailPrice product={product} locale={locale} />
   ) : null}
   {section === "all" ? (
    <ProductDimensionsScrollButton
     product={product}
     t={t}
     onClick={onViewDimensions}
     className="rounded-3xl border-charcoal/12 px-5 py-4"
    />
   ) : null}
   {section === "all" ? (
    <ProductDetailPrice product={product} locale={locale} />
   ) : null}
  </div>
 ) : null;

 return (
  <aside className={cn("flex min-w-0 flex-col gap-8", className)}>
   {header}
   {controls}
  </aside>
 );
}

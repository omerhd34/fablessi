"use client";

import {
 CompareArrows,
 Copyright,
 Handshake,
 Heart,
 Ruler,
 SupportAgent,
} from "@/lib/icons";
import { getProductCardLabel, getProductShortName } from "@/lib/product-utils";
import { cn } from "@/lib/utils";

const serviceItems = [
 {
  icon: Handshake,
  text: "Alüminyum iskelet ve UV dayanımlı outdoor kumaşlarla üretilen ürünlerimiz teras, bahçe ve havuz kenarı kullanımına uygundur.",
 },
 {
  icon: SupportAgent,
  text: "Proje bazlı ölçü, renk ve konfigürasyon talepleriniz için satış ekibimizle iletişime geçebilirsiniz.",
 },
 {
  icon: Copyright,
  text: "Ürün görselleri ve tasarımlar Fablessi'ye aittir; izinsiz kullanılamaz.",
 },
];

function ActionButton({ icon: Icon, children, onClick, className }) {
 return (
  <button
   type="button"
   onClick={onClick}
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
 onScrollToSizeChart,
 className,
}) {
 return (
  <aside className={cn("flex flex-col gap-8", className)}>
   <div className="space-y-3">
    {categoryLabel ? (
     <p className="text-muted-foreground text-xs font-medium tracking-[0.14em] uppercase">
      {categoryLabel}
     </p>
    ) : null}
    <h1 className="font-heading text-3xl font-semibold tracking-tight text-charcoal md:text-4xl">
     {getProductShortName(product)}
    </h1>
    <p className="text-muted-foreground text-sm">{getProductCardLabel(product)}</p>
   </div>

   <div className="space-y-2.5">
    <ActionButton icon={Heart}>Favorilere Ekle</ActionButton>
    <ActionButton icon={CompareArrows}>Ürünü Karşılaştır</ActionButton>
    <ActionButton icon={Ruler} onClick={onScrollToSizeChart}>
     Ölçü Tablosunu Gör
    </ActionButton>
   </div>

   <div className="rounded-3xl border border-charcoal/8 bg-white p-5 shadow-[0_8px_30px_rgb(0_0_0/5%)]">
    <ul className="space-y-4">
     {serviceItems.map((item) => (
      <li key={item.text} className="flex gap-3">
       <item.icon className="mt-0.5 size-5 shrink-0 text-charcoal/45" aria-hidden />
       <p className="text-sm leading-relaxed text-charcoal/70">{item.text}</p>
      </li>
     ))}
    </ul>
   </div>
  </aside>
 );
}

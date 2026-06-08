"use client";

import { useMemo, useRef, useState } from "react";
import { ProductDetailCenter } from "@/components/product/product-detail-center";
import { ProductDetailLeft } from "@/components/product/product-detail-left";
import { ProductDetailRight } from "@/components/product/product-detail-right";
import { ProductImageLightbox } from "@/components/product/product-image-lightbox";
import { getImagesForVariant } from "@/lib/product-utils";

function getDefaultVariant(variants) {
 return variants.find((variant) => variant.isDefault) ?? variants[0] ?? null;
}

export function ProductDetailView({
 product,
 categoryLabel,
 categoryProducts = [],
}) {
 const [selectedVariant, setSelectedVariant] = useState(() =>
  getDefaultVariant(product.variants)
 );
 const [lightbox, setLightbox] = useState({ images: [], index: null });
 const centerScrollRef = useRef(null);

 const visibleImages = useMemo(
  () => getImagesForVariant(product.images, selectedVariant),
  [product.images, selectedVariant]
 );

 const openLightbox = (images, index) => {
  if (!images.length) return;
  setLightbox({ images, index });
 };

 const closeLightbox = () => setLightbox({ images: [], index: null });

 const scrollToSizeChart = () => {
  const target = document.getElementById("product-size-chart");
  const container = centerScrollRef.current;

  if (container && target) {
   container.scrollTo({
    top: target.offsetTop - 24,
    behavior: "smooth",
   });
   return;
  }

  target?.scrollIntoView({ behavior: "smooth", block: "start" });
 };

 return (
  <>
   <div className="flex flex-col gap-10 lg:grid lg:h-[calc(100dvh-var(--header-height-desktop)-2rem)] lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)_minmax(0,19rem)] lg:items-stretch lg:gap-8 xl:grid-cols-[minmax(0,18rem)_minmax(0,1fr)_minmax(0,21rem)] xl:gap-10">
    <ProductDetailLeft
     product={product}
     categoryLabel={categoryLabel}
     onScrollToSizeChart={scrollToSizeChart}
     className="lg:shrink-0 lg:overflow-hidden"
    />

    <section
     ref={centerScrollRef}
     className="min-h-0 lg:overflow-y-auto lg:pr-1 lg:pb-6 product-detail-scroll"
    >
     <ProductDetailCenter
      product={product}
      images={visibleImages}
      selectedVariant={selectedVariant}
      onImageClick={(index) => openLightbox(visibleImages, index)}
      className="pb-10 lg:pb-6"
     />
    </section>

    <ProductDetailRight
     product={product}
     selectedVariant={selectedVariant}
     onVariantChange={setSelectedVariant}
     categoryLabel={categoryLabel}
     categoryProducts={categoryProducts}
     className="lg:min-h-0 lg:overflow-hidden"
    />
   </div>

   <ProductImageLightbox
    images={lightbox.images}
    index={lightbox.index}
    onIndexChange={(index) =>
     setLightbox((current) => ({ ...current, index }))
    }
    onClose={closeLightbox}
   />
  </>
 );
}

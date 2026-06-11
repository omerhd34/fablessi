"use client";

import { useCallback, useRef, useState } from "react";
import { ProductDetailCenter } from "@/components/product/product-detail-center";
import { ProductDetailLeft } from "@/components/product/product-detail-left";
import { ProductDetailRight } from "@/components/product/product-detail-right";
import { ProductImageLightbox } from "@/components/product/product-image-lightbox";

export function ProductDetailView({
 product,
 categoryLabel,
 categoryHref,
 categoryProducts = [],
}) {
 const [lightbox, setLightbox] = useState({ images: [], index: null });
 const [openDimensions, setOpenDimensions] = useState(false);
 const centerScrollRef = useRef(null);
 const visibleImages = product.images ?? [];

 const openLightbox = (images, index) => {
  if (!images.length) return;
  setLightbox({ images, index });
 };

 const closeLightbox = () => setLightbox({ images: [], index: null });

 const handleViewDimensions = useCallback(() => {
  const isContainedScroll = window.matchMedia("(min-width: 1024px)").matches;

  setOpenDimensions(true);

  window.setTimeout(() => {
   const container = centerScrollRef.current;
   const target = container?.querySelector("[data-product-dimensions]");

   if (!target) return;

   if (isContainedScroll && container) {
    const offset =
     target.getBoundingClientRect().top -
     container.getBoundingClientRect().top +
     container.scrollTop;

    container.scrollTo({
     top: Math.max(0, offset - 24),
     behavior: "smooth",
    });
   } else {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
   }
  }, 350);
 }, []);

 return (
  <>
   <div className="flex flex-col gap-4 lg:grid lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)_minmax(0,19rem)] lg:items-start lg:gap-8 xl:grid-cols-[minmax(0,18rem)_minmax(0,1fr)_minmax(0,21rem)] xl:gap-10">
    <ProductDetailLeft
     product={product}
     categoryLabel={categoryLabel}
     categoryHref={categoryHref}
     onViewDimensions={handleViewDimensions}
     section="header"
     className="lg:hidden"
    />
    <ProductDetailLeft
     product={product}
     categoryLabel={categoryLabel}
     categoryHref={categoryHref}
     onViewDimensions={handleViewDimensions}
     className="hidden min-w-0 lg:flex lg:shrink-0"
    />

    <section
     ref={centerScrollRef}
     className="min-h-0 lg:max-h-[calc(100dvh-var(--header-height-desktop)-2rem)] lg:overflow-y-auto lg:pr-1 lg:pb-6 product-detail-scroll"
    >
     <ProductDetailCenter
      product={product}
      images={visibleImages}
      onImageClick={(index) => openLightbox(visibleImages, index)}
      openDimensions={openDimensions}
      className="pb-0 lg:pb-6"
      belowGallery={
       <ProductDetailLeft
        product={product}
        categoryLabel={categoryLabel}
        categoryHref={categoryHref}
        onViewDimensions={handleViewDimensions}
        section="controls"
        className="lg:hidden"
       />
      }
     />
    </section>

    <ProductDetailRight
     product={product}
     categoryLabel={categoryLabel}
     categoryProducts={categoryProducts}
     className="lg:self-start"
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

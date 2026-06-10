export const heroSlidesData = [
 { slug: "acelya-oturma", image: "/acelya-oturma/antrasit-01.jpg", href: "/urunler/acelya-oturma" },
 { slug: "tesla-oturma", image: "/tesla-oturma/01.jpg", href: "/urunler/tesla-oturma" },
 { slug: "velar-oturma", image: "/velar-oturma/01.jpg", href: "/urunler/velar-oturma" },
 { slug: "aston-oturma", image: "/aston-oturma/antrasit-01.jpg", href: "/urunler/aston-oturma" },
];

export const mobileHeroSlidesData = [
 { slug: "mobile-1", image: "/mobile/hero-1.png" },
 { slug: "mobile-2", image: "/mobile/hero-2.png" },
 { slug: "mobile-3", image: "/mobile/hero-3.png" },
 { slug: "mobile-4", image: "/mobile/hero-4.png" },
 { slug: "mobile-5", image: "/mobile/hero-5.png" },
];

export function buildHeroSlides(dictionary) {
 return heroSlidesData.map((slide) => ({
  key: slide.slug,
  image: slide.image,
  href: slide.href,
  alt: dictionary.hero.slides[slide.slug].alt,
 }));
}

export function buildMobileHeroSlides(dictionary) {
 return mobileHeroSlidesData.map((slide) => ({
  key: slide.slug,
  image: slide.image,
  alt: dictionary.hero.mobileSlides[slide.slug].alt,
 }));
}

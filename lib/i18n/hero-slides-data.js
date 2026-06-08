export const heroSlidesData = [
 { slug: "acelya-oturma", image: "/acelya-oturma/antrasit-01.jpg", href: "/urunler/acelya-oturma" },
 { slug: "tesla-oturma", image: "/tesla-oturma/01.jpg", href: "/urunler/tesla-oturma" },
 { slug: "velar-oturma", image: "/velar-oturma/01.jpg", href: "/urunler/velar-oturma" },
 { slug: "aston-oturma", image: "/aston-oturma/antrasit-01.jpg", href: "/urunler/aston-oturma" },
];

export function buildHeroSlides(dictionary) {
 return heroSlidesData.map((slide) => {
  const content = dictionary.hero.slides[slide.slug];

  return {
   image: slide.image,
   alt: content.alt,
   headline: content.headline,
   lines: content.lines,
   cta: { label: content.cta, href: slide.href },
  };
 });
}

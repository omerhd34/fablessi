const HERO_SLIDE_FILES = {
 sm: "1080x1920.png",
 md: "1440x2560.png",
 lg: "2560x1707.jpg",
 xl: "3200x2133.jpg",
 "2xl": "3840x2560.jpg",
};

function buildSlideImages(folder) {
 return Object.fromEntries(
  Object.entries(HERO_SLIDE_FILES).map(([breakpoint, file]) => [
   breakpoint,
   `/slayts/${folder}/${file}`,
  ])
 );
}

export const heroSlidesData = [
 { slug: "slide-4", images: buildSlideImages("4") },
 { slug: "slide-3", images: buildSlideImages("3") },
 { slug: "slide-2", images: buildSlideImages("2") },
 { slug: "slide-1", images: buildSlideImages("1") },
];

export function buildHeroSlides(dictionary) {
 return heroSlidesData.map((slide) => ({
  key: slide.slug,
  images: slide.images,
  alt: dictionary.hero.slides[slide.slug].alt,
 }));
}

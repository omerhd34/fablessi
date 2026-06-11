export const COLLECTION_COVER_IMAGE = {
 width: 1600,
 height: 1000,
 aspectRatio: "16:10",
 maxFileSize: "10 MB",
 acceptedFormats: ["JPG", "PNG", "WebP"],
};

export const CATEGORY_HERO_IMAGE = {
 width: 1920,
 height: 640,
 aspectRatio: "3:1",
 previewAspectClass: "aspect-3/1",
 maxFileSize: "10 MB",
 acceptedFormats: ["JPG", "PNG", "WebP"],
};

export function getCollectionCoverImageSummary() {
 const { width, height, aspectRatio } = COLLECTION_COVER_IMAGE;

 return `${width} × ${height} px boyutunda, ${aspectRatio} en-boy oranlı yatay görsel yükleyin.`;
}

export function getCollectionCoverImageRequirements() {
 const { acceptedFormats, maxFileSize } = COLLECTION_COVER_IMAGE;

 return `Desteklenen formatlar: ${acceptedFormats.join(", ")} - En fazla ${maxFileSize}`;
}

export function getCollectionCoverImageHint() {
 return `${getCollectionCoverImageSummary()} ${getCollectionCoverImageRequirements()}`;
}

export function getCategoryHeroImageSummary() {
 const { width, height, aspectRatio } = CATEGORY_HERO_IMAGE;

 return `${width} × ${height} px boyutunda, ${aspectRatio} en-boy oranlı geniş yatay hero görseli yükleyin. Sol üst köşede beyaz logo görünür; bu bölge açık renk veya beyaza yakın olmamalıdır.`;
}

export function getCategoryHeroImageBrightnessWarning() {
 return "Sol üst köşedeki beyaz logo, açık tonlu bir arka planda kaybolur. Kontrast için bu bölümü koyu tutun veya daha koyu bir hero görseli seçin.";
}

export function getCategoryHeroImageRequirements() {
 const { acceptedFormats, maxFileSize } = CATEGORY_HERO_IMAGE;

 return `Desteklenen formatlar: ${acceptedFormats.join(", ")} · En fazla ${maxFileSize}`;
}

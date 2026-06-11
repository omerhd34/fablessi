/** Logo konumuna denk gelen sol üst bölge (oranlar). */
const LOGO_OVERLAY_SAMPLE = {
 xRatio: 0.42,
 yRatio: 0.32,
};

/** 0–1 arası; üzeri beyaz logo için çok açık kabul edilir. */
export const LOGO_OVERLAY_MAX_LUMINANCE = 0.7;

function getRelativeLuminance(red, green, blue) {
 return (0.2126 * red + 0.7152 * green + 0.0722 * blue) / 255;
}

function analyzeCanvasRegion(ctx, width, height, sample = LOGO_OVERLAY_SAMPLE) {
 const sampleWidth = Math.max(1, Math.floor(width * sample.xRatio));
 const sampleHeight = Math.max(1, Math.floor(height * sample.yRatio));
 const imageData = ctx.getImageData(0, 0, sampleWidth, sampleHeight);

 let total = 0;
 const pixelCount = imageData.data.length / 4;

 for (let index = 0; index < imageData.data.length; index += 4) {
  total += getRelativeLuminance(
   imageData.data[index],
   imageData.data[index + 1],
   imageData.data[index + 2]
  );
 }

 const averageLuminance = total / pixelCount;

 return {
  averageLuminance,
  tooBrightForLogo: averageLuminance > LOGO_OVERLAY_MAX_LUMINANCE,
 };
}

function analyzeLoadedImage(img, sample) {
 const canvas = document.createElement("canvas");
 const ctx = canvas.getContext("2d");

 if (!ctx || !img.naturalWidth || !img.naturalHeight) {
  throw new Error("Görsel analiz edilemedi");
 }

 canvas.width = img.naturalWidth;
 canvas.height = img.naturalHeight;
 ctx.drawImage(img, 0, 0);

 return analyzeCanvasRegion(ctx, canvas.width, canvas.height, sample);
}

function loadImage(source, { crossOrigin = false } = {}) {
 return new Promise((resolve, reject) => {
  const img = new Image();

  if (crossOrigin) {
   img.crossOrigin = "anonymous";
  }

  img.onload = () => resolve(img);
  img.onerror = () => reject(new Error("Görsel okunamadı"));
  img.src = source;
 });
}

export async function analyzeImageFileBrightness(file, sample = LOGO_OVERLAY_SAMPLE) {
 const url = URL.createObjectURL(file);

 try {
  const img = await loadImage(url);
  return analyzeLoadedImage(img, sample);
 } finally {
  URL.revokeObjectURL(url);
 }
}

export async function analyzeImageUrlBrightness(url, sample = LOGO_OVERLAY_SAMPLE) {
 const img = await loadImage(url, { crossOrigin: true });
 return analyzeLoadedImage(img, sample);
}

export function getLogoOverlayBrightnessError() {
 return "Görsel yüklenemedi: sol üst bölge çok açık. Beyaz logonun okunabilir kalması için koyu tonlu bir hero görseli kullanın.";
}

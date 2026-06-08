const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const PUBLIC_DIR = path.join(__dirname, "..", "public");

function publicImages(folder, prefix = null) {
 const dir = path.join(PUBLIC_DIR, folder);
 if (!fs.existsSync(dir)) {
  console.warn(`  ⚠ Görsel klasörü bulunamadı: ${folder}`);
  return [];
 }

 return fs
  .readdirSync(dir)
  .filter((file) => /\.(jpe?g|png|webp)$/i.test(file))
  .filter((file) => !prefix || file.startsWith(prefix))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  .map((file) => `/${folder}/${file}`);
}

function dims(widthCm, depthCm, heightCm) {
 return {
  dimensions: `${widthCm} x ${depthCm} x ${heightCm} cm`,
  widthCm,
  depthCm,
  heightCm,
 };
}

const COLLECTIONS = [
 {
  slug: "acelya",
  name: "Açelya",
  description:
   "Zarif hatları ve dayanıklı outdoor kumaşıyla bahçe ve teras alanları için tasarlanmış oturma grubu serisi.",
  sortOrder: 1,
  products: [
   {
    slug: "acelya-oturma",
    name: "Açelya Oturma Grubu",
    ...dims(260, 102, 72),
    description:
     "Geniş oturum alanı ve hava koşullarına dayanıklı örgü detaylarıyla Açelya oturma grubu; Antrasit ve Cappuccino renk seçenekleri.",
    folder: "acelya-oturma",
    imagePrefixes: ["antrasit", "cappuccino"],
    sortOrder: 1,
    variants: [
     { name: "Antrasit", color: "Antrasit", material: "Outdoor kumaş", isDefault: true },
     { name: "Cappuccino", color: "Cappuccino", material: "Outdoor kumaş" },
    ],
   },
  ],
 },
 {
  slug: "aston",
  name: "Aston",
  description:
   "Modern çizgiler ve konforlu oturum deneyimi sunan Aston serisi; villa ve otel projeleri için ideal.",
  sortOrder: 2,
  products: [
   {
    slug: "aston-oturma",
    name: "Aston Oturma Grubu",
    ...dims(255, 100, 74),
    description:
     "Alüminyum iskelet ve UV dayanımlı kumaş kaplamalı Aston oturma grubu; Antrasit ve Cappuccino renk seçenekleri.",
    folder: "aston-oturma",
    imagePrefixes: ["antrasit", "cappuccino"],
    sortOrder: 1,
    variants: [
     { name: "Antrasit", color: "Antrasit", material: "Outdoor kumaş", isDefault: true },
     { name: "Cappuccino", color: "Cappuccino", material: "Outdoor kumaş" },
    ],
   },
  ],
 },
 {
  slug: "begonia",
  name: "Begonia",
  description:
   "Begonia serisi; farklı oturum konfigürasyonları ve renk seçenekleriyle esnek dış mekân çözümleri sunar.",
  sortOrder: 3,
  products: [
   {
    slug: "begonia-2li",
    name: "Begonia 2'li Oturma Grubu",
    ...dims(180, 85, 72),
    description:
     "Kompakt alanlar için tasarlanmış Begonia 2'li oturma grubu.",
    folder: "begonia-2li",
    imagePrefix: "cappuccino",
    sortOrder: 1,
    variants: [{ name: "Cappuccino", color: "Cappuccino", material: "Outdoor kumaş", isDefault: true }],
   },
   {
    slug: "begonia-oturma",
    name: "Begonia Oturma Grubu",
    ...dims(245, 95, 72),
    description:
     "Geniş oturum kapasitesi ve dayanıklı dış mekân malzemeleriyle Begonia oturma grubu; Antrasit ve Gri renk seçenekleri.",
    folder: "begonia-oturma",
    imagePrefixes: ["antrasit", "gri"],
    sortOrder: 2,
    variants: [
     { name: "Antrasit", color: "Antrasit", material: "Outdoor kumaş", isDefault: true },
     { name: "Gri", color: "Gri", material: "Outdoor kumaş" },
    ],
   },
  ],
 },
 {
  slug: "tesla",
  name: "Tesla",
  description:
   "Tesla serisi; köşe grupları, masa takımları, oturma grupları ve salıncak ile tam bir bahçe yaşam seti sunar.",
  sortOrder: 4,
  products: [
   {
    slug: "tesla-kose",
    name: "Tesla Köşe Grubu",
    ...dims(290, 185, 75),
    description:
     "Modüler Tesla köşe grubu; L form oturma düzeni ve Antrasit renk seçeneği.",
    folder: "tesla-kose",
    imagePrefix: "antrasit",
    sortOrder: 1,
    variants: [{ name: "Antrasit", color: "Antrasit", material: "Outdoor kumaş", isDefault: true }],
   },
   {
    slug: "tesla-masa",
    name: "Tesla Masa Grubu",
    ...dims(220, 100, 75),
    description:
     "Tesla masa grubu; dış mekân yemek ve oturma alanları için masa ve sandalye kombinasyonu.",
    folder: "tesla-masa",
    sortOrder: 2,
    variants: [{ name: "Standart", material: "Alüminyum & cam", isDefault: true }],
   },
   {
    slug: "tesla-oturma",
    name: "Tesla Oturma Grubu",
    ...dims(250, 100, 75),
    description:
     "Tesla oturma grubu; geniş teras ve bahçe alanları için konforlu dış mekân mobilyası.",
    folder: "tesla-oturma",
    sortOrder: 3,
    variants: [{ name: "Standart", material: "Outdoor kumaş", isDefault: true }],
   },
   {
    slug: "tesla-salincak",
    name: "Tesla Salıncak",
    ...dims(220, 125, 205),
    description:
     "Tesla salıncak; bahçe ve terasta dinlenme için tasarlanmış dayanıklı salıncak modeli.",
    folder: "tesla-salincak",
    sortOrder: 4,
    variants: [{ name: "Standart", material: "Alüminyum & örgü", isDefault: true }],
   },
  ],
 },
 {
  slug: "velar",
  name: "Velar",
  description:
   "Velar serisi; oturma, köşe, masa, salıncak ve şezlong modelleriyle kapsamlı dış mekân koleksiyonu.",
  sortOrder: 5,
  products: [
   {
    slug: "velar-kose",
    name: "Velar Köşe Grubu",
    ...dims(285, 180, 74),
    description:
     "Geniş oturum alanı ve modüler yapıya sahip Velar köşe grubu; Cappuccino renk seçeneği.",
    folder: "velar-kose",
    imagePrefix: "cappuccino",
    sortOrder: 1,
    variants: [{ name: "Cappuccino", color: "Cappuccino", material: "Outdoor kumaş", isDefault: true }],
   },
   {
    slug: "velar-masa",
    name: "Velar Masa Grubu",
    ...dims(210, 95, 74),
    description:
     "Velar masa grubu; teras ve bahçe yemek alanları için şık masa takımı.",
    folder: "velar-masa",
    sortOrder: 2,
    variants: [{ name: "Standart", material: "Alüminyum & cam", isDefault: true }],
   },
   {
    slug: "velar-oturma",
    name: "Velar Oturma Grubu",
    ...dims(265, 105, 73),
    description:
     "Velar oturma grubu; premium bahçe mobilyası serisinin en çok tercih edilen modellerinden.",
    folder: "velar-oturma",
    sortOrder: 3,
    variants: [{ name: "Standart", material: "Outdoor kumaş", isDefault: true }],
   },
   {
    slug: "velar-salincak",
    name: "Velar Salıncak",
    ...dims(215, 120, 200),
    description:
     "Velar salıncak; havuz kenarı ve teras dinlenme köşeleri için.",
    folder: "velar-salincak",
    sortOrder: 4,
    variants: [{ name: "Standart", material: "Alüminyum & örgü", isDefault: true }],
   },
   {
    slug: "velar-sezlong",
    name: "Velar Şezlong",
    ...dims(70, 200, 38),
    description:
     "Velar şezlong; ayarlanabilir sırtlı yapısıyla havuz ve güneş terası kullanımına uygun.",
    folder: "velar-sezlong",
    sortOrder: 5,
    variants: [{ name: "Standart", material: "Alüminyum", isDefault: true }],
   },
  ],
 },
 {
  slug: "trend",
  name: "Trend",
  description: "Trend serisi; sallanır sandalye modeliyle bahçe ve balkon alanlarına hareket katar.",
  sortOrder: 6,
  products: [
   {
    slug: "trend-sandalye",
    name: "Trend Sallanır Sandalye",
    ...dims(68, 75, 88),
    description:
     "Trend sallanır sandalye; rahat oturum ve salınım hareketiyle teras ve bahçe keyfi.",
    folder: "trend-sandalye",
    sortOrder: 1,
    variants: [{ name: "Standart", material: "Alüminyum & örgü", isDefault: true }],
   },
  ],
 },
];

function resolveProductImages(productData) {
 let images;

 if (productData.imagePrefixes?.length) {
  images = productData.imagePrefixes.flatMap((prefix) =>
   publicImages(productData.folder, prefix)
  );
 } else if (productData.imagePrefix) {
  images = publicImages(productData.folder, productData.imagePrefix);
 } else {
  images = publicImages(productData.folder);
 }

 if (images.length === 0) {
  const detail = productData.imagePrefixes
   ? productData.imagePrefixes.join(", ")
   : productData.imagePrefix ?? "tümü";
  throw new Error(`Görsel bulunamadı: ${productData.folder} (${detail})`);
 }

 return images;
}

async function createProduct(collectionId, data) {
 const imageUrls = resolveProductImages(data);

 await prisma.product.create({
  data: {
   slug: data.slug,
   name: data.name,
   description: data.description,
   dimensions: data.dimensions ?? null,
   widthCm: data.widthCm ?? null,
   depthCm: data.depthCm ?? null,
   heightCm: data.heightCm ?? null,
   sortOrder: data.sortOrder,
   collectionId,
   images: {
    create: imageUrls.map((url, index) => ({
     url,
     alt: index === 0 ? data.name : `${data.name} — görsel ${index + 1}`,
     sortOrder: index,
     isPrimary: index === 0,
    })),
   },
   variants: {
    create: data.variants.map((variant, index) => ({
     name: variant.name,
     color: variant.color ?? null,
     material: variant.material ?? null,
     sortOrder: index,
     isDefault: Boolean(variant.isDefault),
     sku: `${data.slug}-${index + 1}`.toUpperCase().replace(/-/g, ""),
    })),
   },
  },
 });
}

async function main() {
 console.log("Veritabanı temizleniyor…");
 await prisma.image.deleteMany();
 await prisma.variant.deleteMany();
 await prisma.product.deleteMany();
 await prisma.collection.deleteMany();

 console.log("Koleksiyonlar ve ürünler ekleniyor…");

 for (const collectionData of COLLECTIONS) {
  const coverImage = resolveProductImages(collectionData.products[0])[0];

  const collection = await prisma.collection.create({
   data: {
    slug: collectionData.slug,
    name: collectionData.name,
    description: collectionData.description,
    coverImage,
    sortOrder: collectionData.sortOrder,
    isPublished: true,
   },
  });

  for (const productData of collectionData.products) {
   await createProduct(collection.id, productData);
  }

  console.log(`  ✓ ${collection.name} (${collectionData.products.length} ürün)`);
 }

 const counts = await Promise.all([
  prisma.collection.count(),
  prisma.product.count(),
  prisma.variant.count(),
  prisma.image.count(),
 ]);

 console.log("\nSeed tamamlandı:");
 console.log(`  Koleksiyon: ${counts[0]}`);
 console.log(`  Ürün: ${counts[1]}`);
 console.log(`  Varyant: ${counts[2]}`);
 console.log(`  Görsel: ${counts[3]}`);
}

main()
 .catch((error) => {
  console.error("Seed hatası:", error);
  process.exit(1);
 })
 .finally(async () => {
  await prisma.$disconnect();
 });

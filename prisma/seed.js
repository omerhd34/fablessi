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
  dimensionItems: [{ widthCm, depthCm, heightCm }],
 };
}

function dimItems(items) {
 return {
  dimensionItems: items,
 };
}

const COLLECTIONS = [
 {
  slug: "acelya",
  name: "Açelya",
  nameEn: "Azalea",
  description:
   "Zarif hatları ve dayanıklı outdoor kumaşıyla bahçe ve teras alanları için tasarlanmış oturma grubu serisi.",
  descriptionEn:
   "A seating set series designed for garden and terrace areas with elegant lines and durable outdoor fabric.",
  sortOrder: 1,
  products: [
   {
    slug: "acelya-oturma",
    name: "Açelya Oturma Grubu",
    nameEn: "Azalea Seating Set",
    ...dimItems([
     {
      name: "3'lü Koltuk",
      nameEn: "3-Seater Sofa",
      widthCm: 185,
      depthCm: 75,
      heightCm: 80,
      amount: 6500,
     },
     {
      name: "Tekli Koltuk",
      nameEn: "Armchair",
      widthCm: 75,
      depthCm: 75,
      heightCm: 80,
      amount: 3800,
      quantity: 2,
     },
     {
      name: "Masa",
      nameEn: "Table",
      widthCm: 80,
      depthCm: 140,
      heightCm: 70,
      amount: 5200,
     },
     {
      name: "Benç",
      nameEn: "Bench",
      widthCm: 40,
      depthCm: 40,
      heightCm: 43,
      amount: 2200,
     },
    ]),
    description:
     "Geniş oturum alanı ve hava koşullarına dayanıklı örgü detaylarıyla Açelya oturma grubu.",
    descriptionEn:
     "Azalea seating set with spacious seating and weather-resistant weave details.",
    folder: "acelya-oturma",
    sortOrder: 1,
    isFeatured: true,
    featuredOrder: 1,
    material: "Outdoor kumaş",
    materialEn: "Outdoor fabric",
   },
  ],
 },
 {
  slug: "aston",
  name: "Aston",
  nameEn: "Aston",
  description:
   "Modern çizgiler ve konforlu oturum deneyimi sunan Aston serisi; villa ve otel projeleri için ideal.",
  descriptionEn:
   "The Aston series offers modern lines and comfortable seating; ideal for villa and hotel projects.",
  sortOrder: 2,
  products: [
   {
    slug: "aston-oturma",
    name: "Aston Oturma Grubu",
    nameEn: "Aston Seating Set",
    ...dimItems([
     {
      name: "3'lü Koltuk",
      nameEn: "3-Seater Sofa",
      widthCm: 185,
      depthCm: 85,
      heightCm: 80,
      amount: 5500,
     },
     {
      name: "Tekli Koltuk",
      nameEn: "Armchair",
      widthCm: 70,
      depthCm: 85,
      heightCm: 80,
      amount: 3500,
      quantity: 2,
     },
     {
      name: "Masa",
      nameEn: "Table",
      widthCm: 80,
      depthCm: 140,
      heightCm: 70,
      amount: 5000,
     },
     {
      name: "Puf",
      nameEn: "Pouf",
      widthCm: 40,
      depthCm: 40,
      heightCm: 43,
      amount: 2000,
      quantity: 2,
     },
    ]),
    description:
     "Alüminyum iskelet ve UV dayanımlı kumaş kaplamalı Aston oturma grubu.",
    descriptionEn:
     "Aston seating set with aluminum frame and UV-resistant fabric upholstery.",
    folder: "aston-oturma",
    sortOrder: 1,
    material: "Outdoor kumaş",
    materialEn: "Outdoor fabric",
   },
  ],
 },
 {
  slug: "begonia",
  name: "Begonia",
  nameEn: "Begonia",
  description:
   "Begonia serisi; farklı oturum konfigürasyonlarıyla esnek dış mekân çözümleri sunar.",
  descriptionEn:
   "The Begonia series offers flexible outdoor solutions with different seating configurations.",
  sortOrder: 3,
  products: [
   {
    slug: "begonia-2li",
    name: "Begonia 2'li Oturma Grubu",
    nameEn: "Begonia 2-Seater Set",
    ...dimItems([
     {
      name: "2'li Koltuk",
      nameEn: "2-Seater Sofa",
      widthCm: 125,
      depthCm: 75,
      heightCm: 80,
      amount: 5000,
     },
    ]),
    description: "Kompakt alanlar için tasarlanmış Begonia 2'li oturma grubu.",
    descriptionEn: "Begonia 2-seater set designed for compact spaces.",
    folder: "begonia-2li",
    imagePrefix: "cappuccino",
    sortOrder: 1,
    material: "Outdoor kumaş",
    materialEn: "Outdoor fabric",
   },
   {
    slug: "begonia-oturma",
    name: "Begonia Oturma Grubu",
    nameEn: "Begonia Seating Set",
    ...dimItems([
     {
      name: "3'lü Koltuk",
      nameEn: "3-Seater Sofa",
      widthCm: 185,
      depthCm: 75,
      heightCm: 80,
      amount: 6200,
     },
     {
      name: "Tekli Koltuk",
      nameEn: "Armchair",
      widthCm: 70,
      depthCm: 75,
      heightCm: 80,
      amount: 3400,
      quantity: 2,
     },
     {
      name: "Masa",
      nameEn: "Table",
      widthCm: 80,
      depthCm: 140,
      heightCm: 70,
      amount: 5100,
     },
     {
      name: "Puf",
      nameEn: "Pouf",
      widthCm: 40,
      depthCm: 40,
      heightCm: 43,
      amount: 1900,
      quantity: 2,
     },
    ]),
    description:
     "Geniş oturum kapasitesi ve dayanıklı dış mekân malzemeleriyle Begonia oturma grubu.",
    descriptionEn:
     "Begonia seating set with generous seating capacity and durable outdoor materials.",
    folder: "begonia-oturma",
    sortOrder: 2,
    material: "Outdoor kumaş",
    materialEn: "Outdoor fabric",
   },
  ],
 },
 {
  slug: "tesla",
  name: "Tesla",
  nameEn: "Tesla",
  description:
   "Tesla serisi; köşe grupları, masa takımları, oturma grupları ve salıncak ile tam bir bahçe yaşam seti sunar.",
  descriptionEn:
   "The Tesla series offers a complete garden living set with corner groups, table sets, seating sets and swings.",
  sortOrder: 4,
  products: [
   {
    slug: "tesla-kose",
    name: "Tesla Köşe Grubu",
    nameEn: "Tesla Corner Set",
    ...dimItems([
     {
      name: "Köşe",
      nameEn: "Corner",
      widthCm: 220,
      depthCm: 245,
      amount: 11000,
     },
     {
      name: "4'lü Koltuk",
      nameEn: "4-Seater Sofa",
      widthCm: 245,
      depthCm: 75,
      heightCm: 80,
      amount: 7800,
     },
     {
      name: "2'li Koltuk",
      nameEn: "2-Seater Sofa",
      widthCm: 120,
      depthCm: 75,
      heightCm: 80,
      amount: 5000,
     },
     {
      name: "Masa",
      nameEn: "Table",
      widthCm: 80,
      depthCm: 140,
      heightCm: 70,
      amount: 5400,
     },
     {
      name: "Puf",
      nameEn: "Pouf",
      widthCm: 40,
      depthCm: 40,
      heightCm: 43,
      amount: 2100,
      quantity: 2,
     },
     {
      name: "Sehpa",
      nameEn: "Coffee Table",
      widthCm: 40,
      depthCm: 40,
      heightCm: 43,
      amount: 2800,
     },
    ]),
    description:
     "Modüler Tesla köşe grubu; L form oturma düzeni.",
    descriptionEn:
     "Modular Tesla corner set with L-shaped seating layout.",
    folder: "tesla-kose",
    imagePrefix: "antrasit",
    sortOrder: 1,
    material: "Outdoor kumaş",
    materialEn: "Outdoor fabric",
   },
   {
    slug: "tesla-masa",
    name: "Tesla Masa Grubu",
    nameEn: "Tesla Table Set",
    ...dimItems([
     {
      name: "Masa",
      nameEn: "Table",
      widthCm: 160,
      depthCm: 90,
      heightCm: 75,
      amount: 6500,
     },
     {
      name: "Sandalye",
      nameEn: "Chair",
      widthCm: 57,
      depthCm: 60,
      heightCm: 85,
      amount: 1250,
      quantity: 6,
     },
    ]),
    description:
     "Tesla masa grubu; dış mekân yemek ve oturma alanları için masa ve sandalye kombinasyonu.",
    descriptionEn:
     "Tesla table set; table and chair combination for outdoor dining and seating areas.",
    folder: "tesla-masa",
    sortOrder: 2,
    material: "Alüminyum & cam",
    materialEn: "Aluminum & glass",
   },
   {
    slug: "tesla-oturma",
    name: "Tesla Oturma Grubu",
    nameEn: "Tesla Seating Set",
    ...dimItems([
     {
      name: "3'lü Koltuk",
      nameEn: "3-Seater Sofa",
      widthCm: 185,
      depthCm: 75,
      heightCm: 80,
      amount: 6800,
     },
     {
      name: "Tekli Koltuk",
      nameEn: "Armchair",
      widthCm: 75,
      depthCm: 75,
      heightCm: 80,
      amount: 3600,
      quantity: 2,
     },
     {
      name: "Masa",
      nameEn: "Table",
      widthCm: 80,
      depthCm: 140,
      heightCm: 70,
      amount: 5300,
     },
     {
      name: "Puf",
      nameEn: "Pouf",
      widthCm: 40,
      depthCm: 40,
      heightCm: 43,
      amount: 2000,
      quantity: 2,
     },
    ]),
    description:
     "Tesla oturma grubu; geniş teras ve bahçe alanları için konforlu dış mekân mobilyası.",
    descriptionEn:
     "Tesla seating set; comfortable outdoor furniture for spacious terrace and garden areas.",
    folder: "tesla-oturma",
    sortOrder: 3,
    material: "Outdoor kumaş",
    materialEn: "Outdoor fabric",
   },
   //! ÖLÇÜLER YANLIŞ
   {
    slug: "tesla-salincak",
    name: "Tesla Salıncak",
    nameEn: "Tesla Swing",
    dimensions: "220 x 125 x 205 cm",
    widthCm: 220,
    depthCm: 125,
    heightCm: 205,
    ...dimItems([
     {
      name: "Salıncak",
      nameEn: "Swing",
      widthCm: 220,
      depthCm: 125,
      heightCm: 205,
      amount: 13000,
     },
    ]),
    description:
     "Tesla salıncak; bahçe ve terasta dinlenme için tasarlanmış dayanıklı salıncak modeli.",
    descriptionEn:
     "Tesla swing; a durable swing model designed for relaxation in the garden and on the terrace.",
    folder: "tesla-salincak",
    sortOrder: 4,
    material: "Alüminyum ve örgü",
    materialEn: "Aluminum and weave",
   },
  ],
 },
 {
  slug: "velar",
  name: "Velar",
  nameEn: "Velar",
  description:
   "Velar serisi; oturma, köşe, masa, salıncak ve şezlong modelleriyle kapsamlı dış mekân koleksiyonu.",
  descriptionEn:
   "The Velar series is a comprehensive outdoor collection with seating, corner, table, swing and lounger models.",
  sortOrder: 5,
  products: [
   {
    slug: "velar-kose",
    name: "Velar Köşe Grubu",
    nameEn: "Velar Corner Set",
    ...dimItems([
     {
      name: "Köşe",
      nameEn: "Corner",
      widthCm: 220,
      depthCm: 245,
      amount: 12500,
     },
     {
      name: "4'lü Koltuk",
      nameEn: "4-Seater Sofa",
      widthCm: 245,
      depthCm: 75,
      heightCm: 80,
      amount: 8200,
     },
     {
      name: "2'li Koltuk",
      nameEn: "2-Seater Sofa",
      widthCm: 120,
      depthCm: 75,
      heightCm: 80,
      amount: 5000,
     },
     {
      name: "Masa",
      nameEn: "Table",
      widthCm: 80,
      depthCm: 140,
      heightCm: 70,
      amount: 5600,
     },
     {
      name: "Puf",
      nameEn: "Pouf",
      widthCm: 40,
      depthCm: 40,
      heightCm: 43,
      amount: 2000,
      quantity: 2,
     },
    ]),
    description:
     "Geniş oturum alanı ve modüler yapıya sahip Velar köşe grubu.",
    descriptionEn:
     "Velar corner set with spacious seating and modular structure.",
    folder: "velar-kose",
    imagePrefix: "cappuccino",
    sortOrder: 1,
    isFeatured: true,
    featuredOrder: 2,
    material: "Outdoor kumaş",
    materialEn: "Outdoor fabric",
   },
   {
    slug: "velar-masa",
    name: "Velar Masa Grubu",
    nameEn: "Velar Table Set",
    ...dimItems([
     {
      name: "Masa",
      nameEn: "Table",
      widthCm: 190,
      depthCm: 90,
      heightCm: 75,
      amount: 7200,
     },
     {
      name: "Sandalye",
      nameEn: "Chair",
      widthCm: 57,
      depthCm: 60,
      heightCm: 85,
      amount: 3400,
      quantity: 6,
     },
    ]),
    description:
     "Velar masa grubu; teras ve bahçe yemek alanları için şık masa takımı.",
    descriptionEn:
     "Velar table set; an elegant dining set for terrace and garden dining areas.",
    folder: "velar-masa",
    sortOrder: 2,
    material: "Alüminyum & cam",
    materialEn: "Aluminum & glass",
   },
   {
    slug: "velar-oturma",
    name: "Velar Oturma Grubu",
    nameEn: "Velar Seating Set",
    ...dimItems([
     {
      name: "3'lü Koltuk",
      nameEn: "3-Seater Sofa",
      widthCm: 185,
      depthCm: 75,
      heightCm: 80,
      amount: 7000,
     },
     {
      name: "Tekli Koltuk",
      nameEn: "Armchair",
      widthCm: 75,
      depthCm: 75,
      heightCm: 80,
      amount: 3700,
      quantity: 2,
     },
     {
      name: "Masa",
      nameEn: "Table",
      widthCm: 80,
      depthCm: 140,
      heightCm: 70,
      amount: 5500,
     },
     {
      name: "Puf",
      nameEn: "Pouf",
      widthCm: 40,
      depthCm: 40,
      heightCm: 43,
      amount: 2100,
      quantity: 2,
     },
    ]),
    description:
     "Velar oturma grubu; premium bahçe mobilyası serisinin en çok tercih edilen modellerinden.",
    descriptionEn:
     "Velar seating set; one of the most popular models in the premium garden furniture series.",
    folder: "velar-oturma",
    sortOrder: 3,
    material: "Outdoor kumaş",
    materialEn: "Outdoor fabric",
   },
   //! ÖLÇÜLER YANLIŞ
   {
    slug: "velar-salincak",
    name: "Velar Salıncak",
    nameEn: "Velar Swing",
    dimensions: "215 x 120 x 200 cm",
    widthCm: 215,
    depthCm: 120,
    heightCm: 200,
    ...dimItems([
     {
      name: "Salıncak",
      nameEn: "Swing",
      widthCm: 215,
      depthCm: 120,
      heightCm: 200,
      amount: 12800,
     },
    ]),
    description:
     "Velar salıncak; havuz kenarı ve teras dinlenme köşeleri için.",
    descriptionEn:
     "Velar swing; for poolside and terrace relaxation corners.",
    folder: "velar-salincak",
    sortOrder: 4,
    isFeatured: true,
    featuredOrder: 4,
    material: "Alüminyum ve örgü",
    materialEn: "Aluminum and weave",
   },
   {
    slug: "velar-sezlong",
    name: "Velar Şezlong",
    nameEn: "Velar Sun Lounger",
    ...dimItems([
     {
      name: "Şezlong",
      nameEn: "Sunbed",
      widthCm: 75,
      depthCm: 195,
      heightCm: 85,
      amount: 6800,
     },
     {
      name: "Sehpa",
      nameEn: "Coffee Table",
      widthCm: 40,
      depthCm: 40,
      heightCm: 40,
      amount: 2400,
     },
    ]),
    description:
     "Velar şezlong; ayarlanabilir sırtlı yapısıyla havuz ve güneş terası kullanımına uygun.",
    descriptionEn:
     "Velar sun lounger with adjustable backrest; suitable for pool and sun terrace use.",
    folder: "velar-sezlong",
    sortOrder: 5,
    material: "Alüminyum",
    materialEn: "Aluminum",
   },
  ],
 },
 {
  slug: "trend",
  name: "Trend",
  nameEn: "Trend",
  description:
   "Trend serisi; sallanır sandalye modeliyle bahçe ve balkon alanlarına hareket katar.",
  descriptionEn:
   "The Trend series adds movement to garden and balcony areas with its rocking chair model.",
  sortOrder: 6,
  products: [
   {
    slug: "trend-sandalye",
    name: "Trend Sallanır Sandalye",
    nameEn: "Trend Rocking Chair",
    ...dimItems([
     {
      name: "Sandalye",
      nameEn: "Chair",
      widthCm: 65,
      depthCm: 100,
      heightCm: 90,
      amount: 4200,
     },
     {
      name: "Sehpa",
      nameEn: "Coffee Table",
      widthCm: 40,
      depthCm: 40,
      heightCm: 55,
      amount: 2600,
     },
    ]),
    description:
     "Trend sallanır sandalye; rahat oturum ve salınım hareketiyle teras ve bahçe keyfi.",
    descriptionEn:
     "Trend rocking chair; terrace and garden enjoyment with comfortable seating and gentle rocking motion.",
    folder: "trend-sandalye",
    sortOrder: 1,
    isFeatured: true,
    featuredOrder: 3,
    material: "Alüminyum ve örgü",
    materialEn: "Aluminum and weave",
   },
  ],
 },
];

function resolveProductImages(productData) {
 if (productData.imagePrefix) {
  return publicImages(productData.folder, productData.imagePrefix);
 }

 return publicImages(productData.folder);
}

function resolveCoverImage(productData) {
 const images = resolveProductImages(productData);
 if (images.length === 0) {
  throw new Error(`Kapak görseli bulunamadı: ${productData.folder}`);
 }

 return images[0];
}

async function createProduct(collectionId, data) {
 const imageUrls = resolveProductImages(data);
 if (imageUrls.length === 0) {
  throw new Error(`Görsel bulunamadı: ${data.folder}`);
 }

 await prisma.product.create({
  data: {
   slug: data.slug,
   name: data.name,
   nameEn: data.nameEn,
   description: data.description,
   descriptionEn: data.descriptionEn,
   dimensions: data.dimensions ?? null,
   dimensionItems: data.dimensionItems ?? null,
   widthCm: data.widthCm ?? null,
   depthCm: data.depthCm ?? null,
   heightCm: data.heightCm ?? null,
   sortOrder: data.sortOrder,
   isFeatured: data.isFeatured ?? false,
   featuredOrder: data.featuredOrder ?? 0,
   material: data.material ?? null,
   materialEn: data.materialEn ?? null,
   sku: data.slug.toUpperCase().replace(/-/g, ""),
   collectionId,
   images: {
    create: imageUrls.map((url, imageIndex) => ({
     url,
     alt: imageIndex === 0 ? data.name : `${data.name} — görsel ${imageIndex + 1}`,
     altEn:
      imageIndex === 0 ? data.nameEn : `${data.nameEn} — image ${imageIndex + 1}`,
     sortOrder: imageIndex,
     isPrimary: imageIndex === 0,
    })),
   },
  },
 });
}

const CATEGORY_GROUP_LABELS = {
 "oturma-gruplari": { name: "Oturma Grupları", nameEn: "Seating Sets" },
 "kose-gruplari": { name: "Köşe Grupları", nameEn: "Corner Sets" },
 masalar: { name: "Masa Grupları", nameEn: "Table Sets" },
 salincak: { name: "Salıncak", nameEn: "Swings" },
 sezlong: { name: "Şezlong", nameEn: "Sun Loungers" },
 sandalyeler: { name: "Sandalyeler", nameEn: "Chairs" },
};

async function seedCategoryGroups() {
 const { productMenuGroupsData } = await import("../lib/i18n/navigation-data.js");

 console.log("Kategori grupları ekleniyor…");

 for (const [index, group] of productMenuGroupsData.entries()) {
  const labels = CATEGORY_GROUP_LABELS[group.slug] ?? {
   name: group.slug,
   nameEn: null,
  };

  const created = await prisma.productCategoryGroup.create({
   data: {
    slug: group.slug,
    name: labels.name,
    nameEn: labels.nameEn,
    coverImage: group.items[0]?.image ?? null,
    sortOrder: index + 1,
    isPublished: true,
   },
  });

  for (const item of group.items) {
   const productSlug = item.href.replace("/urunler/", "");

   await prisma.product.updateMany({
    where: { slug: productSlug },
    data: { categoryGroupId: created.id },
   });
  }

  console.log(`  ✓ ${created.name} (${group.items.length} menü öğesi)`);
 }
}

async function main() {
 console.log("Veritabanı temizleniyor…");
 await prisma.image.deleteMany();
 await prisma.product.deleteMany();
 await prisma.productCategoryGroup.deleteMany();
 await prisma.collection.deleteMany();

 console.log("Koleksiyonlar ve ürünler ekleniyor…");

 for (const collectionData of COLLECTIONS) {
  const coverImage = resolveCoverImage(collectionData.products[0]);

  const collection = await prisma.collection.create({
   data: {
    slug: collectionData.slug,
    name: collectionData.name,
    nameEn: collectionData.nameEn,
    description: collectionData.description,
    descriptionEn: collectionData.descriptionEn,
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

 await seedCategoryGroups();

 const counts = await Promise.all([
  prisma.collection.count(),
  prisma.productCategoryGroup.count(),
  prisma.product.count(),
  prisma.image.count(),
 ]);

 const { seedCms } = await import("./seed-cms.mjs");
 await seedCms(prisma);

 const contentCounts = await Promise.all([
  prisma.contentBlock.count(),
  prisma.faqCategory.count(),
  prisma.faqItem.count(),
 ]);

 console.log("\nSeed tamamlandı:");
 console.log(`  Koleksiyon: ${counts[0]}`);
 console.log(`  Kategori grubu: ${counts[1]}`);
 console.log(`  Ürün: ${counts[2]}`);
 console.log(`  Görsel: ${counts[3]}`);
 console.log(`  İçerik bloğu: ${contentCounts[0]}`);
 console.log(`  SSS kategorisi: ${contentCounts[1]}`);
 console.log(`  SSS sorusu: ${contentCounts[2]}`);
}

main()
 .catch((error) => {
  console.error("Seed hatası:", error);
  process.exit(1);
 })
 .finally(async () => {
  await prisma.$disconnect();
 });

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
     },
     {
      name: "Tekli Koltuk",
      nameEn: "Armchair",
      widthCm: 75,
      depthCm: 75,
      heightCm: 80,
     },
     {
      name: "Masa",
      nameEn: "Table",
      widthCm: 80,
      depthCm: 140,
      heightCm: 70,
     },
     {
      name: "Benç",
      nameEn: "Bench",
      widthCm: 40,
      depthCm: 40,
      heightCm: 43,
     },
    ]),
    description:
     "Geniş oturum alanı ve hava koşullarına dayanıklı örgü detaylarıyla Açelya oturma grubu; Antrasit ve Cappuccino renk seçenekleri.",
    descriptionEn:
     "Azalea seating set with spacious seating and weather-resistant weave details; available in Anthracite and Cappuccino.",
    folder: "acelya-oturma",
    imagePrefixes: ["antrasit", "cappuccino"],
    sortOrder: 1,
    isFeatured: true,
    featuredOrder: 5,
    variants: [
     {
      name: "Antrasit",
      nameEn: "Anthracite",
      color: "Antrasit",
      material: "Outdoor kumaş",
      materialEn: "Outdoor fabric",
      isDefault: true,
     },
     {
      name: "Cappuccino",
      nameEn: "Cappuccino",
      color: "Cappuccino",
      material: "Outdoor kumaş",
      materialEn: "Outdoor fabric",
     },
    ],
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
     },
     {
      name: "Tekli Koltuk",
      nameEn: "Armchair",
      widthCm: 70,
      depthCm: 85,
      heightCm: 80,
     },
     {
      name: "Masa",
      nameEn: "Table",
      widthCm: 80,
      depthCm: 140,
      heightCm: 70,
     },
     {
      name: "Puf",
      nameEn: "Pouf",
      widthCm: 40,
      depthCm: 40,
      heightCm: 43,
     },
    ]),
    description:
     "Alüminyum iskelet ve UV dayanımlı kumaş kaplamalı Aston oturma grubu; Antrasit ve Cappuccino renk seçenekleri.",
    descriptionEn:
     "Aston seating set with aluminum frame and UV-resistant fabric upholstery; available in Anthracite and Cappuccino.",
    folder: "aston-oturma",
    imagePrefixes: ["antrasit", "cappuccino"],
    sortOrder: 1,
    isFeatured: true,
    featuredOrder: 6,
    variants: [
     {
      name: "Antrasit",
      nameEn: "Anthracite",
      color: "Antrasit",
      material: "Outdoor kumaş",
      materialEn: "Outdoor fabric",
      isDefault: true,
     },
     {
      name: "Cappuccino",
      nameEn: "Cappuccino",
      color: "Cappuccino",
      material: "Outdoor kumaş",
      materialEn: "Outdoor fabric",
     },
    ],
   },
  ],
 },
 {
  slug: "begonia",
  name: "Begonia",
  nameEn: "Begonia",
  description:
   "Begonia serisi; farklı oturum konfigürasyonları ve renk seçenekleriyle esnek dış mekân çözümleri sunar.",
  descriptionEn:
   "The Begonia series offers flexible outdoor solutions with different seating configurations and color options.",
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
     },
     {
      name: "Tekli Koltuk",
      nameEn: "Armchair",
      widthCm: 70,
      depthCm: 75,
      heightCm: 80,
     },
     {
      name: "Masa",
      nameEn: "Table",
      widthCm: 80,
      depthCm: 140,
      heightCm: 70,
     },
     {
      name: "Puf",
      nameEn: "Pouf",
      widthCm: 40,
      depthCm: 40,
      heightCm: 43,
     },
    ]),
    description: "Kompakt alanlar için tasarlanmış Begonia 2'li oturma grubu.",
    descriptionEn: "Begonia 2-seater set designed for compact spaces.",
    folder: "begonia-2li",
    imagePrefix: "cappuccino",
    sortOrder: 1,
    variants: [
     {
      name: "Cappuccino",
      nameEn: "Cappuccino",
      color: "Cappuccino",
      material: "Outdoor kumaş",
      materialEn: "Outdoor fabric",
      isDefault: true,
     },
    ],
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
     },
     {
      name: "Tekli Koltuk",
      nameEn: "Armchair",
      widthCm: 70,
      depthCm: 75,
      heightCm: 80,
     },
     {
      name: "Masa",
      nameEn: "Table",
      widthCm: 80,
      depthCm: 140,
      heightCm: 70,
     },
     {
      name: "Puf",
      nameEn: "Pouf",
      widthCm: 40,
      depthCm: 40,
      heightCm: 43,
     },
    ]),
    description:
     "Geniş oturum kapasitesi ve dayanıklı dış mekân malzemeleriyle Begonia oturma grubu; Antrasit ve Gri renk seçenekleri.",
    descriptionEn:
     "Begonia seating set with generous seating capacity and durable outdoor materials; available in Anthracite and Grey.",
    folder: "begonia-oturma",
    imagePrefixes: ["antrasit", "gri"],
    sortOrder: 2,
    isFeatured: true,
    featuredOrder: 7,
    variants: [
     {
      name: "Antrasit",
      nameEn: "Anthracite",
      color: "Antrasit",
      material: "Outdoor kumaş",
      materialEn: "Outdoor fabric",
      isDefault: true,
     },
     {
      name: "Gri",
      nameEn: "Grey",
      color: "Gri",
      material: "Outdoor kumaş",
      materialEn: "Outdoor fabric",
     },
    ],
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
     },
     {
      name: "4'lü Koltuk",
      nameEn: "4-Seater Sofa",
      widthCm: 245,
      depthCm: 75,
      heightCm: 80,
     },
     {
      name: "2'li Koltuk",
      nameEn: "2-Seater Sofa",
      widthCm: 120,
      depthCm: 75,
      heightCm: 80,
     },
     {
      name: "Masa",
      nameEn: "Table",
      widthCm: 80,
      depthCm: 140,
      heightCm: 70,
     },
     {
      name: "Puf",
      nameEn: "Pouf",
      widthCm: 40,
      depthCm: 40,
      heightCm: 43,
     },
     {
      name: "Sehpa",
      nameEn: "Coffee Table",
      widthCm: 40,
      depthCm: 40,
      heightCm: 43,
     },
    ]),
    description:
     "Modüler Tesla köşe grubu; L form oturma düzeni ve Antrasit renk seçeneği.",
    descriptionEn:
     "Modular Tesla corner set with L-shaped seating layout and Anthracite color option.",
    folder: "tesla-kose",
    imagePrefix: "antrasit",
    sortOrder: 1,
    isFeatured: true,
    featuredOrder: 8,
    variants: [
     {
      name: "Antrasit",
      nameEn: "Anthracite",
      color: "Antrasit",
      material: "Outdoor kumaş",
      materialEn: "Outdoor fabric",
      isDefault: true,
     },
    ],
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
     },
     {
      name: "Sandalye",
      nameEn: "Chair",
      widthCm: 57,
      depthCm: 60,
      heightCm: 85,
     },
    ]),
    description:
     "Tesla masa grubu; dış mekân yemek ve oturma alanları için masa ve sandalye kombinasyonu; Gri renk seçeneği.",
    descriptionEn:
     "Tesla table set; table and chair combination for outdoor dining and seating areas; available in Grey.",
    folder: "tesla-masa",
    sortOrder: 2,
    variants: [
     {
      name: "Gri",
      nameEn: "Grey",
      color: "Gri",
      material: "Alüminyum & cam",
      materialEn: "Aluminum & glass",
      isDefault: true,
     },
    ],
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
     },
     {
      name: "Tekli Koltuk",
      nameEn: "Armchair",
      widthCm: 75,
      depthCm: 75,
      heightCm: 80,
     },
     {
      name: "Masa",
      nameEn: "Table",
      widthCm: 80,
      depthCm: 140,
      heightCm: 70,
     },
     {
      name: "Puf",
      nameEn: "Pouf",
      widthCm: 40,
      depthCm: 40,
      heightCm: 43,
     },
    ]),
    description:
     "Tesla oturma grubu; geniş teras ve bahçe alanları için konforlu dış mekân mobilyası; Gri renk seçeneği.",
    descriptionEn:
     "Tesla seating set; comfortable outdoor furniture for spacious terrace and garden areas; available in Grey.",
    folder: "tesla-oturma",
    sortOrder: 3,
    isFeatured: true,
    featuredOrder: 9,
    variants: [
     {
      name: "Gri",
      nameEn: "Grey",
      color: "Gri",
      material: "Outdoor kumaş",
      materialEn: "Outdoor fabric",
      isDefault: true,
     },
    ],
   },
   //! ÖLÇÜLER YANLIŞ
   {
    slug: "tesla-salincak",
    name: "Tesla Salıncak",
    nameEn: "Tesla Swing",
    ...dims(220, 125, 205),
    description:
     "Tesla salıncak; bahçe ve terasta dinlenme için tasarlanmış dayanıklı salıncak modeli; Gri renk seçeneği.",
    descriptionEn:
     "Tesla swing; a durable swing model designed for relaxation in the garden and on the terrace; available in Grey.",
    folder: "tesla-salincak",
    sortOrder: 4,
    variants: [
     {
      name: "Gri",
      nameEn: "Grey",
      color: "Gri",
      material: "Alüminyum ve örgü",
      materialEn: "Aluminum and weave",
      isDefault: true,
     },
    ],
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
     },
     {
      name: "4'lü Koltuk",
      nameEn: "4-Seater Sofa",
      widthCm: 245,
      depthCm: 75,
      heightCm: 80,
     },
     {
      name: "2'li Koltuk",
      nameEn: "2-Seater Sofa",
      widthCm: 120,
      depthCm: 75,
      heightCm: 80,
     },
     {
      name: "Masa",
      nameEn: "Table",
      widthCm: 80,
      depthCm: 140,
      heightCm: 70,
     },
    ]),
    description:
     "Geniş oturum alanı ve modüler yapıya sahip Velar köşe grubu; Cappuccino renk seçeneği.",
    descriptionEn:
     "Velar corner set with spacious seating and modular structure; available in Cappuccino.",
    folder: "velar-kose",
    imagePrefix: "cappuccino",
    sortOrder: 1,
    isFeatured: true,
    featuredOrder: 10,
    variants: [
     {
      name: "Cappuccino",
      nameEn: "Cappuccino",
      color: "Cappuccino",
      material: "Outdoor kumaş",
      materialEn: "Outdoor fabric",
      isDefault: true,
     },
    ],
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
     },
     {
      name: "Sandalye",
      nameEn: "Chair",
      widthCm: 57,
      depthCm: 60,
      heightCm: 85,
     },
    ]),
    description:
     "Velar masa grubu; teras ve bahçe yemek alanları için şık masa takımı; Kahverengi renk seçeneği.",
    descriptionEn:
     "Velar table set; an elegant dining set for terrace and garden dining areas; available in Brown.",
    folder: "velar-masa",
    sortOrder: 2,
    variants: [
     {
      name: "Kahverengi",
      nameEn: "Brown",
      color: "Kahverengi",
      material: "Alüminyum & cam",
      materialEn: "Aluminum & glass",
      isDefault: true,
     },
    ],
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
     },
     {
      name: "Tekli Koltuk",
      nameEn: "Armchair",
      widthCm: 75,
      depthCm: 75,
      heightCm: 80,
     },
     {
      name: "Masa",
      nameEn: "Table",
      widthCm: 80,
      depthCm: 140,
      heightCm: 70,
     },
     {
      name: "Puf",
      nameEn: "Pouf",
      widthCm: 40,
      depthCm: 40,
      heightCm: 43,
     },
    ]),
    description:
     "Velar oturma grubu; premium bahçe mobilyası serisinin en çok tercih edilen modellerinden; Mavi renk seçeneği.",
    descriptionEn:
     "Velar seating set; one of the most popular models in the premium garden furniture series; available in Blue.",
    folder: "velar-oturma",
    sortOrder: 3,
    isFeatured: true,
    featuredOrder: 4,
    variants: [
     {
      name: "Mavi",
      nameEn: "Blue",
      color: "Mavi",
      material: "Outdoor kumaş",
      materialEn: "Outdoor fabric",
      isDefault: true,
     },
    ],
   },
   //! ÖLÇÜLER YANLIŞ
   {
    slug: "velar-salincak",
    name: "Velar Salıncak",
    nameEn: "Velar Swing",
    ...dims(215, 120, 200),
    description:
     "Velar salıncak; havuz kenarı ve teras dinlenme köşeleri için; Gri renk seçeneği.",
    descriptionEn:
     "Velar swing; for poolside and terrace relaxation corners; available in Grey.",
    folder: "velar-salincak",
    sortOrder: 4,
    isFeatured: true,
    featuredOrder: 3,
    variants: [
     {
      name: "Gri",
      nameEn: "Grey",
      color: "Gri",
      material: "Alüminyum ve örgü",
      materialEn: "Aluminum and weave",
      isDefault: true,
     },
    ],
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
     },
     {
      name: "Sehpa",
      nameEn: "Coffee Table",
      widthCm: 40,
      depthCm: 40,
      heightCm: 40,
     },
    ]),
    description:
     "Velar şezlong; ayarlanabilir sırtlı yapısıyla havuz ve güneş terası kullanımına uygun; Kahverengi renk seçeneği.",
    descriptionEn:
     "Velar sun lounger with adjustable backrest; suitable for pool and sun terrace use; available in Brown.",
    folder: "velar-sezlong",
    sortOrder: 5,
    isFeatured: true,
    featuredOrder: 2,
    variants: [
     {
      name: "Kahverengi",
      nameEn: "Brown",
      color: "Kahverengi",
      material: "Alüminyum",
      materialEn: "Aluminum",
      isDefault: true,
     },
    ],
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
     },
     {
      name: "Sehpa",
      nameEn: "Coffee Table",
      widthCm: 40,
      depthCm: 40,
      heightCm: 55,
     },
    ]),
    description:
     "Trend sallanır sandalye; rahat oturum ve salınım hareketiyle teras ve bahçe keyfi; Mavi renk seçeneği.",
    descriptionEn:
     "Trend rocking chair; terrace and garden enjoyment with comfortable seating and gentle rocking motion; available in Blue.",
    folder: "trend-sandalye",
    sortOrder: 1,
    isFeatured: true,
    featuredOrder: 1,
    variants: [
     {
      name: "Mavi",
      nameEn: "Blue",
      color: "Mavi",
      material: "Alüminyum ve örgü",
      materialEn: "Aluminum and weave",
      isDefault: true,
     },
    ],
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
   collectionId,
   images: {
    create: imageUrls.map((url, index) => ({
     url,
     alt: index === 0 ? data.name : `${data.name} — görsel ${index + 1}`,
     altEn: index === 0 ? data.nameEn : `${data.nameEn} — image ${index + 1}`,
     sortOrder: index,
     isPrimary: index === 0,
    })),
   },
   variants: {
    create: data.variants.map((variant, index) => ({
     name: variant.name,
     nameEn: variant.nameEn ?? null,
     color: variant.color ?? null,
     material: variant.material ?? null,
     materialEn: variant.materialEn ?? null,
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

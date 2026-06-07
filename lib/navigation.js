export const brandName = "Fablessi";
export const brandSlug = "fablessi";

export const headerQuickLinks = [
 { label: "Ürünler", href: "/urunler", megaMenu: "products" },
 { label: "Katalog", href: "/katalog" },
];

export const headerUtilityLeft = [
 { label: "Ara", href: "/ara", icon: "search" },
];

export const headerUtilityRight = [];

export const secondaryNavItems = [
 { label: "Hakkımızda", href: "/hakkimizda" },
 { label: "Projeler", href: "/projeler" },
 { label: "Mağazalar", href: "/magazalar" },
 { label: "İletişim", href: "/iletisim" },
];

export const productsMegaMenu = {
 categories: [
  {
   label: "Açelya Oturma Grubu Antrasit",
   href: "/urunler?kategori=acelya-oturma-antrasit",
   image: "/acelya-oturma/antrasit-01.jpg",
  },
  {
   label: "Açelya Oturma Grubu Cappuccino",
   href: "/urunler?kategori=acelya-oturma-cappuccino",
   image: "/acelya-oturma/cappuccino-01.jpg",
  },
  {
   label: "Aston Oturma Grubu Antrasit",
   href: "/urunler?kategori=aston-oturma-antrasit",
   image: "/aston-oturma/antrasit-01.jpg",
  },
  {
   label: "Aston Oturma Grubu Cappuccino",
   href: "/urunler?kategori=aston-oturma-cappuccino",
   image: "/aston-oturma/cappuccino-01.jpg",
  },
  {
   label: "Begonia 2'li Oturma Grubu Cappuccino",
   href: "/urunler?kategori=begonia-2li-cappuccino",
   image: "/begonia-2li/cappuccino-01.jpg",
  },
  {
   label: "Begonia Oturma Grubu Antrasit",
   href: "/urunler?kategori=begonia-oturma-antrasit",
   image: "/begonia-oturma/antrasit-01.jpg",
  },
  {
   label: "Begonia Oturma Grubu Gri",
   href: "/urunler?kategori=begonia-oturma-gri",
   image: "/begonia-oturma/gri-01.jpg",
  },
  {
   label: "Tesla Köşe Grubu Antrasit",
   href: "/urunler?kategori=tesla-kose-antrasit",
   image: "/tesla-kose/antrasit-01.jpg",
  },
  {
   label: "Tesla Masa Grubu",
   href: "/urunler?kategori=tesla-masa",
   image: "/tesla-masa/01.jpg",
  },
  {
   label: "Tesla Oturma Grubu",
   href: "/urunler?kategori=tesla-oturma",
   image: "/tesla-oturma/01.jpg",
  },
  {
   label: "Tesla Salıncak",
   href: "/urunler?kategori=tesla-salincak",
   image: "/tesla-salincak/01.jpeg",
  },
  {
   label: "Trend Sallanır Sandalye",
   href: "/urunler?kategori=trend-sandalye",
   image: "/trend-sandalye/01.jpg",
  },
  {
   label: "Velar Köşe Grubu Cappuccino",
   href: "/urunler?kategori=velar-kose-cappuccino",
   image: "/velar-kose/cappuccino-01.jpg",
  },
  {
   label: "Velar Masa Grubu",
   href: "/urunler?kategori=velar-masa",
   image: "/velar-masa/01.jpg",
  },
  {
   label: "Velar Oturma Grubu",
   href: "/urunler?kategori=velar-oturma",
   image: "/velar-oturma/01.jpg",
  },
  {
   label: "Velar Salıncak",
   href: "/urunler?kategori=velar-salincak",
   image: "/velar-salincak/01.jpeg",
  },
  {
   label: "Velar Şezlong",
   href: "/urunler?kategori=velar-sezlong",
   image: "/velar-sezlong/01.jpg",
  }
 ],
};

export const primaryNavItems = [
 { label: "Ürünler", href: "/urunler", megaMenu: "products" },
 { label: "Koleksiyonlar", href: "/koleksiyonlar" },
 { label: "Katalog", href: "/katalog" },
 { label: "Projeler", href: "/projeler" },
 { label: "Mağazalar", href: "/magazalar" },
 { label: "Hakkımızda", href: "/hakkimizda" },
];

export const footerExploreLinks = [
 { label: "Hakkımızda", href: "/hakkimizda" },
 { label: "Üretim & Fabrika", href: "/uretim-fabrika" },
 { label: "Sürdürülebilirlik", href: "/surdurulebilirlik" },
 { label: "Mimari Destek", href: "/mimari-destek" },
 { label: "Tasarımcılar", href: "/tasarimcilar" },
 { label: "Projeler", href: "/projeler" },
];

export const footerCustomerServiceLinks = [
 { label: "Sıkça Sorulan Sorular", href: "/sss" },
 { label: "Kişisel Verilerin Korunması", href: "/kvkk" },
 { label: "Gizlilik ve Güvenlik", href: "/gizlilik-politikasi" },
 { label: "Çerez Politikası", href: "/cerez-politikasi" },
 { label: "İletişim", href: "/iletisim" },
];

export const footerCategoryLinks = [
 { label: "Oturma Grupları", href: "/urunler?kategori=oturma-gruplari" },
 { label: "Masalar", href: "/urunler?kategori=masalar" },
 { label: "Sehpalar", href: "/urunler?kategori=sehpalar" },
 { label: "Sandalyeler", href: "/urunler?kategori=sandalyeler" },
];

export const footerSpecialLinks = [
 { label: "Mağazalarımız", href: "/magazalar" },
 { label: "Katalog", href: "/katalog" },
 { label: "Koleksiyonlar", href: "/koleksiyonlar" },
 { label: "Fuarlarımız", href: "/fuarlar" },
];

/** @deprecated use footerExploreLinks */
export const footerCorporateLinks = footerExploreLinks;

export const mobileNavSections = [
 {
  items: [{ label: "Ürünler", href: "/urunler", megaMenu: "products" }],
 },
 {
  divider: true,
  items: [{ label: "Fablessi'le Keşfet", href: "/hakkimizda" }],
 },
 {
  divider: true,
  items: [
   {
    label: "Katalog",
    href: "/katalog",
    children: [
     { label: "Koleksiyonlar", href: "/koleksiyonlar" },
     { label: "Ürün Katalogu", href: "/urunler" },
    ],
   },
   { label: "Projeler", href: "/projeler" },
   { label: "Mağazalar", href: "/magazalar" },
   { label: "İletişim", href: "/iletisim" },
  ],
 },
];

export function getMobileSubmenuItems(item) {
 if (item.megaMenu === "products") {
  return productsMegaMenu.categories;
 }

 if (item.children?.length) {
  return item.children;
 }

 return [];
}
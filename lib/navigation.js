export const brandName = "ABC";

export const headerUtilityLeft = [
 { label: "Ara", href: "/ara", icon: "search" },
 { label: "Mağazalar", href: "/magazalar", icon: "map" },
];

export const headerUtilityRight = [
 { label: "Destek", href: "/destek", icon: "headphones" },
];

export const secondaryNavItems = [
 { label: "Kurumsal", href: "/hakkimizda" },
 { label: "World of Mobilya", href: "/dunya" },
 { label: "Tasarımcılar", href: "/tasarimcilar" },
 { label: "B2B", href: "/b2b" },
 { label: "İletişim", href: "/iletisim" },
 { label: "Product Gallery", href: "/urunler" },
 { label: "Showroom", href: "/showroom" },
];

export const productsMegaMenu = {
 categories: [
  { label: "Oturma Grupları", href: "/urunler?kategori=oturma-gruplari" },
  { label: "Masa Grupları", href: "/urunler?kategori=masa-gruplari" },
  { label: "Koltuklar", href: "/urunler?kategori=koltuklar" },
  { label: "Kanepeler", href: "/urunler?kategori=kanepeler" },
  { label: "Masalar", href: "/urunler?kategori=masalar" },
  { label: "Sandalyeler", href: "/urunler?kategori=sandalyeler" },
 ],
 featured: {
  title: "MARMOR SERIES",
  subtitle: "Koleksiyon",
  designer: "Tasarım || Studio Mobilya",
  href: "/koleksiyonlar/marmor-series",
  image:
   "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1200&q=85",
 },
};

export const primaryNavItems = [
 { label: "Ürünler", href: "/urunler", megaMenu: "products" },
 { label: "Koleksiyonlar", href: "/koleksiyonlar" },
 { label: "Katalog", href: "/katalog" },
 { label: "Inspiration", href: "/ilham" },
 { label: "Etkinlikler", href: "/etkinlikler" },
 { label: "Projeler", href: "/projeler" },
 { label: "Ethereal", href: "/koleksiyonlar/marmor-series" },
 { label: "Mağazalar", href: "/magazalar" },
];

export const footerCorporateLinks = [
 { label: "Hakkımızda", href: "/hakkimizda" },
 { label: "Mağazalar", href: "/magazalar" },
 { label: "Projeler", href: "/projeler" },
 { label: "Gizlilik ve Güvenlik Politikası", href: "/gizlilik-politikasi" },
 { label: "Mesafeli Satış Sözleşmesi", href: "/mesafeli-satis-sozlesmesi" },
];

export const footerCustomerServiceLinks = [
 { label: "İletişim", href: "/iletisim" },
 { label: "Sıkça Sorulan Sorular", href: "/sss" },
 { label: "Teslimat ve İade", href: "/teslimat-iade" },
];

export function getMobileSubmenuItems(item) {
 if (item.megaMenu === "products") {
  return [
   ...productsMegaMenu.categories,
   ...productsMegaMenu.collections,
  ];
 }

 if (item.children?.length) {
  return item.children;
 }

 return [];
}

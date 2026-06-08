export const brandName = "Fablessi";
export const brandSlug = "fablessi";

export const headerQuickLinks = [
 { label: "Ürünler", href: "/urunler", megaMenu: "products" },
];

export const headerUtilityLeft = [
 { label: "Ara", href: "/ara", icon: "search" },
];

export const headerUtilityRight = [];

export const secondaryNavItems = [
 { label: "Hakkımızda", href: "/hakkimizda" },
 { label: "Projeler", href: "/projeler" },
 { label: "İletişim", href: "/iletisim" },
];

export const productsMegaMenu = {
 groups: [
  {
   slug: "oturma-gruplari",
   label: "Oturma Grupları",
   href: "/urunler?kategori=oturma-gruplari",
   items: [
    {
     label: "Açelya",
     href: "/urunler/acelya-oturma",
     image: "/acelya-oturma/antrasit-01.jpg",
    },
    {
     label: "Aston",
     href: "/urunler/aston-oturma",
     image: "/aston-oturma/antrasit-01.jpg",
    },
    {
     label: "Begonia",
     href: "/urunler/begonia-oturma",
     image: "/begonia-oturma/antrasit-01.jpg",
    },
    {
     label: "Tesla",
     href: "/urunler/tesla-oturma",
     image: "/tesla-oturma/01.jpg",
    },
    {
     label: "Velar",
     href: "/urunler/velar-oturma",
     image: "/velar-oturma/01.jpg",
    },

    {
     label: "Begonia 2'li",
     href: "/urunler/begonia-2li",
     image: "/begonia-2li/cappuccino-01.jpg",
    },
   ],
  },
  {
   slug: "kose-gruplari",
   label: "Köşe Grupları",
   href: "/urunler?kategori=kose-gruplari",
   items: [
    {
     label: "Tesla",
     href: "/urunler/tesla-kose",
     image: "/tesla-kose/antrasit-01.jpg",
    },
    {
     label: "Velar",
     href: "/urunler/velar-kose",
     image: "/velar-kose/cappuccino-01.jpg",
    },
   ],
  },
  {
   slug: "masalar",
   label: "Masa Grupları",
   href: "/urunler?kategori=masalar",
   items: [
    {
     label: "Tesla",
     href: "/urunler/tesla-masa",
     image: "/tesla-masa/01.jpg",
    },
    {
     label: "Velar",
     href: "/urunler/velar-masa",
     image: "/velar-masa/01.jpg",
    },
   ],
  },
  {
   slug: "salincak",
   label: "Salıncak",
   href: "/urunler?kategori=salincak",
   items: [
    {
     label: "Tesla Salıncak",
     href: "/urunler/tesla-salincak",
     image: "/tesla-salincak/01.jpeg",
    },
    {
     label: "Velar Salıncak",
     href: "/urunler/velar-salincak",
     image: "/velar-salincak/01.jpeg",
    },
   ],
  },
  {
   slug: "sezlong",
   label: "Şezlong",
   href: "/urunler?kategori=sezlong",
   items: [
    {
     label: "Velar Şezlong",
     href: "/urunler/velar-sezlong",
     image: "/velar-sezlong/01.jpg",
    },
   ],
  },
  {
   slug: "sandalyeler",
   label: "Sandalyeler",
   href: "/urunler?kategori=sandalyeler",
   items: [
    {
     label: "Trend",
     href: "/urunler/trend-sandalye",
     image: "/trend-sandalye/01.jpg",
    },
   ],
  },
 ],
};

export function getProductCategoryGroup(productSlug) {
 for (const group of productsMegaMenu.groups) {
  if (group.items.some((item) => item.href === `/urunler/${productSlug}`)) {
   return group;
  }
 }

 return null;
}

/** Ürün listesi sayfasında kategori filtresi için slug eşlemesi */
export const productCategorySlugs = Object.fromEntries(
 productsMegaMenu.groups.map((group) => [
  group.slug,
  group.items.map((item) => item.href.replace("/urunler/", "")),
 ])
);

export function getAllProductMenuItems() {
 return productsMegaMenu.groups.flatMap((group) => group.items);
}

export const primaryNavItems = [
 { label: "Ürünler", href: "/urunler", megaMenu: "products", icon: "products" },
 { label: "İletişim", href: "/iletisim", icon: "contact", iconOnly: true },
];

export const footerExploreLinks = [
 { label: "Hakkımızda", href: "/hakkimizda" },
 { label: "Üretim & Fabrika", href: "/uretim-fabrika" },
 { label: "Misyon & Vizyon", href: "/misyon-vizyon" },
];

export const footerCustomerServiceLinks = [
 { label: "Sıkça Sorulan Sorular", href: "/sss" },
 { label: "Kişisel Verilerin Korunması", href: "/kvkk" },
 { label: "Gizlilik ve Güvenlik", href: "/gizlilik-politikasi" },
 { label: "Çerez Politikası", href: "/cerez-politikasi" },
];

export const footerCategoryLinks = productsMegaMenu.groups.map((group) => ({
 label: group.label,
 href: group.href,
}));

/** @deprecated use footerExploreLinks */
export const footerCorporateLinks = footerExploreLinks;

export const mobileNavSections = [
 {
  items: [
   {
    label: "Ürünler",
    href: "/urunler",
    megaMenu: "products",
    icon: "products",
   },
  ],
 },
 {
  divider: true,
  items: [
   { label: "Fablessi'le Keşfet", href: "/hakkimizda", icon: "explore" },
  ],
 },
 {
  divider: true,
  items: [{ label: "İletişim", href: "/iletisim", icon: "contact" }],
 },
];

export function getMobileSubmenuItems(item) {
 if (item.megaMenu === "products") {
  return productsMegaMenu.groups.flatMap((group) => [
   { label: group.label, href: group.href, isGroup: true },
   ...group.items,
  ]);
 }

 if (item.children?.length) {
  return item.children;
 }

 return [];
}

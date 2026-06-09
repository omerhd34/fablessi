import { getLocalizedMenuProductLabel } from "@/lib/i18n/display-names";
import { productMenuGroupsData } from "@/lib/i18n/navigation-data";

function getProductSlugFromHref(href) {
 return href.replace("/urunler/", "");
}

export function buildProductsMegaMenu(dictionary) {
 return {
  groups: productMenuGroupsData.map((group) => ({
   ...group,
   label: dictionary.categories[group.slug] ?? group.slug,
   items: group.items.map((item) => {
    const slug = item.slug ?? getProductSlugFromHref(item.href);

    return {
     ...item,
     slug,
     label: getLocalizedMenuProductLabel(slug, dictionary, item.label),
    };
   }),
  })),
 };
}

export function buildNavigation(dictionary) {
 const productsMegaMenu = buildProductsMegaMenu(dictionary);
 const { nav, footer } = dictionary;

 return {
  productsMegaMenu,
  headerQuickLinks: [
   { label: nav.products, href: "/urunler", megaMenu: "products" },
  ],
  headerUtilityLeft: [{ label: nav.search, href: "/ara", icon: "search" }],
  headerUtilityRight: [],
  secondaryNavItems: [
   { label: nav.about, href: "/hakkimizda" },
   { label: nav.projects, href: "/projeler" },
   { label: nav.contact, href: "/iletisim" },
  ],
  primaryNavItems: [
   { label: nav.products, href: "/urunler", megaMenu: "products", icon: "products" },
   { label: nav.contact, href: "/iletisim", icon: "contact", iconOnly: true },
  ],
  footerExploreLinks: [
   { label: footer.about, href: "/hakkimizda" },
   { label: footer.mission, href: "/misyon-vizyon" },
   { label: footer.faq, href: "/sss" },
  ],
  footerCustomerServiceLinks: [
   { label: footer.kvkk, href: "/kvkk" },
   { label: footer.privacy, href: "/gizlilik-politikasi" },
   { label: footer.cookies, href: "/cerez-politikasi" },
  ],
  footerCategoryLinks: productsMegaMenu.groups.map((group) => ({
   label: group.label,
   href: group.href,
  })),
  mobileNavSections: [
   {
    items: [
     {
      label: nav.products,
      href: "/urunler",
      megaMenu: "products",
      icon: "products",
     },
    ],
   },
   {
    divider: true,
    items: [{ label: nav.exploreWithBrand, href: "/hakkimizda", icon: "explore" }],
   },
   {
    divider: true,
    items: [
     { label: nav.mission, href: "/misyon-vizyon", icon: "mission" },
     { label: nav.faq, href: "/sss", icon: "faq" },
     { label: nav.contact, href: "/iletisim", icon: "contact" },
    ],
   },
  ],
 };
}

export function getProductCategoryGroupFromMenu(productSlug, productsMegaMenu) {
 for (const group of productsMegaMenu.groups) {
  if (group.items.some((item) => item.href === `/urunler/${productSlug}`)) {
   return group;
  }
 }
 return null;
}

export const productCategorySlugsFromMenu = (productsMegaMenu) =>
 Object.fromEntries(
  productsMegaMenu.groups.map((group) => [
   group.slug,
   group.items.map((item) => item.href.replace("/urunler/", "")),
  ])
 );

export function getAllProductMenuItemsFromMenu(productsMegaMenu) {
 return productsMegaMenu.groups.flatMap((group) => group.items);
}

export function getMobileSubmenuItemsFromMenu(item, productsMegaMenu) {
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

import { getDictionary } from "@/lib/i18n/get-dictionary";
import { defaultLocale } from "@/lib/i18n/config";
import {
 buildNavigation,
 buildProductsMegaMenu,
 getAllProductMenuItemsFromMenu,
 getMobileSubmenuItemsFromMenu,
 getProductCategoryGroupFromMenu,
 productCategorySlugsFromMenu,
} from "@/lib/i18n/build-navigation";

export const brandName = "Fablessi";
export const brandFullName = "Fablessi Outdoor Living";
export const brandFullNameUppercase = brandFullName.toLocaleUpperCase("en-US");
export const brandSlug = "fablessi";

const defaultNavigation = buildNavigation(getDictionary(defaultLocale));

export const productsMegaMenu = defaultNavigation.productsMegaMenu;
export const headerQuickLinks = defaultNavigation.headerQuickLinks;
export const headerUtilityLeft = defaultNavigation.headerUtilityLeft;
export const headerUtilityRight = defaultNavigation.headerUtilityRight;
export const secondaryNavItems = defaultNavigation.secondaryNavItems;
export const primaryNavItems = defaultNavigation.primaryNavItems;
export const footerExploreLinks = defaultNavigation.footerExploreLinks;
export const footerCustomerServiceLinks = defaultNavigation.footerCustomerServiceLinks;
export const footerCategoryLinks = defaultNavigation.footerCategoryLinks;
export const mobileNavSections = defaultNavigation.mobileNavSections;

/** @deprecated use footerExploreLinks */
export const footerCorporateLinks = footerExploreLinks;

export function getProductCategoryGroup(productSlug) {
 return getProductCategoryGroupFromMenu(productSlug, productsMegaMenu);
}

export const productCategorySlugs = productCategorySlugsFromMenu(productsMegaMenu);

export function getAllProductMenuItems() {
 return getAllProductMenuItemsFromMenu(productsMegaMenu);
}

export function getMobileSubmenuItems(item) {
 return getMobileSubmenuItemsFromMenu(item, productsMegaMenu);
}

export { buildNavigation, buildProductsMegaMenu };

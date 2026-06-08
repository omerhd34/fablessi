import Image from "next/image";
import Link from "next/link";
import { productsMegaMenu } from "@/lib/navigation";

const menuCategories = productsMegaMenu.groups.map((group) => ({
 slug: group.slug,
 label: group.label,
 href: group.href,
 image: group.items[0]?.image,
}));

export function MobileProductsCategoryGrid({ onClose }) {
 return (
  <div className="grid grid-cols-2 gap-3 pb-2">
   {menuCategories.map((category) => (
    <Link
     key={category.slug}
     href={category.href}
     onClick={onClose}
     className="group relative block aspect-4/5 overflow-hidden rounded-2xl bg-cream/60"
    >
     {category.image ? (
      <Image
       src={category.image}
       alt={category.label}
       fill
       sizes="45vw"
       className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />
     ) : null}
     <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/10 to-transparent" />
     <span className="absolute right-3 bottom-3 left-3 text-sm font-semibold text-white drop-shadow-sm">
      {category.label}
     </span>
    </Link>
   ))}
  </div>
 );
}

import Link from "next/link";
import { FaWhatsapp, Mail, MapPin, Phone } from "@/lib/icons";
import { flagshipStore } from "@/lib/stores";
import { SocialIcon } from "@/components/layout/social-icon";
import {
 brandName,
 footerCategoryLinks,
 footerCustomerServiceLinks,
 footerExploreLinks
} from "@/lib/navigation";
import {
 getWhatsAppHref,
 siteEmail,
 sitePhone,
 sitePhoneHref,
 siteWorkingHours,
 socialLinks,
} from "@/lib/site-contact";
import { cn } from "@/lib/utils";

function FooterColumn({ title, titleHref, children, className }) {
 const titleClassName =
  "font-body text-[13px] font-semibold tracking-wide text-charcoal transition-colors hover:text-charcoal/80";

 return (
  <div className={cn("flex flex-col gap-5", className)}>
   {titleHref ? (
    <Link href={titleHref} className={titleClassName}>
     {title}
    </Link>
   ) : (
    <h2 className={titleClassName}>{title}</h2>
   )}
   <div className="flex flex-1 flex-col">{children}</div>
  </div>
 );
}

function FooterLinkList({ links }) {
 return (
  <ul className="flex flex-col gap-3">
   {links.map((item) => (
    <li key={item.href}>
     <Link
      href={item.href}
      className="font-body text-[13px] leading-relaxed text-charcoal/75 transition-colors hover:text-charcoal"
     >
      {item.label}
     </Link>
    </li>
   ))}
  </ul>
 );
}

export function Footer() {
 const whatsAppHref = getWhatsAppHref();
 const year = new Date().getFullYear();

 return (
  <footer className="mt-4 rounded-t-[2rem] bg-white pb-28 pt-14 shadow-[0_-4px_32px_rgb(0_0_0/4%)] sm:pb-24 lg:pb-16 lg:pt-16">
   <div className="container-premium">
    <div className="grid gap-y-12 gap-x-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-12 xl:gap-x-16">
     <FooterColumn title="Keşfet">
      <FooterLinkList links={footerExploreLinks} />
     </FooterColumn>

     <FooterColumn title="Kategoriler">
      <FooterLinkList links={footerCategoryLinks} />
     </FooterColumn>

     <FooterColumn title="Yardım & Politikalar">
      <FooterLinkList links={footerCustomerServiceLinks} />
     </FooterColumn>

     <FooterColumn
      title="İletişime Geçin"
      titleHref="/iletisim"
      className="sm:col-span-2 lg:col-span-1"
     >
      <div className="flex flex-col gap-5">
       <div className="space-y-1.5 font-body text-[13px] leading-relaxed text-charcoal/70">
        {siteWorkingHours.map((row) => (
         <p key={row.label}>
          {row.label}: {row.hours}
         </p>
        ))}
       </div>

       <div className="flex flex-wrap items-center gap-5">
        {sitePhoneHref ? (
         <Link
          href={sitePhoneHref}
          className="text-charcoal/70 transition-colors hover:text-charcoal"
          aria-label={`Telefon: ${sitePhone}`}
         >
          <Phone className="size-4 shrink-0" aria-hidden />
         </Link>
        ) : null}
        {whatsAppHref ? (
         <Link
          href={whatsAppHref}
          target="_blank"
          rel="noopener noreferrer"
          className="text-charcoal/70 transition-colors hover:text-charcoal"
          aria-label="WhatsApp"
         >
          <FaWhatsapp className="size-4" aria-hidden />
         </Link>
        ) : null}
        {siteEmail ? (
         <Link
          href={`mailto:${siteEmail}`}
          className="text-charcoal/70 transition-colors hover:text-charcoal"
          aria-label={`E-posta: ${siteEmail}`}
         >
          <Mail className="size-4 shrink-0" aria-hidden />
         </Link>
        ) : null}
        {flagshipStore.mapUrl ? (
         <Link
          href={flagshipStore.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-charcoal/70 transition-colors hover:text-charcoal"
          aria-label="Konum"
         >
          <MapPin className="size-4 shrink-0" aria-hidden />
         </Link>
        ) : null}
        {socialLinks.map((item) => (
         <Link
          key={item.label}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-charcoal/70 transition-colors hover:text-charcoal"
          aria-label={item.label}
         >
          <SocialIcon label={item.label} />
         </Link>
        ))}
       </div>
      </div>
     </FooterColumn>
    </div>

    <div className="mt-14 flex flex-col gap-4 border-t border-charcoal/8 pt-8 lg:mt-16 lg:pt-10 sm:flex-row sm:items-center sm:justify-between">
     <p className="font-body text-[12px] text-charcoal/55">
      {year} © {brandName}
     </p>
     <p className="font-body text-[12px] text-charcoal/55 sm:text-right">
      Site geliştirici:{" "}
      <Link
       href="https://www.omerhalisdemir.com.tr/"
       target="_blank"
       rel="noopener noreferrer"
       className="text-charcoal/70 underline underline-offset-2 transition-colors hover:text-charcoal"
      >
       Ömer Halis Demir
      </Link>
     </p>
    </div>
   </div>
  </footer>
 );
}

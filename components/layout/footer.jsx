import Link from "next/link";
import { FaWhatsapp, Mail, Phone } from "@/lib/icons";
import { FooterNewsletter } from "@/components/layout/footer-newsletter";
import { SocialIcon } from "@/components/layout/social-icon";
import {
 brandName,
 footerCorporateLinks,
 footerCustomerServiceLinks,
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

function FooterColumn({ title, children, className, centered = false }) {
 return (
  <div className={cn("flex flex-col", className)}>
   <h2 className="font-display text-[13px] font-semibold tracking-[0.22em] text-charcoal uppercase">
    {title}
   </h2>
   <div
    className={cn(
     "mt-5 flex flex-1 flex-col",
     centered && "items-center text-center"
    )}
   >
    {children}
   </div>
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
      className="font-body text-[13px] text-charcoal/80 transition-colors hover:text-charcoal"
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
  <footer className="border-t border-charcoal/10 bg-white pb-24 pt-12 sm:pb-20 lg:pb-16">
   <div className="container-premium">
    <div className="grid gap-10 lg:grid-cols-[1fr_1fr_1.1fr_1.15fr] lg:gap-0">
     <FooterColumn title="Kurumsal" className="lg:pr-10">
      <FooterLinkList links={footerCorporateLinks} />
     </FooterColumn>

     <FooterColumn
      title="Müşteri Hizmetleri"
      className="lg:border-l lg:border-charcoal/10 lg:px-10"
     >
      <FooterLinkList links={footerCustomerServiceLinks} />
     </FooterColumn>

     <FooterColumn
      title="Bize Ulaşın"
      centered
      className="lg:border-l lg:border-charcoal/10 lg:px-10"
     >
      <div className="space-y-1 font-body text-[13px] leading-relaxed text-charcoal/75">
       {siteWorkingHours.map((row) => (
        <p key={row.label}>
         {row.label}: {row.hours}
        </p>
       ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-5">
       <Link
        href={sitePhoneHref}
        className="text-charcoal/45 transition-colors hover:text-charcoal"
        aria-label={`Telefon: ${sitePhone}`}
       >
        <Phone className="size-4 shrink-0" aria-hidden />
       </Link>
       {whatsAppHref ? (
        <Link
         href={whatsAppHref}
         target="_blank"
         rel="noopener noreferrer"
         className="text-charcoal/45 transition-colors hover:text-charcoal"
         aria-label="WhatsApp"
        >
         <FaWhatsapp className="size-4" aria-hidden />
        </Link>
       ) : null}
       <Link
        href={`mailto:${siteEmail}`}
        className="text-charcoal/45 transition-colors hover:text-charcoal"
        aria-label={`E-posta: ${siteEmail}`}
       >
        <Mail className="size-4 shrink-0" aria-hidden />
       </Link>
       {socialLinks.map((item) => (
        <Link
         key={item.label}
         href={item.href}
         target="_blank"
         rel="noopener noreferrer"
         className="text-charcoal/45 transition-colors hover:text-charcoal"
         aria-label={item.label}
        >
         <SocialIcon label={item.label} />
        </Link>
       ))}
      </div>
     </FooterColumn>

     <FooterColumn
      title="Bülten"
      className="lg:border-l lg:border-charcoal/10 lg:pl-10"
     >
      <FooterNewsletter />
     </FooterColumn>
    </div>

    <div className="mt-10 flex flex-col gap-3 border-t border-charcoal/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
     <p className="font-body text-[12px] text-charcoal/55">
      © {year} {brandName}
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

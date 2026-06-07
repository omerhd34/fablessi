import Link from "next/link";
import { FaWhatsapp, Mail, Phone } from "@/lib/icons";
import { FooterNewsletter } from "@/components/layout/footer-newsletter";
import { SocialIcon } from "@/components/layout/social-icon";
import {
 brandName,
 footerCategoryLinks,
 footerCustomerServiceLinks,
 footerExploreLinks,
 footerSpecialLinks,
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

function FooterColumn({ title, children, className }) {
 return (
  <div className={cn("flex flex-col", className)}>
   <h2 className="font-body text-[13px] font-semibold text-charcoal">
    {title}
   </h2>
   <div className="mt-4 flex flex-1 flex-col">{children}</div>
  </div>
 );
}

function FooterLinkList({ links }) {
 return (
  <ul className="flex flex-col gap-2.5">
   {links.map((item) => (
    <li key={item.href}>
     <Link
      href={item.href}
      className="font-body text-[13px] text-charcoal/75 transition-colors hover:text-charcoal"
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
  <footer className="mt-4 rounded-t-[2rem] bg-white pb-28 pt-12 shadow-[0_-4px_32px_rgb(0_0_0/4%)] sm:pb-24 lg:pb-16">
   <div className="container-premium">
    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
     <FooterColumn title="Keşfet">
      <FooterLinkList links={footerExploreLinks} />
     </FooterColumn>

     <FooterColumn title="Müşteri Hizmetleri">
      <FooterLinkList links={footerCustomerServiceLinks} />
     </FooterColumn>

     <FooterColumn title="Popüler Kategoriler">
      <FooterLinkList links={footerCategoryLinks} />
     </FooterColumn>

     <FooterColumn title="Özel Sayfalar">
      <FooterLinkList links={footerSpecialLinks} />
     </FooterColumn>

     <FooterColumn title="İletişime Geçin">
      {siteEmail ? (
       <Link
        href={`mailto:${siteEmail}`}
        className="font-body mt-2 block text-[13px] text-charcoal/75 transition-colors hover:text-charcoal"
       >
        {siteEmail}
       </Link>
      ) : null}

      <div className="mt-4 space-y-1 font-body text-[13px] text-charcoal/70">
       {siteWorkingHours.map((row) => (
        <p key={row.label}>
         {row.label}: {row.hours}
        </p>
       ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-4">
       {sitePhoneHref ? (
        <Link
         href={sitePhoneHref}
         className="text-charcoal/50 transition-colors hover:text-charcoal"
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
         className="text-charcoal/50 transition-colors hover:text-charcoal"
         aria-label="WhatsApp"
        >
         <FaWhatsapp className="size-4" aria-hidden />
        </Link>
       ) : null}
       {siteEmail ? (
        <Link
         href={`mailto:${siteEmail}`}
         className="text-charcoal/50 transition-colors hover:text-charcoal"
         aria-label={`E-posta: ${siteEmail}`}
        >
         <Mail className="size-4 shrink-0" aria-hidden />
        </Link>
       ) : null}
       {socialLinks.map((item) => (
        <Link
         key={item.label}
         href={item.href}
         target="_blank"
         rel="noopener noreferrer"
         className="text-charcoal/50 transition-colors hover:text-charcoal"
         aria-label={item.label}
        >
         <SocialIcon label={item.label} />
        </Link>
       ))}
      </div>

      <div className="mt-8">
       <FooterNewsletter />
      </div>
     </FooterColumn>
    </div>

    <div className="mt-12 flex flex-col gap-3 border-t border-charcoal/8 pt-6 sm:flex-row sm:items-center sm:justify-between">
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

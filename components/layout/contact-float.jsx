import Link from "next/link";
import { FaWhatsapp, Phone } from "@/lib/icons";
import { getWhatsAppHref, sitePhoneHref } from "@/lib/site-contact";

export function ContactFloat() {
 const whatsAppHref = getWhatsAppHref();
 const phoneHref = sitePhoneHref;

 if (!whatsAppHref && !phoneHref) return null;

 return (
  <div className="fixed right-4 bottom-5 z-50 flex flex-col gap-3 sm:right-6 sm:bottom-6">
   {phoneHref ? (
    <Link
     href={phoneHref}
     className="flex size-12 items-center justify-center rounded-full bg-white shadow-[0_4px_20px_rgb(0_0_0/15%)] transition-transform hover:scale-105 active:scale-95 sm:size-13"
     aria-label="Telefon ile ara"
    >
     <Phone className="size-5 text-charcoal" aria-hidden />
    </Link>
   ) : null}
   {whatsAppHref ? (
    <Link
     href={whatsAppHref}
     target="_blank"
     rel="noopener noreferrer"
     className="flex size-12 items-center justify-center rounded-full bg-white shadow-[0_4px_20px_rgb(0_0_0/15%)] transition-transform hover:scale-105 active:scale-95 sm:size-13"
     aria-label="WhatsApp ile iletişime geç"
    >
     <FaWhatsapp className="size-6 text-[#25D366]" aria-hidden />
    </Link>
   ) : null}
  </div>
 );
}

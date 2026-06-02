import { brandName } from "@/lib/navigation";
import { siteEmail, sitePhone, sitePhoneHref, siteWorkingHours } from "@/lib/site-contact";

export const flagshipStore = {
 name: `${brandName.toUpperCase()}`,
 address: "İnegöl/Bursa",
 phone: sitePhone,
 phoneHref: sitePhoneHref,
 email: siteEmail,
 hours: siteWorkingHours,
 mapUrl:
  "https://www.google.com/maps/place/%C4%B0neg%C3%B6l,+Bursa/@40.096357,29.3347646,12z/data=!3m1!4b1!4m6!3m5!1s0x14cbc961d96a58f3:0x489c28e5e40d3937!8m2!3d40.0800822!4d29.5096969!16zL20vMDhuN205?entry=tts&g_ep=EgoyMDI2MDUzMS4wIPu8ASoASAFQAw%3D%3D&skid=d2308806-a341-45ef-99ee-f82bf634e74d",
 mapEmbedUrl:
  "https://www.google.com/maps?q=40.0800822,29.5096969&hl=tr&z=12&output=embed&iwloc=0",
 images: [
  {
   src: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1600&q=85",
   alt: "Showroom dış cephe",
  },
  {
   src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=85",
   alt: "Showroom iç mekân",
  },
 ],
};



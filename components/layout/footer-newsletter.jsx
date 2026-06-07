"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

function validateEmail(value) {
 const trimmed = value.trim();
 if (!trimmed) {
  return "Lütfen e-posta adresinizi girin.";
 }
 if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
  return "Geçerli bir e-posta adresi girin. Örnek: ad@ornek.com";
 }
 return "";
}

export function FooterNewsletter() {
 const [email, setEmail] = useState("");
 const [error, setError] = useState("");

 const handleSubmit = (event) => {
  event.preventDefault();
  const message = validateEmail(email);
  if (message) {
   setError(message);
   return;
  }
  setError("");
 };

 return (
  <div className="flex flex-col">
   <p className="font-body text-[13px] leading-relaxed text-charcoal/75">
    Yeni koleksiyonlar ve ürün duyurularından haberdar olmak için bültenimize
    abone olabilirsiniz.
   </p>

   <form onSubmit={handleSubmit} noValidate className="mt-4">
    <div
     className={cn(
      "flex items-end gap-3 border-b pb-1.5 transition-colors",
      error ? "border-charcoal/50" : "border-charcoal/20"
     )}
    >
     <input
      type="email"
      value={email}
      onChange={(event) => {
       setEmail(event.target.value);
       if (error) setError("");
      }}
      placeholder="E-postanızı girin"
      autoComplete="email"
      aria-invalid={Boolean(error)}
      aria-describedby={error ? "newsletter-email-error" : undefined}
      className="min-w-0 flex-1 bg-transparent font-body text-[13px] text-charcoal outline-none placeholder:text-charcoal/40"
     />
     <button
      type="submit"
      className="shrink-0 cursor-pointer font-body text-[11px] font-semibold tracking-wide text-charcoal uppercase transition-opacity hover:opacity-70"
     >
      Abone Ol
     </button>
    </div>
    {error ? (
     <p
      id="newsletter-email-error"
      role="alert"
      className="mt-2.5 font-body text-[12px] leading-relaxed text-red-500/70"
     >
      {error}
     </p>
    ) : null}
   </form>
  </div>
 );
}

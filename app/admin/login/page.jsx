"use client";

import { Suspense, useState } from "react";
import { AdminLogo } from "@/components/admin/admin-logo";
import { useRouter, useSearchParams } from "next/navigation";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
 InputGroup,
 InputGroupAddon,
 InputGroupButton,
 InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";

function AdminLoginForm() {
 const router = useRouter();
 const searchParams = useSearchParams();
 const [username, setUsername] = useState("");
 const [password, setPassword] = useState("");
 const [showPassword, setShowPassword] = useState(false);
 const [loading, setLoading] = useState(false);

 async function handleSubmit(event) {
  event.preventDefault();
  setLoading(true);

  try {
   const response = await fetch("/api/admin/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
   });

   const data = await response.json();
   if (!response.ok) throw new Error(data.error || "Giriş başarısız");

   const from = searchParams.get("from") || "/admin";
   router.push(from);
   router.refresh();
  } catch (error) {
   toast.error(error.message);
  } finally {
   setLoading(false);
  }
 }

 return (
  <div className="flex min-h-screen items-center justify-center bg-muted/20 px-4 py-10">
   <Card className="w-full max-w-xl gap-0 py-0 shadow-sm">
    <div className="flex w-full justify-center px-6 py-8">
     <AdminLogo height="h-14 sm:h-16" />
    </div>
    <CardHeader className="items-center gap-1 pb-4 pt-0 text-center">
     <div className="space-y-1">
      <h1 className="text-2xl font-semibold tracking-tight">Admin Girişi</h1>
      <p className="text-sm text-muted-foreground">
       Yönetim paneline erişmek için giriş yapın.
      </p>
     </div>
    </CardHeader>
    <CardContent className="px-6 pb-8 sm:px-10">
     <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
       <Label htmlFor="username" className="text-base">
        Kullanıcı adı
       </Label>
       <Input
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        autoComplete="username"
        className="h-11 text-base"
        required
       />
      </div>
      <div className="space-y-2">
       <Label htmlFor="password" className="text-base">
        Şifre
       </Label>
       <InputGroup className="h-11">
        <InputGroupInput
         id="password"
         type={showPassword ? "text" : "password"}
         value={password}
         onChange={(e) => setPassword(e.target.value)}
         autoComplete="current-password"
         className="text-base"
         required
        />
        <InputGroupAddon align="inline-end">
         <InputGroupButton
          size="icon-sm"
          variant="ghost"
          className="cursor-pointer"
          onClick={() => setShowPassword((current) => !current)}
          aria-label={showPassword ? "Şifreyi gizle" : "Şifreyi göster"}
         >
          {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
         </InputGroupButton>
        </InputGroupAddon>
       </InputGroup>
      </div>
      <Button type="submit" size="lg" className="mt-2 h-11 w-full cursor-pointer text-base" disabled={loading}>
       {loading ? "Giriş yapılıyor…" : "Giriş yap"}
      </Button>
     </form>
    </CardContent>
   </Card>
  </div>
 );
}

export default function AdminLoginPage() {
 return (
  <Suspense
   fallback={
    <div className="flex min-h-screen items-center justify-center text-muted-foreground">
     Yükleniyor…
    </div>
   }
  >
   <AdminLoginForm />
  </Suspense>
 );
}

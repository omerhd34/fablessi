"use client";

import { useEffect, useState } from "react";
import { ShieldCheck } from "@/lib/icons";
import { loadReactIconModule } from "@/lib/react-icon-resolver";

export function DynamicReactIcon({
 name,
 className,
 fallback: Fallback = ShieldCheck,
}) {
 const [Icon, setIcon] = useState(null);

 useEffect(() => {
  let active = true;

  if (!name?.trim()) {
   setIcon(null);
   return undefined;
  }

  loadReactIconModule(name)
   .then((component) => {
    if (active) setIcon(() => component);
   })
   .catch(() => {
    if (active) setIcon(null);
   });

  return () => {
   active = false;
  };
 }, [name]);

 const Resolved = Icon ?? Fallback;
 return <Resolved className={className} aria-hidden />;
}

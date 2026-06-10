import Link from "next/link";
import { MdEdit } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function EditButton({ href, size = "icon-sm", className }) {
 return (
  <Button variant="outline" size={size} className={cn("cursor-pointer", className)} asChild>
   <Link href={href} aria-label="Düzenle">
    <MdEdit className="size-4" />
   </Link>
  </Button>
 );
}

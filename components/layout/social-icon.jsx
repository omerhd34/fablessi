import { FaInstagram } from "react-icons/fa";
import { cn } from "@/lib/utils";

export function SocialIcon({ label, className }) {
 const iconClass = cn("size-4", className);

 if (label === "Instagram") {
  return <FaInstagram className={iconClass} aria-hidden />;
 }

 return null;
}

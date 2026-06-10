import { AdminShell } from "@/components/admin/admin-shell";

export const metadata = {
 title: "Admin | Fablessi",
 robots: { index: false, follow: false },
};

export default function AdminLayout({ children }) {
 return <AdminShell>{children}</AdminShell>;
}

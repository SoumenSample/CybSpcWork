import { requireRole } from "@/lib/auth";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";

import data from "../data.json";

export default async function AdminDashboardPage() {
  await requireRole("admin");

  return (
    <div className="flex flex-1 flex-col gap-4">
      <SectionCards />
      <ChartAreaInteractive />
      <DataTable data={data} />
    </div>
  );
}

// import Link from "next/link";
// import { requireRole } from "@/lib/auth";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// export default async function AdminDashboardPage() {
//   await requireRole("admin");

//   return (
//     <div className="grid gap-4 md:grid-cols-2">
//       <Card>
//         <CardHeader>
//           <CardTitle>Admin Control</CardTitle>
//           <CardDescription>Create and manage client and employee accounts.</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <Link href="/dashboard/admin/users" className="text-sm font-semibold text-cyan-300 hover:text-cyan-200">
//             Open User Management
//           </Link>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader>
//           <CardTitle>Access Model</CardTitle>
//           <CardDescription>No public signup is enabled in this system.</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <p className="text-sm text-cyan-100/80">
//             All accounts are provisioned by admin to keep role assignments controlled.
//           </p>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
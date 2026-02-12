import DashboardSidebar from "@/components/dashboard-sidebar";
import MobileHeader from "@/components/mobile-header";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <div className="hidden md:block fixed inset-y-0 z-50 w-64 border-r bg-slate-50/50">
        <DashboardSidebar />
      </div>

      <main className="flex-1 md:pl-64">
        <MobileHeader />

        <div className="p-4 md:p-8">{children}</div>
      </main>
    </div>
  );
}

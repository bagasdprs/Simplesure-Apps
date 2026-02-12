"use client";

import { Menu, ShieldCheck } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import DashboardSidebar from "@/components/dashboard-sidebar";

function MobileSidebar() {
  return (
    <Sheet>
      {/* Tombol Trigger (Hamburger Menu) */}
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>

      {/* Isi Sidebar Pas Dibuka */}
      <SheetContent side="left" className="p-0 w-72">
        <SheetHeader className="border-b p-4 text-left">
          <SheetTitle className="flex items-center gap-2 text-lg font-bold">
            <ShieldCheck className="h-5 w-5 text-blue-600" />
            <span>SimpleSure</span>
          </SheetTitle>
        </SheetHeader>

        {/* Panggil komponen Sidebar utama */}
        <div className="h-full pt-2">
          <DashboardSidebar />
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default MobileSidebar;

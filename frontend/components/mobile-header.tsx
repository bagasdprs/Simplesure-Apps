"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { menuItems } from "./dashboard-sidebar";
import MobileSidebar from "./mobile-sidebar";

function MobileHeader() {
  const pathname = usePathname();
  const activeItem = menuItems.find((item) => pathname.startsWith(item.href));

  const title = activeItem ? activeItem.name : "SimpleSure";

  return (
    <>
      <div className="sticky top-0 z-40 flex items-center justify-between border-b bg-white p-4 shadow-sm md:hidden">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
            <ShieldCheck className="h-5 w-5" />
          </div>

          <span className="font-bold text-slate-900 text-lg">{title}</span>
        </div>

        <MobileSidebar />
      </div>
    </>
  );
}

export default MobileHeader;

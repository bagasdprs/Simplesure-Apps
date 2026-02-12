"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { LayoutDashboard, ShoppingBag, FileText, AlertCircle, ChevronRight, Plus, List, Grid } from "lucide-react";
import { cn } from "@/lib/utils";

// --- 1. DATA MENU ---
export const menuItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Products",
    href: "/products",
    icon: ShoppingBag,
    submenu: [
      { name: "All Products", href: "/products", icon: List },
      { name: "Add New", href: "/products/create", icon: Plus },
      { name: "Categories", href: "/products/categories", icon: Grid },
    ],
  },
  {
    name: "My Policies",
    href: "/policies",
    icon: FileText,
  },
  {
    name: "My Claims",
    href: "/claims",
    icon: AlertCircle,
  },
];

// --- 2. HELPER UNTUK CEK MENU YANG TERBUKA ---
const getInitialOpenMenu = (pathname: string) => {
  const activeParent = menuItems.find((item) => item.submenu && item.submenu.some((sub) => pathname === sub.href));
  return activeParent ? activeParent.name : null;
};

function DashboardSidebar() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(() => getInitialOpenMenu(pathname));

  const toggleMenu = (name: string) => {
    setOpenMenu(openMenu === name ? null : name);
  };

  useEffect(() => {
    const activeParentName = getInitialOpenMenu(pathname);
    if (activeParentName) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOpenMenu(activeParentName);
    }
  }, [pathname]);

  return (
    <div className="flex h-full flex-col border-r bg-white text-slate-900">
      {/* Header */}
      <div className="flex h-16 items-center border-b px-6">
        <div className="flex items-center gap-2 font-bold text-xl text-slate-900">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
            <ShoppingBag className="h-5 w-5" />
          </div>
          <span>SimpleSure</span>
        </div>
      </div>

      {/* Navigasi */}
      <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
        {menuItems.map((item) => {
          const isParentActive = pathname === item.href || (item.submenu && item.submenu.some((sub) => pathname.startsWith(sub.href)));
          const isOpen = openMenu === item.name;
          const Icon = item.icon;

          return (
            <div key={item.name}>
              {item.submenu ? (
                // MODE: MENU DENGAN ANAK (Dropdown)
                <>
                  <button
                    onClick={() => toggleMenu(item.name)}
                    className={cn("flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-slate-100", isParentActive ? "text-blue-600 bg-blue-50" : "text-slate-600")}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5" />
                      {item.name}
                    </div>
                    {/* Chevron dengan animasi rotasi */}
                    <ChevronRight className={cn("h-4 w-4 text-slate-400 transition-transform duration-300 ease-in-out", isOpen && "rotate-90")} />
                  </button>

                  {/* Submenu dengan animasi Smooth Slide */}
                  <div className={cn("grid transition-all duration-300 ease-in-out", isOpen ? "grid-rows-[1fr] opacity-100 mt-1" : "grid-rows-[0fr] opacity-0")}>
                    <div className="overflow-hidden space-y-1 px-3">
                      {item.submenu.map((subItem) => {
                        const isSubActive = pathname === subItem.href;

                        return (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className={cn(
                              "flex w-full items-center gap-3 rounded-lg pl-9 pr-3 py-2 text-sm transition-colors hover:text-blue-600",
                              isSubActive ? "font-medium text-blue-600 bg-blue-50/50" : "text-slate-500 hover:bg-slate-50",
                            )}
                          >
                            <div className={cn("h-1.5 w-1.5 rounded-full transition-all duration-300", isSubActive ? "bg-blue-600 scale-110" : "bg-slate-300")} />
                            {subItem.name}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </>
              ) : (
                // MODE: MENU BIASA (Tanpa anak)
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-slate-100",
                    pathname === item.href ? "bg-blue-600 text-white hover:bg-blue-700 shadow-sm" : "text-slate-600",
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </Link>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer User */}
      <div className="border-t p-4">
        <div className="flex items-center gap-3 rounded-lg bg-slate-50 p-3">
          <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">BM</div>
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-medium text-slate-900">Bagas Morgan</p>
            <p className="truncate text-xs text-slate-500">bagas@simplesure.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardSidebar;

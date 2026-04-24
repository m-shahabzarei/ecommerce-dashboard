import { ReactNode } from "react";
import { Role, MOCK_USER } from "./roles";
import {
  DashboardIcon,
  MarketIcon,
  ProductsIcon,
  OrdersIcon,
  InventoryIcon,
  StoreIcon,
  SupportIcon,
  FinanceIcon,
  LogoutIcon,
} from "@/components/ui/Icons";

export interface NavItem {
  label: string;
  href: string;
  icon: ReactNode;
}

export interface NavigationConfig {
  top: NavItem[];
  bottom: NavItem[];
}

const supplierNav: NavItem[] = [
  { label: "داشبورد", href: "/dashboard", icon: <DashboardIcon className="w-5 h-5" /> },
  { label: "بازار", href: "/market", icon: <MarketIcon className="w-5 h-5" /> },
  { label: "محصولات من", href: "/supplier/products", icon: <ProductsIcon className="w-5 h-5" /> },
  { label: "سفارشات", href: "/orders", icon: <OrdersIcon className="w-5 h-5" /> },
  { label: "اتصال فروشگاه", href: "/supplier/connections", icon: <StoreIcon className="w-5 h-5" /> },
  { label: "انبارداری و ارسال", href: "/inventory", icon: <InventoryIcon className="w-5 h-5" /> },
];

const sellerNav: NavItem[] = [
  { label: "داشبورد", href: "/dashboard", icon: <DashboardIcon className="w-5 h-5" /> },
  { label: "بازار", href: "/market", icon: <MarketIcon className="w-5 h-5" /> },
  { label: "محصولات من", href: "/vendor/products", icon: <ProductsIcon className="w-5 h-5" /> },
  { label: "اتصال فروشگاه", href: "/vendor/connections", icon: <StoreIcon className="w-5 h-5" /> },
  { label: "سفارشات", href: "/orders", icon: <OrdersIcon className="w-5 h-5" /> },
];

const commonNav: NavItem[] = [
  // { label: "پشتیبانی", href: "/support", icon: <SupportIcon className="w-5 h-5" /> },
  { label: "مالی", href: "/finance", icon: <FinanceIcon className="w-5 h-5" /> },
  { label: "خروج", href: "/logout", icon: <LogoutIcon className="w-5 h-5" /> },
];

export function getNavigation(role?: Role): NavigationConfig {
  const userRole = role ?? MOCK_USER.role;

  return {
    top: userRole === "supplier" ? supplierNav : sellerNav,
    bottom: commonNav,
  };
}

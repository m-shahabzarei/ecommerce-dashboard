export type ConnectionStatus = "connected" | "not_connected";

export interface Connection {
  slug: string;
  title: string;
  status: ConnectionStatus;
}

export interface ConnectionFormData {
  name: string;
  address: string;
  discount: string;
  apiKey: string;
}

// ── Supplier platforms ──

const supplierPlatformNames: Record<string, string> = {
  basalam: "باسلام",
  eitaa: "ایتا",
  bale: "بله",
  rubika: "روبیکا",
  digikala: "دیجی کالا",
};

export function getSupplierPlatformName(slug: string): string {
  return supplierPlatformNames[slug] ?? slug;
}

export function isValidSupplierPlatform(slug: string): boolean {
  return slug in supplierPlatformNames;
}

export async function getSupplierConnections(): Promise<Connection[]> {
  // TODO: Replace with real API call
  // GET /api/v1/supplier/connections/
  return [
    { slug: "basalam", title: "باسلام", status: "not_connected" },
    { slug: "eitaa", title: "ایتا", status: "not_connected" },
    { slug: "bale", title: "بله", status: "connected" },
    { slug: "rubika", title: "روبیکا", status: "connected" },
    { slug: "digikala", title: "دیجی کالا", status: "not_connected" },
  ];
}

// ── Vendor platforms ──

const vendorPlatformNames: Record<string, string> = {
  basalam: "باسلام",
  wordpress: "وردپرس",
};

export function getVendorPlatformName(slug: string): string {
  return vendorPlatformNames[slug] ?? slug;
}

export function isValidVendorPlatform(slug: string): boolean {
  return slug in vendorPlatformNames;
}

export async function getVendorConnections(): Promise<Connection[]> {
  // TODO: Replace with real API call
  // GET /api/v1/vendor/connections/
  return [
    { slug: "basalam", title: "باسلام", status: "not_connected" },
    { slug: "wordpress", title: "وردپرس", status: "connected" },
  ];
}

// ── Shared API ──

export async function connectPlatform(
  slug: string,
  data: ConnectionFormData
): Promise<void> {
  // TODO: Replace with real API call
  // POST /api/v1/connections/{slug}/
  console.log("Connecting platform:", slug, data);
}

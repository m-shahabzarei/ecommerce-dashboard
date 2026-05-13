export type ConnectionStatus = "connected" | "not_connected";
export type ConnectionScope = "supplier" | "vendor";

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

const CONNECTION_STATES_STORAGE_KEY = "connection-states";
const CONNECTION_FORMS_STORAGE_KEY = "connection-forms";

function readStorageItem<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;

  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function getStoredConnectionStates(): Record<string, ConnectionStatus> {
  return readStorageItem<Record<string, ConnectionStatus>>(
    CONNECTION_STATES_STORAGE_KEY,
    {}
  );
}

export function setStoredConnectionStates(
  states: Record<string, ConnectionStatus>
): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(CONNECTION_STATES_STORAGE_KEY, JSON.stringify(states));
}

export function setStoredConnectionStatus(
  slug: string,
  status: ConnectionStatus
): void {
  const states = getStoredConnectionStates();
  states[slug] = status;
  setStoredConnectionStates(states);
}

export function getStoredConnectionForm(
  scope: ConnectionScope,
  slug: string
): ConnectionFormData | null {
  const forms = readStorageItem<
    Partial<Record<ConnectionScope, Record<string, ConnectionFormData>>>
  >(CONNECTION_FORMS_STORAGE_KEY, {});

  return forms[scope]?.[slug] ?? null;
}

export function setStoredConnectionForm(
  scope: ConnectionScope,
  slug: string,
  data: ConnectionFormData
): void {
  if (typeof window === "undefined") return;

  const forms = readStorageItem<
    Partial<Record<ConnectionScope, Record<string, ConnectionFormData>>>
  >(CONNECTION_FORMS_STORAGE_KEY, {});

  localStorage.setItem(
    CONNECTION_FORMS_STORAGE_KEY,
    JSON.stringify({
      ...forms,
      [scope]: {
        ...forms[scope],
        [slug]: data,
      },
    })
  );
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
  ];
}

// ── Vendor platforms ──

const vendorPlatformNames: Record<string, string> = {
  basalam: "باسلام",
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
  return [{ slug: "basalam", title: "باسلام", status: "not_connected" }];
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

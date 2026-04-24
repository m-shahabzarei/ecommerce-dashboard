export type OrderStatus = "pending" | "shipped" | "action_required" | "closed";

export interface Order {
  id: number;
  orderId: string;
  customer: string;
  channel: string;
  product: string;
  trackingCode?: string;
  status: OrderStatus;
}

const orders: Order[] = [
  {
    id: 1,
    orderId: "ORD-24089",
    customer: "محمد احمدی",
    channel: "دیجی‌کالا",
    product: "گوشی سامسونگ گلکسی S24",
    trackingCode: "1234567890",
    status: "shipped",
  },
  {
    id: 2,
    orderId: "ORD-24102",
    customer: "سارا رضایی",
    channel: "باسلام",
    product: "هدفون اپل ایرپادز پرو ۲",
    status: "pending",
  },
  {
    id: 3,
    orderId: "ORD-24115",
    customer: "علی محمدی",
    channel: "وبسایت",
    product: "لپ‌تاپ ایسوس VivoBook ۱۴",
    trackingCode: "9876543210",
    status: "shipped",
  },
  {
    id: 4,
    orderId: "ORD-24123",
    customer: "مریم کریمی",
    channel: "دیجی‌کالا",
    product: "ساعت هوشمند شیائومی",
    status: "action_required",
  },
  {
    id: 5,
    orderId: "ORD-24130",
    customer: "حسن نوری",
    channel: "باسلام",
    product: "پاوربانک انکر ۲۰۰۰۰",
    status: "pending",
  },
  {
    id: 6,
    orderId: "ORD-24138",
    customer: "لیلا موسوی",
    channel: "وبسایت",
    product: "تبلت سامسونگ تب S9",
    trackingCode: "1122334455",
    status: "shipped",
  },
  {
    id: 7,
    orderId: "ORD-24145",
    customer: "رضا حسینی",
    channel: "دیجی‌کالا",
    product: "مانیتور ال جی ۲۷ اینچ",
    status: "closed",
  },
  {
    id: 8,
    orderId: "ORD-24152",
    customer: "نسیم صادقی",
    channel: "باسلام",
    product: "کیبورد مکانیکی ریزر",
    status: "action_required",
  },
  {
    id: 9,
    orderId: "ORD-24160",
    customer: "پارسا طاهری",
    channel: "وبسایت",
    product: "ماوس لاجیتک MX Master",
    status: "pending",
  },
  {
    id: 10,
    orderId: "ORD-24175",
    customer: "فاطمه جعفری",
    channel: "دیجی‌کالا",
    product: "وب‌کم لاجیتک C920",
    trackingCode: "5566778899",
    status: "shipped",
  },
  {
    id: 11,
    orderId: "ORD-24182",
    customer: "امیر رحمانی",
    channel: "باسلام",
    product: "اسپیکر بلوتوثی JBL",
    status: "closed",
  },
  {
    id: 12,
    orderId: "ORD-24190",
    customer: "نازنین صفری",
    channel: "وبسایت",
    product: "هارد اکسترنال سامسونگ",
    status: "action_required",
  },
];

export function getOrders(): Order[] {
  return orders;
}

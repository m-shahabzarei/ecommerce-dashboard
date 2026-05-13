import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TrackingCodeModalTrigger } from "@/components/dashboard/orders/TrackingCodeModalTrigger";
import { cn } from "@/lib/utils";
import { getOrderById, type Order, type OrderTagTone } from "@/lib/services/orders";

type DetailTone = OrderTagTone | "neutral";

interface AmountRow {
  label: string;
  amount: number;
}

interface DetailItem {
  id: string;
  title: string;
  subtitle: string;
  quantity: number;
  totalAmount: number;
  unitAmount?: number;
  statusLabel: string;
  statusTone: DetailTone;
  accent: string;
  imageLabel?: string;
}

interface ShipmentCard {
  id: string;
  title: string;
  description: string;
  eta: string;
  statusLabel: string;
  statusTone: DetailTone;
}

interface ProductBatch {
  id: string;
  statusLabel: string;
  statusTone: DetailTone;
  sellerProductCode: string;
  trackingCode: string;
  shippingService?: string;
  trackingLink?: string;
  items: string[];
  actionLabel: string;
}

interface OrderDetailPreset {
  submittedAt?: string;
  shippingDeadline?: string;
  recipientNote?: string;
  actionNotice?: string;
  pricing?: AmountRow[];
  items?: DetailItem[];
  shipments?: ShipmentCard[];
  productBatch?: ProductBatch;
}

const detailPresets: Record<number, OrderDetailPreset> = {
  1: {
    submittedAt: "۲۹ بهمن ۱۴۰۴ • ساعت ۱۱:۲۰",
    shippingDeadline: "تا پایان ۳۰ بهمن ۱۴۰۴",
    recipientNote: "لطفاً پیش از تحویل، بازه دریافت با گیرنده هماهنگ شود.",
    pricing: [
      { label: "جمع کل اقلام", amount: 458_950 },
      { label: "هزینه ارسال", amount: 63_950 },
      { label: "هزینه بسته‌بندی", amount: 1_417 },
    ],
    items: [
      {
        id: "1-1",
        title: "ژل مادی، نرم‌کننده قبل از اتوی مو",
        subtitle: "رنگ صورتی • کد ۵",
        quantity: 5,
        totalAmount: 458_950,
        unitAmount: 91_790,
        statusLabel: "فعال",
        statusTone: "success",
        accent: "from-rose-100 via-orange-50 to-white",
        imageLabel: "JM",
      },
    ],
    shipments: [
      {
        id: "1",
        title: "محموله ۱",
        description: "یک بسته آماده چاپ برچسب برای ارسال با پست پیشتاز",
        eta: "پس از شروع آماده‌سازی قابل تحویل به پست است",
        statusLabel: "آماده ارسال",
        statusTone: "info",
      },
    ],
  },
  2: {
    submittedAt: "۲۸ اسفند ۱۴۰۴ • ساعت ۰۹:۴۰",
    shippingDeadline: "تا پایان ۲۹ اسفند ۱۴۰۴",
    recipientNote: "در صورت عدم پاسخ‌گویی گیرنده، با شماره ثبت‌شده مجدد هماهنگ شود.",
    pricing: [
      { label: "جمع کل اقلام", amount: 240_347 },
      { label: "هزینه ارسال", amount: 59_000 },
      { label: "هزینه بسته‌بندی", amount: 1_000 },
    ],
    items: [
      {
        id: "2-1",
        title: "کرم مرطوب‌کننده انار نیکا",
        subtitle: "۴۵ گرم • بسته تکی",
        quantity: 2,
        totalAmount: 240_347,
        unitAmount: 120_174,
        statusLabel: "فعال",
        statusTone: "success",
        accent: "from-amber-100 via-orange-50 to-white",
        imageLabel: "KN",
      },
    ],
    shipments: [
      {
        id: "1",
        title: "محموله ۱",
        description: "مرسوله تک‌ بسته برای ارسال از انبار تامین‌کننده",
        eta: "پس از بسته‌بندی، برچسب چاپ و به پست تحویل می‌شود",
        statusLabel: "در انتظار آماده‌سازی",
        statusTone: "warning",
      },
    ],
  },
  3: {
    submittedAt: "۲۹ بهمن ۱۴۰۴ • ساعت ۱۷:۳۵",
    recipientNote: "مرسوله برای گیرنده ثبت شده و امکان ثبت یا ویرایش کد رهگیری برای شما فعال است.",
    pricing: [
      { label: "جمع کل اقلام", amount: 240_000 },
      { label: "هزینه ارسال", amount: 76_500 },
      { label: "بسته‌بندی", amount: 0 },
      { label: "هزینه خدمات", amount: 0 },
      { label: "کارمزد باسلام (۲٪)", amount: 14_084 },
    ],
    items: [
      {
        id: "3-1",
        title: "صابون ابرو حجم‌دهنده کویین (۲۰۰ گرم)",
        subtitle: "PRD-MF9-3F7-Q1B",
        quantity: 2,
        unitAmount: 51_000,
        totalAmount: 102_000,
        statusLabel: "فعال",
        statusTone: "success",
        accent: "from-emerald-100 via-teal-50 to-white",
        imageLabel: "QU",
      },
      {
        id: "3-2",
        title: "رژ لب مات (رنگ مسی)",
        subtitle: "PRD-LF4-45M-R8A",
        quantity: 2,
        unitAmount: 69_000,
        totalAmount: 138_000,
        statusLabel: "فعال",
        statusTone: "success",
        accent: "from-rose-100 via-orange-50 to-white",
        imageLabel: "RL",
      },
    ],
    productBatch: {
      id: "3-batch-1",
      statusLabel: "ارسال شده",
      statusTone: "success",
      sellerProductCode: "pd-486f37",
      trackingCode: "573260433400042180997111",
      items: [
        "صابون ابرو حجم‌دهنده کویین (۲۰۰ گرم)",
        "رژ لب مات (رنگ مسی)",
      ],
      actionLabel: "ثبت/ویرایش کد رهگیری",
    },
  },
  4: {
    submittedAt: "۲۵ بهمن ۱۴۰۴ • ساعت ۱۳:۱۰",
    recipientNote: "این سفارش در دو محموله ارسال شده و می‌توانید برای هر بسته کد رهگیری را بازبینی کنید.",
    pricing: [
      { label: "جمع کل اقلام", amount: 1_874_000 },
      { label: "هزینه ارسال", amount: 124_000 },
      { label: "بسته‌بندی", amount: 18_000 },
      { label: "هزینه خدمات", amount: 9_000 },
      { label: "کارمزد باسلام (۲٪)", amount: 41_247 },
    ],
    items: [
      {
        id: "4-1",
        title: "کرم شب آبرسان نیکا",
        subtitle: "PRD-NK1-NI8-4WQ",
        quantity: 7,
        unitAmount: 128_000,
        totalAmount: 896_000,
        statusLabel: "فعال",
        statusTone: "success",
        accent: "from-violet-100 via-sky-50 to-white",
        imageLabel: "NK",
      },
      {
        id: "4-2",
        title: "ژل پاک‌کننده آرایشی (۴۵۰ گرمی)",
        subtitle: "PRD-CL4-45G-A2M",
        quantity: 7,
        unitAmount: 139_714,
        totalAmount: 977_998,
        statusLabel: "فعال",
        statusTone: "success",
        accent: "from-amber-100 via-orange-50 to-white",
        imageLabel: "CL",
      },
    ],
    productBatch: {
      id: "4-batch-1",
      statusLabel: "ارسال شده",
      statusTone: "success",
      sellerProductCode: "pd-6b02df",
      trackingCode: "573260433400042180998245",
      items: ["کرم شب آبرسان نیکا", "ژل پاک‌کننده آرایشی (۴۵۰ گرمی)"],
      actionLabel: "ثبت/ویرایش کد رهگیری",
    },
  },
  5: {
    submittedAt: "۲۷ اسفند ۱۴۰۴ • ساعت ۱۰:۱۸",
    recipientNote: "این سفارش هنوز تایید نهایی نشده و تا قبل از تایید، امکان ویرایش اقلام برای شما فعال است.",
    actionNotice: "تا زمانی که سفارش تایید نشده است، می‌توانید اقلام آن را اضافه، حذف یا ویرایش کنید.",
    pricing: [
      { label: "جمع کل اقلام", amount: 780_000 },
      { label: "هزینه ارسال", amount: 95_000 },
      { label: "بسته‌بندی", amount: 17_500 },
      { label: "هزینه خدمات", amount: 0 },
      { label: "کارمزد باسلام (۲٪)", amount: 65_210 },
    ],
    items: [
      {
        id: "5-1",
        title: "شامپو خشک جی بی کوئیک اکسپرس موشکی (۳۰۰ گرم)",
        subtitle: "PRD-QK3-300-JB1",
        quantity: 5,
        unitAmount: 54_000,
        totalAmount: 270_000,
        statusLabel: "فعال",
        statusTone: "success",
        accent: "from-violet-100 via-sky-50 to-white",
        imageLabel: "JB",
      },
      {
        id: "5-2",
        title: "ژل براق‌کننده نقره‌ای (۴۰ گرم)",
        subtitle: "PRD-SL4-040-GL2",
        quantity: 4,
        unitAmount: 49_500,
        totalAmount: 198_000,
        statusLabel: "فعال",
        statusTone: "success",
        accent: "from-emerald-100 via-teal-50 to-white",
        imageLabel: "GL",
      },
      {
        id: "5-3",
        title: "سرم مو ترمیم‌کننده",
        subtitle: "PRD-SR8-RP9-HC3",
        quantity: 3,
        unitAmount: 53_000,
        totalAmount: 159_000,
        statusLabel: "فعال",
        statusTone: "success",
        accent: "from-amber-100 via-orange-50 to-white",
        imageLabel: "SR",
      },
      {
        id: "5-4",
        title: "ماسک مو مغذی روزانه",
        subtitle: "PRD-HM5-DL1-MK4",
        quantity: 5,
        unitAmount: 30_600,
        totalAmount: 153_000,
        statusLabel: "فعال",
        statusTone: "success",
        accent: "from-rose-100 via-pink-50 to-white",
        imageLabel: "MK",
      },
    ],
  },
  6: {
    submittedAt: "۲۶ اسفند ۱۴۰۴ • ساعت ۱۴:۱۲",
    recipientNote: "برای این سفارش اختلاف موجودی ثبت شده و قبل از تایید، می‌توانید اقلام سفارش را بازبینی کنید.",
    actionNotice: "پیش از تایید نهایی، اقلام سفارش را با موجودی واقعی تطبیق دهید و در صورت نیاز آن‌ها را ویرایش کنید.",
    pricing: [
      { label: "جمع کل اقلام", amount: 980_000 },
      { label: "هزینه ارسال", amount: 145_000 },
      { label: "بسته‌بندی", amount: 12_000 },
      { label: "هزینه خدمات", amount: 0 },
      { label: "کارمزد باسلام (۲٪)", amount: 47_200 },
    ],
    items: [
      {
        id: "6-1",
        title: "پک مراقبت پوست نقره‌ای",
        subtitle: "PRD-SK9-SV2-PK1",
        quantity: 5,
        unitAmount: 106_000,
        totalAmount: 530_000,
        statusLabel: "فعال",
        statusTone: "success",
        accent: "from-emerald-100 via-teal-50 to-white",
        imageLabel: "PK",
      },
      {
        id: "6-2",
        title: "کرم آبرسان دست و صورت",
        subtitle: "PRD-CR7-HD4-FC2",
        quantity: 4,
        unitAmount: 112_500,
        totalAmount: 450_000,
        statusLabel: "فعال",
        statusTone: "success",
        accent: "from-amber-100 via-orange-50 to-white",
        imageLabel: "CR",
      },
    ],
  },
  7: {
    submittedAt: "۲۴ بهمن ۱۴۰۴ • ساعت ۱۴:۳۲",
    recipientNote: "این سفارش در وضعیت بسته‌شده قرار گرفته و اطلاعات رهگیری برای بایگانی سفارش قابل مشاهده است.",
    pricing: [
      { label: "جمع کل اقلام", amount: 990_000 },
      { label: "هزینه ارسال", amount: 297_000 },
      { label: "بسته‌بندی", amount: 14_000 },
      { label: "هزینه خدمات", amount: 30_000 },
      { label: "کارمزد باسلام (۲٪)", amount: 54_800 },
    ],
    items: [
      {
        id: "7-1",
        title: "رژ لب خشک مات (۱.۲۵ میلی)",
        subtitle: "PRD-LP7-MT1-ML2",
        quantity: 8,
        unitAmount: 70_000,
        totalAmount: 560_000,
        statusLabel: "فعال",
        statusTone: "success",
        accent: "from-rose-100 via-pink-50 to-white",
        imageLabel: "LP",
      },
      {
        id: "7-2",
        title: "پنکیک آرایشی کاور نچرال (قهوه‌ای)",
        subtitle: "PRD-PN4-NC8-CV1",
        quantity: 5,
        unitAmount: 86_000,
        totalAmount: 430_000,
        statusLabel: "فعال",
        statusTone: "success",
        accent: "from-amber-100 via-orange-50 to-white",
        imageLabel: "PN",
      },
    ],
    productBatch: {
      id: "7-batch-1",
      statusLabel: "تحویل شده",
      statusTone: "info",
      sellerProductCode: "pd-484db7",
      trackingCode: "573260433400042180997111",
      items: ["رژ لب خشک مات (۱.۲۵ میلی)", "پنکیک آرایشی کاور نچرال (قهوه‌ای)"],
      actionLabel: "ثبت/ویرایش کد رهگیری",
    },
  },
  8: {
    submittedAt: "۲۳ بهمن ۱۴۰۴ • ساعت ۱۲:۵۰",
    recipientNote: "این سفارش بسته شده است و اطلاعات مرسوله فقط برای مشاهده نگهداری می‌شود.",
    pricing: [
      { label: "جمع کل اقلام", amount: 110_000 },
      { label: "هزینه ارسال", amount: 27_000 },
      { label: "بسته‌بندی", amount: 2_355 },
      { label: "هزینه خدمات", amount: 5_000 },
      { label: "کارمزد باسلام (۲٪)", amount: 15_000 },
    ],
    productBatch: {
      id: "8-batch-1",
      statusLabel: "تحویل شده",
      statusTone: "info",
      sellerProductCode: "pd-d84612",
      trackingCode: "573260433400042180998401",
      items: ["مداد چشم ضدآب نقره‌ای"],
      actionLabel: "ثبت/ویرایش کد رهگیری",
    },
  },
  9: {
    submittedAt: "۲۲ بهمن ۱۴۰۴ • ساعت ۱۶:۲۸",
    recipientNote: "این سفارش در لیست سفارش‌های بسته‌شده ثبت شده و برای بررسی سوابق در دسترس است.",
    pricing: [
      { label: "جمع کل اقلام", amount: 440_000 },
      { label: "هزینه ارسال", amount: 75_000 },
      { label: "بسته‌بندی", amount: 7_510 },
      { label: "هزینه خدمات", amount: 10_000 },
      { label: "کارمزد باسلام (۲٪)", amount: 30_000 },
    ],
    productBatch: {
      id: "9-batch-1",
      statusLabel: "تحویل شده",
      statusTone: "info",
      sellerProductCode: "pd-2f0a91",
      trackingCode: "573260433400042180998554",
      items: ["کرم مرطوب‌کننده دست (۴۵ گرم)"],
      actionLabel: "ثبت/ویرایش کد رهگیری",
    },
  },
};

const badgeToneClasses: Record<DetailTone, string> = {
  success: "border-emerald-200 bg-emerald-50 text-emerald-700",
  info: "border-sky-200 bg-sky-50 text-sky-700",
  warning: "border-amber-200 bg-amber-50 text-amber-700",
  danger: "border-rose-200 bg-rose-50 text-rose-700",
  neutral: "border-slate-200 bg-slate-100 text-slate-600",
};

const pricingDotClasses: Record<DetailTone, string> = {
  success: "bg-emerald-500",
  info: "bg-sky-500",
  warning: "bg-amber-500",
  danger: "bg-rose-500",
  neutral: "bg-slate-400",
};

const orderToneMap: Record<Order["status"], DetailTone> = {
  pending: "info",
  shipped: "info",
  action_required: "warning",
  closed: "success",
};

const accentPalette = [
  "from-violet-100 via-sky-50 to-white",
  "from-emerald-100 via-teal-50 to-white",
  "from-amber-100 via-orange-50 to-white",
  "from-rose-100 via-pink-50 to-white",
];

const imageLabelPalette = ["BX", "PR", "SK", "GL"];

function formatCurrency(amount: number) {
  return `${amount.toLocaleString("fa-IR")} تومان`;
}

function splitNumber(total: number, parts: number) {
  if (parts <= 0) {
    return [];
  }

  const base = Math.floor(total / parts);
  const remainder = total - base * parts;

  return Array.from({ length: parts }, (_, index) => base + (index < remainder ? 1 : 0));
}

function getOrderStatusLabel(status: Order["status"]) {
  switch (status) {
    case "pending":
      return "در انتظار ارسال";
    case "shipped":
      return "ارسال شده";
    case "action_required":
      return "نیازمند اقدام";
    case "closed":
      return "بسته شده";
    default:
      return "نامشخص";
  }
}

function buildPricingRows(order: Order, preset?: AmountRow[]) {
  if (preset?.length) {
    return preset;
  }

  const shipping = Math.min(Math.round(order.payableAmount * 0.18), 59_000 * order.packageCount);
  const packaging = Math.min(Math.round(order.payableAmount * 0.02), 2_500 * order.packageCount);

  return [
    {
      label: "جمع کل اقلام",
      amount: Math.max(order.payableAmount - shipping - packaging, 0),
    },
    { label: "هزینه ارسال", amount: shipping },
    { label: "هزینه بسته‌بندی", amount: packaging },
  ];
}

function buildDetailItems(order: Order, pricingRows: AmountRow[], preset?: DetailItem[]) {
  if (preset?.length) {
    return preset;
  }

  const items = order.items.length > 0 ? order.items : [{ id: `${order.id}-item`, title: "کالای سفارش" }];
  const itemAmounts = splitNumber(pricingRows[0]?.amount ?? order.payableAmount, items.length);
  const quantities = splitNumber(Math.max(order.itemCount, items.length), items.length);
  const orderTone = orderToneMap[order.status];
  const orderLabel =
    order.status === "shipped" || order.status === "action_required" || order.status === "closed"
      ? "فعال"
      : getOrderStatusLabel(order.status);

  return items.map((item, index) => {
    const quantity = quantities[index] ?? 1;
    const totalAmount = itemAmounts[index] ?? 0;

    return {
      id: item.id,
      title: item.title,
      subtitle: `بسته ${(index + 1).toLocaleString("fa-IR")}`,
      quantity,
      totalAmount,
      unitAmount: quantity > 0 ? Math.round(totalAmount / quantity) : totalAmount,
      statusLabel: orderLabel,
      statusTone: orderTone,
      accent: accentPalette[index % accentPalette.length],
      imageLabel: imageLabelPalette[index % imageLabelPalette.length],
    };
  });
}

function buildShipments(order: Order, preset?: ShipmentCard[]) {
  if (preset?.length) {
    return preset;
  }

  const shipmentTone = orderToneMap[order.status];
  const shipmentStatus =
    order.status === "pending"
      ? "آماده بسته‌بندی"
      : order.status === "shipped"
        ? "تحویل به پست"
        : order.status === "closed"
          ? "مختومه"
          : "در انتظار بررسی";

  return Array.from({ length: order.packageCount }, (_, index) => ({
    id: `${order.id}-${index + 1}`,
    title: `محموله ${(index + 1).toLocaleString("fa-IR")}`,
    description: `${Math.max(1, Math.ceil(order.itemCount / order.packageCount)).toLocaleString("fa-IR")} قلم کالا برای ارسال در این بسته قرار می‌گیرد`,
    eta:
      order.status === "pending"
        ? "پس از تایید آماده‌سازی، برچسب این بسته چاپ می‌شود"
        : order.status === "shipped"
          ? "این بسته از انبار خارج شده و در مسیر تحویل است"
          : "وضعیت این بسته متناسب با سفارش به‌روزرسانی می‌شود",
    statusLabel: shipmentStatus,
    statusTone: shipmentTone,
  }));
}

function getShippingDeadline(order: Order, preset?: OrderDetailPreset) {
  if (preset?.shippingDeadline) {
    return preset.shippingDeadline;
  }

  switch (order.status) {
    case "pending":
      return "تا پایان امروز";
    case "shipped":
      return "ارسال انجام شده";
    case "action_required":
      return "پس از تایید سفارش";
    case "closed":
      return "مختومه";
    default:
      return "نامشخص";
  }
}

function getSubmittedAt(order: Order, preset?: OrderDetailPreset) {
  if (preset?.submittedAt) {
    return preset.submittedAt;
  }

  return `${order.createdAt} • ساعت ۱۴:۳۵`;
}

function getRecipientNote(order: Order, preset?: OrderDetailPreset) {
  if (preset?.recipientNote) {
    return preset.recipientNote;
  }

  return order.status === "pending"
    ? "تحویل این سفارش پس از آماده‌سازی و چاپ برچسب انجام می‌شود."
    : "اطلاعات این سفارش برای هماهنگی تحویل ثبت شده است.";
}

function getActionNotice(order: Order, preset?: OrderDetailPreset) {
  if (preset?.actionNotice) {
    return preset.actionNotice;
  }

  return order.status === "action_required"
    ? "تا زمانی که سفارش تایید نشده است، می‌توانید اقلام آن را اضافه، حذف یا ویرایش کنید."
    : "";
}

function buildProductBatch(order: Order, detailItems: DetailItem[], preset?: ProductBatch): ProductBatch {
  if (preset) {
    return preset;
  }

  return {
    id: `${order.id}-batch`,
    statusLabel:
      order.status === "shipped"
        ? "ارسال شده"
        : order.status === "closed"
          ? (order.tags[1]?.label ?? "بسته شده")
          : "در حال آماده‌سازی",
    statusTone:
      order.status === "shipped"
        ? "success"
        : order.status === "closed"
          ? (order.tags[1]?.tone ?? "success")
          : "info",
    sellerProductCode: `pd-${String(order.id).padStart(6, "0")}`,
    trackingCode: `5732604334000${String(order.id).padStart(10, "0")}`,
    shippingService:
      order.status === "shipped" || order.status === "closed" ? "پست پیشتاز" : undefined,
    trackingLink:
      order.status === "shipped" || order.status === "closed"
        ? `https://tracking.example.com/${String(order.id).padStart(10, "0")}`
        : undefined,
    items: detailItems.map((item) => item.title),
    actionLabel:
      order.status === "shipped" || order.status === "closed"
        ? "ثبت/ویرایش کد رهگیری"
        : "مدیریت محموله",
  };
}

export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const orderId = Number(id);

  if (!Number.isFinite(orderId)) {
    notFound();
  }

  const order = getOrderById(orderId);

  if (!order) {
    notFound();
  }

  const preset = detailPresets[order.id];
  const pricingRows = buildPricingRows(order, preset?.pricing);
  const detailItems = buildDetailItems(order, pricingRows, preset?.items);
  const shipments = buildShipments(order, preset?.shipments);
  const paymentTag = order.tags[0];
  const secondaryTag = order.tags[1];
  const orderStatusLabel = getOrderStatusLabel(order.status);
  const orderStatusTone = orderToneMap[order.status];
  const shippingDeadline = getShippingDeadline(order, preset);
  const submittedAt = getSubmittedAt(order, preset);
  const recipientNote = getRecipientNote(order, preset);
  const actionNotice = getActionNotice(order, preset);
  const productBatch = buildProductBatch(order, detailItems, preset?.productBatch);

  return (
    <div className="space-y-6" dir="rtl">
      <OrderHeader order={order} />

      {order.status === "shipped" ? (
        <ShippedOrderDetails
          order={order}
          pricingRows={pricingRows}
          detailItems={detailItems}
          paymentTag={paymentTag}
          orderStatusLabel={orderStatusLabel}
          orderStatusTone={orderStatusTone}
          submittedAt={submittedAt}
          recipientNote={recipientNote}
          productBatch={productBatch}
        />
      ) : order.status === "action_required" ? (
        <ActionRequiredOrderDetails
          order={order}
          pricingRows={pricingRows}
          detailItems={detailItems}
          paymentTag={paymentTag}
          secondaryTag={secondaryTag}
          orderStatusLabel={orderStatusLabel}
          orderStatusTone={orderStatusTone}
          submittedAt={submittedAt}
          recipientNote={recipientNote}
          actionNotice={actionNotice}
        />
      ) : order.status === "closed" ? (
        <ClosedOrderDetails
          order={order}
          pricingRows={pricingRows}
          detailItems={detailItems}
          paymentTag={paymentTag}
          secondaryTag={secondaryTag}
          submittedAt={submittedAt}
          recipientNote={recipientNote}
          productBatch={productBatch}
        />
      ) : (
        <DefaultOrderDetails
          order={order}
          pricingRows={pricingRows}
          detailItems={detailItems}
          shipments={shipments}
          paymentTag={paymentTag}
          secondaryTag={secondaryTag}
          orderStatusLabel={orderStatusLabel}
          orderStatusTone={orderStatusTone}
          shippingDeadline={shippingDeadline}
          recipientNote={recipientNote}
        />
      )}
    </div>
  );
}

function OrderHeader({ order }: { order: Order }) {
  return (
    <section className="overflow-hidden rounded-[28px] border border-slate-200/80 bg-white/95 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.35)] backdrop-blur">
      <div className="bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.12),transparent_35%),radial-gradient(circle_at_top_left,rgba(16,185,129,0.10),transparent_30%)] px-5 py-5 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-2 text-right">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
              <ReceiptIcon className="h-4 w-4" />
              جزئیات سفارش
            </div>
            <div>
              <h1 className="text-2xl font-black text-text">جزئیات سفارش تامین‌کننده</h1>
              <div className="mt-2 flex flex-wrap items-center justify-end gap-2 text-sm text-slate-500">
                <span className="rounded-full bg-slate-100 px-3 py-1 font-semibold text-slate-700" dir="ltr">
                  {order.code}
                </span>
                <span>برای بررسی سریع اقلام، مبلغ و اطلاعات گیرنده</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-3">
            <Link
              href="/orders"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            >
              <ArrowRightIcon className="h-4 w-4" />
              بازگشت
            </Link>
            <button
              type="button"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-primary/20 bg-primary/5 px-4 text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
            >
              <PrintIcon className="h-4 w-4" />
              چاپ برچسب
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function DefaultOrderDetails({
  order,
  pricingRows,
  detailItems,
  shipments,
  paymentTag,
  secondaryTag,
  orderStatusLabel,
  orderStatusTone,
  shippingDeadline,
  recipientNote,
}: {
  order: Order;
  pricingRows: AmountRow[];
  detailItems: DetailItem[];
  shipments: ShipmentCard[];
  paymentTag?: Order["tags"][number];
  secondaryTag?: Order["tags"][number];
  orderStatusLabel: string;
  orderStatusTone: DetailTone;
  shippingDeadline: string;
  recipientNote: string;
}) {
  return (
    <div className="grid gap-6 xl:grid-cols-[340px_minmax(0,1fr)]">
      <aside className="space-y-6">
        <section className="overflow-hidden rounded-3xl border border-sky-100 bg-[linear-gradient(180deg,rgba(239,246,255,0.95),rgba(248,250,252,0.9))] shadow-[0_18px_45px_-35px_rgba(14,116,144,0.45)]">
          <div className="flex items-center justify-between border-b border-sky-100/80 px-5 py-4">
            <span className="text-sm font-black text-sky-900">خلاصه سفارش</span>
            <span className={cn("inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold", badgeToneClasses[orderStatusTone])}>
              {orderStatusLabel}
            </span>
          </div>
          <div className="space-y-3 px-5 py-4">
            <SummaryRow label="شماره سفارش" value={order.code} dir="ltr" />
            <SummaryRow label="تاریخ ثبت" value={order.createdAt} />
            <SummaryRow label="مهلت آماده‌سازی" value={shippingDeadline} />
            <SummaryRow
              label="وضعیت پرداخت"
              value={paymentTag?.label ?? "نامشخص"}
              tone={paymentTag?.tone ?? "neutral"}
            />
            {secondaryTag ? (
              <SummaryRow label="وضعیت تایید" value={secondaryTag.label} tone={secondaryTag.tone} />
            ) : null}
            <SummaryRow label="خریدار" value={order.customerName} />
            <SummaryRow label="شماره تماس" value={order.customerPhone} dir="ltr" />
          </div>
        </section>

        <PricingCard rows={pricingRows} totalAmount={order.payableAmount} />
      </aside>

      <div className="space-y-6">
        <section className="overflow-hidden rounded-3xl border border-fuchsia-100 bg-[linear-gradient(180deg,rgba(253,244,255,0.85),rgba(255,255,255,0.96))] shadow-[0_20px_55px_-40px_rgba(217,70,239,0.35)]">
          <div className="flex items-center justify-between border-b border-fuchsia-100/80 px-5 py-4">
            <span className="text-sm font-black text-fuchsia-900">اطلاعات گیرنده</span>
            <UserIcon className="h-5 w-5 text-fuchsia-500" />
          </div>
          <div className="grid gap-4 px-5 py-5 md:grid-cols-2">
            <InfoCard icon={<UserIcon className="h-4 w-4" />} label="نام گیرنده" value={order.customerName} />
            <InfoCard icon={<PhoneIcon className="h-4 w-4" />} label="شماره تماس" value={order.customerPhone} dir="ltr" />
            <InfoCard icon={<LocationIcon className="h-4 w-4" />} label="استان" value={order.province} />
            <InfoCard icon={<PinIcon className="h-4 w-4" />} label="شهر" value={order.city} />
            <InfoCard icon={<PostIcon className="h-4 w-4" />} label="کد پستی" value={order.postalCode} dir="ltr" />
            <InfoCard
              icon={<TruckIcon className="h-4 w-4" />}
              label="تعداد محموله"
              value={`${order.packageCount.toLocaleString("fa-IR")} محموله`}
            />
            <div className="rounded-2xl border border-white/70 bg-white/80 p-4 shadow-sm md:col-span-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-fuchsia-700">
                <LocationIcon className="h-4 w-4" />
                آدرس کامل
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-700">{order.address}</p>
            </div>
            <div className="rounded-2xl border border-white/70 bg-white/80 p-4 shadow-sm md:col-span-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-fuchsia-700">
                <NoteIcon className="h-4 w-4" />
                توضیحات ارسال
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-700">{recipientNote}</p>
            </div>
          </div>
        </section>

        <DefaultItemsSection order={order} items={detailItems} />
        <ShipmentsSection order={order} shipments={shipments} />
      </div>
    </div>
  );
}

function ShippedOrderDetails({
  order,
  pricingRows,
  detailItems,
  paymentTag,
  orderStatusLabel,
  orderStatusTone,
  submittedAt,
  recipientNote,
  productBatch,
}: {
  order: Order;
  pricingRows: AmountRow[];
  detailItems: DetailItem[];
  paymentTag?: Order["tags"][number];
  orderStatusLabel: string;
  orderStatusTone: DetailTone;
  submittedAt: string;
  recipientNote: string;
  productBatch: ProductBatch;
}) {
  return (
    <div className="grid gap-6 xl:grid-cols-[340px_minmax(0,1fr)]">
      <aside className="space-y-6">
        <section className="overflow-hidden rounded-3xl border border-sky-100 bg-[linear-gradient(180deg,rgba(239,246,255,0.95),rgba(248,250,252,0.9))] shadow-[0_18px_45px_-35px_rgba(14,116,144,0.45)]">
          <div className="flex items-center justify-between border-b border-sky-100/80 px-5 py-4">
            <span className="text-sm font-black text-sky-900">خلاصه سفارش</span>
            <span className={cn("inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold", badgeToneClasses[orderStatusTone])}>
              {orderStatusLabel}
            </span>
          </div>
          <div className="space-y-3 px-5 py-4">
            <SummaryRow label="شماره سفارش" value={order.code} dir="ltr" />
            <SummaryRow label="تاریخ ثبت" value={submittedAt} />
            <SummaryRow
              label="وضعیت پرداخت"
              value={paymentTag?.label ?? "نامشخص"}
              tone={paymentTag?.tone ?? "neutral"}
            />
            <SummaryRow label="وضعیت سفارش" value={orderStatusLabel} tone={orderStatusTone} />
            <SummaryRow label="خریدار" value={order.customerName} />
            <SummaryRow label="شماره تماس خریدار" value={order.customerPhone} dir="ltr" />
          </div>
        </section>

        <PricingCard rows={pricingRows} totalAmount={order.payableAmount} />
      </aside>

      <div className="space-y-6">
        <section className="overflow-hidden rounded-3xl border border-fuchsia-100 bg-[linear-gradient(180deg,rgba(253,244,255,0.85),rgba(255,255,255,0.96))] shadow-[0_20px_55px_-40px_rgba(217,70,239,0.35)]">
          <div className="flex items-center justify-between border-b border-fuchsia-100/80 px-5 py-4">
            <span className="text-sm font-black text-fuchsia-900">اطلاعات گیرنده</span>
            <UserIcon className="h-5 w-5 text-fuchsia-500" />
          </div>
          <div className="space-y-5 px-5 py-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="min-w-0 space-y-3 text-right">
                <div className="flex items-center justify-end gap-2 text-sm font-bold text-slate-800">
                  <span>{order.customerName}</span>
                  <UserIcon className="h-4 w-4 text-fuchsia-500" />
                </div>
                <div className="flex items-center justify-end gap-2 text-sm text-slate-600" dir="ltr">
                  <span>{order.customerPhone}</span>
                  <PhoneIcon className="h-4 w-4 text-fuchsia-500" />
                </div>
              </div>
              <button
                type="button"
                className="inline-flex h-10 items-center justify-center gap-2 self-start rounded-xl border border-fuchsia-100 bg-white px-3 text-sm font-semibold text-fuchsia-700 shadow-sm transition-colors hover:bg-fuchsia-50"
              >
                <CopyIcon className="h-4 w-4" />
                کپی آدرس
              </button>
            </div>

            <div className="h-px bg-fuchsia-100" />

            <div className="space-y-4 text-right">
              <div className="flex items-center justify-end gap-2 text-xs font-semibold text-fuchsia-700">
                <LocationIcon className="h-4 w-4" />
                آدرس کامل
              </div>
              <p className="text-sm leading-8 text-slate-700">{order.address}</p>
              <div className="flex flex-wrap items-center justify-end gap-2">
                <span className="rounded-full border border-fuchsia-100 bg-fuchsia-50 px-3 py-1 text-xs font-semibold text-fuchsia-700">
                  {order.province} / {order.city}
                </span>
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600" dir="ltr">
                  {order.postalCode}
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-white/70 bg-white/80 p-4 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-semibold text-fuchsia-700">
                <NoteIcon className="h-4 w-4" />
                توضیحات ارسال
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-700">{recipientNote}</p>
            </div>
          </div>
        </section>

        <ShippedItemsSection order={order} items={detailItems} />
        <ProductBatchSection batch={productBatch} />
      </div>
    </div>
  );
}

function ClosedOrderDetails({
  order,
  pricingRows,
  detailItems,
  paymentTag,
  secondaryTag,
  submittedAt,
  recipientNote,
  productBatch,
}: {
  order: Order;
  pricingRows: AmountRow[];
  detailItems: DetailItem[];
  paymentTag?: Order["tags"][number];
  secondaryTag?: Order["tags"][number];
  submittedAt: string;
  recipientNote: string;
  productBatch: ProductBatch;
}) {
  const closedStatusLabel = secondaryTag?.label ?? "بسته شده";
  const closedStatusTone = secondaryTag?.tone ?? "success";

  return (
    <div className="grid gap-6 xl:grid-cols-[340px_minmax(0,1fr)]">
      <aside className="space-y-6">
        <section className="overflow-hidden rounded-3xl border border-sky-100 bg-[linear-gradient(180deg,rgba(239,246,255,0.95),rgba(248,250,252,0.9))] shadow-[0_18px_45px_-35px_rgba(14,116,144,0.45)]">
          <div className="flex items-center justify-between border-b border-sky-100/80 px-5 py-4">
            <span className="text-sm font-black text-sky-900">خلاصه سفارش</span>
            <span className={cn("inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold", badgeToneClasses[closedStatusTone])}>
              {closedStatusLabel}
            </span>
          </div>
          <div className="space-y-3 px-5 py-4">
            <SummaryRow label="شماره سفارش" value={order.code} dir="ltr" />
            <SummaryRow label="تاریخ ثبت" value={submittedAt} />
            <SummaryRow
              label="وضعیت پرداخت"
              value={paymentTag?.label ?? "نامشخص"}
              tone={paymentTag?.tone ?? "neutral"}
            />
            <SummaryRow label="وضعیت سفارش" value={closedStatusLabel} tone={closedStatusTone} />
            <SummaryRow label="خریدار" value={order.customerName} />
            <SummaryRow label="شماره تماس خریدار" value={order.customerPhone} dir="ltr" />
          </div>
        </section>

        <PricingCard rows={pricingRows} totalAmount={order.payableAmount} />
      </aside>

      <div className="space-y-6">
        <section className="overflow-hidden rounded-3xl border border-fuchsia-100 bg-[linear-gradient(180deg,rgba(253,244,255,0.85),rgba(255,255,255,0.96))] shadow-[0_20px_55px_-40px_rgba(217,70,239,0.35)]">
          <div className="flex items-center justify-between border-b border-fuchsia-100/80 px-5 py-4">
            <span className="text-sm font-black text-fuchsia-900">اطلاعات گیرنده</span>
            <UserIcon className="h-5 w-5 text-fuchsia-500" />
          </div>
          <div className="space-y-5 px-5 py-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="min-w-0 space-y-3 text-right">
                <div className="flex items-center justify-end gap-2 text-sm font-bold text-slate-800">
                  <span>{order.customerName}</span>
                  <UserIcon className="h-4 w-4 text-fuchsia-500" />
                </div>
                <div className="flex items-center justify-end gap-2 text-sm text-slate-600" dir="ltr">
                  <span>{order.customerPhone}</span>
                  <PhoneIcon className="h-4 w-4 text-fuchsia-500" />
                </div>
              </div>
              <button
                type="button"
                className="inline-flex h-10 items-center justify-center gap-2 self-start rounded-xl border border-fuchsia-100 bg-white px-3 text-sm font-semibold text-fuchsia-700 shadow-sm transition-colors hover:bg-fuchsia-50"
              >
                <CopyIcon className="h-4 w-4" />
                کپی آدرس
              </button>
            </div>

            <div className="h-px bg-fuchsia-100" />

            <div className="space-y-4 text-right">
              <div className="flex items-center justify-end gap-2 text-xs font-semibold text-fuchsia-700">
                <LocationIcon className="h-4 w-4" />
                آدرس کامل
              </div>
              <p className="text-sm leading-8 text-slate-700">{order.address}</p>
              <div className="flex flex-wrap items-center justify-end gap-2">
                <span className="rounded-full border border-fuchsia-100 bg-fuchsia-50 px-3 py-1 text-xs font-semibold text-fuchsia-700">
                  {order.province} / {order.city}
                </span>
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600" dir="ltr">
                  {order.postalCode}
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-white/70 bg-white/80 p-4 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-semibold text-fuchsia-700">
                <NoteIcon className="h-4 w-4" />
                توضیحات ارسال
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-700">{recipientNote}</p>
            </div>
          </div>
        </section>

        <ShippedItemsSection order={order} items={detailItems} />
        <ProductBatchSection batch={productBatch} />
      </div>
    </div>
  );
}

function ActionRequiredOrderDetails({
  order,
  pricingRows,
  detailItems,
  paymentTag,
  secondaryTag,
  orderStatusLabel,
  orderStatusTone,
  submittedAt,
  recipientNote,
  actionNotice,
}: {
  order: Order;
  pricingRows: AmountRow[];
  detailItems: DetailItem[];
  paymentTag?: Order["tags"][number];
  secondaryTag?: Order["tags"][number];
  orderStatusLabel: string;
  orderStatusTone: DetailTone;
  submittedAt: string;
  recipientNote: string;
  actionNotice: string;
}) {
  return (
    <div className="grid gap-6 xl:grid-cols-[340px_minmax(0,1fr)]">
      <aside className="space-y-6">
        <section className="overflow-hidden rounded-3xl border border-sky-100 bg-[linear-gradient(180deg,rgba(239,246,255,0.95),rgba(248,250,252,0.9))] shadow-[0_18px_45px_-35px_rgba(14,116,144,0.45)]">
          <div className="flex items-center justify-between border-b border-sky-100/80 px-5 py-4">
            <span className="text-sm font-black text-sky-900">خلاصه سفارش</span>
            <span className={cn("inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold", badgeToneClasses[orderStatusTone])}>
              {orderStatusLabel}
            </span>
          </div>
          <div className="space-y-3 px-5 py-4">
            <SummaryRow label="شماره سفارش" value={order.code} dir="ltr" />
            <SummaryRow label="تاریخ ثبت" value={submittedAt} />
            <SummaryRow
              label="وضعیت پرداخت"
              value={paymentTag?.label ?? "نامشخص"}
              tone={paymentTag?.tone ?? "neutral"}
            />
            {secondaryTag ? (
              <SummaryRow label="وضعیت تایید" value={secondaryTag.label} tone={secondaryTag.tone} />
            ) : null}
            <SummaryRow label="وضعیت سفارش" value={orderStatusLabel} tone={orderStatusTone} />
            <SummaryRow label="خریدار" value={order.customerName} />
            <SummaryRow label="شماره تماس" value={order.customerPhone} dir="ltr" />
          </div>
        </section>

        <PricingCard rows={pricingRows} totalAmount={order.payableAmount} />
      </aside>

      <div className="space-y-6">
        <section className="overflow-hidden rounded-3xl border border-fuchsia-100 bg-[linear-gradient(180deg,rgba(253,244,255,0.85),rgba(255,255,255,0.96))] shadow-[0_20px_55px_-40px_rgba(217,70,239,0.35)]">
          <div className="flex items-center justify-between border-b border-fuchsia-100/80 px-5 py-4">
            <span className="text-sm font-black text-fuchsia-900">اطلاعات گیرنده</span>
            <UserIcon className="h-5 w-5 text-fuchsia-500" />
          </div>
          <div className="space-y-5 px-5 py-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="min-w-0 space-y-3 text-right">
                <div className="flex items-center justify-end gap-2 text-sm font-bold text-slate-800">
                  <span>{order.customerName}</span>
                  <UserIcon className="h-4 w-4 text-fuchsia-500" />
                </div>
                <div className="flex items-center justify-end gap-2 text-sm text-slate-600" dir="ltr">
                  <span>{order.customerPhone}</span>
                  <PhoneIcon className="h-4 w-4 text-fuchsia-500" />
                </div>
              </div>
              <button
                type="button"
                className="inline-flex h-10 items-center justify-center gap-2 self-start rounded-xl border border-fuchsia-100 bg-white px-3 text-sm font-semibold text-fuchsia-700 shadow-sm transition-colors hover:bg-fuchsia-50"
              >
                <CopyIcon className="h-4 w-4" />
                کپی آدرس
              </button>
            </div>

            <div className="h-px bg-fuchsia-100" />

            <div className="space-y-4 text-right">
              <div className="flex items-center justify-end gap-2 text-xs font-semibold text-fuchsia-700">
                <LocationIcon className="h-4 w-4" />
                آدرس کامل
              </div>
              <p className="text-sm leading-8 text-slate-700">{order.address}</p>
              <div className="flex flex-wrap items-center justify-end gap-2">
                <span className="rounded-full border border-fuchsia-100 bg-fuchsia-50 px-3 py-1 text-xs font-semibold text-fuchsia-700">
                  {order.province} / {order.city}
                </span>
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600" dir="ltr">
                  {order.postalCode}
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-white/70 bg-white/80 p-4 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-semibold text-fuchsia-700">
                <NoteIcon className="h-4 w-4" />
                توضیحات ارسال
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-700">{recipientNote}</p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-emerald-100 bg-emerald-50/70 px-4 py-3 text-sm text-emerald-800 shadow-[0_18px_45px_-40px_rgba(16,185,129,0.45)]">
          <div className="flex items-start gap-2 text-right">
            <InfoIcon className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
            <p>{actionNotice}</p>
          </div>
        </section>

        {order.statusPanel ? (
          <section className="overflow-hidden rounded-3xl border border-amber-200 bg-[linear-gradient(180deg,rgba(255,251,235,0.92),rgba(255,255,255,0.96))] shadow-[0_24px_60px_-45px_rgba(245,158,11,0.28)]">
            <div className="flex flex-col gap-4 px-5 py-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="text-right">
                <div className="flex items-center justify-end gap-2 text-sm font-black text-amber-800">
                  <AlertTriangleIcon className="h-4 w-4" />
                  {order.statusPanel.title}
                </div>
                <p className="mt-2 text-sm leading-7 text-slate-700">{order.statusPanel.description}</p>
              </div>

              <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
                {order.statusPanel.secondaryActionLabel ? (
                  <button
                    type="button"
                    className="inline-flex h-11 items-center justify-center rounded-xl border border-rose-200 bg-white px-4 text-sm font-semibold text-rose-600 transition-colors hover:bg-rose-50"
                  >
                    {order.statusPanel.secondaryActionLabel}
                  </button>
                ) : null}
                <button
                  type="button"
                  className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-4 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
                >
                  {order.statusPanel.primaryActionLabel}
                </button>
              </div>
            </div>
          </section>
        ) : null}

        <EditableItemsSection order={order} items={detailItems} />
      </div>
    </div>
  );
}

function PricingCard({ rows, totalAmount }: { rows: AmountRow[]; totalAmount: number }) {
  return (
    <section className="overflow-hidden rounded-3xl border border-emerald-100 bg-[linear-gradient(180deg,rgba(236,253,245,0.95),rgba(248,250,252,0.9))] shadow-[0_18px_45px_-35px_rgba(16,185,129,0.45)]">
      <div className="flex items-center justify-between border-b border-emerald-100/80 px-5 py-4">
        <span className="text-sm font-black text-emerald-900">جزئیات مبلغ</span>
        <WalletIcon className="h-5 w-5 text-emerald-600" />
      </div>
      <div className="space-y-3 px-5 py-4">
        {rows.map((row, index) => (
          <div key={row.label} className="flex items-center justify-between gap-3 text-sm">
            <span className="font-bold text-slate-800">{formatCurrency(row.amount)}</span>
            <span className="inline-flex items-center gap-2 text-slate-600">
              <span className={cn("h-2.5 w-2.5 rounded-full", pricingDotClasses[index === rows.length - 1 ? "danger" : index === 0 ? "success" : index === 1 ? "info" : "warning"])} />
              <span className="font-medium">{row.label}</span>
            </span>
          </div>
        ))}
        <div className="h-px bg-emerald-100" />
        <div className="flex items-center justify-between gap-3 rounded-2xl bg-emerald-600 px-4 py-3 text-white shadow-lg shadow-emerald-500/20">
          <span className="text-lg font-black">{formatCurrency(totalAmount)}</span>
          <span className="text-sm font-semibold">مبلغ نهایی قابل پرداخت</span>
        </div>
      </div>
    </section>
  );
}

function DefaultItemsSection({ order, items }: { order: Order; items: DetailItem[] }) {
  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_24px_60px_-45px_rgba(15,23,42,0.35)]">
      <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-right">
          <h2 className="text-sm font-black text-text">اقلام سفارش ({items.length.toLocaleString("fa-IR")} محصول)</h2>
          <p className="mt-1 text-xs text-slate-500">جزئیات هر قلم به‌همراه مبلغ، وضعیت کالا و تعداد ثبت‌شده</p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
          <BoxIcon className="h-4 w-4" />
          {order.itemCount.toLocaleString("fa-IR")} قلم کالا
        </span>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-190">
          <div className="grid grid-cols-[140px_120px_90px_92px_minmax(0,1fr)] gap-4 bg-slate-50 px-5 py-3 text-xs font-bold text-slate-500">
            <span className="text-right">مبلغ</span>
            <span className="text-center">وضعیت کالا</span>
            <span className="text-center">تعداد</span>
            <span className="text-center">تصویر</span>
            <span className="text-right">محصول شما</span>
          </div>

          <div className="divide-y divide-slate-100">
            {items.map((item) => (
              <div key={item.id} className="grid grid-cols-[140px_120px_90px_92px_minmax(0,1fr)] gap-4 px-5 py-4 text-sm">
                <div className="flex items-center justify-end font-bold text-slate-800">{formatCurrency(item.totalAmount)}</div>
                <div className="flex items-center justify-center">
                  <span className={cn("inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold", badgeToneClasses[item.statusTone])}>
                    {item.statusLabel}
                  </span>
                </div>
                <div className="flex items-center justify-center font-semibold text-slate-700">
                  {item.quantity.toLocaleString("fa-IR")}
                </div>
                <div className="flex items-center justify-center">
                  <div className={cn("flex h-14 w-14 items-center justify-center rounded-2xl border border-white bg-linear-to-br text-sm font-black text-slate-700 shadow-sm", item.accent)}>
                    {item.imageLabel ?? item.quantity.toLocaleString("fa-IR")}
                  </div>
                </div>
                <div className="min-w-0 text-right">
                  <p className="truncate font-bold text-slate-800">{item.title}</p>
                  <p className="mt-1 text-xs text-slate-500">{item.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ShippedItemsSection({ order, items }: { order: Order; items: DetailItem[] }) {
  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_24px_60px_-45px_rgba(15,23,42,0.35)]">
      <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-right">
          <h2 className="text-sm font-black text-text">اقلام سفارش ({items.length.toLocaleString("fa-IR")})</h2>
          <p className="mt-1 text-xs text-slate-500">فیلدهای این بخش مطابق نمای سفارش ارسال‌شده و با همان تم صفحه جزئیات چیده شده‌اند.</p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
          <BoxIcon className="h-4 w-4" />
          {order.itemCount.toLocaleString("fa-IR")} قلم کالا
        </span>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-210">
          <div className="grid grid-cols-[140px_90px_130px_110px_minmax(0,1fr)] gap-4 bg-slate-50 px-5 py-3 text-xs font-bold text-slate-500">
            <span className="text-right">قیمت کل</span>
            <span className="text-center">تعداد</span>
            <span className="text-right">قیمت واحد</span>
            <span className="text-center">وضعیت</span>
            <span className="text-right">محصول</span>
          </div>

          <div className="divide-y divide-slate-100">
            {items.map((item) => (
              <div key={item.id} className="grid grid-cols-[140px_90px_130px_110px_minmax(0,1fr)] gap-4 px-5 py-4 text-sm">
                <div className="flex items-center justify-end font-bold text-slate-800">{formatCurrency(item.totalAmount)}</div>
                <div className="flex items-center justify-center">
                  <span className="inline-flex rounded-full bg-sky-50 px-2.5 py-1 text-xs font-bold text-sky-700">
                    {item.quantity.toLocaleString("fa-IR")} عدد
                  </span>
                </div>
                <div className="flex items-center justify-end font-semibold text-slate-700">
                  {formatCurrency(item.unitAmount ?? item.totalAmount)}
                </div>
                <div className="flex items-center justify-center">
                  <span className={cn("inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold", badgeToneClasses[item.statusTone])}>
                    {item.statusLabel}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div className="min-w-0 flex-1 text-right">
                    <p className="truncate font-bold text-slate-800">{item.title}</p>
                    <p className="mt-1 text-xs text-slate-500">{item.subtitle}</p>
                  </div>
                  <div className={cn("flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white bg-linear-to-br text-sm font-black text-slate-700 shadow-sm", item.accent)}>
                    {item.imageLabel ?? item.quantity.toLocaleString("fa-IR")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function EditableItemsSection({ order, items }: { order: Order; items: DetailItem[] }) {
  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_24px_60px_-45px_rgba(15,23,42,0.35)]">
      <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          className="inline-flex h-10 items-center justify-center gap-2 self-end rounded-xl bg-primary px-4 text-sm font-semibold text-white transition-colors hover:bg-primary/90 sm:self-auto"
        >
          <PlusIcon className="h-4 w-4" />
          افزودن اقلام
        </button>
        <div className="text-right">
          <h2 className="text-sm font-black text-text">اقلام سفارش ({items.length.toLocaleString("fa-IR")})</h2>
          <p className="mt-1 text-xs text-slate-500">اقلام این سفارش را پیش از تایید نهایی می‌توانید ویرایش یا حذف کنید.</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-245">
          <div className="grid grid-cols-[150px_130px_90px_130px_110px_minmax(0,1fr)] gap-4 bg-slate-50 px-5 py-3 text-xs font-bold text-slate-500">
            <span className="text-left">عملیات</span>
            <span className="text-right">قیمت کل</span>
            <span className="text-center">تعداد</span>
            <span className="text-right">قیمت واحد</span>
            <span className="text-center">وضعیت</span>
            <span className="text-right">محصول</span>
          </div>

          <div className="divide-y divide-slate-100">
            {items.map((item) => (
              <div key={item.id} className="grid grid-cols-[150px_130px_90px_130px_110px_minmax(0,1fr)] gap-4 px-5 py-4 text-sm">
                <div className="flex items-center justify-start gap-2">
                  <button
                    type="button"
                    className="inline-flex h-9 items-center justify-center gap-1 rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-50"
                  >
                    <EditIcon className="h-3.5 w-3.5" />
                    ویرایش
                  </button>
                  <button
                    type="button"
                    className="inline-flex h-9 items-center justify-center gap-1 rounded-lg border border-rose-200 bg-white px-3 text-xs font-semibold text-rose-600 transition-colors hover:bg-rose-50"
                  >
                    <TrashIcon className="h-3.5 w-3.5" />
                    حذف
                  </button>
                </div>
                <div className="flex items-center justify-end font-bold text-slate-800">{formatCurrency(item.totalAmount)}</div>
                <div className="flex items-center justify-center">
                  <span className="inline-flex rounded-full bg-sky-50 px-2.5 py-1 text-xs font-bold text-sky-700">
                    {item.quantity.toLocaleString("fa-IR")} عدد
                  </span>
                </div>
                <div className="flex items-center justify-end font-semibold text-slate-700">
                  {formatCurrency(item.unitAmount ?? item.totalAmount)}
                </div>
                <div className="flex items-center justify-center">
                  <span className={cn("inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold", badgeToneClasses[item.statusTone])}>
                    {item.statusLabel}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div className="min-w-0 flex-1 text-right">
                    <p className="truncate font-bold text-slate-800">{item.title}</p>
                    <p className="mt-1 text-xs text-slate-500">{item.subtitle}</p>
                  </div>
                  <div className={cn("flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white bg-linear-to-br text-sm font-black text-slate-700 shadow-sm", item.accent)}>
                    {item.imageLabel ?? item.quantity.toLocaleString("fa-IR")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-slate-100 px-5 py-4">
        <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
          <span className="font-bold text-slate-800">{order.itemCount.toLocaleString("fa-IR")} قلم کالا</span>
          <span>جمع تعداد ثبت‌شده برای این سفارش</span>
        </div>
      </div>
    </section>
  );
}

function ShipmentsSection({ order, shipments }: { order: Order; shipments: ShipmentCard[] }) {
  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_24px_60px_-45px_rgba(15,23,42,0.28)]">
      <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-right">
          <h2 className="text-sm font-black text-text">محموله‌ها</h2>
          <p className="mt-1 text-xs text-slate-500">وضعیت هر بسته برای چاپ برچسب و آماده‌سازی ارسال</p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
          <TruckIcon className="h-4 w-4" />
          {order.packageCount.toLocaleString("fa-IR")} بسته
        </span>
      </div>

      <div className="grid gap-4 px-5 py-5 lg:grid-cols-2">
        {shipments.map((shipment) => (
          <div key={shipment.id} className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <span className={cn("inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold", badgeToneClasses[shipment.statusTone])}>
                {shipment.statusLabel}
              </span>
              <div className="text-right">
                <h3 className="font-bold text-slate-800">{shipment.title}</h3>
                <p className="mt-1 text-xs text-slate-500">{shipment.description}</p>
              </div>
            </div>
            <div className="mt-4 flex items-start gap-2 rounded-2xl border border-dashed border-slate-200 bg-white px-3 py-3 text-sm text-slate-600">
              <ClockIcon className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
              <p>{shipment.eta}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProductBatchSection({ batch }: { batch: ProductBatch }) {
  return (
    <section className="overflow-hidden rounded-3xl border border-amber-100 bg-[linear-gradient(180deg,rgba(255,251,235,0.92),rgba(255,255,255,0.96))] shadow-[0_24px_60px_-45px_rgba(245,158,11,0.25)]">
      <div className="flex items-center justify-between border-b border-amber-100/80 px-5 py-4">
        <h2 className="text-sm font-black text-text">محصولات شما</h2>
        <BoxIcon className="h-5 w-5 text-amber-500" />
      </div>

      <div className="px-5 py-5">
        <div className="overflow-hidden rounded-2xl border border-amber-200 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-amber-100 bg-amber-50/70 px-4 py-4 sm:flex-row sm:items-start sm:justify-between">
            <span className={cn("inline-flex w-fit rounded-full border px-2.5 py-1 text-xs font-semibold", badgeToneClasses[batch.statusTone])}>
              {batch.statusLabel}
            </span>
            <div className="text-right">
              <p className="text-sm font-black text-slate-800">محصول شما</p>
              <p className="mt-1 text-xs text-slate-500">{batch.sellerProductCode}</p>
            </div>
          </div>

          <div className="space-y-4 px-4 py-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-bold text-slate-800" dir="ltr">
                  {batch.trackingCode}
                </span>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <span>کد رهگیری</span>
                  <CopyIcon className="h-4 w-4" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              {batch.items.map((item) => (
                <div key={item} className="flex items-center justify-between gap-3 rounded-xl border border-amber-100 bg-amber-50/40 px-3 py-2.5 text-sm text-slate-700">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-bold text-amber-600 shadow-sm">
                    {ProductTagIcon()}
                  </span>
                  <p className="text-right leading-6">{item}</p>
                </div>
              ))}
            </div>

            <TrackingCodeModalTrigger
              buttonText={batch.actionLabel}
              initialShippingService={batch.shippingService}
              initialTrackingCode={batch.trackingCode}
              initialTrackingLink={batch.trackingLink}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function SummaryRow({
  label,
  value,
  tone,
  dir,
}: {
  label: string;
  value: string;
  tone?: DetailTone;
  dir?: "rtl" | "ltr";
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/80 bg-white/70 px-4 py-3 shadow-sm">
      {tone ? (
        <span className={cn("inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold", badgeToneClasses[tone])} dir={dir}>
          {value}
        </span>
      ) : (
        <span className="text-sm font-bold text-slate-800" dir={dir}>
          {value}
        </span>
      )}
      <span className="text-xs font-semibold text-slate-500">{label}</span>
    </div>
  );
}

function InfoCard({
  icon,
  label,
  value,
  dir,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  dir?: "rtl" | "ltr";
}) {
  return (
    <div className="rounded-2xl border border-white/70 bg-white/80 p-4 shadow-sm">
      <div className="flex items-center gap-2 text-xs font-semibold text-fuchsia-700">
        {icon}
        {label}
      </div>
      <p className="mt-3 text-sm font-bold text-slate-800" dir={dir}>
        {value}
      </p>
    </div>
  );
}

function ProductTagIcon() {
  return "•";
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  );
}

function ReceiptIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3Z" />
      <path d="M9 8h6" />
      <path d="M9 12h6" />
    </svg>
  );
}

function WalletIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 7h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7Z" />
      <path d="M16 11h4" />
      <path d="M6 7V5a2 2 0 0 1 2-2h10" />
    </svg>
  );
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21a8 8 0 0 0-16 0" />
      <circle cx="12" cy="8" r="4" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.34 1.78.66 2.62a2 2 0 0 1-.45 2.11L8 9.91a16 16 0 0 0 6.09 6.09l1.46-1.32a2 2 0 0 1 2.11-.45c.84.32 1.72.54 2.62.66A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

function LocationIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21s-6-5.33-6-11a6 6 0 1 1 12 0c0 5.67-6 11-6 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function PinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 20h10" />
      <path d="M12 4v16" />
      <path d="m8 8 4-4 4 4" />
    </svg>
  );
}

function PostIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 6h16v12H4z" />
      <path d="m22 8-10 6L2 8" />
    </svg>
  );
}

function NoteIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 3h10a2 2 0 0 1 2 2v14l-4-3-4 3-4-3-4 3V5a2 2 0 0 1 2-2h2" />
      <path d="M8 8h8" />
      <path d="M8 12h6" />
    </svg>
  );
}

function BoxIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
      <path d="M12 12 4 7.5" />
      <path d="M12 12l8-4.5" />
      <path d="M12 12v9" />
    </svg>
  );
}

function TruckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7h11v10H3z" />
      <path d="M14 10h4l3 3v4h-7" />
      <circle cx="7.5" cy="18.5" r="1.5" />
      <circle cx="17.5" cy="18.5" r="1.5" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  );
}

function PrintIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9V4h12v5" />
      <rect x="6" y="14" width="12" height="6" rx="1" />
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <path d="M17 12h.01" />
    </svg>
  );
}

function CopyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function InfoIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 10v6" />
      <path d="M12 7h.01" />
    </svg>
  );
}

function AlertTriangleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
      <path d="M10.3 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.7 3.86a2 2 0 0 0-3.4 0Z" />
    </svg>
  );
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
  );
}

function EditIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.12 2.12 0 1 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  );
}

function TrashIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18" />
      <path d="M8 6V4h8v2" />
      <path d="m19 6-1 14H6L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
    </svg>
  );
}

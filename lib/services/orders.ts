export type OrderStatus = "pending" | "shipped" | "action_required" | "closed";
export type OrderTagTone = "success" | "info" | "warning" | "danger";
export type OrderPanelTone = "info" | "warning";

export interface OrderTag {
  id: string;
  label: string;
  tone: OrderTagTone;
}

export interface OrderLineItem {
  id: string;
  title: string;
}

export interface OrderStatusPanel {
  title: string;
  description: string;
  tone: OrderPanelTone;
  primaryActionLabel: string;
  secondaryActionLabel?: string;
}

export interface Order {
  id: number;
  code: string;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  city: string;
  province: string;
  postalCode: string;
  address: string;
  payableAmount: number;
  paymentDescription: string;
  itemCount: number;
  packageCount: number;
  moreItemsCount?: number;
  tags: OrderTag[];
  items: OrderLineItem[];
  status: OrderStatus;
  statusPanel?: OrderStatusPanel;
}

const orders: Order[] = [
  {
    id: 1,
    code: "BS-66360958",
    createdAt: "۲۹ بهمن ۱۴۰۴",
    customerName: "خریدار سفارشی",
    customerPhone: "۰۹۹۰/۸۰۱۹۱۹",
    city: "قزوین",
    province: "قزوین",
    postalCode: "۴۳۴۱۷۵۸۴۲۴",
    address:
      "شهر قزوین، خیابان سعدی، کوچه باران، کوچه فروردین، بن‌بست نیکو، پلاک ۶۴",
    payableAmount: 524317,
    paymentDescription: "شامل تمام هزینه‌ها",
    itemCount: 5,
    packageCount: 1,
    tags: [
      { id: "1-1", label: "پرداخت شده", tone: "success" },
      { id: "1-2", label: "تایید شده", tone: "info" },
    ],
    items: [
      { id: "1-1", title: "ژل مادی، نرم‌کننده قبل از اتوی مو (صورتی کد ۵)" },
    ],
    status: "pending",
    statusPanel: {
      title: "آماده برای پردازش",
      description:
        "این سفارش پرداخت شده و آماده آماده‌سازی است. با تایید، سفارش به وضعیت «در حال پردازش» تغییر می‌کند.",
      tone: "info",
      primaryActionLabel: "شروع آماده‌سازی",
    },
  },
  {
    id: 2,
    code: "BS-66442996",
    createdAt: "۲۸ اسفند ۱۴۰۴",
    customerName: "خریدار سفارش",
    customerPhone: "۰۹۱۱۹۸۹۴۳۴۰",
    city: "گلپایگان",
    province: "اصفهان",
    postalCode: "۴۴۹۴۳۶۱۸۵۸",
    address: "روستای خانه میر، روبه‌روی مسجد ابوالفضل، آسیاب، پلاک ۱۵۴۵",
    payableAmount: 300347,
    paymentDescription: "شامل تمام هزینه‌ها",
    itemCount: 2,
    packageCount: 1,
    tags: [
      { id: "2-1", label: "پرداخت شده", tone: "success" },
      { id: "2-2", label: "تایید شده", tone: "info" },
    ],
    items: [
      { id: "2-1", title: "کرم مرطوب‌کننده انار نیکا (۴۵ گرم)" },
    ],
    status: "pending",
    statusPanel: {
      title: "آماده برای پردازش",
      description:
        "سفارش آماده بسته‌بندی است. پس از شروع آماده‌سازی، امکان مدیریت محموله و چاپ لیبل در مرحله بعدی فعال می‌شود.",
      tone: "info",
      primaryActionLabel: "شروع آماده‌سازی",
    },
  },
  {
    id: 3,
    code: "BS-63202870",
    createdAt: "۲۹ بهمن ۱۴۰۴",
    customerName: "حامد پاکدل",
    customerPhone: "۰۹۳۷۶۷۹۷۱۶",
    city: "سمیرم",
    province: "اصفهان",
    postalCode: "۹۷۵۱۰۷۶۸۵",
    address: "شهیدان ۵، روبه‌روی بوستان فردوس، پلاک ۸",
    payableAmount: 430584,
    paymentDescription: "شامل تمام هزینه‌ها",
    itemCount: 3,
    packageCount: 1,
    tags: [
      { id: "3-1", label: "پرداخت شده", tone: "success" },
      { id: "3-2", label: "ارسال شده", tone: "info" },
    ],
    items: [
      { id: "3-1", title: "صابون ابرو حجم‌دهنده کویین (۲۰۰ گرم)" },
      { id: "3-2", title: "رژ لب مات (رنگ مسی)" },
    ],
    status: "shipped",
  },
  {
    id: 4,
    code: "BS-6577294",
    createdAt: "۲۵ بهمن ۱۴۰۴",
    customerName: "پرنیان بهنامی",
    customerPhone: "۰۹۳۷۰۷۴۰۹۷۸",
    city: "مرند",
    province: "آذربایجان شرقی",
    postalCode: "۱۳۳۹۵۷۶۴۶",
    address: "روستای پلکانه، خیابان گل یاس، کنار پل قدیمی، پلاک ۸۹",
    payableAmount: 2066247,
    paymentDescription: "شامل تمام هزینه‌ها",
    itemCount: 14,
    packageCount: 2,
    tags: [
      { id: "4-1", label: "پرداخت شده", tone: "success" },
      { id: "4-2", label: "ارسال شده", tone: "info" },
    ],
    items: [
      { id: "4-1", title: "کرم شب آبرسان نیکا" },
      { id: "4-2", title: "ژل پاک‌کننده آرایشی (۴۵۰ گرمی)" },
    ],
    status: "shipped",
  },
  {
    id: 5,
    code: "BS-61861082",
    createdAt: "۲۷ اسفند ۱۴۰۴",
    customerName: "خریدار سفارش",
    customerPhone: "۰۹۱۴۱۰۳۹۲۴۷",
    city: "تهران",
    province: "تهران",
    postalCode: "۵۷۸۱۸۳۹۲۳۱",
    address: "استان تهران، شهرستان شهریار، بلوار ولیعصر، کوچه گل یخ، پلاک ۵۵۰",
    payableAmount: 957710,
    paymentDescription: "شامل تمام هزینه‌ها",
    itemCount: 17,
    packageCount: 2,
    tags: [
      { id: "5-1", label: "پرداخت نشده", tone: "danger" },
      { id: "5-2", label: "تایید نشده", tone: "warning" },
    ],
    items: [
      { id: "5-1", title: "شامپو خشک جی بی کوئیک اکسپرس موشکی (۳۰۰ گرم)" },
      { id: "5-2", title: "ژل براق‌کننده نقره‌ای (۴۰ گرم)" },
      { id: "5-3", title: "سرم مو ترمیم‌کننده" },
    ],
    status: "action_required",
    statusPanel: {
      title: "نیازمند اقدام شما",
      description:
        "این سفارش نیاز به تایید دارد. لطفا وضعیت سفارش را بررسی کنید و با تایید، آماده ارسال کنید.",
      tone: "warning",
      primaryActionLabel: "تایید و ارسال",
      secondaryActionLabel: "لغو سفارش",
    },
  },
  {
    id: 6,
    code: "BS-62047531",
    createdAt: "۲۶ اسفند ۱۴۰۴",
    customerName: "آذین فرهمند",
    customerPhone: "۰۹۱۲۹۳۳۱۱۷۰",
    city: "مشهد",
    province: "خراسان رضوی",
    postalCode: "۸۴۳۲۱۹۰۵۶۲",
    address: "بلوار سجاد، خیابان حامد، نبش کوچه لاله ۱۲، واحد ۳",
    payableAmount: 1184200,
    paymentDescription: "شامل تمام هزینه‌ها",
    itemCount: 9,
    packageCount: 1,
    tags: [
      { id: "6-1", label: "پرداخت نشده", tone: "danger" },
      { id: "6-2", label: "تایید نشده", tone: "warning" },
    ],
    items: [
      { id: "6-1", title: "پک مراقبت پوست نقره‌ای" },
      { id: "6-2", title: "کرم آبرسان دست و صورت" },
    ],
    status: "action_required",
    statusPanel: {
      title: "نیازمند اقدام شما",
      description:
        "برای این سفارش اختلاف موجودی ثبت شده است. پس از بازبینی، سفارش را تایید کنید یا در صورت نیاز لغو کنید.",
      tone: "warning",
      primaryActionLabel: "تایید و ارسال",
      secondaryActionLabel: "لغو سفارش",
    },
  },
  {
    id: 7,
    code: "BS-61949341",
    createdAt: "۲۴ بهمن ۱۴۰۴",
    customerName: "خریدار سفارشی",
    customerPhone: "۰۹۱۴۲۹۳۷۷۹۱",
    city: "قم",
    province: "قم",
    postalCode: "۱۹۷۳۶۳۷۳۱۱",
    address: "خیابان شهید فلاحی، بلوار معارف، کوچه مهر، پلاک ۵",
    payableAmount: 1385800,
    paymentDescription: "شامل تمام هزینه‌ها",
    itemCount: 13,
    packageCount: 1,
    tags: [
      { id: "7-1", label: "پرداخت شده", tone: "success" },
      { id: "7-2", label: "تحویل شده", tone: "info" },
    ],
    items: [
      { id: "7-1", title: "رژ لب خشک مات (۱.۲۵ میلی)" },
      { id: "7-2", title: "پنکیک آرایشی کاور نچرال (قهوه‌ای)" },
    ],
    status: "closed",
  },
  {
    id: 8,
    code: "BS-66019980",
    createdAt: "۲۳ بهمن ۱۴۰۴",
    customerName: "خریدار سفارش",
    customerPhone: "۰۹۱۲۴۰۴۴۶۳۲",
    city: "اصفهان",
    province: "اصفهان",
    postalCode: "۸۱۵۸۷۹۳۹۳۲",
    address: "اصفهان، میدان احمدآباد، کوچه گلستان، انتهای بن‌بست، پلاک ۹۶",
    payableAmount: 159355,
    paymentDescription: "شامل تمام هزینه‌ها",
    itemCount: 2,
    packageCount: 1,
    tags: [
      { id: "8-1", label: "پرداخت شده", tone: "success" },
      { id: "8-2", label: "تحویل شده", tone: "info" },
    ],
    items: [
      { id: "8-1", title: "مداد چشم ضدآب نقره‌ای" },
    ],
    status: "closed",
  },
  {
    id: 9,
    code: "BS-57357652",
    createdAt: "۲۲ بهمن ۱۴۰۴",
    customerName: "فرزانه طالبی",
    customerPhone: "۰۹۱۸۷۶۳۵۱۷۳",
    city: "همدان",
    province: "همدان",
    postalCode: "۷۷۳۲۸۹۱۲۳۱",
    address: "خیابان بوعلی، بعد از چهارراه عارف، بن‌بست کاج، ساختمان گلبرگ، طبقه سوم",
    payableAmount: 562510,
    paymentDescription: "شامل تمام هزینه‌ها",
    itemCount: 3,
    packageCount: 1,
    tags: [
      { id: "9-1", label: "پرداخت شده", tone: "success" },
      { id: "9-2", label: "تحویل شده", tone: "info" },
    ],
    items: [
      { id: "9-1", title: "کرم مرطوب‌کننده دست (۴۵ گرم)" },
    ],
    status: "closed",
  },
];

const sellerOrders: Order[] = [
  {
    id: 101,
    code: "BS-62181269",
    createdAt: "۲۳ اسفند ۱۴۰۴",
    customerName: "زهرا شجاع",
    customerPhone: "۰۹۱۲۳۴۹۹۰۹۷",
    city: "جستان",
    province: "مازندران",
    postalCode: "۴۶۴۱۷۴۸۷۱۸",
    address:
      "جاده آمل به جستان، خ شاد ۲۱، کوچه رحمت آله توکلی، خ ۳، دست راست، انتهای فلزیاب، ساختمان سه طبقه، طبقه سوم، واحد اول",
    payableAmount: 604760,
    paymentDescription: "شامل تمام هزینه‌ها",
    itemCount: 17,
    packageCount: 1,
    moreItemsCount: 11,
    tags: [
      { id: "101-1", label: "پرداخت شده", tone: "danger" },
      { id: "101-2", label: "در انتظار تایید", tone: "warning" },
    ],
    items: [
      { id: "101-1", title: "روغن بنفشه پایه زیتون معمولی (۲۰ سی‌سی)" },
      { id: "101-2", title: "روغن ام اسف (۴۵ سی‌سی)" },
    ],
    status: "pending",
  },
  {
    id: 102,
    code: "BS-60918206",
    createdAt: "۲۱ دی ۱۴۰۴",
    customerName: "حمیدرضا نیک‌آیین",
    customerPhone: "۰۹۱۹۲۴۹۵۸۵۷",
    city: "تهران",
    province: "تهران",
    postalCode: "۱۱۸۹۷۱۷۱۱۱",
    address:
      "تهران، منطقه ۱۸، یافت‌آباد غربی، نرسیده به میدان الغدیر، خیابان شهید جواد ذبیح، مجتمع‌های قریه آریا A1، واحد ۳۸، طبقه ۳، بلوک A1",
    payableAmount: 192320,
    paymentDescription: "شامل تمام هزینه‌ها",
    itemCount: 1,
    packageCount: 1,
    tags: [
      { id: "102-1", label: "پرداخت شده", tone: "danger" },
      { id: "102-2", label: "در انتظار تایید", tone: "warning" },
    ],
    items: [{ id: "102-1", title: "حل یاسین بندی (۴۵۰ گرم)" }],
    status: "pending",
  },
  {
    id: 103,
    code: "BS-61861082",
    createdAt: "۲۷ آذر ۱۴۰۴",
    customerName: "پریسا",
    customerPhone: "۰۹۹۲۴۵۵۵۰۷۱",
    city: "میاندوآب",
    province: "آذربایجان غربی",
    postalCode: "۵۹۷۸۱۳۳۵۸۳",
    address: "استان آذربایجان غربی، شهرستان میاندوآب، روستای گوگ تپه خالصه، ۰۰۰",
    payableAmount: 539720,
    paymentDescription: "شامل تمام هزینه‌ها",
    itemCount: 7,
    packageCount: 1,
    moreItemsCount: 6,
    tags: [
      { id: "103-1", label: "پرداخت نشده", tone: "danger" },
      { id: "103-2", label: "نیازمند تایید", tone: "warning" },
    ],
    items: [
      { id: "103-1", title: "شامپو گیاهی ختمی و گل بنفشه اکسیبر موسسه جهادت (۳۰۰ گرم)" },
      { id: "103-2", title: "کرم بوکاسس داروانه (۴۰ گرم)" },
    ],
    status: "action_required",
    statusPanel: {
      title: "نیازمند اقدام شما",
      description:
        "این سفارش نیاز به تایید شما دارد. لطفاً سفارش را بررسی کرده و تایید یا لغو کنید.",
      tone: "warning",
      primaryActionLabel: "تایید و ارسال",
      secondaryActionLabel: "لغو سفارش",
    },
  },
  {
    id: 104,
    code: "BS-65352371",
    createdAt: "۱۸ بهمن ۱۴۰۴",
    customerName: "مهدی بوری",
    customerPhone: "۰۹۱۲۳۷۸۷۹۵۵",
    city: "ورامین",
    province: "تهران",
    postalCode: "۳۳۱۷۶۵۲۶۵۹",
    address: "کارخانه قند ۲۳، بهمن گلستان، از انتهای کوچه شهید علیرضا حسن، پلاک ۲۳",
    payableAmount: 567180,
    paymentDescription: "شامل تمام هزینه‌ها",
    itemCount: 1,
    packageCount: 1,
    tags: [
      { id: "104-1", label: "پرداخت شده", tone: "success" },
      { id: "104-2", label: "ارسال شده", tone: "info" },
    ],
    items: [{ id: "104-1", title: "زعفران کریمی مخصوص درب یک با ضمانت سپاهان" }],
    status: "shipped",
    statusPanel: {
      title: "سفارش ارسال شده است؟",
      description:
        "پس از اطمینان از اینکه مشتری سفارش را دریافت کرده است، آن را به وضعیت تحویل داده شده تغییر دهید.",
      tone: "info",
      primaryActionLabel: "تکمیل سفارش",
    },
  },
  {
    id: 105,
    code: "BS-64958341",
    createdAt: "۱۱ بهمن ۱۴۰۴",
    customerName: "معصومه رشیدی",
    customerPhone: "۰۹۱۹۸۳۳۳۴۶۴",
    city: "تهران",
    province: "تهران",
    postalCode: "۱۱۸۹۷۱۷۱۱۱",
    address:
      "تهران، میدان راه آهن بعد از ایستگاه راه آهن، پلک ۴۸، طبقه ۴، همکف",
    payableAmount: 349920,
    paymentDescription: "شامل تمام هزینه‌ها",
    itemCount: 1,
    packageCount: 1,
    tags: [
      { id: "105-1", label: "پرداخت شده", tone: "success" },
      { id: "105-2", label: "ارسال شده", tone: "info" },
    ],
    items: [{ id: "105-1", title: "روغن نارگیل لاله Rta 42 v116 قواره ۱۴۰ طوس" }],
    status: "shipped",
    statusPanel: {
      title: "سفارش ارسال شده است؟",
      description:
        "پس از اطمینان از اینکه مشتری سفارش را دریافت کرده است، آن را به وضعیت تحویل داده شده تغییر دهید.",
      tone: "info",
      primaryActionLabel: "تکمیل سفارش",
    },
  },
  {
    id: 106,
    code: "BS-62121580",
    createdAt: "۲۱ دی ۱۴۰۴",
    customerName: "زهرا زین جوپی",
    customerPhone: "۰۹۹۷۸۰۲۸۲۵۰",
    city: "خرم‌آباد",
    province: "لرستان",
    postalCode: "۶۷۸۱۶۹۵۶۹۱",
    address: "خرم‌آباد، سیگارکد، کوچه شهید عائله احمدی، نرسیده به زین جوپی، ۶۸۱۶۱۹۵۶۹۱",
    payableAmount: 175920,
    paymentDescription: "شامل تمام هزینه‌ها",
    itemCount: 5,
    packageCount: 1,
    tags: [
      { id: "106-1", label: "پرداخت نشده", tone: "danger" },
      { id: "106-2", label: "لغو شده", tone: "danger" },
    ],
    items: [{ id: "106-1", title: "روغن سیاهدانه ماشتی اکسیر موسسه جهادت (۵۵ میلی‌لیتر)" }],
    status: "closed",
  },
  {
    id: 107,
    code: "BS-61994934",
    createdAt: "۲۱ دی ۱۴۰۴",
    customerName: "محمدجواد رفیعی",
    customerPhone: "۰۹۴۴۸۲۸۷۸۱",
    city: "تهران",
    province: "تهران",
    postalCode: "۱۶۷۸۸۷۳۳۱۱",
    address: "تهران، خ شهید محسن شکوفه، ن علمیه امیرالمومنین علیه السلام، کنار مسجد باب الحوائج، پ ۶۳",
    payableAmount: 1385800,
    paymentDescription: "شامل تمام هزینه‌ها",
    itemCount: 13,
    packageCount: 1,
    tags: [
      { id: "107-1", label: "پرداخت نشده", tone: "danger" },
      { id: "107-2", label: "لغو شده", tone: "danger" },
    ],
    items: [
      { id: "107-1", title: "آب زرشک محلی (۱.۲۵ لیتر)" },
      { id: "107-2", title: "زمستانه امام کاظم (علیه السلام)" },
    ],
    status: "closed",
  },
];

export const SELLER_ORDER_COUNTS: Record<OrderStatus, number> = {
  pending: 1230,
  shipped: 2,
  action_required: 2,
  closed: 54,
};

export function getOrders(): Order[] {
  return orders;
}

export function getOrderById(id: number): Order | undefined {
  return orders.find((order) => order.id === id);
}

export function getSellerOrders(): Order[] {
  return sellerOrders;
}

export function getSellerOrderById(id: number): Order | undefined {
  return sellerOrders.find((order) => order.id === id);
}

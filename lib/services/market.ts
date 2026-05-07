export interface MarketProduct {
  id: number;
  name: string;
  image: string;
  images: string[];
  storeName: string;
  inventory: number;
  price: number;
  supplierId: number;
  publishDate: string;
  shippingCost: number;
  description: string;
}

export interface MarketSupplier {
  id: number;
  name: string;
  image: string;
  city: string;
  warehouse: string;
  returnPolicy: string;
  shippingCost: string;
}

const TEST_IMAGE = "/place.png";
const TEST_IMAGES = Array.from({ length: 5 }, () => TEST_IMAGE);

const suppliers: MarketSupplier[] = [
  {
    id: 1,
    name: "غرفه تکنو پارس",
    image: TEST_IMAGE,
    city: "تهران",
    warehouse: "انبار غربی تهران",
    returnPolicy: "۷ روز ضمانت بازگشت",
    shippingCost: "۴۵,۰۰۰ تومان",
  },
  {
    id: 2,
    name: "غرفه دیجیتال سنتر",
    image: TEST_IMAGE,
    city: "اصفهان",
    warehouse: "انبار مرکزی اصفهان",
    returnPolicy: "۱۴ روز ضمانت بازگشت",
    shippingCost: "۳۵,۰۰۰ تومان",
  },
  {
    id: 3,
    name: "غرفه کامپیوتر ایران",
    image: TEST_IMAGE,
    city: "مشهد",
    warehouse: "انبار شمالی مشهد",
    returnPolicy: "۱۰ روز ضمانت بازگشت",
    shippingCost: "۵۰,۰۰۰ تومان",
  },
  {
    id: 4,
    name: "غرفه گجت‌لند",
    image: TEST_IMAGE,
    city: "شیراز",
    warehouse: "انبار جنوبی شیراز",
    returnPolicy: "۷ روز ضمانت بازگشت",
    shippingCost: "۴۰,۰۰۰ تومان",
  },
  {
    id: 5,
    name: "غرفه انرژی مدرن",
    image: TEST_IMAGE,
    city: "تبریز",
    warehouse: "انبار شمال غرب تبریز",
    returnPolicy: "۱۴ روز ضمانت بازگشت",
    shippingCost: "۴۵,۰۰۰ تومان",
  },
  {
    id: 6,
    name: "غرفه نمایشگر پلاس",
    image: TEST_IMAGE,
    city: "تهران",
    warehouse: "انبار شرقی تهران",
    returnPolicy: "۷ روز ضمانت بازگشت",
    shippingCost: "۵۵,۰۰۰ تومان",
  },
];

const products: MarketProduct[] = [
  {
    id: 1, name: "گوشی سامسونگ گلکسی S24", image: TEST_IMAGE, images: TEST_IMAGES, storeName: "تکنو پارس", inventory: 24, price: 48500000, supplierId: 1,
    publishDate: "۱۴۰۳/۰۸/۱۵", shippingCost: 45000,
    description: "گوشی هوشمند سامسونگ گلکسی S24 با صفحه نمایش ۶.۲ اینچی Dynamic AMOLED 2X، پردازنده اسنپدراگون ۸ نسل ۳ و دوربین سه‌گانه ۵۰ مگاپیکسلی. این گوشی با طراحی مدرن و بدنه آلومینیومی، تجربه کاربری بی‌نظیری را ارائه می‌دهد."
  },
  {
    id: 2, name: "هدفون اپل ایرپادز پرو ۲", image: TEST_IMAGE, images: TEST_IMAGES, storeName: "دیجیتال سنتر", inventory: 56, price: 12800000, supplierId: 2,
    publishDate: "۱۴۰۳/۰۹/۰۲", shippingCost: 35000,
    description: "هدفون بی‌سیم اپل ایرپادز پرو ۲ با قابلیت حذف نویز فعال، کیفیت صدای فضایی و عمر باتری تا ۳۰ ساعت. طراحی ارگونومیک و راحت برای استفاده طولانی‌مدت."
  },
  {
    id: 3, name: "لپ‌تاپ ایسوس VivoBook ۱۴", image: TEST_IMAGE, images: TEST_IMAGES, storeName: "کامپیوتر ایران", inventory: 12, price: 32400000, supplierId: 3,
    publishDate: "۱۴۰۳/۰۷/۲۰", shippingCost: 50000,
    description: "لپ‌تاپ ۱۴ اینچی ایسوس VivoBook با پردازنده Intel Core i7 نسل ۱۳، ۱۶ گیگابایت رم DDR5 و حافظه SSD ۵۱۲ گیگابایت. صفحه نمایش Full HD با نمایشگر NanoEdge."
  },
  {
    id: 4, name: "ساعت هوشمند شیائومی", image: TEST_IMAGE, images: TEST_IMAGES, storeName: "گجت‌لند", inventory: 120, price: 3200000, supplierId: 4,
    publishDate: "۱۴۰۳/۱۰/۰۵", shippingCost: 40000,
    description: "ساعت هوشمند شیائومی می بند ۹ با صفحه نمایش AMOLED ۱.۶۲ اینچی، قابلیت پایش سلامت ۲۴ ساعته و عمر باتری تا ۲۱ روز. مقاوم در برابر آب تا عمق ۵۰ متر."
  },
  {
    id: 5, name: "پاوربانک انکر ۲۰۰۰۰", image: TEST_IMAGE, images: TEST_IMAGES, storeName: "انرژی مدرن", inventory: 85, price: 1800000, supplierId: 5,
    publishDate: "۱۴۰۳/۰۶/۱۲", shippingCost: 45000,
    description: "پاوربانک ۲۰۰۰۰ میلی‌آمپر ساعتی انکر با پورت USB-C PD و فناوری شارژ سریع PowerIQ. ظرفیت بالا برای شارژ چندین بار گوشی و تبلت."
  },
  {
    id: 6, name: "تبلت سامسونگ تب S9", image: TEST_IMAGE, images: TEST_IMAGES, storeName: "تکنو پارس", inventory: 8, price: 28900000, supplierId: 1,
    publishDate: "۱۴۰۳/۰۸/۲۸", shippingCost: 45000,
    description: "تبلت ۱۱ اینچی سامسونگ گلکسی تب S9 با صفحه نمایش Dynamic AMOLED 2X 120Hz و پردازنده اسنپدراگون ۸ نسل ۲. همراه با قلم S Pen."
  },
  {
    id: 7, name: "مانیتور ال جی ۲۷ اینچ", image: TEST_IMAGE, images: TEST_IMAGES, storeName: "نمایشگر پلاس", inventory: 15, price: 15600000, supplierId: 6,
    publishDate: "۱۴۰۳/۰۹/۱۸", shippingCost: 55000,
    description: "مانیتور گیمینگ ۲۷ اینچی ال جی UltraGear با نرخ تازه‌سازی ۱۴۴Hz و زمان پاسخ‌دهی ۱ms. پنل IPS با پوشش ۹۹٪ sRGB و HDR10."
  },
  {
    id: 8, name: "کیبورد مکانیکی ریزر", image: TEST_IMAGE, images: TEST_IMAGES, storeName: "گجت‌لند", inventory: 32, price: 9200000, supplierId: 4,
    publishDate: "۱۴۰۳/۱۱/۰۳", shippingCost: 40000,
    description: "کیبورد مکانیکی گیمینگ ریزر Huntsman با سوئیچ‌های اپتیکال و نورپردازی RGB Chroma. ساختار آلومینیومی با دوام بالا و کلیدهای پrogrammable."
  },
  {
    id: 9, name: "ماوس لاجیتک MX Master", image: TEST_IMAGE, images: TEST_IMAGES, storeName: "دیجیتال سنتر", inventory: 42, price: 7800000, supplierId: 2,
    publishDate: "۱۴۰۳/۰۷/۰۵", shippingCost: 35000,
    description: "ماوس بی‌سیم لاجیتک MX Master ۳S با حسگر ۸۰۰۰ DPI، اسکرول MagSpeed الکترومغناطیسی و قابلیت اتصال به ۳ دستگاه به صورت همزمان."
  },
  {
    id: 10, name: "وب‌کم لاجیتک C920", image: TEST_IMAGE, images: TEST_IMAGES, storeName: "کامپیوتر ایران", inventory: 30, price: 4500000, supplierId: 3,
    publishDate: "۱۴۰۳/۱۰/۲۲", shippingCost: 50000,
    description: "وب‌کم Full HD لاجیتک C920 با کیفیت ۱۰۸۰p و نرخ فریم ۳۰fps. دارای فوکوس خودکار و تصحیح نور خودکار برای ویدیوکال‌های حرفه‌ای."
  },
  {
    id: 11, name: "اسپیکر بلوتوثی JBL", image: TEST_IMAGE, images: TEST_IMAGES, storeName: "تکنو پارس", inventory: 18, price: 6200000, supplierId: 1,
    publishDate: "۱۴۰۳/۰۶/۳۰", shippingCost: 45000,
    description: "اسپیکر قابل حمل JBL Flip ۶ با صدای ۳۶۰ درجه، ضدآب IP67 و عمر باتری ۱۲ ساعت. طراحی کامپکت مناسب سفر و فضای باز."
  },
  {
    id: 12, name: "هارد اکسترنال سامسونگ", image: TEST_IMAGE, images: TEST_IMAGES, storeName: "دیجیتال سنتر", inventory: 25, price: 11000000, supplierId: 2,
    publishDate: "۱۴۰۳/۰۸/۱۰", shippingCost: 35000,
    description: "هارد اکسترنال ۲ ترابایتی سامسونگ T7 Shield با پورت USB-C 3.2 Gen ۲ و سرعت خواندن تا ۱۰۵۰ MB/s. مقاوم در برابر ضربه، آب و گردوغبار."
  },
];

export function getMarketProducts(): MarketProduct[] {
  return products;
}

export function getMarketSuppliers(): MarketSupplier[] {
  return suppliers;
}

export function getMarketProductById(id: number): MarketProduct | null {
  return products.find((p) => p.id === id) ?? null;
}

export function getMarketSupplierById(id: number): MarketSupplier | null {
  return suppliers.find((s) => s.id === id) ?? null;
}

export function getProductsBySupplierId(supplierId: number): MarketProduct[] {
  return products.filter((p) => p.supplierId === supplierId);
}

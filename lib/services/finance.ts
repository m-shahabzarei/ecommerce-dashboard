export type TransactionStatus = "success" | "pending" | "failed";

export interface Transaction {
  id: number;
  description: string;
  status: TransactionStatus;
  amount: number;
  date: string;
  time: string;
}

export interface Balance {
  current: number;
  withdrawable: number;
}

const STATUS_LABELS: Record<TransactionStatus, string> = {
  success: "موفق",
  pending: "در انتظار",
  failed: "ناموفق",
};

export function getStatusLabel(status: TransactionStatus): string {
  return STATUS_LABELS[status];
}

const MOCK_BALANCE: Balance = {
  current: 1_200_000,
  withdrawable: 800_000,
};

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: 1,
    description: "فروش محصول — گوشی سامسونگ گلکسی S24",
    status: "success",
    amount: 450_000,
    date: "۱۴۰۴/۰۲/۰۴",
    time: "۱۴:۳۰",
  },
  {
    id: 2,
    description: "برداشت به حساب بانکی",
    status: "pending",
    amount: -200_000,
    date: "۱۴۰۴/۰۲/۰۳",
    time: "۱۰:۱۵",
  },
  {
    id: 3,
    description: "فروش محصول — هدفون اپل ایرپادز پرو ۲",
    status: "success",
    amount: 320_000,
    date: "۱۴۰۴/۰۲/۰۲",
    time: "۱۶:۴۵",
  },
  {
    id: 4,
    description: "شارژ کیف پول",
    status: "success",
    amount: 500_000,
    date: "۱۴۰۴/۰۲/۰۱",
    time: "۰۹:۲۰",
  },
  {
    id: 5,
    description: "بازگشت وجه — سفارش لغو شده",
    status: "failed",
    amount: -120_000,
    date: "۱۴۰۴/۰۱/۳۰",
    time: "۱۱:۰۰",
  },
  {
    id: 6,
    description: "فروش محصول — لپ‌تاپ ایسوس VivoBook ۱۴",
    status: "success",
    amount: 850_000,
    date: "۱۴۰۴/۰۱/۲۹",
    time: "۱۳:۱۰",
  },
  {
    id: 7,
    description: "کمیسیون فروشگاه",
    status: "success",
    amount: -45_000,
    date: "۱۴۰۴/۰۱/۲۸",
    time: "۰۸:۰۰",
  },
];

export function getBalance(): Balance {
  return MOCK_BALANCE;
}

export function getTransactions(): Transaction[] {
  return MOCK_TRANSACTIONS;
}

export async function fetchBalance(): Promise<Balance> {
  // TODO: replace with real API call
  // const res = await fetch('/api/balance');
  // return res.json();
  return new Promise((resolve) => {
    setTimeout(() => resolve(getBalance()), 400);
  });
}

export async function fetchTransactions(): Promise<Transaction[]> {
  // TODO: replace with real API call
  // const res = await fetch('/api/transactions');
  // return res.json();
  return new Promise((resolve) => {
    setTimeout(() => resolve(getTransactions()), 500);
  });
}

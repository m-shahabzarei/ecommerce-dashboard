"use client";

import { useState, useEffect } from "react";
import { BalanceCard } from "@/components/dashboard/finance/BalanceCard";
import { TransactionsTable } from "@/components/dashboard/finance/TransactionsTable";
import { fetchBalance, fetchTransactions } from "@/lib/services/finance";
import type { Balance, Transaction } from "@/lib/services/finance";

export default function FinancePage() {
  const [balance, setBalance] = useState<Balance | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [bal, txs] = await Promise.all([
        fetchBalance(),
        fetchTransactions(),
      ]);
      setBalance(bal);
      setTransactions(txs);
      setIsLoading(false);
    }
    load();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">مالی</h1>
        <p className="mt-1 text-sm text-muted">
          مدیریت موجودی و تراکنش‌های مالی
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <BalanceCard
          title="اعتبار فعلی"
          amount={balance?.current ?? 0}
          buttonLabel="افزایش اعتبار"
          onButtonClick={() => console.log(" increase credit clicked")}
        />
        <BalanceCard
          title="قابل برداشت"
          amount={balance?.withdrawable ?? 0}
          buttonLabel="درخواست برداشت"
          onButtonClick={() => console.log("withdraw clicked")}
        />
      </div>

      <div>
        <h2 className="mb-3 text-base font-bold text-text">تراکنش‌ها</h2>
        <TransactionsTable
          transactions={transactions}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

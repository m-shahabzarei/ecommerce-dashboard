"use client";

import { useState } from "react";
import { BalanceCard } from "@/components/dashboard/finance/BalanceCard";
import { IncreaseCreditModal } from "@/components/dashboard/finance/IncreaseCreditModal";
import { TransactionDetailsModal } from "@/components/dashboard/finance/TransactionDetailsModal";
import { TransactionsTable } from "@/components/dashboard/finance/TransactionsTable";
import { WithdrawRequestModal } from "@/components/dashboard/finance/WithdrawRequestModal";
import { getBalance, getTransactions } from "@/lib/services/finance";
import type { Balance, Transaction } from "@/lib/services/finance";

export default function FinancePage() {
  const [balance, setBalance] = useState<Balance>(() => getBalance());
  const [isIncreaseCreditOpen, setIsIncreaseCreditOpen] = useState(false);
  const [isWithdrawRequestOpen, setIsWithdrawRequestOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const transactions = getTransactions();

  const handleIncreaseCredit = (amount: number) => {
    setBalance((prev) => ({
      ...prev,
      current: prev.current + amount,
    }));
  };

  const handleWithdrawRequest = (amount: number) => {
    setBalance((prev) => ({
      ...prev,
      withdrawable: Math.max(prev.withdrawable - amount, 0),
    }));
  };

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
          amount={balance.current}
          buttonLabel="افزایش اعتبار"
          onButtonClick={() => setIsIncreaseCreditOpen(true)}
        />
        <BalanceCard
          title="قابل برداشت"
          amount={balance.withdrawable}
          buttonLabel="درخواست برداشت"
          onButtonClick={() => setIsWithdrawRequestOpen(true)}
        />
      </div>

      <div>
        <h2 className="mb-3 text-base font-bold text-text">تراکنش‌ها</h2>
        <TransactionsTable
          transactions={transactions}
          isLoading={false}
          onTransactionClick={setSelectedTransaction}
        />
      </div>

      <IncreaseCreditModal
        isOpen={isIncreaseCreditOpen}
        currentBalance={balance.current}
        onClose={() => setIsIncreaseCreditOpen(false)}
        onConfirm={handleIncreaseCredit}
      />

      <WithdrawRequestModal
        isOpen={isWithdrawRequestOpen}
        withdrawableBalance={balance.withdrawable}
        onClose={() => setIsWithdrawRequestOpen(false)}
        onConfirm={handleWithdrawRequest}
      />

      <TransactionDetailsModal
        transaction={selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
      />
    </div>
  );
}

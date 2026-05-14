"use client";

import { useMemo, useState } from "react";

interface AddOrderItemModalTriggerProps {
  buttonText?: string;
  buttonClassName?: string;
}

interface ProductOption {
  id: string;
  title: string;
  supplier: string;
  sku: string;
  price: number;
  thumbnailLabel: string;
}

const SUPPLIER_OPTIONS = [
  "همه تامین‌کنندگان",
  "عطار بهشت",
  "داروخانه نیکا",
  "طبیعت کالا",
] as const;

const PRODUCT_OPTIONS: ProductOption[] = [
  {
    id: "honey-500",
    title: "عسل کنار (500 گرم)",
    supplier: "عطار بهشت",
    sku: "PRD-MF6-3E43-251031193751",
    price: 347000,
    thumbnailLabel: "عسل",
  },
  {
    id: "tablet-qors",
    title: "قرص",
    supplier: "عطار بهشت",
    sku: "PRD-MF6-1BF8-251031193340",
    price: 31000,
    thumbnailLabel: "قرص",
  },
  {
    id: "cream-nika",
    title: "کرم ترک پا نیکا (30 گرم)",
    supplier: "داروخانه نیکا",
    sku: "PRD-MF6-4CAB-251031193652",
    price: 54000,
    thumbnailLabel: "کرم",
  },
  {
    id: "honey-bulk",
    title: "عسل معمولی (27 کیلوگرم)",
    supplier: "طبیعت کالا",
    sku: "PRD-MF6-1C83-251031193740",
    price: 520000,
    unitLabel: "سطل",
    thumbnailLabel: "عسل",
  },
];

function formatCurrency(amount: number) {
  return `${amount.toLocaleString("fa-IR")} تومان`;
}

export function AddOrderItemModalTrigger({
  buttonText = "افزودن آیتم",
  buttonClassName = "inline-flex h-10 items-center justify-center gap-2 self-end rounded-xl bg-primary px-4 text-sm font-semibold text-white transition-colors hover:bg-primary/90 sm:self-auto",
}: AddOrderItemModalTriggerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [supplier, setSupplier] = useState<(typeof SUPPLIER_OPTIONS)[number]>("همه تامین‌کنندگان");
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [quantity, setQuantity] = useState("1");
  const [unitPrice, setUnitPrice] = useState("");

  const selectedProduct = useMemo(
    () => PRODUCT_OPTIONS.find((product) => product.id === selectedProductId) ?? null,
    [selectedProductId]
  );

  const filteredProducts = useMemo(() => {
    if (searchTerm.trim().length < 2) {
      return [];
    }

    return PRODUCT_OPTIONS.filter((product) => {
      const supplierMatches = supplier === "همه تامین‌کنندگان" || product.supplier === supplier;
      const searchMatches = product.title.includes(searchTerm.trim()) || product.sku.includes(searchTerm.trim());
      return supplierMatches && searchMatches;
    });
  }, [searchTerm, supplier]);

  const openModal = () => {
    setSearchTerm("");
    setSupplier("همه تامین‌کنندگان");
    setSelectedProductId(null);
    setQuantity("1");
    setUnitPrice("");
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSelectProduct = (product: ProductOption) => {
    setSelectedProductId(product.id);
    setUnitPrice(String(product.price));
  };

  const handleConfirm = () => {
    if (!selectedProduct || !unitPrice.trim() || !quantity.trim()) {
      return;
    }

    closeModal();
  };

  const isConfirmDisabled = !selectedProduct || !unitPrice.trim() || !quantity.trim();

  return (
    <>
      <button type="button" onClick={openModal} className={buttonClassName}>
        <PlusIcon className="h-4 w-4" />
        {buttonText}
      </button>

      {isOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/35 px-4 py-4 sm:py-6"
          onClick={closeModal}
        >
          <div
            className="flex max-h-[calc(100vh-2rem)] w-full max-w-230 flex-col overflow-hidden rounded-[28px] bg-white p-4 shadow-[0_30px_80px_-35px_rgba(15,23,42,0.45)] sm:p-6"
            onClick={(event) => event.stopPropagation()}
            dir="rtl"
          >
            <div className="shrink-0 text-right">
              <h2 className="text-3xl font-black text-text">افزودن آیتم جدید</h2>
              <p className="mt-3 text-sm leading-7 text-slate-500">
                محصول مورد نظر را جستجو کرده و تعداد و قیمت آن را مشخص کنید.
              </p>
            </div>

            <div className="mt-6 min-h-0 flex-1 overflow-y-auto sm:mt-8 sm:pr-1">
              <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px]" dir="ltr">
                <div className="space-y-5">
                  <div className="rounded-[20px] border border-sky-100 bg-sky-50/80 p-4">
                    {selectedProduct ? (
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-[18px] border border-sky-200 bg-white text-lg font-black text-sky-700 shadow-sm">
                          {selectedProduct.thumbnailLabel}
                        </div>
                        <div className="min-w-0 flex-1 text-right">
                          <p className="text-2xl font-black leading-8 text-sky-900">{selectedProduct.title}</p>
                          <p className="mt-2 text-sm font-semibold text-sky-600">کد کالا: {selectedProduct.sku}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex min-h-24 items-center justify-center rounded-[18px] border border-dashed border-sky-200 bg-white/80 px-4 text-center text-sm font-medium text-slate-500">
                        یک محصول از لیست سمت راست انتخاب کنید.
                      </div>
                    )}
                  </div>

                  <div className="space-y-2 text-right">
                    <label htmlFor="unit-price" className="block text-base font-bold text-text">
                      قیمت واحد (تومان)
                    </label>
                    <input
                      id="unit-price"
                      type="number"
                      value={unitPrice}
                      onChange={(event) => setUnitPrice(event.target.value)}
                      className="h-14 w-full rounded-xl border border-slate-200 bg-white px-4 text-lg font-medium text-slate-700 outline-none transition-colors focus:border-primary"
                      dir="ltr"
                    />
                  </div>

                  <div className="space-y-2 text-right">
                    <label htmlFor="quantity" className="block text-base font-bold text-text">
                      تعداد
                    </label>
                    <input
                      id="quantity"
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(event) => setQuantity(event.target.value)}
                      className="h-14 w-full rounded-xl border border-slate-200 bg-white px-4 text-lg font-medium text-slate-700 outline-none transition-colors focus:border-primary"
                      dir="ltr"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2 text-right">
                    <label htmlFor="product-search" className="block text-base font-bold text-text">
                      جستجوی محصول
                    </label>
                    <div className="relative">
                      <input
                        id="product-search"
                        type="text"
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                        className="h-14 w-full rounded-xl border border-slate-200 bg-white pr-4 pl-11 text-base font-medium text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-primary"
                        placeholder="نام محصول را جستجو کنید"
                      />
                      <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    </div>
                    <p className="text-xs text-slate-400">برای نمایش نتایج، حداقل دو حرف وارد کنید.</p>
                  </div>

                  <div className="relative">
                    <select
                      value={supplier}
                      onChange={(event) => setSupplier(event.target.value as (typeof SUPPLIER_OPTIONS)[number])}
                      className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 outline-none transition-colors focus:border-primary"
                    >
                      {SUPPLIER_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <ChevronDownIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  </div>

                  <div className="max-h-[40vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white lg:max-h-82.5">
                    {filteredProducts.length > 0 ? (
                      <div className="divide-y divide-slate-100">
                        {filteredProducts.map((product) => {
                          const isSelected = product.id === selectedProductId;

                          return (
                            <button
                              key={product.id}
                              type="button"
                              onClick={() => handleSelectProduct(product)}
                              className={`flex w-full items-center justify-between gap-4 px-4 py-4 text-right transition-colors ${
                                isSelected ? "bg-sky-50/90" : "hover:bg-slate-50"
                              }`}
                            >
                              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-sm font-black text-slate-700 shadow-sm">
                                {product.thumbnailLabel}
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-lg font-black text-slate-800">{product.title}</p>
                                <p className="mt-1 text-xs font-semibold text-slate-400">SKU: {product.sku}</p>
                                <p className="mt-1 text-sm font-bold text-slate-700">{formatCurrency(product.price)}</p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="flex min-h-55 items-center justify-center px-6 text-center text-sm font-medium text-slate-400">
                        {searchTerm.trim().length < 2
                          ? "برای نمایش نتایج، حداقل دو حرف وارد کنید."
                          : "محصولی با این مشخصات پیدا نشد."}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex shrink-0 flex-wrap items-center justify-start gap-3 border-t border-slate-100 pt-4 sm:mt-8">
              <button
                type="button"
                onClick={closeModal}
                className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              >
                انصراف
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                disabled={isConfirmDisabled}
                className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-6 text-sm font-semibold text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-primary/50"
              >
                افزودن آیتم
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
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

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

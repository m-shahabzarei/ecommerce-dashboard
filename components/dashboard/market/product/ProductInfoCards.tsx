interface ProductInfoCardsProps {
  price: number;
  inventory: number;
  shippingCost: number;
}

function formatNumber(value: number): string {
  return value.toLocaleString("fa-IR");
}

export function ProductInfoCards({ price, inventory, shippingCost }: ProductInfoCardsProps) {
  const items = [
    { label: "قیمت", value: `${formatNumber(price)} تومان`, accent: true },
    { label: "موجودی", value: formatNumber(inventory) },
    { label: "هزینه ارسال", value: `${formatNumber(shippingCost)} تومان` },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {items.map((item) => (
        <div
          key={item.label}
          className="flex flex-col items-center rounded-xl bg-white p-4 shadow-sm"
        >
          <span className="text-xs text-muted">{item.label}</span>
          <span
            className={`mt-1 text-sm font-bold md:text-base ${
              item.accent ? "text-primary" : "text-text"
            }`}
          >
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );
}

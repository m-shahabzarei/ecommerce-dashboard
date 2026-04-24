interface ProductDescriptionProps {
  description: string;
}

export function ProductDescription({ description }: ProductDescriptionProps) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm md:p-6">
      <h3 className="text-base font-bold text-text">توضیحات</h3>
      <p className="mt-3 text-sm leading-7 text-muted">{description}</p>
    </div>
  );
}

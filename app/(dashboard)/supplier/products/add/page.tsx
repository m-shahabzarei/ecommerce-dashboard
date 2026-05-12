"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { createProduct, type ProductAttribute } from "@/lib/services/products";
import { DetailsCard } from "@/components/dashboard/products/add/DetailsCard";
import { ImagesCard } from "@/components/dashboard/products/add/ImagesCard";
import { PricingCard } from "@/components/dashboard/products/add/PricingCard";
import {
  AttributesCard,
  REQUIRED_PRODUCT_ATTRIBUTES,
} from "@/components/dashboard/products/add/AttributesCard";

const PRODUCT_DRAFT_STORAGE_KEY = "kalabama-add-product-draft";

interface ProductDraft {
  title: string;
  description: string;
  category: string;
  price: string;
  inventory: string;
  discount: string;
  attributes: ProductAttribute[];
}

const getDefaultAttributes = () =>
  REQUIRED_PRODUCT_ATTRIBUTES.map((name) => ({ name, value: "" }));

const normalizeAttributes = (attributes?: ProductAttribute[]) => {
  const safeAttributes = Array.isArray(attributes)
    ? attributes.filter(
        (attribute) =>
          typeof attribute?.name === "string" &&
          typeof attribute?.value === "string"
      )
    : [];

  const requiredAttributes = REQUIRED_PRODUCT_ATTRIBUTES.map((name) => ({
    name,
    value: safeAttributes.find((attribute) => attribute.name === name)?.value ?? "",
  }));

  const customAttributes = safeAttributes.filter(
    (attribute) =>
      !REQUIRED_PRODUCT_ATTRIBUTES.includes(
        attribute.name as (typeof REQUIRED_PRODUCT_ATTRIBUTES)[number]
      )
  );

  return [...requiredAttributes, ...customAttributes];
};

export default function AddProductPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [inventory, setInventory] = useState("");
  const [discount, setDiscount] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [attributes, setAttributes] = useState<ProductAttribute[]>(
    getDefaultAttributes
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isDraftSaved, setIsDraftSaved] = useState(false);

  const isValid =
    title.trim() !== "" &&
    price.trim() !== "" &&
    inventory.trim() !== "" &&
    Number(price) >= 0 &&
    Number(inventory) >= 0;

  useEffect(() => {
    try {
      const savedDraft = window.localStorage.getItem(PRODUCT_DRAFT_STORAGE_KEY);
      if (!savedDraft) return;

      const draft = JSON.parse(savedDraft) as Partial<ProductDraft>;
      setTitle(draft.title ?? "");
      setDescription(draft.description ?? "");
      setCategory(draft.category ?? "");
      setPrice(draft.price ?? "");
      setInventory(draft.inventory ?? "");
      setDiscount(draft.discount ?? "");
      setAttributes(normalizeAttributes(draft.attributes));
    } catch {
      window.localStorage.removeItem(PRODUCT_DRAFT_STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    if (!isDraftSaved) return;

    const timeoutId = window.setTimeout(() => {
      setIsDraftSaved(false);
    }, 2000);

    return () => window.clearTimeout(timeoutId);
  }, [isDraftSaved]);

  const handleSaveDraft = useCallback(() => {
    const draft: ProductDraft = {
      title,
      description,
      category,
      price,
      inventory,
      discount,
      attributes,
    };

    window.localStorage.setItem(
      PRODUCT_DRAFT_STORAGE_KEY,
      JSON.stringify(draft)
    );
    setIsDraftSaved(true);
  }, [
    title,
    description,
    category,
    price,
    inventory,
    discount,
    attributes,
  ]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!isValid) return;

      const payload = {
        title,
        description,
        category: category || undefined,
        price: Number(price),
        inventory: Number(inventory),
        discount: discount ? Number(discount) : undefined,
        attributes,
        images,
      };

      setIsLoading(true);
      try {
        await createProduct(payload);
        window.localStorage.removeItem(PRODUCT_DRAFT_STORAGE_KEY);
        console.log(payload);
        router.push("/supplier/products");
      } finally {
        setIsLoading(false);
      }
    },
    [
      title,
      description,
      category,
      price,
      inventory,
      discount,
      attributes,
      images,
      isValid,
      router,
    ]
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">افزودن محصول دستی</h1>
        <p className="mt-1 text-sm text-muted">
          اطلاعات محصول جدید را وارد کنید
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <DetailsCard
            title={title}
            description={description}
            category={category}
            onTitleChange={setTitle}
            onDescriptionChange={setDescription}
            onCategoryChange={setCategory}
          />
          <ImagesCard images={images} onImagesChange={setImages} />
          <PricingCard
            price={price}
            inventory={inventory}
            discount={discount}
            onPriceChange={setPrice}
            onInventoryChange={setInventory}
            onDiscountChange={setDiscount}
          />
          <AttributesCard
            attributes={attributes}
            onAttributesChange={setAttributes}
          />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={handleSaveDraft}
            disabled={isLoading}
            className={cn(
              "rounded-xl border border-gray-300 bg-white px-6 py-2 text-sm font-medium text-text",
              "transition-colors hover:border-primary hover:text-primary",
              "disabled:cursor-not-allowed disabled:opacity-50"
            )}
          >
            {isDraftSaved ? "پیش‌نویس ذخیره شد" : "ذخیره پیش‌نویس"}
          </button>
          <button
            type="submit"
            disabled={!isValid || isLoading}
            className={cn(
              "rounded-xl bg-primary px-8 py-2 text-sm font-medium text-white",
              "transition-colors hover:bg-[#1352e0]",
              "disabled:cursor-not-allowed disabled:opacity-50"
            )}
          >
            {isLoading ? (
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              "انتشار"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

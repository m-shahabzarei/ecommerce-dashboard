export interface ProductAttribute {
  name: string;
  value: string;
}

export interface CreateProductPayload {
  title: string;
  description: string;
  category?: string;
  price: number;
  inventory: number;
  discount?: number;
  attributes: ProductAttribute[];
  images: File[];
}

export async function createProduct(
  payload: CreateProductPayload
): Promise<{ success: boolean; id: number }> {
  // TODO: replace with real API call
  // const formData = new FormData();
  // formData.append("title", payload.title);
  // ... append other fields and images
  // const res = await fetch('/api/products', { method: 'POST', body: formData });
  // return res.json();

  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("[API] Product created:", payload);
      resolve({ success: true, id: Math.floor(Math.random() * 100000) });
    }, 1200);
  });
}

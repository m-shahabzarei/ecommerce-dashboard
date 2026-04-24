export interface ShippingCostPayload {
  baseCost: number;
  perKgCost: number;
}

export async function updateShippingCost(
  payload: ShippingCostPayload
): Promise<{ success: boolean }> {
  // TODO: replace with real API call
  // const res = await fetch('/api/shipping-cost', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(payload),
  // });
  // return res.json();

  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("[API] Shipping cost updated:", payload);
      resolve({ success: true });
    }, 800);
  });
}

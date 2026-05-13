export interface UserProfile {
  firstName: string;
  lastName: string;
  nationalId: string;
  iban: string;
  city: string;
  county: string;
  image: File | null;
}

export interface StoreProfile {
  name: string;
  url: string;
  image: File | null;
}

export async function updateUserProfile(
  data: UserProfile
): Promise<{ success: boolean }> {
  // TODO: replace with real API call
  // const res = await fetch('/api/profile', {
  //   method: 'PUT',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(data),
  // });
  // return res.json();

  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("[API] User profile updated:", data);
      resolve({ success: true });
    }, 800);
  });
}

export async function updateStoreProfile(
  data: StoreProfile
): Promise<{ success: boolean }> {
  // TODO: replace with real API call
  // const formData = new FormData();
  // formData.append("name", data.name);
  // formData.append("url", data.url);
  // if (data.image) formData.append("image", data.image);
  // const res = await fetch('/api/store', { method: 'PUT', body: formData });
  // return res.json();

  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("[API] Store profile updated:", data);
      resolve({ success: true });
    }, 800);
  });
}

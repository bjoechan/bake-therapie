const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/api";

async function request(path, options) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!response.ok) {
    const problem = await response.json().catch(() => null);
    const message = problem?.errors
      ? Object.values(problem.errors).flat().join(" ")
      : (problem?.title ?? `Request failed with status ${response.status}`);
    throw new Error(message);
  }

  return response.status === 204 ? null : response.json();
}

export function fetchProducts() {
  return request("/products");
}

export function createOrder(payload) {
  return request("/orders", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// Matches backend/BakeTherapie.Api/Models/Enums/FulfillmentType.cs ordinal values —
// System.Text.Json serializes enums as their underlying int by default.
export const FulfillmentType = {
  Pickup: 0,
  Delivery: 1,
};

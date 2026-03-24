import { apiRequest } from "./apiClient";
import type { OrderDraft } from "../types/models";

export interface OrderResult {
  orderId: string | number;
  status: string;
}

export interface IOrderService {
  submitOrder(draft: OrderDraft): Promise<OrderResult>;
}

class ApiOrderService implements IOrderService {
  async submitOrder(draft: OrderDraft): Promise<OrderResult> {
    // WIRE-UP: POST ${VITE_API_BASE_URL}/api/orders — backend creates Printful order, returns { orderId, status }
    return apiRequest<OrderResult>("/api/orders", {
      method: "POST",
      body: JSON.stringify(draft),
    });
  }
}

// Mock implementation used until the backend is live.
class MockOrderService implements IOrderService {
  async submitOrder(_draft: OrderDraft): Promise<OrderResult> {
    // Simulate network latency.
    await new Promise((resolve) => setTimeout(resolve, 1200));
    return {
      orderId: `MOCK-${Date.now()}`,
      status: "pending",
    };
  }
}

export const orderService: IOrderService =
  import.meta.env.VITE_USE_MOCK_ORDER === "false"
    ? new ApiOrderService()
    : new MockOrderService();

// src/lib/api.ts
import axiosInstance from "./axios";

// Types
export interface CheckoutItem {
  name: string;
  price: number;
  quantity: number;
  image?: string; // ✅ Optional image
}

export interface User {
  id: string;
  email: string;
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface OrderDetails {
  id: string;
  amount: number;
  currency: string;
  email: string;
  status: string;
  paymentMethod?: string;
  createdAt: string;
  items?: OrderItem[]; // ✅ Optional items array
  stripeCheckoutSession?: string;
  stripePaymentIntentId?: string;
  esewaRefId?: string;
  khaltiToken?: string;
  connectipsTransId?: string;
}

// API Functions
export const api = {
  // Checkout
  createCheckoutSession: async (items: CheckoutItem[], user: User, paymentMethod?: string) => {
    const { data } = await axiosInstance.post<{ url: string; orderId?: string; paymentMethod?: string }>("/api/checkout", {
      items,
      user,
      paymentMethod,
    });
    return data;
  },

  // Verify Payment
  verifyPayment: async (sessionId: string) => {
    const { data } = await axiosInstance.post<{ order: OrderDetails }>(
      "/api/verify-payment",
      { sessionId }
    );
    return data;
  },

  // Get Orders
  getOrders: async (userId?: string, email?: string) => {
    const params = new URLSearchParams();
    if (userId) params.append("userId", userId);
    if (email) params.append("email", email);
    
    const { data } = await axiosInstance.get<{ orders: OrderDetails[] }>(
      `/api/orders?${params.toString()}`
    );
    return data;
  },

  // Get Order by ID
  getOrderById: async (orderId: string) => {
    const { data } = await axiosInstance.get<{ order: OrderDetails }>(
      `/api/orders/${orderId}`
    );
    return data;
  },
};

// Export default
export default api;
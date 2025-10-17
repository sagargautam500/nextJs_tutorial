// src/components/PaymentMethodSelector.tsx
"use client";

import { useState } from "react";
import api from "@/lib/api";
import type { CheckoutItem, User } from "@/lib/api";
import { Loader2, CreditCard, Smartphone, Building2, Lock, CheckCircle } from "lucide-react";

interface PaymentMethodSelectorProps {
  items: CheckoutItem[];
  user: User;
}

type PaymentMethod = "card" | "esewa" | "khalti" | "connectips";

export default function PaymentMethodSelector({
  items,
  user,
}: PaymentMethodSelectorProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("card");

  const paymentMethods = [
    {
      id: "card" as PaymentMethod,
      name: "Card",
      description: "Visa, Mastercard",
      icon: CreditCard,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      hoverColor: "hover:border-blue-400",
      selectedBg: "bg-blue-100",
      selectedBorder: "border-blue-500",
    },
    {
      id: "esewa" as PaymentMethod,
      name: "eSewa",
      description: "Digital wallet",
      icon: Smartphone,
      iconColor: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      hoverColor: "hover:border-green-400",
      selectedBg: "bg-green-100",
      selectedBorder: "border-green-500",
    },
    {
      id: "khalti" as PaymentMethod,
      name: "Khalti",
      description: "Digital wallet",
      icon: Smartphone,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      hoverColor: "hover:border-purple-400",
      selectedBg: "bg-purple-100",
      selectedBorder: "border-purple-500",
    },
    {
      id: "connectips" as PaymentMethod,
      name: "ConnectIPS",
      description: "Bank transfer",
      icon: Building2,
      iconColor: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      hoverColor: "hover:border-orange-400",
      selectedBg: "bg-orange-100",
      selectedBorder: "border-orange-500",
    },
  ];

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await api.createCheckoutSession(items, user, selectedMethod);

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No payment URL received");
      }
    } catch (err: unknown) {
      console.error("Checkout error:", err);
      const errorResponse = err as { response?: { data?: { error?: string } } };
      setError(errorResponse.response?.data?.error || "Failed to create checkout session");
      setLoading(false);
    }
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const selectedMethodName = paymentMethods.find((m) => m.id === selectedMethod)?.name;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Payment Method Selection */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Payment Method
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            const isSelected = selectedMethod === method.id;
            
            return (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                disabled={loading}
                className={`
                  relative p-4 border-2 rounded-xl transition-all
                  ${isSelected 
                    ? `${method.selectedBg} ${method.selectedBorder}` 
                    : `${method.bgColor} ${method.borderColor} ${method.hoverColor}`
                  }
                  ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:shadow-md"}
                  flex flex-col items-center justify-center gap-2 h-28
                `}
              >
                {/* Selected Indicator */}
                {isSelected && (
                  <div className="absolute top-2 right-2">
                    <CheckCircle className="w-5 h-5 text-green-600 fill-green-100" />
                  </div>
                )}

                {/* Icon */}
                <Icon className={`w-8 h-8 ${method.iconColor}`} />

                {/* Method Name */}
                <div className="text-center">
                  <p className="font-semibold text-gray-900 text-sm">
                    {method.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {method.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Order Summary
        </h3>
        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-gray-700">
                {item.name} <span className="text-gray-500">× {item.quantity}</span>
              </span>
              <span className="font-semibold text-gray-900">
                NPR {(item.price * item.quantity).toLocaleString()}
              </span>
            </div>
          ))}
          
          <div className="border-t border-gray-200 pt-3 mt-3">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-gray-900">Total</span>
              <span className="text-2xl font-bold text-green-600">
                NPR {total.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-sm text-red-800 font-medium">{error}</p>
        </div>
      )}

      {/* Checkout Button */}
      <button
        onClick={handleCheckout}
        disabled={loading || items.length === 0}
        className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-4 rounded-xl disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3 font-bold text-lg shadow-lg hover:shadow-xl"
      >
        {loading ? (
          <>
            <Loader2 className="w-6 h-6 animate-spin" />
            <span>Processing...</span>
          </>
        ) : (
          <>
            <Lock className="w-5 h-5" />
            <span>Pay with {selectedMethodName}</span>
          </>
        )}
      </button>

      {/* Security Badge */}
      <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
        <Lock className="w-4 h-4" />
        <span>Secured by 256-bit SSL encryption</span>
      </div>
    </div>
  );
}
// src/app/payment/connectips/page.tsx
"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";
import { AlertCircle, Building2, CheckCircle } from "lucide-react";
import Link from "next/link";

function ConnectIPSPaymentContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("orderId");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState<{ id: string; amount: number; currency: string; email: string; status: string } | null>(null);
  const [demoMode, setDemoMode] = useState(false);

  useEffect(() => {
    if (!orderId) {
      setError("Order ID not found");
      setLoading(false);
      return;
    }

    const initiateConnectIPSPayment = async () => {
      try {
        // Fetch order details
        const { data: orderData } = await axiosInstance.get(
          `/api/orders/${orderId}`
        );
        const order = orderData.order;
        setOrderDetails(order);

        // Check if we're in demo mode (no real credentials)
        const merchantId = process.env.NEXT_PUBLIC_CONNECTIPS_MERCHANT_ID;
        
        if (!merchantId || merchantId === "123456" || merchantId === "your_merchant_id") {
          console.log("ConnectIPS Demo Mode - No real credentials found");
          setDemoMode(true);
          setLoading(false);
          return;
        }

        // Real ConnectIPS integration (when you have credentials)
        const { data: tokenData } = await axiosInstance.post(
          "/api/payment/connectips/token",
          {
            orderId,
            amount: order.amount,
          }
        );

        const connectIPSConfig = {
          MERCHANTID: process.env.NEXT_PUBLIC_CONNECTIPS_MERCHANT_ID,
          APPID: process.env.NEXT_PUBLIC_CONNECTIPS_APP_ID,
          APPNAME: process.env.NEXT_PUBLIC_CONNECTIPS_APP_NAME || "YourApp",
          TXNID: orderId,
          TXNDATE: new Date().toISOString().split("T")[0].replace(/-/g, ""),
          TXNCRNCY: "NPR",
          TXNAMT: (order.amount * 100).toString(),
          REFERENCEID: orderId,
          REMARKS: `Payment for Order ${orderId}`,
          PARTICULARS: "Order Payment",
          TOKEN: tokenData.token,
          SUCCESSURL: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/connectips/success`,
          FAILUREURL: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/connectips/failure?orderId=${orderId}`,
        };

        const form = document.createElement("form");
        form.method = "POST";
        form.action =
          process.env.NEXT_PUBLIC_CONNECTIPS_URL ||
          "https://uat.connectips.com/connectipswebgw/loginpage";

        Object.entries(connectIPSConfig).forEach(([key, value]) => {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = String(value);
          form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
      } catch (err: unknown) {
        console.error("ConnectIPS payment error:", err);
        const errorResponse = err as { response?: { data?: { error?: string } } };
        setError(
          errorResponse.response?.data?.error || "Failed to initiate ConnectIPS payment"
        );
        setLoading(false);
      }
    };

    initiateConnectIPSPayment();
  }, [orderId]);

  // Handle demo payment simulation
  const handleDemoPayment = async (success: boolean) => {
    setLoading(true);
    try {
      if (success) {
        // Simulate successful payment
        await axiosInstance.post("/api/payment/connectips/verify-demo", {
          orderId,
          status: "success",
        });
        router.push(`/payment/connectips/success?orderId=${orderId}&demo=true`);
      } else {
        // Simulate failed payment
        router.push(`/payment/connectips/failure?orderId=${orderId}`);
      }
    } catch {
      // Error handling is done above
      setError("Demo payment failed");
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <AlertCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2 text-gray-900">
            Payment Error
          </h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            href="/cart"
            className="inline-block bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition"
          >
            Back to Cart
          </Link>
        </div>
      </div>
    );
  }

  // Demo Mode UI
  if (demoMode && !loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-amber-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full">
          {/* Demo Badge */}
          <div className="bg-yellow-100 border-2 border-yellow-400 rounded-xl p-4 mb-6">
            <p className="text-sm text-yellow-800 font-semibold text-center">
              🧪 ConnectIPS Demo Mode
            </p>
            <p className="text-xs text-yellow-700 text-center mt-1">
              Real ConnectIPS requires bank credentials
            </p>
          </div>

          {/* Bank Logo */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Building2 className="w-10 h-10 text-white" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-center mb-2 text-gray-900">
            ConnectIPS Payment Simulator
          </h1>
          <p className="text-center text-gray-600 mb-6">
            Test the payment flow without real bank integration
          </p>

          {/* Order Details */}
          {orderDetails && (
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Order ID:</span>
                <span className="font-mono text-sm font-semibold">
                  #{orderId?.slice(-8).toUpperCase()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Amount:</span>
                <span className="text-2xl font-bold text-orange-600">
                  NPR {orderDetails.amount.toLocaleString()}
                </span>
              </div>
            </div>
          )}

          {/* Demo Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <p className="text-sm text-blue-800 mb-2">
              <strong>📝 Demo Instructions:</strong>
            </p>
            <ul className="text-xs text-blue-700 space-y-1 list-disc list-inside">
              <li>Choose to simulate success or failure</li>
              <li>No real payment will be processed</li>
              <li>Order status will be updated accordingly</li>
              <li>Use this for development and testing</li>
            </ul>
          </div>

          {/* Simulate Payment Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => handleDemoPayment(true)}
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-4 rounded-xl hover:from-green-600 hover:to-green-700 transition font-bold shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <CheckCircle className="w-5 h-5" />
              Simulate Successful Payment
            </button>

            <button
              onClick={() => handleDemoPayment(false)}
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-4 rounded-xl hover:from-red-600 hover:to-red-700 transition font-bold shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <AlertCircle className="w-5 h-5" />
              Simulate Failed Payment
            </button>

            <Link
              href="/cart"
              className="block w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-200 transition text-center font-medium border border-gray-300"
            >
              Cancel
            </Link>
          </div>

          {/* Production Notice */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              <strong>For Production:</strong> Contact your bank to get ConnectIPS merchant credentials
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Loading state (real ConnectIPS redirect)
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-amber-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full text-center">
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg animate-bounce">
            <Building2 className="w-10 h-10 text-white" />
          </div>
        </div>

        <div className="mb-6">
          <div className="relative w-16 h-16 mx-auto">
            <div className="absolute inset-0 border-4 border-orange-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-orange-500 border-r-orange-500 rounded-full animate-spin"></div>
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-3 text-gray-900">
          <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Redirecting to ConnectIPS
          </span>
        </h1>

        <p className="text-gray-600 text-lg mb-6">
          Please wait while we redirect you to your bank
          <span className="inline-block ml-1">
            <span className="animate-bounce" style={{ animationDelay: "0ms" }}>
              .
            </span>
            <span className="animate-bounce" style={{ animationDelay: "150ms" }}>
              .
            </span>
            <span className="animate-bounce" style={{ animationDelay: "300ms" }}>
              .
            </span>
          </span>
        </p>

        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
          <span>Secure payment processing</span>
        </div>
      </div>
    </div>
  );
}

export default function ConnectIPSPaymentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading...</p>
        </div>
      </div>
    }>
      <ConnectIPSPaymentContent />
    </Suspense>
  );
}
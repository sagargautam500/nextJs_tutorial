// app/auth/signup/page.tsx
"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";

// Import components
import AlertMessage from "@/components/auth/AlertMessage";
import SignupForm from "@/components/auth/SignupForm";
import SignupHeader from "@/components/auth/SignupHeader";
import SocialLogin from "@/components/auth/SocialLogin";
import { SignupFormData, signupSchema } from "@/lib/zod";


export default function SignupPage() {
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" }>({ text: "", type: "error" });

  const router = useRouter();

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onChange"
  });

  const { watch , } = form;

  const email = watch("email");
  const phone = watch("phone");

  // Show message helper
  const showMessage = (text: string, type: "success" | "error" = "error") => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "error" }), 5000);
  };

  // Verification success handlers
  const handleEmailVerificationSuccess = () => {
    setIsEmailVerified(true);
  };

  const handlePhoneVerificationSuccess = () => {
    setIsPhoneVerified(true);
  };

  // Handle form submission
  const onSubmit = async (data: SignupFormData) => {
    if (!isEmailVerified || !isPhoneVerified) {
      showMessage("Please verify both email and phone before signing up!");
      return;
    }

    try {
      setLoading(true);
      await axios.post("/api/auth/signup", {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        password: data.password,
        confirmPassword: data.confirmPassword,
        role: "user",
      });
      
      showMessage("Account created successfully! Welcome aboard!", "success");
      setTimeout(() => router.push("/auth/signin"), 1000);
    } catch (err: any) {
      showMessage(err.response?.data?.error || "Signup failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <SignupHeader />

        <div className="bg-white py-8 px-6 shadow rounded-lg">
          {/* Alert Messages */}
          <AlertMessage message={message} />

          {/* Signup Form */}
          <SignupForm
            form={form}
            onSubmit={onSubmit}
            loading={loading}
            isEmailVerified={isEmailVerified}
            isPhoneVerified={isPhoneVerified}
            onEmailVerificationSuccess={handleEmailVerificationSuccess}
            onPhoneVerificationSuccess={handlePhoneVerificationSuccess}
            onShowMessage={showMessage}
            email={email}
            phone={phone}
          />
          {/* Social Login */}
          <SocialLogin />
        </div>
      </div>
    </div>
  );
}
// app/auth/signin/page.tsx
"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// Import components
import AlertMessage from "@/components/auth/AlertMessage";
import SigninForm from "@/components/auth/SigninForm";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import SocialLogin from "@/components/auth/SocialLogin";
import PageHeader from "@/components/auth/PageHeader";
import { ForgotPasswordFormData, forgotPasswordSchema, SigninFormData, signinSchema } from "@/lib/zod";
import { handleCredentialsSignIn } from "@/app/actions/authAction";


export default function SigninPage() {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" }>({ text: "", type: "error" });

  const router = useRouter();

  // Sign in form
  const signinForm = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema),
    mode: "onChange"
  });

  // Forgot password form
  const forgotPasswordForm = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onChange"
  });

  // Show message helper
  const showMessage = (text: string, type: "success" | "error" = "error") => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "error" }), 5000);
  };
 

  // Handle sign in
  const onSignin = async (data: SigninFormData) => {
    try {
      setLoading(true);
     await handleCredentialsSignIn(data.email.trim(), data.password);
    } catch (error) {
      showMessage((error as Error).message, "error");
    } finally {
      setLoading(false);
    }
  };

  // Handle forgot password
  const onForgotPassword = async (data: ForgotPasswordFormData) => {
    try {
      setLoading(true);
      
      const response = await axios.post("/api/auth/forgot-password", {
        email: data.email.trim(),
      });

      showMessage("Password reset link sent to your email!", "success");
      
      // Reset form and go back to sign in
      forgotPasswordForm.reset();
      setTimeout(() => setShowForgotPassword(false), 2000);
      
    } catch (err: any) {
      showMessage(err.response?.data?.error || "Failed to send reset email!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <PageHeader 
          showForgotPassword={showForgotPassword}
          onBackToSignin={() => setShowForgotPassword(false)}
        />

        <div className="bg-white py-8 px-6 shadow rounded-lg">
          {/* Alert Messages */}
          <AlertMessage message={message} />

          {/* Forms */}
          {!showForgotPassword ? (
            <SigninForm
              form={signinForm}
              onSubmit={onSignin}
              loading={loading}
              onForgotPassword={() => setShowForgotPassword(true)}
            />
          ) : (
            <ForgotPasswordForm
              form={forgotPasswordForm}
              onSubmit={onForgotPassword}
              loading={loading}
            />
          )}

          {/* Social Login */}
          <SocialLogin />
        </div>
      </div>
    </div>
  );
}
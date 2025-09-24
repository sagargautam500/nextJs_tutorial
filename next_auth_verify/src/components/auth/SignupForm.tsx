import React from "react";
import { UseFormReturn } from "react-hook-form";
import EmailVerification from "./EmailVerification";
import PhoneVerification from "./PhoneVerification";
import PasswordInput from "./PasswordInput";

interface SignupFormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

interface SignupFormProps {
  form: UseFormReturn<SignupFormData>;
  onSubmit: (data: SignupFormData) => void;
  loading: boolean;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  onEmailVerificationSuccess: () => void;
  onPhoneVerificationSuccess: () => void;
  onShowMessage: (text: string, type: "success" | "error") => void;
  email: string;
  phone: string;
}

export default function SignupForm({ 
  form, 
  onSubmit, 
  loading, 
  isEmailVerified, 
  isPhoneVerified,
  onEmailVerificationSuccess,
  onPhoneVerificationSuccess,
  onShowMessage,
  email,
  phone
}: SignupFormProps) {
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      {/* Full Name */}
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          {...form.register("fullName")}
          type="text"
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter your full name"
        />
        {form.formState.errors.fullName && (
          <p className="mt-1 text-sm text-red-600">{form.formState.errors.fullName.message}</p>
        )}
      </div>

      {/* Email Verification */}
      <EmailVerification
        register={form.register("email")}
        error={form.formState.errors.email}
        email={email}
        isVerified={isEmailVerified}
        onVerificationSuccess={onEmailVerificationSuccess}
        onShowMessage={onShowMessage}
      />

      {/* Phone Verification */}
      <PhoneVerification
        register={form.register("phone")}
        error={form.formState.errors.phone}
        phone={phone}
        isVerified={isPhoneVerified}
        onVerificationSuccess={onPhoneVerificationSuccess}
        onShowMessage={onShowMessage}
      />

      {/* Password */}
      <PasswordInput
        register={form.register("password")}
        error={form.formState.errors.password}
        placeholder="Create a password"
        autoComplete="new-password"
      />

      {/* Confirm Password */}
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
          Confirm Password
        </label>
        <input
          {...form.register("confirmPassword")}
          type="password"
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Confirm your password"
        />
        {form.formState.errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-600">{form.formState.errors.confirmPassword.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={loading || !isEmailVerified || !isPhoneVerified || !form.formState.isValid}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="flex items-center">
              <div className="animate-spin -ml-1 mr-3 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
              Creating account...
            </div>
          ) : (
            'Create Account'
          )}
        </button>
      </div>
    </form>
  );
}

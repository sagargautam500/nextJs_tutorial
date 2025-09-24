import React, { useState } from "react";
import { UseFormRegisterReturn, FieldError } from "react-hook-form";
import axios from "axios";

interface PhoneVerificationProps {
  register: UseFormRegisterReturn;
  error?: FieldError;
  phone: string;
  isVerified: boolean;
  onVerificationSuccess: () => void;
  onShowMessage: (text: string, type: "success" | "error") => void;
}

export default function PhoneVerification({ 
  register, 
  error, 
  phone, 
  isVerified, 
  onVerificationSuccess,
  onShowMessage 
}: PhoneVerificationProps) {
  const [phoneCode, setPhoneCode] = useState("");
  const [loading, setLoading] = useState(false);

  const sendPhoneVerification = async () => {
    if (!phone) {
      onShowMessage("Please enter your phone number", "error");
      return;
    }
    
    try {
      setLoading(true);
      const res = await axios.post("/api/auth/send-phone-code", { phone });
      const data = res.data as { message: string };
      onShowMessage(data.message, "success");
    } catch (err: any) {
      onShowMessage(err.response?.data?.error || "Phone verification failed!", "error");
    } finally {
      setLoading(false);
    }
  };

  const verifyPhoneCode = async () => {
    if (!phoneCode.trim()) {
      onShowMessage("Please enter the phone verification code", "error");
      return;
    }
    
    try {
      const res = await axios.post("/api/auth/verify-phone-code", {
        phone: phone.trim(),
        code: phoneCode.trim(),
      });
      
      const data = res.data as { success: boolean };
      if (data.success) {
        onVerificationSuccess();
        onShowMessage("Phone verified successfully!", "success");
      } else {
        onShowMessage("Invalid phone verification code", "error");
      }
    } catch (err: any) {
      onShowMessage(err.response?.data?.error || "Phone code verification failed!", "error" );
    }
  };

  return (
    <div>
      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
        Phone Number
      </label>
      <input
        {...register}
        type="text"
        disabled={isVerified}
        className={`mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
          isVerified ? 'bg-gray-100' : ''
        }`}
        placeholder="Enter your phone number"
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error.message}</p>
      )}
      
      {isVerified ? (
        <div className="mt-2 flex items-center text-green-600 text-sm">
          <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Phone verified successfully
        </div>
      ) : (
        <div className="mt-2 space-y-2">
          <button
            type="button"
            onClick={sendPhoneVerification}
            disabled={loading || !phone}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send Phone Code'}
          </button>
          <div className="flex space-x-2">
            <input
              type="text"
              value={phoneCode}
              onChange={(e) => setPhoneCode(e.target.value)}
              placeholder="Enter code"
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            <button
              type="button"
              onClick={verifyPhoneCode}
              disabled={!phoneCode.trim()}
              className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
            >
              Verify
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

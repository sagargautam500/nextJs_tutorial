// app/auth/signup/page.tsx
"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneCode, setPhoneCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [phoneLoading, setPhoneLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();
  
  // Clear messages after 5 seconds
  const showMessage = (message: string, isSuccess: boolean = false) => {
    if (isSuccess) {
      setSuccess(message);
      setError("");
      setTimeout(() => setSuccess(""), 5000);
    } else {
      setError(message);
      setSuccess("");
      setTimeout(() => setError(""), 5000);
    }
  };

  // Send email verification code
  const sendEmailVerification = async () => {
    if (!email) {
      showMessage("Please enter your email address");
      return;
    }
    
    try {
      setEmailLoading(true);
      const res = await axios.post("/api/auth/send-email-code", { email });
      const data = res.data as { message: string };
      showMessage(data.message, true);
    } catch (err: any) {
      showMessage(err.response?.data?.error || "Email verification failed!");
    } finally {
      setEmailLoading(false);
    }
  };
  
  // Verify email code
  const verifyEmailCode = async () => {
    if (!emailCode) {
      showMessage("Please enter the email verification code");
      return;
    }
    
    try {
      const res = await axios.post("/api/auth/verify-email-code", {
        email,
        code: emailCode,
      });
      const data = res.data as { success: boolean };
      if (data.success) {
        setIsEmailVerified(true);
        showMessage("Email verified successfully!", true);
      } else {
        showMessage("Invalid email verification code");
      }
    } catch (err: any) {
      showMessage(err.response?.data?.error || "Email code verification failed!");
    }
  };

  // Send phone verification code
  const sendPhoneVerification = async () => {
    if (!phone) {
      showMessage("Please enter your phone number");
      return;
    }
    
    try {
      setPhoneLoading(true);
      const res = await axios.post("/api/auth/send-phone-code", { phone });
      const data = res.data as { message: string };
      showMessage(data.message, true);
    } catch (err: any) {
      showMessage(err.response?.data?.error || "Phone verification failed!");
    } finally {
      setPhoneLoading(false);
    }
  };
  
  // Verify phone code
  const verifyPhoneCode = async () => {
    if (!phoneCode) {
      showMessage("Please enter the phone verification code");
      return;
    }
    
    try {
      const res = await axios.post("/api/auth/verify-phone-code", {
        phone,
        code: phoneCode,
      });
      const data = res.data as { success: boolean };
      if (data.success) {
        setIsPhoneVerified(true);
        showMessage("Phone verified successfully!", true);
      } else {
        showMessage("Invalid phone verification code");
      }
    } catch (err: any) {
      showMessage(err.response?.data?.error || "Phone code verification failed!");
    }
  };

  // Signup final submit
  const handleSignup = async () => {
    if (!fullName || !email || !phone || !password || !confirmPassword) {
      showMessage("Please fill in all fields");
      return;
    }

    if (!isEmailVerified || !isPhoneVerified) {
      showMessage("Please verify both email and phone before signing up!");
      return;
    }

    if (password !== confirmPassword) {
      showMessage("Passwords do not match!");
      return;
    }

    if (password.length < 6) {
      showMessage("Password must be at least 6 characters long");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("/api/auth/signup", {
        fullName,
        email,
        phone,
        password,
      });
      showMessage("Account created successfully! Welcome aboard!", true);
      router.push("/auth/signin");
    } catch (err: any) {
      showMessage(err.response?.data?.error || "Signup failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="w-full max-w-lg bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border border-white/20 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Create Account
          </h2>
          <p className="text-gray-600 text-sm">Join us and start your journey today</p>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="text-red-700 text-sm font-medium">{error}</span>
            </div>
          </div>
        )}

        {success && (
          <div className="mb-4 p-4 bg-green-50 border-l-4 border-green-500 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-green-700 text-sm font-medium">{success}</span>
            </div>
          </div>
        )}

        {/* Full Name */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Enter your full name"
              className="border border-gray-300 rounded-xl w-full p-4 pl-12 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition duration-200 bg-gray-50/50"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>

        {/* Email Section */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
          <div className="relative">
            <input
              type="email"
              placeholder="Enter your email"
              className={`border border-gray-300 rounded-xl w-full p-4 pl-12 mb-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition duration-200 ${
                isEmailVerified ? 'bg-green-50 border-green-300' : 'bg-gray-50/50'
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isEmailVerified}
            />
            <svg className="w-5 h-5 text-gray-400 absolute left-4 top-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
            </svg>
            {isEmailVerified && (
              <svg className="w-5 h-5 text-green-500 absolute right-4 top-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            )}
          </div>

          {!isEmailVerified && (
            <div className="space-y-3">
              <button
                onClick={sendEmailVerification}
                disabled={emailLoading}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-3 rounded-xl transition duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
              >
                {emailLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Sending Code...
                  </div>
                ) : (
                  'Send Email Verification Code'
                )}
              </button>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter verification code"
                  className="border border-gray-300 rounded-xl flex-1 p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition duration-200 bg-gray-50/50"
                  value={emailCode}
                  onChange={(e) => setEmailCode(e.target.value)}
                />
                <button
                  onClick={verifyEmailCode}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl transition duration-200 transform hover:scale-105 font-medium shadow-lg"
                >
                  Verify
                </button>
              </div>
            </div>
          )}
          {isEmailVerified && (
            <div className="flex items-center text-green-600 font-medium">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Email Verified Successfully
            </div>
          )}
        </div>

        {/* Phone Section */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Enter your phone number"
              className={`border border-gray-300 rounded-xl w-full p-4 pl-12 mb-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition duration-200 ${
                isPhoneVerified ? 'bg-green-50 border-green-300' : 'bg-gray-50/50'
              }`}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={isPhoneVerified}
            />
            <svg className="w-5 h-5 text-gray-400 absolute left-4 top-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {isPhoneVerified && (
              <svg className="w-5 h-5 text-green-500 absolute right-4 top-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            )}
          </div>

          {!isPhoneVerified && (
            <div className="space-y-3">
              <button
                onClick={sendPhoneVerification}
                disabled={phoneLoading}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-3 rounded-xl transition duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
              >
                {phoneLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Sending Code...
                  </div>
                ) : (
                  'Send Phone Verification Code'
                )}
              </button>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter verification code"
                  className="border border-gray-300 rounded-xl flex-1 p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition duration-200 bg-gray-50/50"
                  value={phoneCode}
                  onChange={(e) => setPhoneCode(e.target.value)}
                />
                <button
                  onClick={verifyPhoneCode}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl transition duration-200 transform hover:scale-105 font-medium shadow-lg"
                >
                  Verify
                </button>
              </div>
            </div>
          )}
          {isPhoneVerified && (
            <div className="flex items-center text-green-600 font-medium">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Phone Verified Successfully
            </div>
          )}
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <div className="relative">
            <input
              type="password"
              placeholder="Create a strong password"
              className="border border-gray-300 rounded-xl w-full p-4 pl-12 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition duration-200 bg-gray-50/50"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
          <div className="relative">
            <input
              type="password"
              placeholder="Confirm your password"
              className="border border-gray-300 rounded-xl w-full p-4 pl-12 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition duration-200 bg-gray-50/50"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
        </div>

        {/* Signup Button */}
        <button
          onClick={handleSignup}
          disabled={loading || !isEmailVerified || !isPhoneVerified}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 rounded-xl transition duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg text-lg"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Creating Account...
            </div>
          ) : (
            'Create Account'
          )}
        </button>

        {/* Footer */}
        <p className="text-center text-gray-600 text-sm mt-6">
          Already have an account?{' '}
          <a href="/auth/signin" className="text-purple-600 hover:text-purple-700 font-medium transition duration-200">
            Sign In
          </a>
        </p>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
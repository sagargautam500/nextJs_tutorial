// src/app/page.tsx
import Link from "next/link";
import {
  CreditCard,
  Smartphone,
  Building2,
  Shield,
  Zap,
  CheckCircle,
  ArrowRight,
  Globe,
  TrendingUp,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Multi-Payment Gateway
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Accept payments from customers worldwide with Stripe, or locally with
            eSewa, Khalti, and ConnectIPS. All in one platform.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/cart"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transition shadow-lg flex items-center gap-2"
            >
              Try Demo
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/help"
              className="bg-white text-gray-700 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition border-2 border-gray-200 flex items-center gap-2"
            >
              Documentation
            </Link>
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Supported Payment Methods
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Stripe */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition group">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-xl w-fit mb-4 group-hover:scale-110 transition">
                <CreditCard className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-xl mb-2">Stripe</h3>
              <p className="text-gray-600 text-sm mb-4">
                International card payments with Visa, Mastercard, and more
              </p>
              <div className="flex items-center text-blue-600 text-sm font-semibold">
                Global reach
                <Globe className="w-4 h-4 ml-1" />
              </div>
            </div>

            {/* eSewa */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition group">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-4 rounded-xl w-fit mb-4 group-hover:scale-110 transition">
                <Smartphone className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-xl mb-2">eSewa</h3>
              <p className="text-gray-600 text-sm mb-4">
                Nepal&apos;s most popular digital wallet with instant payments
              </p>
              <div className="flex items-center text-green-600 text-sm font-semibold">
                Most popular
                <TrendingUp className="w-4 h-4 ml-1" />
              </div>
            </div>

            {/* Khalti */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition group">
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-4 rounded-xl w-fit mb-4 group-hover:scale-110 transition">
                <Smartphone className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-xl mb-2">Khalti</h3>
              <p className="text-gray-600 text-sm mb-4">
                Digital wallet with e-banking and mobile banking support
              </p>
              <div className="flex items-center text-purple-600 text-sm font-semibold">
                E-banking ready
                <CheckCircle className="w-4 h-4 ml-1" />
              </div>
            </div>

            {/* ConnectIPS */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition group">
              <div className="bg-gradient-to-br from-orange-500 to-red-600 p-4 rounded-xl w-fit mb-4 group-hover:scale-110 transition">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-xl mb-2">ConnectIPS</h3>
              <p className="text-gray-600 text-sm mb-4">
                Direct bank transfer from all major Nepalese banks
              </p>
              <div className="flex items-center text-orange-600 text-sm font-semibold">
                Bank transfer
                <Building2 className="w-4 h-4 ml-1" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-br from-green-100 to-green-200 p-6 rounded-2xl w-fit mx-auto mb-4">
                <Shield className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="font-bold text-xl mb-2">Secure</h3>
              <p className="text-gray-600">
                Bank-level encryption and PCI DSS compliant payment processing
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-6 rounded-2xl w-fit mx-auto mb-4">
                <Zap className="w-12 h-12 text-blue-600" />
              </div>
              <h3 className="font-bold text-xl mb-2">Fast</h3>
              <p className="text-gray-600">
                Instant payment verification and real-time order updates
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-6 rounded-2xl w-fit mx-auto mb-4">
                <CheckCircle className="w-12 h-12 text-purple-600" />
              </div>
              <h3 className="font-bold text-xl mb-2">Reliable</h3>
              <p className="text-gray-600">
                99.9% uptime with comprehensive error handling and monitoring
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-white">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <h3 className="text-4xl font-bold mb-2">4</h3>
                <p className="text-blue-100">Payment Gateways</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold mb-2">100%</h3>
                <p className="text-blue-100">Secure</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold mb-2">24/7</h3>
                <p className="text-blue-100">Support</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold mb-2">5min</h3>
                <p className="text-blue-100">Setup Time</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Start accepting payments in minutes with our easy integration
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/help"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transition shadow-lg flex items-center gap-2"
            >
              View Documentation
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/cart"
              className="bg-white text-gray-700 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition border-2 border-gray-200"
            >
              Try Demo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
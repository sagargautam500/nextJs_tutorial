import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar"; // must have "use client" at top

export const metadata: Metadata = {
  title: "Modern Shop - Secure Online Payments",
  description: "Shop with confidence using our modern Stripe-powered payment gateway. Secure, fast, and reliable online shopping experience.",
  keywords: ["online shopping", "ecommerce", "stripe payments", "secure checkout"],
  authors: [{ name: "Modern Shop Team" }],
  openGraph: {
    title: "Modern Shop - Secure Online Payments",
    description: "Shop with confidence using our modern Stripe-powered payment gateway.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Keep body static; no dynamic classes */}
      <body className="antialiased">
        {/* Navbar is client component */}
        <Navbar />
        {children}
      </body>
    </html>
  );
}

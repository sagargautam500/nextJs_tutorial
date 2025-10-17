import type { Metadata } from "next";
import "./globals.css";



export const metadata: Metadata = {
  title: "Ecommerce Stripe Project",
  description: "This is a Ecommerce Stripe project created with Next.js and Stripe API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

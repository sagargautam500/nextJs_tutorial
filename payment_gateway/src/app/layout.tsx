import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/footer";
import Navbar from "@/components/Navbar";



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
      <body className="flex flex-col min-h-screen" >
        <Navbar/>
      <main className="flex-grow">{children} </main> 
        <Footer/>
      </body>
    </html>
  );
}

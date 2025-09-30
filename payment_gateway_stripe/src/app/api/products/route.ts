// app/api/products/route.ts (optional) -> return list of products with priceId from server
import { NextResponse } from "next/server";

export async function GET() {
  const products = [
    {
      id: "p1",
      title: "Blue Shoes",
      description: "Comfortable shoes.",
      priceId: process.env.PRICE_BLUE_SHOES, // define in env
      displayPrice: 29.99,
      images: ["https://..."],
      category: { id: "c1", name: "Shoes" },
    },
  ];
  return NextResponse.json(products);
}
// Note: In production, fetch products from your DB or Stripe API and include priceId
// Ensure priceId is from your allowed list to prevent arbitrary purchases
// You can also create Prices in Stripe Dashboard and use those IDs here
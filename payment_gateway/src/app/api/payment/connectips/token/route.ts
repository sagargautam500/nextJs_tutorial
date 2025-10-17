// src/app/api/payment/connectips/token/route.ts
import { NextResponse } from "next/server";
import crypto from "crypto";

// Helper to build XML payload
function buildXML(params: Record<string, string>) {
  return `
    <MESSAGE>
      <MERCHANTID>${params.MERCHANTID}</MERCHANTID>
      <APPID>${params.APPID}</APPID>
      <APPNAME>${params.APPNAME}</APPNAME>
      <TXNID>${params.TXNID}</TXNID>
      <TXNDATE>${params.TXNDATE}</TXNDATE>
      <TXNCRNCY>${params.TXNCRNCY}</TXNCRNCY>
      <TXNAMT>${params.TXNAMT}</TXNAMT>
      <REFERENCEID>${params.REFERENCEID}</REFERENCEID>
      <REMARKS>${params.REMARKS}</REMARKS>
      <PARTICULARS>${params.PARTICULARS}</PARTICULARS>
      <SUCCESSURL>${params.SUCCESSURL}</SUCCESSURL>
      <FAILUREURL>${params.FAILUREURL}</FAILUREURL>
    </MESSAGE>
  `.trim();
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      orderId,
      amount,
      remarks = "Order payment",
      particulars = "Online Payment",
    } = body;

    if (!orderId || !amount) {
      return NextResponse.json(
        { error: "Missing required fields: orderId or amount" },
        { status: 400 }
      );
    }

    // Transaction info
    const params = {
      MERCHANTID: process.env.CONNECTIPS_MERCHANT_ID!,
      APPID: process.env.CONNECTIPS_APP_ID!,
      APPNAME: process.env.CONNECTIPS_APP_NAME || "YourApp",
      TXNID: orderId,
      TXNDATE: new Date().toISOString().split("T")[0].replace(/-/g, ""),
      TXNCRNCY: "NPR",
      TXNAMT: (amount * 100).toString(), // amount in paisa
      REFERENCEID: orderId,
      REMARKS: remarks,
      PARTICULARS: particulars,
      SUCCESSURL: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/connectips/success?orderId=${orderId}`,
      FAILUREURL: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/connectips/failure?orderId=${orderId}`,
    };

    const xmlData = buildXML(params);

    // ✅ Load your private key (.pem)
    const privateKey = process.env.CONNECTIPS_PRIVATE_KEY?.replace(/\\n/g, "\n");
    if (!privateKey) {
      return NextResponse.json({ error: "Private key not configured" }, { status: 500 });
    }

    // ✅ Sign XML data
    const signer = crypto.createSign("RSA-SHA256");
    signer.update(xmlData);
    signer.end();
    const signature = signer.sign(privateKey, "base64");

    // Final token to send in frontend form
    const token = Buffer.from(signature).toString("base64");

    return NextResponse.json({ token });
  } catch (error: unknown) {
    console.error("ConnectIPS token generation failed:", error);
    return NextResponse.json(
      { error: "Failed to generate ConnectIPS token", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

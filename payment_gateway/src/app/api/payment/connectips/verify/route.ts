import { NextResponse } from "next/server";
import crypto from "crypto";
import axios from "axios";

// Helper: Build XML for verification
function buildVerificationXML(params: Record<string, string>) {
  return `
    <MESSAGE>
      <MERCHANTID>${params.MERCHANTID}</MERCHANTID>
      <APPID>${params.APPID}</APPID>
      <REFERENCEID>${params.REFERENCEID}</REFERENCEID>
      <TXNAMT>${params.TXNAMT}</TXNAMT>
      <TXNID>${params.TXNID}</TXNID>
    </MESSAGE>
  `.trim();
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { orderId, amount, txnId } = body;

    if (!orderId || !amount || !txnId) {
      return NextResponse.json(
        { error: "Missing required fields: orderId, amount, or txnId" },
        { status: 400 }
      );
    }

    // ✅ Prepare parameters
    const params = {
      MERCHANTID: process.env.CONNECTIPS_MERCHANT_ID!,
      APPID: process.env.CONNECTIPS_APP_ID!,
      REFERENCEID: orderId,
      TXNAMT: (amount * 100).toString(), // In paisa
      TXNID: txnId,
    };

    const xmlData = buildVerificationXML(params);

    // ✅ Load your private key (.pem)
    const privateKey = process.env.CONNECTIPS_PRIVATE_KEY?.replace(/\\n/g, "\n");
    if (!privateKey) {
      return NextResponse.json({ error: "Private key not configured" }, { status: 500 });
    }

    // ✅ Sign XML data to generate signature
    const signer = crypto.createSign("RSA-SHA256");
    signer.update(xmlData);
    signer.end();
    const signature = signer.sign(privateKey, "base64");

    // ✅ Create verification request payload
    const payload = {
      merchantId: params.MERCHANTID,
      appId: params.APPID,
      referenceId: params.REFERENCEID,
      txnAmt: params.TXNAMT,
      txnId: params.TXNID,
      token: signature,
    };

    // ✅ Send verification request to ConnectIPS
    const response = await axios.post(
      process.env.CONNECTIPS_VERIFY_URL || "https://connectips.com:7443/connectipswebws/api/creditor/validatetxn",
      payload,
      {
        headers: { "Content-Type": "application/json" },
        timeout: 10000,
      }
    );

    // ✅ Handle ConnectIPS response
    if (response.data.status === "SUCCESS") {
      return NextResponse.json({
        success: true,
        message: "Payment verified successfully",
        data: response.data,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Payment verification failed",
        data: response.data,
      });
    }
  } catch (error: unknown) {
    console.error("ConnectIPS verify error:", error);
    return NextResponse.json(
      { error: "ConnectIPS verification failed", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

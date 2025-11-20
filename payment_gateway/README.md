# 🛒 Next.js Ecommerce with Multi-Payment Gateway

A complete Next.js ecommerce application with **Stripe, eSewa, Khalti, and ConnectIPS** payment integrations for the Nepalese market.

---

## ✨ Features

- 💳 **Card Payments** - Stripe integration
- 🇳🇵 **Nepalese Payment Gateways** - eSewa, Khalti, ConnectIPS
- 🎨 **Modern UI** - Tailwind CSS, Responsive Design
- 🔒 **Secure** - Input validation, webhook verification
- 📦 **Order Management** - Track orders with item details
- 🚀 **Production Ready** - Full error handling

---
**local secert key generate and run locally**
stripe listen --forward-to localhost:3000/api/webhook

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── checkout/route.ts                    # Main checkout API
│   │   ├── orders/
│   │   │   ├── route.ts                        # Get all orders
│   │   │   └── [id]/route.ts                   # Get single order
│   │   ├── payment/
│   │   │   ├── esewa/
│   │   │   │   ├── signature/route.ts          # eSewa signature generator
│   │   │   │   └── verify/route.ts             # eSewa payment verification
│   │   │   ├── khalti/
│   │   │   │   ├── initiate/route.ts           # Khalti payment initiation
│   │   │   │   └── verify/route.ts             # Khalti payment verification
│   │   │   └── connectips/
│   │   │       └── verify-demo/route.ts        # ConnectIPS demo mode
│   │   ├── verify-payment/route.ts             # Stripe payment verification
│   │   └── webhook/route.ts                    # Stripe webhook handler
│   ├── payment/
│   │   ├── esewa/
│   │   │   ├── page.tsx                        # eSewa redirect page
│   │   │   ├── success/page.tsx                # eSewa success page
│   │   │   └── failure/page.tsx                # eSewa failure page
│   │   ├── khalti/
│   │   │   ├── page.tsx                        # Khalti redirect page
│   │   │   └── success/page.tsx                # Khalti success page
│   │   └── connectips/
│   │       ├── page.tsx                        # ConnectIPS demo page
│   │       └── success/page.tsx                # ConnectIPS success page
│   ├── orders/
│   │   ├── page.tsx                            # Orders list page
│   │   └── [id]/page.tsx                       # Order details page
│   ├── success/page.tsx                        # Payment success page
│   └── cancel/page.tsx                         # Payment cancelled page
├── components/
│   └── PaymentMethodSelector.tsx               # Payment method selector UI
├── lib/
│   ├── api.ts                                  # API utility functions
│   ├── axios.ts                                # Axios configuration
│   ├── prisma.ts                               # Prisma client
│   └── stripe.ts                               # Stripe client
└── prisma/
    └── schema.prisma                           # Database schema
```

---

## 🚀 Quick Start

### **1. Installation**

```bash
# Clone repository
git clone <your-repo-url>
cd ecommerce-stripe

# Install dependencies
npm install
```

### **2. Environment Variables**

Create `.env.local` in your project root and copy the appropriate configuration:

<details>
<summary><strong>📝 TESTING Environment (.env.local)</strong></summary>

```env
# ============================================
# TESTING ENVIRONMENT CONFIGURATION
# Use these for local development
# ============================================

# Database
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/database"

# App Base URL
NEXT_PUBLIC_BASE_URL="http://localhost:3000"

# ============================================
# STRIPE (Card Payments) - TEST MODE
# ============================================
STRIPE_SECRET_KEY="sk_test_51xxxxx"
STRIPE_WEBHOOK_SECRET="whsec_xxxxx"

# Get test keys from: https://dashboard.stripe.com/test/apikeys
# Webhook secret: Run `stripe listen --forward-to localhost:3000/api/webhook`

# ============================================
# ESEWA - TEST MODE
# ============================================
ESEWA_SECRET_KEY="8gBm/:&EnhH.1/q"
NEXT_PUBLIC_ESEWA_MERCHANT_CODE="EPAYTEST"
NEXT_PUBLIC_ESEWA_URL="https://uat.esewa.com.np/epay/main"
ESEWA_VERIFY_URL="https://uat.esewa.com.np/epay/transrec"
ESEWA_MERCHANT_CODE="EPAYTEST"

# Get test credentials from: https://developer.esewa.com.np

# ============================================
# KHALTI - TEST MODE
# ============================================
KHALTI_SECRET_KEY="test_secret_key_xxxxxxxxxxxxx"
NEXT_PUBLIC_KHALTI_PUBLIC_KEY="test_public_key_xxxxxxxxxxxxx"

# Get test keys from: https://test-admin.khalti.com

# ============================================
# CONNECTIPS - DEMO MODE (No Real Credentials)
# ============================================
NEXT_PUBLIC_CONNECTIPS_MERCHANT_ID="123456"
NEXT_PUBLIC_CONNECTIPS_APP_ID="APP_TEST_001"
NEXT_PUBLIC_CONNECTIPS_APP_NAME="MyTestApp"

# Note: ConnectIPS runs in demo mode for testing
# Real credentials require bank partnership
```

</details>

<details>
<summary><strong>🚀 PRODUCTION Environment</strong></summary>

```env
# ============================================
# PRODUCTION ENVIRONMENT CONFIGURATION
# Use these in Vercel/Production
# ============================================

# Database
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/database"

# App Base URL
NEXT_PUBLIC_BASE_URL="https://yourdomain.com"

# ============================================
# STRIPE (Card Payments) - LIVE MODE
# ============================================
STRIPE_SECRET_KEY="sk_live_51xxxxx"
STRIPE_WEBHOOK_SECRET="whsec_xxxxx"

# Get live keys from: https://dashboard.stripe.com/apikeys
# Update webhook endpoint in Stripe dashboard

# ============================================
# ESEWA - PRODUCTION
# ============================================
ESEWA_SECRET_KEY="your_production_secret_key"
NEXT_PUBLIC_ESEWA_MERCHANT_CODE="your_merchant_code"
NEXT_PUBLIC_ESEWA_URL="https://esewa.com.np/epay/main"
ESEWA_VERIFY_URL="https://esewa.com.np/epay/transrec"
ESEWA_MERCHANT_CODE="your_merchant_code"

# Apply for merchant account: https://esewa.com.np

# ============================================
# KHALTI - PRODUCTION
# ============================================
KHALTI_SECRET_KEY="live_secret_key_xxxxxxxxxxxxx"
NEXT_PUBLIC_KHALTI_PUBLIC_KEY="live_public_key_xxxxxxxxxxxxx"

# Get live keys from: https://admin.khalti.com

# ============================================
# CONNECTIPS - PRODUCTION
# ============================================
NEXT_PUBLIC_CONNECTIPS_MERCHANT_ID="your_merchant_id"
NEXT_PUBLIC_CONNECTIPS_APP_ID="your_app_id"
NEXT_PUBLIC_CONNECTIPS_APP_NAME="YourAppName"
NEXT_PUBLIC_CONNECTIPS_URL="https://payment.connectips.com:7443/connectipswebgw/loginpage"
CONNECTIPS_VERIFY_URL="https://connectips.com:7443/connectipswebws/api/creditor/validatetxn"

# Contact your bank for ConnectIPS credentials
```

</details>

### **3. Database Setup**

```bash
# Generate Prisma client
npx prisma generate

# Push schema to MongoDB
npx prisma db push
```

### **4. Run Development Server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🧪 Testing Payment Methods

### **💳 Stripe (Card Payments)**

**Test Cards:**
```
Card Number: 4242 4242 4242 4242
Expiry: Any future date (e.g., 12/34)
CVC: Any 3 digits (e.g., 123)
ZIP: Any 5 digits (e.g., 12345)
```

**More test cards:** https://stripe.com/docs/testing

---

### **🟢 eSewa (Digital Wallet)**

**Test Credentials:**
```
Mobile Number: 9806800001
Password: Nepal@123
MPIN: 1122
Token: 123456
```

**Test Environment:**
- Test URL: `https://uat.esewa.com.np/epay/main`
- Merchant Code: `EPAYTEST`
- Works with amounts up to NPR 100,000

**How to Test:**
1. Select "eSewa" as payment method
2. You'll be redirected to eSewa test page
3. Login with test credentials above
4. Complete payment
5. You'll be redirected back with payment confirmation

---

### **🟣 Khalti (Digital Wallet)**

**Test Credentials:**
```
Mobile Number: 9800000000
MPIN: 1111
OTP: 987654
```

**Test Environment:**
- Get test keys from: https://test-admin.khalti.com
- Login with any username, OTP: `987654`

**How to Test:**
1. Select "Khalti" as payment method
2. Khalti payment page opens
3. Enter test mobile number: `9800000000`
4. Enter MPIN: `1111`
5. Enter OTP: `987654`
6. Payment complete!

---

### **🟠 ConnectIPS (Bank Transfer)**

**Demo Mode:**
```
No real credentials needed for testing!
```

**How to Test:**
1. Select "ConnectIPS" as payment method
2. Demo simulator page appears
3. Click "Simulate Successful Payment" or "Simulate Failed Payment"
4. See the result instantly

**Production:**
- Requires bank partnership (NIC Asia, Everest Bank, NMB, etc.)
- Contact your bank for merchant credentials
- No public test environment available

---

## 📊 Database Schema

```prisma
model User {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  email     String   @unique
  name      String?
  orders    Order[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Order {
  id                     String      @id @default(auto()) @map("_id") @db.ObjectId
  userId                 String?     @db.ObjectId
  email                  String
  amount                 Int         // Amount in NPR
  currency               String      @default("npr")
  status                 String      @default("pending")
  paymentMethod          String?     @default("card")
  items                  OrderItem[] // Order items
  stripeCheckoutSession  String?     @unique
  stripePaymentIntentId  String?     @unique
  esewaRefId             String?     @unique
  khaltiToken            String?     @unique
  connectipsTransId      String?     @unique
  createdAt              DateTime    @default(now())
  updatedAt              DateTime    @updatedAt
}

model OrderItem {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  orderId   String   @db.ObjectId
  name      String   // Product name
  price     Int      // Price per unit
  quantity  Int      // Quantity
  image     String?  // Product image URL
  createdAt DateTime @default(now())
}
```

---

## 🔄 Payment Flow Comparison

| Payment Method | Redirect | Verification | Success Redirect |
|---------------|----------|--------------|------------------|
| **Stripe** | Stripe Checkout | Webhook | `/success` |
| **eSewa** | eSewa Website | Server-side API | `/payment/esewa/success` |
| **Khalti** | Khalti Page | Server-side API | `/payment/khalti/success` |
| **ConnectIPS** | Demo Simulator | Instant | `/payment/connectips/success` |

---

## 🔒 Security Features

- ✅ **Input Validation** - Zod schema validation
- ✅ **Webhook Verification** - Stripe signature validation
- ✅ **Server-side Verification** - All payments verified on backend
- ✅ **Environment Variables** - Secrets never exposed to frontend
- ✅ **Type Safety** - Full TypeScript implementation
- ✅ **Error Handling** - Comprehensive error management

---

## 🚀 Deployment (Vercel)

### **1. Push to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push
```

### **2. Deploy on Vercel**
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Add environment variables (use PRODUCTION config)
4. Deploy!

### **3. Important: Set Environment Variables**
- Go to Project Settings → Environment Variables
- Copy all variables from PRODUCTION config above
- Separate values for Production/Preview if needed

### **4. Webhook Configuration**

**For Stripe:**
1. Go to Stripe Dashboard → Webhooks
2. Add endpoint: `https://yourdomain.com/api/webhook`
3. Select events: `checkout.session.completed`, `payment_intent.succeeded`
4. Copy webhook secret to environment variables

---

## 📱 Features

### **Payment Method Selector**
- Clean, modern UI
- 4 payment options (Card, eSewa, Khalti, ConnectIPS)
- Visual selection indicators
- Mobile responsive

### **Order Management**
- View all orders
- Order details with item breakdown
- Payment status tracking
- Transaction IDs for all gateways

### **Success Pages**
- Beautiful confirmation pages
- Order details display
- Transaction information
- Action buttons (Continue Shopping, View Orders)

---

## 🐛 Troubleshooting

### **eSewa ES104 Error (Invalid Signature)**
- Check `ESEWA_SECRET_KEY` is correct
- Ensure no extra spaces in environment variables
- Restart dev server after changing env vars

### **Khalti Invalid Public Key**
- Use test keys from https://test-admin.khalti.com
- Format: `test_public_key_xxxxx` for test
- Don't use old Khalti Checkout SDK keys

### **Vercel Deployment Fails**
- Check TypeScript errors: `npm run build`
- Ensure all environment variables are set
- Check build logs in Vercel dashboard

### **Payment Not Redirecting**
- Verify `NEXT_PUBLIC_BASE_URL` is correct
- Check success/failure URLs in gateway dashboard
- Ensure HTTPS in production

---

## 📞 Support & Resources

### **Payment Gateway Support**

**eSewa:**
- 📧 Email: merchant@esewa.com.np
- 📞 Phone: 01-5970019
- 🌐 Developer Portal: https://developer.esewa.com.np

**Khalti:**
- 📧 Email: support@khalti.com
- 📞 Phone: 01-5970054
- 🌐 Developer Portal: https://docs.khalti.com

**Stripe:**
- 📧 Email: support@stripe.com
- 🌐 Documentation: https://stripe.com/docs

**ConnectIPS:**
- 📞 Contact your bank
- 🏦 Supported banks: NIC Asia, Everest Bank, NMB, Himalayan Bank

---

## ✅ Pre-Launch Checklist

**Before going to production:**

- [ ] Get production API keys for all payment methods
- [ ] Update all environment variables to production values
- [ ] Test all payment flows in staging
- [ ] Configure webhooks in Stripe dashboard
- [ ] Set up proper domain and HTTPS
- [ ] Add success/failure URLs to gateway dashboards
- [ ] Test mobile responsiveness
- [ ] Set up error monitoring (Sentry, etc.)
- [ ] Create backup of database
- [ ] Prepare customer support documentation

---

## 🎉 You're Ready!

Your multi-payment gateway ecommerce is now ready for testing and production!

**Testing:** Use the test credentials above  
**Production:** Replace with live API keys

For questions or issues, refer to individual payment gateway documentation or their support teams.

---

**Made with sagar for the Nepalese market**
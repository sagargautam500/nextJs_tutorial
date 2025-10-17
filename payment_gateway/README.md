# 🚀 Ecommerce Payment Integration - Complete Guide

A comprehensive Next.js ecommerce application with multiple payment gateway integrations including Stripe, eSewa, Khalti, and ConnectIPS for the Nepalese market.

## 📦 Features

- **Multiple Payment Methods**: Stripe (Card), eSewa, Khalti, ConnectIPS
- **Modern UI/UX**: Responsive design with Tailwind CSS
- **Type Safety**: Full TypeScript implementation
- **Database**: MongoDB with Prisma ORM
- **Security**: Input validation, webhook verification, environment variables
- **Production Ready**: Comprehensive error handling and validation

## 🗂️ Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── checkout/route.ts                    # Main checkout API
│   │   ├── orders/[id]/route.ts                 # Order details API
│   │   ├── payment/
│   │   │   ├── esewa/verify/route.ts           # eSewa verification
│   │   │   └── khalti/verify/route.ts          # Khalti verification
│   │   ├── verify-payment/route.ts             # Stripe verification
│   │   └── webhook/route.ts                    # Stripe webhook handler
│   ├── payment/
│   │   ├── esewa/
│   │   │   ├── page.tsx                        # eSewa redirect page
│   │   │   ├── success/page.tsx                # eSewa success handler
│   │   │   └── failure/page.tsx                # eSewa failure handler
│   │   ├── khalti/
│   │   │   ├── page.tsx                        # Khalti widget page
│   │   │   ├── success/page.tsx                # Khalti success page
│   │   │   └── failure/page.tsx                # Khalti failure page
│   │   └── connectips/
│   │       ├── page.tsx                        # ConnectIPS redirect
│   │       ├── success/page.tsx                # ConnectIPS success page
│   │       └── failure/page.tsx                # ConnectIPS failure page
│   ├── success/page.tsx                        # Main success page
│   ├── cancel/page.tsx                         # Payment cancellation
│   └── cart/page.tsx                           # Shopping cart
├── components/
│   └── PaymentMethodSelector.tsx               # Payment method selection UI
└── lib/
    ├── api.ts                                  # API utility functions
    ├── axios.ts                                # Axios configuration
    ├── prisma.ts                               # Database client
    └── stripe.ts                               # Stripe configuration
```

## 🚀 Quick Start

### 1. Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd ecommerce-stripe

# Install dependencies
npm install

# Install additional dependencies
npm install axios zod
```

### 2. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push
```

### 3. Environment Variables

Create a `.env.local` file in your project root:

```env
# Database
DATABASE_URL="mongodb+srv://your-connection-string"

# App URL
NEXT_PUBLIC_BASE_URL="http://localhost:3000"

# Stripe (Card Payments)
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# eSewa Configuration
NEXT_PUBLIC_ESEWA_MERCHANT_CODE="your_merchant_code"
NEXT_PUBLIC_ESEWA_URL="https://esewa.com.np/epay/main"
ESEWA_VERIFY_URL="https://esewa.com.np/epay/transrec"
ESEWA_MERCHANT_CODE="your_merchant_code"

# Note: eSewa uses the same URLs for both test and production
# The difference is in the merchant code and credentials

# Khalti Configuration
NEXT_PUBLIC_KHALTI_PUBLIC_KEY="your_khalti_public_key"
KHALTI_SECRET_KEY="your_khalti_secret_key"
KHALTI_VERIFY_URL="https://khalti.com/api/v2/payment/verify/"

# For Test Environment Khalti
# KHALTI_VERIFY_URL="https://uatservices.khalti.com/api/v2/payment/verify/"

# ConnectIPS Configuration
NEXT_PUBLIC_CONNECTIPS_MERCHANT_ID="your_merchant_id"
NEXT_PUBLIC_CONNECTIPS_APP_ID="your_app_id"
NEXT_PUBLIC_CONNECTIPS_APP_NAME="YourAppName"
NEXT_PUBLIC_CONNECTIPS_URL="https://connectips.com:7443/connectipswebgw/loginpage"

# Note: ConnectIPS uses the same URL for both test and production
# The difference is in the merchant credentials and encryption
```

### 4. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 🔐 Getting API Credentials

### **eSewa**

**Test Environment:**
1. Visit: https://developer.esewa.com.np
2. Register for merchant account
3. Get `Merchant Code` from dashboard
4. Use UAT URL for testing

**Production:**
1. Apply for merchant account at: https://esewa.com.np
2. Complete KYC verification
3. Get production merchant code
4. Switch to production URL

### **Khalti**

**Test Environment:**
1. Visit: https://khalti.com
2. Sign up for merchant account
3. Go to Settings → API Credentials
4. Copy Public Key and Secret Key
5. Use test keys for development

**Production:**
1. Complete merchant verification
2. Get live API keys
3. Replace test keys with live keys

### **ConnectIPS**

**Getting Started:**
1. Contact your bank for ConnectIPS integration
2. Fill out merchant application form
3. Get Merchant ID and App ID
4. Banks supporting ConnectIPS:
   - NIC Asia Bank
   - Everest Bank
   - NMB Bank
   - Himalayan Bank
   - And more...

**Test Environment:**
1. Use UAT credentials provided by bank
2. Test URL: `https://uat.connectips.com:7443/connectipswebgw/loginpage`

**Production:**
1. Get production credentials after testing
2. Switch to production URL

## 🧪 Testing Payment Gateways

### **Stripe Test Cards**
```
Card: 4242 4242 4242 4242
Exp: Any future date
CVC: Any 3 digits
ZIP: Any 5 digits
```

### **eSewa Test Credentials**
```
Test Mobile: 9806800001
Test Password:Nepal@123
Test MPIN: 1122
Token:123456
Test Amount: Any amount less than NPR 100,000

Note: eSewa test environment uses the same URL as production
The test credentials are provided by eSewa when you register for developer account
```

### **Khalti Test Credentials**
```
Test Mobile: 9800000000
Test MPIN:  1111
Test OTP: 987654
```

### **ConnectIPS Test Credentials**
```
Use credentials provided by your bank for UAT environment
Test URL: https://connectips.com:7443/connectipswebgw/loginpage
Note: ConnectIPS uses same URL for test and production
```

## 🔄 Payment Flow

### **Card Payment (Stripe)**
```
User clicks "Proceed to Card" 
  → Redirects to Stripe Checkout
  → User enters card details
  → Payment processed
  → Webhook updates order status
  → User redirected to /success
```

### **eSewa Payment**
```
User clicks "Proceed to eSewa"
  → Order created in DB
  → Redirects to /payment/esewa
  → Auto-submits form to eSewa
  → User completes payment on eSewa
  → eSewa redirects to /payment/esewa/success
  → Backend verifies with eSewa API
  → Order status updated
  → User redirected to /success
```

### **Khalti Payment**
```
User clicks "Proceed to Khalti"
  → Order created in DB
  → Redirects to /payment/khalti
  → Khalti widget opens
  → User completes payment
  → Frontend receives callback
  → Backend verifies with Khalti API
  → Order status updated
  → User redirected to /success
```

### **ConnectIPS Payment**
```
User clicks "Proceed to ConnectIPS"
  → Order created in DB
  → Redirects to /payment/connectips
  → Auto-submits form to ConnectIPS
  → User selects bank & logs in
  → Payment processed
  → ConnectIPS redirects to success/failure
  → Backend verifies payment
  → Order status updated
```

## 🎯 Usage Example

### **In Your Cart/Checkout Page:**

```tsx
// src/app/cart/page.tsx
import PaymentMethodSelector from "@/components/PaymentMethodSelector";

export default function CartPage() {
  // Your cart items
  const items = [
    { name: "Product 1", price: 1000, quantity: 2 },
    { name: "Product 2", price: 500, quantity: 1 },
  ];

  // Current user (from your auth system)
  const user = {
    id: "user_123",
    email: "user@example.com",
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      
      {/* Payment Method Selector */}
      <PaymentMethodSelector items={items} user={user} />
    </div>
  );
}
```

### **API Usage:**

```typescript
import api from "@/lib/api";

// Checkout
const data = await api.createCheckoutSession(items, user, "card");

// Verify payment
const order = await api.verifyPayment(sessionId);

// Get orders
const orders = await api.getOrders(userId);
```

## 🗄️ Database Schema

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
  id                     String   @id @default(auto()) @map("_id") @db.ObjectId
  user                   User?    @relation(fields: [userId], references: [id], onDelete: SetNull)
  userId                 String?  @db.ObjectId
  email                  String
  amount                 Int      // Amount in NPR (not paisa)
  currency               String   @default("npr")
  status                 String   @default("pending") // pending, paid, failed, expired, refunded
  paymentMethod          String?  @default("card") // card, esewa, khalti, connectips
  stripeCheckoutSession  String?  @unique
  stripePaymentIntentId  String?  @unique
  esewaRefId             String?  @unique
  khaltiToken            String?  @unique
  connectipsTransId      String?  @unique
  createdAt              DateTime @default(now())
  updatedAt              DateTime @updatedAt

  @@index([userId])
  @@index([email])
  @@index([status])
  @@index([paymentMethod])
  @@index([createdAt])
}
```

## 🔒 Security Features

- ✅ Input validation with Zod
- ✅ Stripe signature verification
- ✅ Server-side payment verification
- ✅ Environment variable checks
- ✅ Proper error handling
- ✅ Webhook signature validation
- ✅ API keys not exposed to frontend
- ✅ HTTPS required in production

## 🚀 Testing Stripe Webhooks Locally

```bash
# Install Stripe CLI
stripe listen --forward-to localhost:3000/api/webhook

# Get webhook secret and add to .env.local
STRIPE_WEBHOOK_SECRET="whsec_..."

# Test payment
stripe trigger checkout.session.completed
```

## 🐛 Common Issues & Solutions

### **Issue: Payment not redirecting**
- Check `NEXT_PUBLIC_BASE_URL` is set correctly
- Verify success/failure URLs are whitelisted in gateway dashboard

### **Issue: Verification failing**
- Ensure secret keys are correct
- Check API endpoint URLs (UAT vs Production)
- Verify webhook signatures

### **Issue: Order not updating**
- Check database connection
- Verify order ID is passed correctly
- Check API logs for errors

## 📱 Mobile Responsiveness

All payment pages are mobile-responsive:
- Payment method selector: 2-column on desktop, 1-column on mobile
- Payment forms: Full-width on mobile
- Success/failure pages: Centered and scrollable

## 🚀 Deployment

### **Vercel Deployment**
1. Go to Project Settings → Environment Variables
2. Add all environment variables
3. Separate variables for Production/Preview/Development
4. Redeploy after adding variables

### **Other Platforms**
- Set environment variables in platform dashboard
- Ensure all variables are set before deployment
- Test payment flows in staging before production

## ✅ Verification Checklist

- [ ] Database URL configured
- [ ] Stripe keys added (for card payments)
- [ ] eSewa merchant code obtained
- [ ] Khalti API keys configured
- [ ] ConnectIPS credentials set up
- [ ] Success/failure URLs configured
- [ ] Webhook endpoints secured
- [ ] Test payments working
- [ ] Production keys ready (when going live)

## 📞 Support Contacts

**eSewa:**
- Email: merchant@esewa.com.np
- Phone: 01-5970019

**Khalti:**
- Email: support@khalti.com
- Phone: 01-5970054

**ConnectIPS:**
- Contact your respective bank

## 🔄 Migration from Test to Production

1. Complete all test transactions
2. Get production credentials
3. Update environment variables
4. Test in staging environment
5. Deploy to production
6. Monitor first few transactions
7. Set up error alerts

## 📝 Best Practices Implemented

1. ✅ Type safety with TypeScript
2. ✅ Error handling at every level
3. ✅ Input validation
4. ✅ Idempotent webhooks
5. ✅ Database indexes
6. ✅ Clean code architecture
7. ✅ Production-ready error messages
8. ✅ Responsive UI
9. ✅ Loading states
10. ✅ Security best practices

## 🎨 UI Features

- Lucide React icons
- Tailwind CSS styling
- Responsive design
- Loading states
- Error boundaries
- Success animations

## 🔄 Order Status Flow

```
pending → paid ✅
       → failed ❌
       → expired ⏰
```

---

## ⭐ Next Steps

1. Create failure pages for all payment methods
2. Add payment timeout handling
3. Implement receipt download
4. Add order email notifications
5. Create admin dashboard for orders
6. Add refund functionality
7. Implement recurring payments (if needed)

---

**Ready for production! 🎉**

For any issues or questions, please refer to the individual payment gateway documentation or contact their respective support teams.
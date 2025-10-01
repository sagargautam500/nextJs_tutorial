# Modern Stripe Payment Gateway

A comprehensive, production-ready Stripe payment gateway built with Next.js 15, TypeScript, and modern best practices.

## Features

- ✅ **Modern Stripe Integration**: Latest Stripe API with secure checkout sessions
- ✅ **Type-Safe**: Full TypeScript support with proper type definitions
- ✅ **Database Integration**: MongoDB with Prisma ORM for order management
- ✅ **Webhook Handling**: Secure webhook processing for payment events
- ✅ **Responsive UI**: Beautiful, mobile-first design with Tailwind CSS
- ✅ **Error Handling**: Comprehensive error handling and validation
- ✅ **Security**: Environment variables, webhook signature verification
- ✅ **Production Ready**: Optimized for deployment with modern practices

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: MongoDB with Prisma ORM
- **Payments**: Stripe API
- **Icons**: Lucide React
- **HTTP Client**: Axios

## Getting Started

### 1. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="mongodb://localhost:27017/stripe_payment_gateway"

# Stripe Configuration
STRIPE_SECRET_KEY="sk_test_your_stripe_secret_key_here"
STRIPE_PUBLISHABLE_KEY="pk_test_your_stripe_publishable_key_here"
STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret_here"

# Application URLs
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 2. Stripe Setup

1. Create a [Stripe account](https://stripe.com)
2. Get your API keys from the [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
3. Create products and prices in Stripe Dashboard
4. Set up webhook endpoints for your local development

### 3. Database Setup

1. Install MongoDB locally or use MongoDB Atlas
2. Run Prisma migrations:

```bash
npx prisma generate
npx prisma db push
```

### 4. Install Dependencies

```bash
npm install
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── checkout/route.ts    # Stripe checkout session creation
│   │   └── webhook/route.ts     # Stripe webhook handling
│   ├── products/page.tsx        # Products listing page
│   ├── success/page.tsx         # Payment success page
│   ├── cancel/page.tsx          # Payment cancellation page
│   └── contact/page.tsx         # Contact page
├── components/
│   ├── ProductCard.tsx          # Individual product card
│   ├── ProductClient.tsx        # Products client component
│   ├── Navbar.tsx              # Navigation component
│   └── Sidebar.tsx             # Filter sidebar
├── lib/
│   ├── prisma.ts               # Prisma client configuration
│   └── stripe.ts               # Stripe client configuration
└── types/
    └── product.ts              # TypeScript type definitions
```

## Key Features Explained

### 1. Secure Checkout Flow
- Creates Stripe checkout sessions with proper validation
- Handles customer information collection
- Supports automatic tax calculation
- Implements session expiration

### 2. Webhook Processing
- Verifies webhook signatures for security
- Handles multiple event types (completed, expired, failed)
- Prevents duplicate order creation
- Comprehensive error logging

### 3. Database Integration
- MongoDB with Prisma ORM for type safety
- Order and order item management
- Product and category relationships
- Automatic timestamps

### 4. Modern UI/UX
- Responsive design with Tailwind CSS
- Loading states and error handling
- Beautiful success/cancel pages
- Intuitive product filtering

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Environment Variables for Production

```env
DATABASE_URL="your_production_mongodb_url"
STRIPE_SECRET_KEY="sk_live_your_live_stripe_secret_key"
STRIPE_PUBLISHABLE_KEY="pk_live_your_live_stripe_publishable_key"
STRIPE_WEBHOOK_SECRET="whsec_your_production_webhook_secret"
NEXT_PUBLIC_APP_URL="https://yourdomain.com"
```

## Stripe Webhook Setup

1. In Stripe Dashboard, go to Webhooks
2. Add endpoint: `https://yourdomain.com/api/webhook`
3. Select events:
   - `checkout.session.completed`
   - `checkout.session.expired`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
4. Copy the webhook secret to your environment variables

## Testing

### Test Cards (Stripe Test Mode)
- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **Requires Authentication**: `4000 0025 0000 3155`

## Security Considerations

- ✅ Webhook signature verification
- ✅ Environment variable protection
- ✅ Input validation and sanitization
- ✅ Rate limiting considerations
- ✅ HTTPS enforcement in production
- ✅ Database connection security

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email support@example.com or create an issue in the repository.

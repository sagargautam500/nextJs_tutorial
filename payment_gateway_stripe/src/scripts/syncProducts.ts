// scripts/syncProducts.ts
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

interface SyncResult {
  success: number;
  failed: number;
  skipped: number;
  errors: string[];
}

async function syncProducts(): Promise<SyncResult> {
  const result: SyncResult = {
    success: 0,
    failed: 0,
    skipped: 0,
    errors: []
  };

  try {
    console.log("🔄 Starting product sync with Stripe...");
    
    const products = await prisma.product.findMany({
      include: { category: true }
    });

    console.log(`📦 Found ${products.length} products to process`);

    for (const product of products) {
      try {
        // Skip if already synced
        if (product.priceId && product.stripeProductId) {
          console.log(`✅ Already synced: ${product.title} (${product.priceId})`);
          result.skipped++;
          continue;
        }

        console.log(`🔄 Syncing: ${product.title}...`);

        // Create product in Stripe with enhanced metadata
        const stripeProduct = await stripe.products.create({
          name: product.title,
          description: product.description,
          images: product.images.length > 0 ? product.images : undefined,
          metadata: {
            category: product.category?.name || "Uncategorized",
            categorySlug: product.category?.slug || "uncategorized",
            productSlug: product.slug,
            dbId: product.id
          },
          // Enable tax behavior
          tax_code: "txcd_99999999", // General merchandise
        });

        // Create price in Stripe
        const stripePrice = await stripe.prices.create({
          unit_amount: product.price * 100, // Stripe expects cents
          currency: "usd",
          product: stripeProduct.id,
          metadata: {
            originalPrice: product.price.toString(),
            displayPrice: (product.displayPrice || product.price).toString(),
          },
          // Enable automatic tax calculation
          tax_behavior: "inclusive"
        });

        // Update database with Stripe IDs
        await prisma.product.update({
          where: { id: product.id },
          data: {
            priceId: stripePrice.id,
            stripeProductId: stripeProduct.id,
            displayPrice: product.displayPrice || product.price,
          },
        });

        console.log(`✅ Synced: ${product.title} → Product: ${stripeProduct.id}, Price: ${stripePrice.id}`);
        result.success++;

      } catch (error) {
        const errorMsg = `Failed to sync ${product.title}: ${error instanceof Error ? error.message : 'Unknown error'}`;
        console.error(`❌ ${errorMsg}`);
        result.errors.push(errorMsg);
        result.failed++;
      }
    }

    return result;

  } catch (error) {
    const errorMsg = `Critical error during sync: ${error instanceof Error ? error.message : 'Unknown error'}`;
    console.error(`💥 ${errorMsg}`);
    result.errors.push(errorMsg);
    return result;
  }
}

// Enhanced main execution with better logging
async function main() {
  console.log("🚀 Starting Stripe Product Sync");
  console.log("=====================================");
  
  const startTime = Date.now();
  const result = await syncProducts();
  const duration = Date.now() - startTime;

  console.log("\n📊 Sync Results:");
  console.log("==================");
  console.log(`✅ Successfully synced: ${result.success}`);
  console.log(`⏭️  Skipped (already synced): ${result.skipped}`);
  console.log(`❌ Failed: ${result.failed}`);
  console.log(`⏱️  Duration: ${duration}ms`);

  if (result.errors.length > 0) {
    console.log("\n❌ Errors encountered:");
    result.errors.forEach((error, index) => {
      console.log(`${index + 1}. ${error}`);
    });
  }

  if (result.failed === 0) {
    console.log("\n🎉 All products synced successfully!");
  } else {
    console.log(`\n⚠️  ${result.failed} products failed to sync. Check errors above.`);
  }
}

// Run the sync
main()
  .catch((error) => {
    console.error("💥 Fatal error:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log("🔌 Database connection closed");
  });

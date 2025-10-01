// scripts/fixCategories.ts
import { prisma } from "@/lib/prisma";

async function fixCategories() {
  try {
    console.log("🔍 Checking for products without categories...");

    // Find products without categories
    const productsWithoutCategories = await prisma.product.findMany({
      where: {
        categoryId: {
          equals: undefined,
        },
      },
    });

    console.log(`📦 Found ${productsWithoutCategories.length} products without categories`);

    if (productsWithoutCategories.length === 0) {
      console.log("✅ All products have categories!");
      return;
    }

    // Create a default "Uncategorized" category
    const defaultCategory = await prisma.category.upsert({
      where: { slug: "uncategorized" },
      update: {},
      create: {
        name: "Uncategorized",
        slug: "uncategorized",
        image: null,
      },
    });

    console.log(`📁 Created/found default category: ${defaultCategory.name}`);

    // Update all products without categories to use the default category
    const updateResult = await prisma.product.updateMany({
      where: {
        categoryId: undefined,
      },
      data: {
        categoryId: defaultCategory.id,
      },
    });

    console.log(`✅ Updated ${updateResult.count} products to use default category`);

    // Verify the fix
    const remainingProductsWithoutCategories = await prisma.product.count({
      where: {
        categoryId: undefined,
      },
    });

    if (remainingProductsWithoutCategories === 0) {
      console.log("🎉 All products now have categories!");
    } else {
      console.log(`⚠️  ${remainingProductsWithoutCategories} products still without categories`);
    }

  } catch (error) {
    console.error("❌ Error fixing categories:", error);
    throw error;
  }
}

// Run the fix
fixCategories()
  .then(() => {
    console.log("✅ Category fix completed successfully");
  })
  .catch((error) => {
    console.error("💥 Fatal error:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log("🔌 Database connection closed");
  });

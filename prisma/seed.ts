import { PrismaClient, Prisma } from "@prisma/client";
import fs from "fs/promises";
import path from "path";

const prisma = new PrismaClient();

// npx prisma db seed

async function main() {
  const file = path.resolve(__dirname, "./products.json");
  const raw = await fs.readFile(file, "utf-8");
  const items: Prisma.ProductCreateManyInput[] = JSON.parse(raw);

  // clear existing rows to avoid duplicates
  await prisma.product.deleteMany();

  // Bulk-insert everything in a single query
  await prisma.product.createMany({
    data: items,
    skipDuplicates: true, // make the script idempotent
  });

  console.log(`✅  Seeded ${items.length} products`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { sql } from "drizzle-orm";
import {
  pgTable,
  varchar,
  timestamp,
  text,
  integer,
  index,
  uniqueIndex,
  foreignKey,
  boolean,
  doublePrecision,
  pgEnum,
} from "drizzle-orm/pg-core";

// npx drizzle-kit generate 1st step
// npx drizzle-kit migrate 2nd step

export const paymentStatus = pgEnum("PaymentStatus", [
  "PENDING",
  "COMPLETED",
  "FAILED",
]);

export const prismaMigrations = pgTable("_prisma_migrations", {
  id: varchar({ length: 36 }).primaryKey().notNull(),
  checksum: varchar({ length: 64 }).notNull(),
  finishedAt: timestamp("finished_at", { withTimezone: true, mode: "string" }),
  migrationName: varchar("migration_name", { length: 255 }).notNull(),
  logs: text(),
  rolledBackAt: timestamp("rolled_back_at", {
    withTimezone: true,
    mode: "string",
  }),
  startedAt: timestamp("started_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  appliedStepsCount: integer("applied_steps_count").default(0).notNull(),
});

export const review = pgTable(
  "Review",
  {
    id: text().primaryKey().notNull(),
    clerkId: text().notNull(),
    rating: integer().notNull(),
    comment: text().notNull(),
    authorName: text().notNull(),
    authorImageUrl: text().notNull(),
    createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp({ withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdateFn(() => new Date()),
    productId: text().notNull(),
  },
  (table) => [
    index("Review_clerkId_createdAt_idx").using(
      "btree",
      table.clerkId.asc().nullsLast().op("text_ops"),
      table.createdAt.asc().nullsLast().op("timestamp_ops")
    ),
    index("Review_createdAt_idx").using(
      "btree",
      table.createdAt.asc().nullsLast().op("timestamp_ops")
    ),
    uniqueIndex("Review_productId_clerkId_key").using(
      "btree",
      table.productId.asc().nullsLast().op("text_ops"),
      table.clerkId.asc().nullsLast().op("text_ops")
    ),
    index("Review_productId_createdAt_idx").using(
      "btree",
      table.productId.asc().nullsLast().op("timestamp_ops"),
      table.createdAt.asc().nullsLast().op("timestamp_ops")
    ),
    foreignKey({
      columns: [table.productId],
      foreignColumns: [product.id],
      name: "Review_productId_fkey",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
  ]
);

export const orderItem = pgTable(
  "OrderItem",
  {
    id: text().primaryKey().notNull(),
    productId: text().notNull(),
    orderId: text().notNull(),
    quantity: integer().notNull(),
    price: integer().notNull(),
  },
  (table) => [
    index("OrderItem_productId_orderId_idx").using(
      "btree",
      table.productId.asc().nullsLast().op("text_ops"),
      table.orderId.asc().nullsLast().op("text_ops")
    ),
    foreignKey({
      columns: [table.orderId],
      foreignColumns: [order.id],
      name: "OrderItem_orderId_fkey",
    })
      .onUpdate("cascade")
      .onDelete("restrict"),
    foreignKey({
      columns: [table.productId],
      foreignColumns: [product.id],
      name: "OrderItem_productId_fkey",
    })
      .onUpdate("cascade")
      .onDelete("restrict"),
  ]
);

export const order = pgTable(
  "Order",
  {
    id: text().primaryKey().notNull(),
    clerkId: text().notNull(),
    products: integer().default(0).notNull(),
    orderTotal: integer().default(0).notNull(),
    shipping: integer().default(0).notNull(),
    tax: integer().default(0).notNull(),
    email: text().notNull(),
    razorpayOrderId: text(),
    razorpayPaymentId: text(),
    paymentStatus: paymentStatus().default("PENDING").notNull(),
    isPaid: boolean().default(false).notNull(),
    createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp({ withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdateFn(() => new Date()),
  },
  (table) => [
    index("Order_clerkId_isPaid_idx").using(
      "btree",
      table.clerkId.asc().nullsLast().op("text_ops"),
      table.isPaid.asc().nullsLast().op("text_ops")
    ),
    index("Order_createdAt_idx").using(
      "btree",
      table.createdAt.asc().nullsLast().op("timestamp_ops")
    ),
    index("Order_razorpayOrderId_idx").using(
      "btree",
      table.razorpayOrderId.asc().nullsLast().op("text_ops")
    ),
    uniqueIndex("Order_razorpayOrderId_key").using(
      "btree",
      table.razorpayOrderId.asc().nullsLast().op("text_ops")
    ),
  ]
);

export const favorite = pgTable(
  "Favorite",
  {
    id: text().primaryKey().notNull(),
    clerkId: text().notNull(),
    productId: text().notNull(),
    createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp({ withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdateFn(() => new Date()),
  },
  (table) => [
    index("Favorite_clerkId_productId_idx").using(
      "btree",
      table.clerkId.asc().nullsLast().op("text_ops"),
      table.productId.asc().nullsLast().op("text_ops")
    ),
    index("Favorite_createdAt_idx").using(
      "btree",
      table.createdAt.asc().nullsLast().op("timestamp_ops")
    ),
    index("Favorite_productId_idx").using(
      "btree",
      table.productId.asc().nullsLast().op("text_ops")
    ),
    foreignKey({
      columns: [table.productId],
      foreignColumns: [product.id],
      name: "Favorite_productId_fkey",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
  ]
);

export const cart = pgTable(
  "Cart",
  {
    id: text().primaryKey().notNull(),
    clerkId: text().notNull(),
    numItemsInCart: integer().default(0).notNull(),
    cartTotal: integer().default(0).notNull(),
    shipping: integer().default(5).notNull(),
    tax: integer().default(0).notNull(),
    taxRate: doublePrecision().default(0.1).notNull(),
    orderTotal: integer().default(0).notNull(),
    createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp({ withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdateFn(() => new Date()),
  },
  (table) => [
    index("Cart_clerkId_idx").using(
      "btree",
      table.clerkId.asc().nullsLast().op("text_ops")
    ),
    index("Cart_updatedAt_idx").using(
      "btree",
      table.updatedAt.asc().nullsLast().op("timestamp_ops")
    ),
  ]
);

export const cartItem = pgTable(
  "CartItem",
  {
    id: text().primaryKey().notNull(),
    productId: text().notNull(),
    cartId: text().notNull(),
    amount: integer().notNull(),
    createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp({ withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdateFn(() => new Date()),
    color: text(),
    size: text(),
  },
  (table) => [
    index("CartItem_cartId_idx").using(
      "btree",
      table.cartId.asc().nullsLast().op("text_ops")
    ),
    uniqueIndex("CartItem_cartId_productId_color_size_key").using(
      "btree",
      table.cartId.asc().nullsLast().op("text_ops"),
      table.productId.asc().nullsLast().op("text_ops"),
      table.color.asc().nullsLast().op("text_ops"),
      table.size.asc().nullsLast().op("text_ops")
    ),
    index("CartItem_productId_idx").using(
      "btree",
      table.productId.asc().nullsLast().op("text_ops")
    ),
    index("CartItem_updatedAt_idx").using(
      "btree",
      table.updatedAt.asc().nullsLast().op("timestamp_ops")
    ),
    foreignKey({
      columns: [table.cartId],
      foreignColumns: [cart.id],
      name: "CartItem_cartId_fkey",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
    foreignKey({
      columns: [table.productId],
      foreignColumns: [product.id],
      name: "CartItem_productId_fkey",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
  ]
);

export const product = pgTable(
  "Product",
  {
    id: text("id").primaryKey().notNull(),
    name: text("name").notNull(),
    price: integer("price").notNull(),
    image: text("image").notNull(),
    featured: boolean("featured").notNull(),
    description: text("description").notNull(),
    type: text("type").notNull(),
    category: text("category").array(),
    createdAt: timestamp("createdAt", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updatedAt", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdateFn(() => new Date()),
    clerkId: text("clerkId").notNull(),
    colors: text("colors").array().default(["RAY"]),
    sizes: text("sizes").array().default(["RAY"]),
  },
  (table) => [
    index("Product_createdAt_idx").on(table.createdAt),
    index("Product_featured_idx").on(table.featured),
    index("Product_type_idx").on(table.type),
    // GIN Indexes for Array Filtering (Fast Category/Color/Size lookup)
    index("Product_category_gin_idx").using("gin", table.category),
    index("Product_colors_gin_idx").using("gin", table.colors),
    index("Product_sizes_gin_idx").using("gin", table.sizes),
    // GIN Trigram Indexes for "Contains" Search (Fast ILIKE)
    // Requires "pg_trgm" extension enabled in Postgres
    index("Product_name_trgm_idx").using(
      "gin",
      sql`${table.name} gin_trgm_ops`
    ),
    index("Product_description_trgm_idx").using(
      "gin",
      sql`${table.description} gin_trgm_ops`
    ),
  ]
);

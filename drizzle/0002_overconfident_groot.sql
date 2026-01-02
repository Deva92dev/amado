DROP INDEX "Product_createdAt_idx";--> statement-breakpoint
DROP INDEX "Product_featured_idx";--> statement-breakpoint
DROP INDEX "Product_type_idx";--> statement-breakpoint
CREATE INDEX "Product_category_gin_idx" ON "Product" USING gin ("category");--> statement-breakpoint
CREATE INDEX "Product_colors_gin_idx" ON "Product" USING gin ("colors");--> statement-breakpoint
CREATE INDEX "Product_sizes_gin_idx" ON "Product" USING gin ("sizes");--> statement-breakpoint
CREATE INDEX "Product_name_trgm_idx" ON "Product" USING gin ("name" gin_trgm_ops);--> statement-breakpoint
CREATE INDEX "Product_description_trgm_idx" ON "Product" USING gin ("description" gin_trgm_ops);--> statement-breakpoint
CREATE INDEX "Product_createdAt_idx" ON "Product" USING btree ("createdAt");--> statement-breakpoint
CREATE INDEX "Product_featured_idx" ON "Product" USING btree ("featured");--> statement-breakpoint
CREATE INDEX "Product_type_idx" ON "Product" USING btree ("type");
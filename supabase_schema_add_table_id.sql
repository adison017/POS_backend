-- Add table_id to orders table
ALTER TABLE orders ADD COLUMN IF NOT EXISTS table_id VARCHAR(50);
CREATE INDEX IF NOT EXISTS idx_orders_table_id ON orders(table_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);

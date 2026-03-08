-- Create Tables table for Floor Plan Management
CREATE TABLE IF NOT EXISTS tables (
    id VARCHAR(50) PRIMARY KEY,
    label VARCHAR(50) NOT NULL,
    x INT DEFAULT 0,
    y INT DEFAULT 0,
    width INT DEFAULT 100,
    height INT DEFAULT 100,
    type VARCHAR(20) DEFAULT 'square', -- 'square', 'round'
    status VARCHAR(20) DEFAULT 'available', -- 'available', 'occupied', 'reserved'
    seats INT DEFAULT 4,
    branch_id VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for status
CREATE INDEX IF NOT EXISTS idx_tables_status ON tables (status);

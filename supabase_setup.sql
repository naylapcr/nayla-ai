-- ==========================================
-- LUNEVE BOUTIQUE DATABASE SETUP SQL
-- ==========================================

-- 1. DROP TABLES IF THEY EXIST (In reverse dependency order)
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- 2. CREATE TABLES

-- Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'member',
    points INTEGER NOT NULL DEFAULT 0,
    tier VARCHAR(20) NOT NULL DEFAULT 'Bronze',
    status VARCHAR(20) NOT NULL DEFAULT 'Active',
    join_date TIMESTAMP DEFAULT now(),
    created_at TIMESTAMP DEFAULT now()
);

-- Products Table
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(100) NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL,
    category VARCHAR(50) NOT NULL,
    brand VARCHAR(100) NOT NULL,
    price INTEGER NOT NULL,
    stock INTEGER NOT NULL DEFAULT 0,
    image_url TEXT,
    img VARCHAR(10),
    rate DECIMAL(3,1) DEFAULT 0.0,
    description TEXT,
    created_at TIMESTAMP DEFAULT now()
);

-- Orders Table
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    total INTEGER NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'Processing',
    points_earned INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT now()
);

-- Order Items Table
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    product_name VARCHAR(100) NOT NULL,
    quantity INTEGER NOT NULL,
    price INTEGER NOT NULL
);

-- Reviews Table
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
    text TEXT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT now()
);

-- 3. CUSTOM RLS HELPER FUNCTIONS
-- Extracts the client X-User-Role and X-User-Id HTTP request headers.
-- Defaults to 'admin' when executed directly in SQL Editor (where request headers are absent).

CREATE OR REPLACE FUNCTION get_req_role() RETURNS text AS $$
DECLARE
  headers text;
BEGIN
  headers := current_setting('request.headers', true);
  IF headers IS NULL OR headers = '' THEN
    RETURN 'admin'; -- default to admin when running from SQL Editor
  END IF;
  RETURN coalesce(headers::json->>'x-user-role', 'guest');
EXCEPTION WHEN OTHERS THEN
  RETURN 'admin'; -- fallback to admin for direct queries in Supabase Dashboard
END;
$$ LANGUAGE plpgsql STABLE;

CREATE OR REPLACE FUNCTION get_req_user_id() RETURNS text AS $$
DECLARE
  headers text;
BEGIN
  headers := current_setting('request.headers', true);
  IF headers IS NULL OR headers = '' THEN
    RETURN '';
  END IF;
  RETURN coalesce(headers::json->>'x-user-id', '');
EXCEPTION WHEN OTHERS THEN
  RETURN '';
END;
$$ LANGUAGE plpgsql STABLE;

-- 4. ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- 5. CREATE RLS POLICIES

-- Users Policies
CREATE POLICY users_select_policy ON users FOR SELECT
USING (get_req_role() = 'admin' OR id::text = get_req_user_id());

CREATE POLICY users_insert_policy ON users FOR INSERT
WITH CHECK (true); -- Anyone can register

CREATE POLICY users_update_policy ON users FOR UPDATE
USING (get_req_role() = 'admin' OR id::text = get_req_user_id());

CREATE POLICY users_delete_policy ON users FOR DELETE
USING (get_req_role() = 'admin');

-- Products Policies
CREATE POLICY products_select_policy ON products FOR SELECT
USING (true); -- Public read-access

CREATE POLICY products_all_admin_policy ON products FOR ALL
USING (get_req_role() = 'admin'); -- Only admins can modify products

-- Orders Policies
CREATE POLICY orders_select_policy ON orders FOR SELECT
USING (get_req_role() = 'admin' OR user_id::text = get_req_user_id());

CREATE POLICY orders_insert_policy ON orders FOR INSERT
WITH CHECK (get_req_role() = 'admin' OR user_id::text = get_req_user_id());

CREATE POLICY orders_all_admin_policy ON orders FOR ALL
USING (get_req_role() = 'admin');

-- Order Items Policies
CREATE POLICY order_items_select_policy ON order_items FOR SELECT
USING (
    get_req_role() = 'admin' OR 
    EXISTS (
        SELECT 1 FROM orders 
        WHERE orders.id = order_items.order_id 
        AND orders.user_id::text = get_req_user_id()
    )
);

CREATE POLICY order_items_insert_policy ON order_items FOR INSERT
WITH CHECK (
    get_req_role() = 'admin' OR 
    EXISTS (
        SELECT 1 FROM orders 
        WHERE orders.id = order_items.order_id 
        AND orders.user_id::text = get_req_user_id()
    )
);

CREATE POLICY order_items_all_admin_policy ON order_items FOR ALL
USING (get_req_role() = 'admin');

-- Reviews Policies
CREATE POLICY reviews_select_policy ON reviews FOR SELECT
USING (true); -- Public read-access

CREATE POLICY reviews_insert_policy ON reviews FOR INSERT
WITH CHECK (get_req_role() = 'admin' OR user_id::text = get_req_user_id());

CREATE POLICY reviews_all_admin_policy ON reviews FOR ALL
USING (get_req_role() = 'admin');

-- 6. RPC FUNCTION FOR DASHBOARD STATISTICS
CREATE OR REPLACE FUNCTION get_dashboard_summary()
RETURNS json SECURITY DEFINER AS $$
DECLARE
  total_items bigint;
  total_revenue bigint;
  active_customers bigint;
  returns_count bigint;
  result json;
BEGIN
  -- 1. Total sales items: sum of quantity from order_items
  SELECT coalesce(sum(quantity), 0) INTO total_items FROM order_items;

  -- 2. Total revenue: sum of total from orders (where status != 'Cancelled')
  SELECT coalesce(sum(total), 0) INTO total_revenue FROM orders WHERE status != 'Cancelled';

  -- 3. Active customers: count of users with role = 'member' and status = 'Active'
  SELECT count(*) INTO active_customers FROM users WHERE role = 'member' AND status = 'Active';

  -- 4. Returns count: count of orders with status = 'Cancelled' or 'Returned'
  SELECT count(*) INTO returns_count FROM orders WHERE status = 'Cancelled';

  result := json_build_object(
    'total_items', total_items,
    'total_revenue', total_revenue,
    'active_customers', active_customers,
    'returns', returns_count
  );
  RETURN result;
END;
$$ LANGUAGE plpgsql STABLE;

-- 7. SEED DATA

-- Insert default admin account
INSERT INTO users (name, email, password, role, tier, status) VALUES 
('Nayla Beauty', 'admin@luneve.com', 'admin123', 'admin', 'Platinum', 'Active');

-- Insert 30 product entries from data.json
INSERT INTO products (title, code, category, brand, price, stock, img, rate, description) VALUES ('Velvet Lip Tint', 'BLM-LP-001', 'Lips', 'Bloom Beauty', 145000, 120, '💄', 4.9, 'A silky, long-lasting lip tint that delivers rich color with a velvet finish. Perfect for any occasion.');
INSERT INTO products (title, code, category, brand, price, stock, img, rate, description) VALUES ('Glow Cushion', 'BLM-FC-002', 'Face', 'Bloom Labs', 210000, 45, '🎨', 4.8, 'A radiant cushion foundation that gives your skin a luminous, natural glow with buildable coverage.');
INSERT INTO products (title, code, category, brand, price, stock, img, rate, description) VALUES ('Ethereal Palette', 'BLM-EY-003', 'Eyes', 'Bloom Studio', 320000, 15, '👁️', 5, 'An 8-color eyeshadow palette with ethereal shades perfect for creating stunning eye looks.');
INSERT INTO products (title, code, category, brand, price, stock, img, rate, description) VALUES ('Rose Dewy Mask', 'BLM-SC-004', 'Skincare', 'Bloom Skin', 25000, 200, '🌸', 4.7, 'A hydrating rose-infused mask that leaves your skin soft, dewy, and rejuvenated.');
INSERT INTO products (title, code, category, brand, price, stock, img, rate, description) VALUES ('Cloud Blush', 'BLM-FC-005', 'Face', 'Bloom Beauty', 115000, 88, '🎨', 4.9, 'A lightweight, weightless blush that gives you a soft cloud-like flush of color.');
INSERT INTO products (title, code, category, brand, price, stock, img, rate, description) VALUES ('Silk Eyeliner', 'BLM-EY-006', 'Eyes', 'Bloom Studio', 85000, 0, '👁️', 4.6, 'A smooth, silky eyeliner that glides effortlessly for precise, defined lines.');
INSERT INTO products (title, code, category, brand, price, stock, img, rate, description) VALUES ('Matte Lip Cream', 'BLM-LP-007', 'Lips', 'Bloom Beauty', 130000, 95, '💄', 4.8, 'A luxurious matte lip cream with a velvety texture and long-lasting color.');
INSERT INTO products (title, code, category, brand, price, stock, img, rate, description) VALUES ('Hydrating Serum', 'BLM-SC-008', 'Skincare', 'Bloom Skin', 185000, 60, '🌸', 4.8, 'An intensely hydrating serum that quenches your skin''s thirst and plumps fine lines.');
INSERT INTO products (title, code, category, brand, price, stock, img, rate, description) VALUES ('Luminous Foundation', 'BLM-FC-009', 'Face', 'Bloom Labs', 245000, 40, '🎨', 4.7, 'A luminous foundation that provides seamless coverage while letting your skin shine through.');
INSERT INTO products (title, code, category, brand, price, stock, img, rate, description) VALUES ('Volume Mascara', 'BLM-EY-010', 'Eyes', 'Bloom Studio', 110000, 75, '👁️', 4.8, 'A volumizing mascara that thickens and lengthens lashes dramatically.');
INSERT INTO products (title, code, category, brand, price, stock, img, rate, description) VALUES ('Glow Lip Oil', 'BLM-LP-011', 'Lips', 'Bloom Beauty', 125000, 110, '💄', 4.6, 'A nourishing lip oil that gives your lips a gorgeous glossy glow and soft texture.');
INSERT INTO products (title, code, category, brand, price, stock, img, rate, description) VALUES ('Translucent Powder', 'BLM-FC-012', 'Face', 'Bloom Labs', 135000, 50, '🎨', 4.5, 'A universal translucent powder that sets makeup without adding any color or weight.');
INSERT INTO products (title, code, category, brand, price, stock, img, rate, description) VALUES ('Brow Definer Gel', 'BLM-EY-013', 'Eyes', 'Bloom Studio', 95000, 130, '👁️', 4.7, 'A tinted brow gel that shapes and defines brows while keeping them in place all day.');
INSERT INTO products (title, code, category, brand, price, stock, img, rate, description) VALUES ('Ceramide Moisturizer', 'BLM-SC-014', 'Skincare', 'Bloom Skin', 195000, 35, '🌸', 4.9, 'A rich moisturizer with ceramides that strengthens your skin barrier and prevents dryness.');
INSERT INTO products (title, code, category, brand, price, stock, img, rate, description) VALUES ('Satin Highlighter', 'BLM-FC-015', 'Face', 'Bloom Beauty', 160000, 25, '🎨', 4.8, 'A satin highlighter that adds a subtle, sophisticated glow to your cheekbones.');
INSERT INTO products (title, code, category, brand, price, stock, img, rate, description) VALUES ('Glitter Liquid Eyeshadow', 'BLM-EY-016', 'Eyes', 'Bloom Studio', 120000, 0, '👁️', 4.7, 'A shimmering liquid eyeshadow with glitter that adds sparkle and dimension to your eyes.');
INSERT INTO products (title, code, category, brand, price, stock, img, rate, description) VALUES ('Lip Liner Definer', 'BLM-LP-017', 'Lips', 'Bloom Beauty', 75000, 80, '💄', 4.5, 'A precision lip liner that defines and shapes your lips perfectly.');
INSERT INTO products (title, code, category, brand, price, stock, img, rate, description) VALUES ('Centella Cleansing Gel', 'BLM-SC-018', 'Skincare', 'Bloom Skin', 115000, 150, '🌸', 4.6, 'A gentle centella-infused cleansing gel that removes makeup without stripping your skin.');
INSERT INTO products (title, code, category, brand, price, stock, img, rate, description) VALUES ('Sunscreen SPF 50', 'BLM-SC-019', 'Skincare', 'Bloom Labs', 140000, 90, '🌸', 4.9, 'A high-protection sunscreen that shields your skin from harmful UV rays.');
INSERT INTO products (title, code, category, brand, price, stock, img, rate, description) VALUES ('Creamy Concealer', 'BLM-FC-020', 'Face', 'Bloom Labs', 125000, 65, '🎨', 4.7, 'A creamy concealer that covers imperfections with a natural finish.');
INSERT INTO products (title, code, category, brand, price, stock, img, rate, description) VALUES ('Plumping Lip Gloss', 'BLM-LP-021', 'Lips', 'Bloom Beauty', 135000, 70, '💄', 4.8, 'A plumping lip gloss that adds volume and shine to your lips.');
INSERT INTO products (title, code, category, brand, price, stock, img, rate, description) VALUES ('Exfoliating Toner', 'BLM-SC-022', 'Skincare', 'Bloom Skin', 165000, 42, '🌸', 4.7, 'A gentle exfoliating toner that removes dead skin and reveals a brighter complexion.');
INSERT INTO products (title, code, category, brand, price, stock, img, rate, description) VALUES ('Contour Sculpt Stick', 'BLM-FC-023', 'Face', 'Bloom Studio', 150000, 55, '🎨', 4.6, 'A creamy contour stick that sculpts and defines your facial features.');
INSERT INTO products (title, code, category, brand, price, stock, img, rate, description) VALUES ('Waterproof Gel Eyeliner', 'BLM-EY-024', 'Eyes', 'Bloom Studio', 105000, 115, '👁️', 4.8, 'A waterproof gel eyeliner that stays put all day and night.');
INSERT INTO products (title, code, category, brand, price, stock, img, rate, description) VALUES ('Bakuchiol Night Cream', 'BLM-SC-025', 'Skincare', 'Bloom Skin', 220000, 28, '🌸', 4.9, 'A nourishing night cream with bakuchiol that rejuvenates skin while you sleep.');
INSERT INTO products (title, code, category, brand, price, stock, img, rate, description) VALUES ('Setting Spray Matte', 'BLM-FC-026', 'Face', 'Bloom Labs', 175000, 80, '🎨', 4.7, 'A matte setting spray that locks your makeup in place for 24 hours.');
INSERT INTO products (title, code, category, brand, price, stock, img, rate, description) VALUES ('Tinted Lip Balm', 'BLM-LP-027', 'Lips', 'Bloom Beauty', 90000, 140, '💄', 4.6, 'A nourishing tinted lip balm that adds color and hydration to your lips.');
INSERT INTO products (title, code, category, brand, price, stock, img, rate, description) VALUES ('Vitamin C Glow Serum', 'BLM-SC-028', 'Skincare', 'Bloom Labs', 190000, 33, '🌸', 4.8, 'A brightening serum with vitamin C that boosts your skin''s radiance.');
INSERT INTO products (title, code, category, brand, price, stock, img, rate, description) VALUES ('Eyeshadow Base Primer', 'BLM-EY-029', 'Eyes', 'Bloom Studio', 88000, 50, '👁️', 4.7, 'An eyeshadow primer that prevents creasing and extends wear time.');
INSERT INTO products (title, code, category, brand, price, stock, img, rate, description) VALUES ('Micellar Water Gentle', 'BLM-SC-030', 'Skincare', 'Bloom Skin', 80000, 105, '🌸', 4.5, 'A gentle micellar water that cleanses and removes makeup effortlessly.');

/*
# Create bookings table for Dugoba Resort

1. New Tables
- `bookings`
  - `id` (uuid, primary key)
  - `accommodation_id` (text, not null) — identifier of the room/cottage (e.g. "cottage-1", "room-3p-1")
  - `accommodation_name` (text, not null) — display name (e.g. "3 kishilik xona №1")
  - `first_name` (text, not null) — guest first name
  - `last_name` (text, not null) — guest last name
  - `phone` (text, not null) — guest phone number
  - `guests` (integer, not null) — number of guests
  - `nights` (integer, not null) — number of nights
  - `notes` (text) — additional comments
  - `price_per_night` (text, not null) — price per night as display string
  - `status` (text, not null, default 'pending') — booking status
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `bookings`.
- Allow anon + authenticated to INSERT (public booking form, no login required).
- Allow anon + authenticated to SELECT (so users can see their submitted booking confirmation).
- No UPDATE or DELETE from the frontend.
*/

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  accommodation_id text NOT NULL,
  accommodation_name text NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  phone text NOT NULL,
  guests integer NOT NULL,
  nights integer NOT NULL,
  notes text,
  price_per_night text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_bookings" ON bookings;
CREATE POLICY "anon_insert_bookings"
ON bookings FOR INSERT
TO anon, authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "anon_select_bookings" ON bookings;
CREATE POLICY "anon_select_bookings"
ON bookings FOR SELECT
TO anon, authenticated
USING (true);

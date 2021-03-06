CREATE TABLE entries (
  id SERIAL PRIMARY KEY,
  id_user INTEGER REFERENCES users(id) ON DELETE SET NULL,
  date_created TIMESTAMP DEFAULT NOW() NOT NULL,
  reflection TEXT,
  mood_pleasant INTEGER CHECK(mood_pleasant < 256),
  mood_energy INTEGER CHECK(mood_energy < 256),
  entry_share share_type DEFAULT 'private'
);
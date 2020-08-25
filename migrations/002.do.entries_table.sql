CREATE TABLE entries (
  id SERIAL PRIMARY KEY,
  client_id INTEGER REFERENCES client(id) ON DELETE CASCADE NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE SET NULL,
  date TIMESTAMPTZ DEFAULT now() NOT NULL,
  reflection TEXT,
  mood_pleasant INTEGER,
  mood_energy INTEGER
);
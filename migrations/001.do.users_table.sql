CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT,
  user_name TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  admin_y BOOLEAN NOT NULL,
);
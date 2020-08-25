BEGIN;

TRUNCATE
  users,
  entries,
  RESTART IDENTITY CASCADE;

INSERT INTO users (id, name, user_name, email, password, admin)
VALUES
  (
    1,
    'Harry The Manager',
    'hayr-harry01',
    'h.manatier@scresscity.com',
    -- password = "pass"
    '$2a$10$fCWkaGbt7ZErxaxclioLteLUgg4Q3Rp09WW0s/wSLxDKYsaGYUpjG',

    true
  ),
  (
    2,
    'Art The Developer',
    'hayr-arty010',
    'a.isskilltime@scresscity.com',
    -- password = "pass"
    '$2a$10$fCWkaGbt7ZErxaxclioLteLUgg4Q3Rp09WW0s/wSLxDKYsaGYUpjG',
    false
  );

SELECT SETVAL('company_id_seq', (SELECT MAX(id) + 1 FROM users));
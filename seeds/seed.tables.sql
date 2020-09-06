BEGIN;

TRUNCATE
  users,
  entries
  RESTART IDENTITY CASCADE;

INSERT INTO users (name, user_name, email, password, admin_y)
VALUES  
  (
    'Harry The Manager',
    'hayr-harry01',
    'h.manatier@scresscity.com',
    -- password = "aTru3@dmin$wordpast"
    '$2a$10$/f18v.QOMyw8olR9E0OXgOH4MYwNW/Jydl0JQiY0gJi145jveRpFK',
    true
  ),
  (
    'Art The Developer',
    'hayr-arty010',
    'a.isskilltime@scresscity.com',
    -- password = "p@stworld0fAn3wtEmpoyee4"
    '$2a$10$Hv/PhT1fvoevTXWZQGeTd.a2A0o61edvGD9ozHqwf1FtpUzAtfHvC',
    false
  );

SELECT SETVAL('users_id_seq', (SELECT MAX(id) + 1 FROM users));

INSERT INTO entries (id_user, mood_pleasant, mood_energy, reflection, entry_share)
VALUES  
  (
    2,
    255,
    127,
    'Okay so how do I really feel?? I will never say. Do managers with emotions really exists??',
    'public'
  ),
  (
    2,
    127,
    127,
    'I''m kind of nervous starting this job. Not sure if this entry is truly visible by my boss or not so... Hi, Harry??',
    'public'
  ),
  (
    2,
    255,
    255,
    'What an orientation! Every is so amazing, All of the resources available to work with and my teamates are human again?? So excited for tomorrow',
    'public'
  ),
  (
    2,
    50,
    50,
    'My pet spider passed away and I feel like a widow. I guess that''s possible, huh? The death of a black widow making you feel like a widow. I think I''m done with insects as pets.',
    'public'
  ),
  (
    2,
    30,
    255,
    'He called me an insect?! Who would have thought this place would have supervisors who said things like that? Drunk words and bathroom words; sober thoughts. That''s the new saying.',
    'private'
  ),
  (
    2,
    240,
    230,
    'Okay, so first day was a long day. Truly can see I''ll be using this more often than I thought LOL Is the weekend here yet?',
    'private'
  );

SELECT SETVAL('entries_id_seq', (SELECT MAX(id) + 1 FROM entries));
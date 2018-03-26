-- ========= USERS TABLE ==============
CREATE TABLE IF NOT EXISTS users(
      user_id SERIAL PRIMARY KEY
    , auth_id VARCHAR(180)
    , picture VARCHAR(200)
    , "name" VARCHAR(100)
    , birthday DATE
    , gender VARCHAR(10)
    , email VARCHAR(50)
    , premium BOOLEAN
    , visible BOOLEAN
    , latitude DOUBLE PRECISION
    , longitude DOUBLE PRECISION
    , distance_range INT
    , age_min INT
    , age_max INT
    , show_gender VARCHAR(10)
);
-- ======== CREATE USER ===============
INSERT INTO users (
      auth_id
    , picture
    , "name"
    , birthday
    , gender
    , email
    , premium
    , visible
    , latitude
    , longitude
    , distance_range
    , age_min
    , age_max
    , show_gender
    )
VALUES (
      $1
    , $2
    , $3
    , $4
    , $5
    , $6
    , $7
    , $8
    , $9
    , $10
    , $11
    , $12
    , $13
    , $14
)
RETURNING *;
-- ======= FIND USER SESSION ==========
SELECT * FROM users
WHERE user_id = $1

-- ======== FIND USER =================
SELECT * FROM users
WHERE auth_id = $1

-- ========== GET LOCAL USERS ========
SELECT *, point(40.2502215, -111.6892339) <@> point (latitude, longitude)::point as distance_from_user
FROM users
JOIN profiles ON user_id = profile_user_id
WHERE (point(40.2502215, -111.6892339) <@> point(latitude, longitude)) < 3-- This is the distance in miles
AND user_id != 2
AND gender = 'male'
AND visible = true
AND date_part('year', AGE(birthday)) > 18 
AND date_part('year', AGE(birthday)) < 34
AND user_id NOT IN 
(SELECT receiver_id
FROM connections
WHERE sender_id = 2)
ORDER by distance_from_user


-- ======== PROFILE TABLE =============
CREATE TABLE IF NOT EXISTS profiles(
      profile_id SERIAL PRIMARY KEY   
    , profile_user_id INT REFERENCES users(user_id)
    , hobbies VARCHAR(500)
    , inspirations VARCHAR(500)
    , coffeetea TEXT
    , favfood VARCHAR(100)
    , travelbeen VARCHAR(500)
    , travelto VARCHAR(500)
    , bestdone VARCHAR(500)
    , worstdone VARCHAR(500)
    , work VARCHAR(100)
    , school VARCHAR(100)
    , goodat VARCHAR(500)
    , suckat VARCHAR(500)
    , songs VARCHAR (200)
);
-- ======= CREATE PROFILE =============
INSERT INTO profiles(
      profile_user_id
    , hobbies
    , inspirations
    , coffeetea
    , favfood
    , travelbeen
    , travelto
    , bestdone
    , worstdone
    , work
    , school
    , goodat
    , suckat
    , songs
)
VALUES (
      $1
    , $2
    , $3
    , $4
    , $5
    , $6
    , $7
    , $8
    , $9
    , $10
    , $11
    , $12
    , $13
    , $14
)

where profile_user_id = $1


-- ===== UPDATE PROFILE ==============
UPDATE TABLE profiles(  
      hobbies
    , inspirations
    , coffeetea
    , favfood
    , travelbeen
    , travelto
    , bestdone
    , worstdone
    , work
    , school
    , goodat
    , suckat
    , songs
)
SET 
      hobbies = $1
    , inspirations = $2
    , coffeetea = $3
    , favfood = $4
    , travelbeen = $5
    , travelto = $6
    , bestdone = $7
    , worstdone = $8
    , work = $9
    , school = $10
    , goodat = $11
    , suckat = $12
    , songs = $13

WHERE user_id = $14

--turn on the magic
CREATE EXTENSION cube;
CREATE EXTENSION earthdistance;

-- ===== JOIN USER TO PROFILE ========
SELECT * 
FROM profiles
JOIN users 
ON user_id = profile_user_id 
WHERE user_id = $1

-- ======= DELETE USER ================
DELETE FROM users 
WHERE user_id = $1;

DELETE FROM profiles
WHERE profile_user_id = $1

-- ======= CONNECTIONS TABLE ==========
CREATE TABLE IF NOT EXISTS connections(
      connection_id SERIAL PRIMARY KEY
    , sender_id INT REFERENCES users(user_id)
    , reciever_id INT 
    , reaction BOOLEAN
    , date_connected DATE
);
-- ====== CONNECTION CREATE ==========
INSERT INTO connections(
      sender_id
    , reciever_id
    , reaction
    , date_connected
)
VALUES (
      $1
    , $2
    , $3
    , $4
)
-- ====== CONNECTION UPDATE ========== 
UPDATE TABLE connections(
      sender_id
    , reciever_id
    , reaction
    , date_connected
)
SET (
      $1
    , $2
    , $3
    , $4
)
-- ========== MATCHES TABLE ==========
CREATE TABLE IF NOT EXISTS matches (
      match_id SERIAL PRIMARY KEY
    , sender_id REFERENCES users(user_id)
    , reciever_id REFERENCES connections(reciever_id)
    , date_created DATE 
);

-- ========== MATCHES CREATE ========
INSERT INTO matches (
      sender_id
    , reciever_id 
    , date_created
)
VALUES (
      $1
    , $2
    , $3
)

-- ========= MESSAGE TABLE ===========
CREATE TABLE IF NOT EXISTS messages(
      message_id SERIAL PRIMARY KEY
    , match_id INT 
    , user_id INT 
    , message VARCHAR(350)
    , message_time INT
);

-- ======== MESSAGE CREATE ==========
INSERT INTO messages(
      match_id
    , user_id
    , message
    , message_time
)
VALUES (
      $1
    , $2
    , $3
    , $4
)
-- -- ======= MESSAGE UPDATE ==========
-- UPDATE TABLE messages(
--       user_id
--     , message
--     , message_time
-- )
-- SET (
--       $1
--     , $2
--     , $3
-- )
-- =======================================================
select * 
from connections 
where sender_id = $1
and reaction = true 
and receiver_id 
in (select sender_id 
    from connections 
    where receiver_id = $1 
    and reaction = true)
-- =======================================================
select * 
from matches 
where sender_id = $1 
or receiver_id = $1



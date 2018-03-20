-- ========= USERS TABLE ==============
CREATE TABLE IF NOT EXISTS users(
      user_id SERIAL PRIMARY KEY
    , picture VARCHAR(200)
    , phone INT
    , "name" VARCHAR(100)
    , age INT
    , birthday DATE
    , email VARCHAR(50)
    , auth_id VARCHAR(180)
    , premium BOOLEAN
    , latitude DOUBLE PRECISION
    , longitude DOUBLE PRECISION
    , gender VARCHAR(10)
    , visible BOOLEAN
    , distance_range INT
    , age_min INT
    , age_max INT
    , show_gender VARCHAR(10)
);
-- ======== CREATE USER ===============
INSERT INTO users (
      picture
    , phone
    , "name"
    , age
    , birthday
    , email
    , auth_id
    , premium
    , latitude
    , longitude
    , gender
    , visible
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
    , $15
    , $16
)
RETURNING *;
-- ======= FIND USER SESSION ==========
SELECT * FROM users
WHERE user_id = $1

-- ======== FIND USER =================
SELECT * FROM users
WHERE auth_id = $1

-- ========== GET  LOCAL USERS ========
SELECT * 
FROM users
JOIN profiles 
ON user_id = profiles_user_id
WHERE gender = $1 
AND visible = true 
AND age > $2 
AND age < $3 
AND user_id NOT IN 
(SELECT receiver_id
FROM connections
WHERE sender_id = $4)

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

--turn on the magic
CREATE EXTENSION cube;
CREATE EXTENSION earthdistance;

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
    , sender_id FOREIGN KEY
    , reciever_id FOREIGN KEY
    , reaction TEXT
    , date DATE
);

-- ========== MATCHES TABLE ==========
CREATE TABLE IF NOT EXISTS matches (
      match_id SERIAL PRIMARY KEY
    , sender_id FOREIGN KEY
    , reciever_id FOREIGN KEY 
    , date DATE 
);

-- ========= MESSAGE TABLE ===========
CREATE TABLE IF NOT EXISTS messages(
      message_id SERIAL PRIMARY KEY
    , match_id FOREIGN KEY
    , message VARCHAR(350)
    , messagetime TIME
);
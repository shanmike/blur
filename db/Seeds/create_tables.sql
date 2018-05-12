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

--turn on the magic
CREATE EXTENSION cube;
CREATE EXTENSION earthdistance;




-- ======= CONNECTIONS TABLE ==========
CREATE TABLE IF NOT EXISTS connections(
      connection_id SERIAL PRIMARY KEY
    , sender_id INT REFERENCES users(user_id)
    , reciever_id INT 
    , reaction BOOLEAN
    , date_connected DATE
);

-- ========== MATCHES TABLE ==========
CREATE TABLE IF NOT EXISTS matches (
      match_id SERIAL PRIMARY KEY
    , sender_id REFERENCES users(user_id)
    , reciever_id REFERENCES connections(reciever_id)
    , date_created DATE 
);

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




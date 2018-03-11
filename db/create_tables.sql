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
);
-- ======== PROFILE TABLE =============
CREATE TABLE IF NOT EXISTS profiles(
      profile_id SERIAL PRIMARY KEY   
    , profile_user_id INT FOREIGN KEY
    , image VARCHAR(300)
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
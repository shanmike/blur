--  ====== TABLES ======
CREATE TABLE IF NOT EXISTS fb_user(
    fb_id SERIAL PRIMARY KEY,
    fb_user_id BIGINT,
    fb_profile VARCHAR(512),
    account_creation_date TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_account(
    account_id SERIAL PRIMARY KEY,
    user_account_id BIGINT,
    first_name VARCHAR(128),
    last_name VARCHAR(128),
    birthday DATE,
    gender VARCHAR(16),
    show_gender_preference VARCHAR(16),
    email VARCHAR(64),
    privacy BOOLEAN,
    premium BOOLEAN,
    age_min INT,
    age_max INT,
    eye_color VARCHAR(32),
    hair_color VARCHAR(32),
    height_min VARCHAR(32),
    exercise VARCHAR(32),
    education VARCHAR(56),
    distance_range INT,
    pictures VARCHAR(512)
);

CREATE TABLE IF NOT EXISTS locations(
    location_id SERIAL PRIMARY KEY,
    account_location INT,
    name VARCHAR(128),
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    time_of_location TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_profile(
    profile_id SERIAL PRIMARY KEY,
    profile_account_id INT,
    about_me VARCHAR(250),
    job VARCHAR(32),
    education VARCHAR(64),
    height VARCHAR(32),
    eye_color VARCHAR(32),
    hair_color VARCHAR(32),
    height_min VARCHAR(32),
    exercise VARCHAR(32),
    drinking VARCHAR(32),
    smoking VARCHAR(32),
    pets VARCHAR(32),
    religion VARCHAR(32),
    politics VARCHAR(32),
    kids VARCHAR(32),
    star_sign VARCHAR(32),
    looking_for VARCHAR(32)
);
CREATE TABLE IF NOT EXISTS icebreakers(
    icebreaker_id SERIAL PRIMARY KEY,
    icebreaker_user_account INT,
    must_see_movie VARCHAR(64),
    ideal_date VARCHAR(256),
    places_to_travel VARCHAR(256),
    beaches_or_mountains VARCHAR(32),
    night_out_or_netflix VARCHAR(32),
    favorite_food VARCHAR(32),
    coffee_or_tea VARCHAR(32),
    favorite_color VARCHAR(32)
);
CREATE TABLE IF NOT EXISTS reactions(
    reaction_id SERIAL PRIMARY KEY,
    sender_id INT,
    receiver_id INT,
    reaction VARCHAR(16),
    reaction_date TIMESTAMP
);
CREATE TABLE IF NOT EXISTS matches(
    match_id SERIAL PRIMARY KEY,
    sender_id INT,
    receiver_id INT,
    match_date TIMESTAMP
);
CREATE TABLE IF NOT EXISTS messages(
    message_id SERIAL PRIMARY KEY,
    match_id INT,
    account_id INT,
    time_of_message TIMESTAMP,
    message_content VARCHAR(350)
);
CREATE TABLE IF NOT EXISTS unmatch(
    unmatch_id SERIAL PRIMARY KEY,
    unmatched_user_id INT,
    reason_for_unmatch VARCHAR(250)
);
CREATE TABLE IF NOT EXISTS report_user(
    report_id SERIAL PRIMARY KEY,
    report_user_id INT,
    reason_for_report VARCHAR(250)
);
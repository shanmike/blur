UPDATE TABLE users (latitude, longitude)
SET latitude = $1, longitude = $2
WHERE user_id = $3
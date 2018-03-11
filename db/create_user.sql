INSERT INTO users (picture, phone, "name", age, birthday, email, auth_id, premium, latitude, longitude, gender)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
RETURNING *;
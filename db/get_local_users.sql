SELECT * FROM users
JOIN profiles ON user_id = profiles_user_id
WHERE
gender = $1 AND
visible = true AND
age > $2 AND
age < $3 AND
user_id NOT IN (SELECT receiver_id
FROM connections
WHERE sender_id = $4)
SELECT * 
FROM profiles
JOIN users 
ON user_id = profile_user_id 
WHERE user_id = $1
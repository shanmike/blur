DELETE FROM users 
WHERE user_id = $1;

DELETE FROM profiles
WHERE profile_user_id = $1
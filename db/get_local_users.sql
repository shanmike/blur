-- SELECT *, point($1, $2) <@> point (latitude, longtitude):: as distance_range
-- FROM users
-- WHERE (point($1, $2) <@> point(latitude, longtitude)) < $3 -- This is the distance in miles
-- ORDER by distance_range


SELECT * 
FROM users
WHERE gender = $4
AND visible = true 
AND (year from AGE(birthday)) > $5 
AND (year from AGE(birthday)) < $6
AND user_id NOT IN 
(SELECT receiver_id
FROM connections
WHERE sender_id = $7)
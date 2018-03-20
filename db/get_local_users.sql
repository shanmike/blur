SELECT *, point($1, $2) <@> point (latitude, longtitude):: as distance_from_user
FROM users
WHERE (point($1, $2) <@> point(latitude, longtitude)) < $3 -- This is the distance in miles
AND gender = $4
AND visible = true 
AND date_part('year', AGE(birthday)) > $5 
AND date_part('year', AGE(birthday)) < $6
AND user_id NOT IN 
(SELECT receiver_id
FROM connections
WHERE sender_id = $7)
ORDER by distance_from_user
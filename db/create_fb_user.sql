INSERT INTO fb_user(fb_user_id, fb_profile, account_creation_date)
VALUES($1,$2,$3)
RETURNING *;
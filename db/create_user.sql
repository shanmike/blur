INSERT INTO users (
      auth_id
    , picture
    , "name"
    , birthday
    , gender
    , email
    , premium
    , visible
    , latitude
    , longitude
    , distance_range
    , age_min
    , age_max
    , show_gender
    )
VALUES (
      $1
    , $2
    , $3
    , $4
    , $5
    , $6
    , $7
    , $8
    , $9
    , $10
    , $11
    , $12
    , $13
    , $14
)
RETURNING *;
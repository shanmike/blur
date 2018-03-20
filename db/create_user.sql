INSERT INTO users (
      picture
    , phone
    , "name"
    , age
    , birthday
    , email
    , auth_id
    , premium
    , latitude
    , longitude
    , gender
    , visible
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
    , $15
    , $16
)
RETURNING *;
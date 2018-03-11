UPDATE TABLE profiles(  
      image
    , hobbies
    , inspirations
    , coffeetea
    , favfood
    , travelbeen
    , travelto
    , bestdone
    , worstdone
    , work
    , school
    , goodat
    , suckat
    , songs
)
SET 
      image = $1
    , hobbies = $2
    , inspirations = $3
    , coffeetea = $4
    , favfood = $5
    , travelbeen = $6
    , travelto = $7
    , bestdone = $8
    , worstdone = $9
    , work = $10
    , school = $11
    , goodat = $12
    , suckat = $13
    , songs = $14

WHERE id = $15

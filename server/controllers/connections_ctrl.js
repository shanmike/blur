module.exports = {
    getLocalUsers:((req,res,next)=>{
        const db = req.app.get("db")
        if(req.user){
            const {user_id, latitude, longitude, distance_range, show_gender, age_min, age_max} = req.user
            db.run(
                `SELECT *, point(${latitude}, ${longitude}) <@> point (latitude, longitude)::point as distance_from_user
                FROM users
                JOIN profiles ON user_id = profile_user_id
                WHERE (point(${latitude}, ${longitude}) <@> point(latitude, longitude)) < ${distance_range}
                AND user_id != ${user_id}
                AND gender = '${show_gender}'
                AND visible = true
                AND date_part('year', AGE(birthday)) > 18 
                AND date_part('year', AGE(birthday)) < ${age_max}
                AND user_id NOT IN 
                (SELECT receiver_id
                 FROM connections
                 WHERE sender_id = ${user_id})
                ORDER by distance_from_user
                `,
            function(err, res){
                var localUsers = res;
            }).then(localUsers=>{
                res.status(200).send(localUsers)
            })
        }else{
            res.status(401).send('Sign in')
        }
    })
}


// SELECT *, point(${latitude}, ${longitude}) <@> point (latitude, longitude)::point as distance_from_user
//                 FROM users
//                 JOIN profiles ON user_id = profile_user_id
//                 WHERE (point(${latitude}, ${longitude}) <@> point(latitude, longitude)) < ${distance_range}
//                 AND user_id != ${user_id}
//                 AND gender = '${show_gender}'
//                 AND visible = true
//                 AND date_part('year', AGE(birthday)) > 18 
//                 AND date_part('year', AGE(birthday)) < ${age_max}
//                 AND user_id NOT IN 
//                 (SELECT receiver_id
//                  FROM connections
//                  WHERE sender_id = ${user_id})
//                 ORDER by distance_from_user
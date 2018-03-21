module.exports = {
    getLocalUsers:((req,res,next)=>{
        const db = req.app.get("db")
        if(req.user){
            const {user_id} = req.user
            db.run("SELECT *, point(latitude, longitude) <@> point (latitude, longitude)::point as distance_from_user FROM users WHERE (point(latitude, longitude) <@> point(latitude, longitude)) < distance_range -- This is the distance in miles AND gender = show_gender AND visible = true AND date_part('year', AGE(birthday)) > age_min AND date_part('year', AGE(birthday)) < age_max ORDER by distance_from_user",
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
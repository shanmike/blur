module.exports = {
    getProfileInfo:((req,res,next)=>{
        const db = req.app.get('db')
        if(req.user){
            const {user_id} = req.user
            const userid = {profile_user_id: user_id}
            db.profiles.findOne(userid, function(err, user) {
                var profile = user;
            }).then( profile=> {
                res.status(200).send(profile)
            })
        }else{
            res.status(401).send('Sign in')
        }
    }).bind(this),
    updateProfile:((req,res)=>{
        // console.log("PROFILE UPDATE:",req.body);
        const db = req.app.get('db')
        if(req.user){
            const {user_id} = req.user
            db.profiles.update({profile_user_id:user_id},req.body)
        }else{
            res.status(401).send('Sign in')
        }
    })
}
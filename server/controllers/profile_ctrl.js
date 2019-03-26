module.exports = {

    getProfileInfo:((req, res) => {
        const db = req.app.get('db')
        const { user_id } = req.user
        user_id ?
        db.profiles.findOne({profile_user_id: user_id}, (err, user) => {
            profile = user
        }).then( profile => res.status(200).send(profile)) :
        res.status(401).send('Sign in')
    }).bind(this),

    updateProfile:((req, res) => {
        const db = req.app.get('db')
        const { user_id } = req.user
        user_id ? 
        db.profiles.update({profile_user_id:user_id}, req.body) :
        res.status(401).send('Sign in')
    })
}
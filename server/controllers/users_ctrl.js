module.exports = {
    updateUser:((req, res) => {
        console.log(req.user)
        const db = req.app.get('db')
        const { fb_id } = req.user
        fb_id ?
        db.fb_user.update({ fb_id }, req.body).then( response => res.status(200).send(response[0])) :
        res.status(401).send('Sign in')
    })
}   
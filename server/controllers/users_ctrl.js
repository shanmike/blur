module.exports = {
    updateUser:((req,res)=>{
        const db = req.app.get('db')
        if(req.user){
            const {user_id} = req.user
            db.users.update({user_id},req.body).then(response=>{
                res.status(200).send(response[0])
            })
        }else{
            res.status(401).send('Sign in')
        }
    })
}
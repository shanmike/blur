module.exports = {
    updateUser:((req,res)=>{
        const db = req.app.get('db')
        if(req.user){
            const {user_id} = req.user
            db.users.update({user_id},req.body)
        }else{
            res.status(401).send('Sign in')
        }
    })
}
module.exports = {
    getLocalUsers:((req,res,next)=>{
        const db = req.app.get("db")
        if(req.user){
            const {user_id} = req.user
            db.run("SELECT * FROM users",
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
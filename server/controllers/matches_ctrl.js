module.exports = {
    getMatches:((req,res,next)=>{
        const db = req.app.get('db')
        if(req.user){
            const {user_id} = req.user
            db.run(`SELECT * FROM users JOIN matches ON user_id = sender_id WHERE receiver_id =${user_id} `,
            function(err,res){
                var userMatches = res;
            }).then(userMatches=>{
                res.status(200).send(userMatches)
            })
        }else{
            res.status(401).send('Sign in')
        }
    })
}
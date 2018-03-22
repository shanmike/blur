module.exports = {
    updateUser:((req,res)=>{
        // console.log("USER UPDATE:",req.body);
        const db = req.app.get('db')
        if(req.user){
            // console.log("IF USER UPDATE")
            const {user_id} = req.user
            db.users.update({user_id},req.body).then(response=>{
                // console.log(response[0]);
                res.status(200).send(response[0])
            })
        }else{
            res.status(401).send('Sign in')
        }
    })
}
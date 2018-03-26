module.exports = {
    getMatches:((req,res,next)=>{
        const db = req.app.get('db')
        if(req.user){
            const {user_id} = req.user
            db.run(`
                WITH kittens AS (
                SELECT sender_id, receiver_id, match_id,
                    (SELECT user_id 
                        FROM users 
                        WHERE user_id 
                        IN(sender_id, receiver_id) 
                        AND user_id <> ${user_id}) as test
                FROM matches 
                WHERE sender_id = ${user_id}
                OR receiver_id =${user_id})
                SELECT * FROM kittens
                JOIN users 
                ON users.user_id = kittens.test
                   
                `)
                .then(userMatches=>{
                    console.log(userMatches)
                res.status(200).send(userMatches)
            }).catch(err=>console.log(err))
        }else{
            res.status(401).send('Sign in')
        }
    })
}

// `SELECT sender_id, receiver_id, match_id,(SELECT user_id FROM users WHERE usere_id IN(sender_id, receiver_id) and user_id NOT EQUAL ${user_id}) as joinOn FROM matches WHERE sender_id = ${user_id} or receiver_id =${user_id} join users on users.user_id = joinOn`
module.exports = {
    getMatches:((req, res)=>{
        const db = req.app.get('db')
        const { user_id } = req.user
        if(user_id){
            db.query(`WITH kittens AS (
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
                    ON users.user_id = kittens.test`
                    )
                .then(userMatches=> res.status(200).send(userMatches))
                .catch(err => err)
        }else{
            res.status(401).send('Sign in')
        }
    })
}
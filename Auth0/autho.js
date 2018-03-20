// // ============= AUTH0 STRATEGY ===================
// passport.use(new Auth0Strategy({
//       domain: DOMAIN
//     , clientID: CLIENT_ID
//     , clientSecret: CLIENT_SECRET
//     , callbackURL: CALLBACK_URL
//     , scope: "openid profile email"
// }   , function(accessToken, refreshToken, extraParams, profile, done){
//         const db = app.get('db')
//         db.find_user([profile.id]).then(users =>{
//             if(!users[0]){
//                 db.create_user([
//                       profile.picture  
//                     , profile.phone
//                     , profile.displayName
//                     , profile.age
//                     , profile.birthday
//                     , profile._json.email
//                     , profile.id
//                     , profile.premium
//                     , profile.latitude
//                     , profile.longitude
//                     , profile._json.gender
//                     , profile.visible
//                     , profile.distance_range
//                     , profile.age_min
//                     , profile.age_max
//                     , profile.show_gender
//                 ]).then(userCreated => {
//                     db.create_inital_profile([
//                           userCreated[0].user_id
//                         , null
//                         , null
//                         , null
//                         , null
//                         , null
//                         , null
//                         , null
//                         , null
//                         , null
//                         , null
//                         , null
//                         , null
//                         , null
//                     ])
//                     console.log("Index.js, .then - userCreated",userCreated)
//                     return done(null, userCreated[0].user_id);
//                 })
//             }else{
//                 // console.log("index.js- else - userCreated",users[0])
//                 return done(null, users[0].user_id);
//             }
//         }).catch(console.log)
// }));
// // =================================================
// app.get('/auth', passport.authenticate('auth0'));
// app.get('/auth/callback', passport.authenticate('auth0', {
//       successRedirect: 'http://localhost:3000/#/home'
//     , failureRedirect: 'http://localhost:3000/'
// }));
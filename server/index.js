require('dotenv').config();
const express = require('express')
    , session = require('express-session')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    , bodyParser = require('body-parser')
    , massive = require('massive')
    , FacebookStrategy = require('passport-facebook')
    , users_ctrl = require('./controllers/users_ctrl')
    , connections_ctrl = require('./controllers/connections_ctrl')
    // , matches_ctrl = require('./controllers/matches_ctrl')
    // , messages_ctrl = require('./controllers/messages_ctrl')
    , profile_ctrl = require('./controllers/profile_ctrl')

// ============ DOTENV =============================
const {
      SERVER_PORT
    , SESSION_SECRET
    , DOMAIN
    , CLIENT_ID
    , CLIENT_SECRET
    , CALLBACK_URL
    , CONNECTION_STRING
    , APP_SECRET
    , APP_ID
}   = process.env;
// =================================================

const app = express();
app.use(bodyParser.json())

// =========== MASSIVE =============================
massive(CONNECTION_STRING).then(db=>{
    app.set('db', db);
    app.listen(SERVER_PORT, () => console.log(`Let it thrive on: ${SERVER_PORT}`));
});
// =================================================

// ============ AUTH ==============================
app.use(session({
      secret: SESSION_SECRET
    , resave:false
    , saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
// =================================================

// ======== FACEBOOK AUTH===========================
passport.use(new FacebookStrategy({
    clientID: APP_ID,
    clientSecret: APP_SECRET,
    callbackURL: "http://localhost:4567/fb/callback",
    profileFields:['id','displayName','birthday','email','gender','picture.width(500).height(500)']
  },
  function(accessToken, refreshToken, profile, done) {
    //   console.log(profile)
      const db = app.get('db')
    db.find_user([profile.id]).then(user=>{
        if(user[0]){
            done(null, user[0].user_id)
        }else{
            db.create_user([
                profile.id,
                profile.photos[0].value,
                profile.displayName,
                profile._json.birthday,
                profile.gender,
                profile._json.email,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            ]).then(createdUser=>{
                db.create_inital_profile([
                    createdUser[0].user_id
                  , ''
                  , ''
                  , ''
                  , ''
                  , ''
                  , ''
                  , ''
                  , ''
                  , ''
                  , ''
                  , ''
                  , ''
                  , ''
              ]).then(()=>{
                done(null, createdUser[0].user_id)
              })   
            })
        }
    });
  }
));
// ================================================

// ============ SERIALIZE / DESERIALIZE ============
passport.serializeUser((id,done)=>{
    return done(null,id)
});

passport.deserializeUser((id, done)=>{
    app.get('db').find_user_session([id]).then(user=> {
        return done(null, user[0]);
    })
});
// =================================================

// =============== Auth Endpoints ==================
app.get('/auth/me',(req, res)=>{
    if(req.user){
        res.status(200).send(req.user)
    }else{
        res.status(401).send('Nice try pleb!!! Buwahahahaha!!!!')
    }
});

app.get('/auth/logout', ((req,res)=>{
    req.logOut();
    res.redirect('http://localhost:3000')
}));
// =================================================

// ================ FACEBOOK PASSPORT ==============

app.get('/fb',passport.authenticate('facebook',{scope:['public_profile','user_birthday','email']}));
app.get('/fb/callback', passport.authenticate('facebook',{
      successRedirect: 'http://localhost:3000/#/home'
    , failureRedirect: 'http://localhost:3000'
}));
// =================================================


// ============== FRONTEND ENDPOINTS ===============================
//
// ============== USERS ENDPOINTS ==================================
// - Update users picture, age, premium, latitude, longitude, and visibilty 

const {updateUser} = users_ctrl
app.put('/updateUser', updateUser);

// ============== PROFILE ENDPOINTS ================================
// - Get profile information associated with logged in user
// - Sets the user information
// - Deletes the users account and all the properties associated with the logged in user

const {getProfileInfo, updateProfile} = profile_ctrl
app.get('/getProfileInfo', getProfileInfo);
app.put('/updateProfile', updateProfile);
// app.delete('/deleteProfile', deleteProfile);

// ============== CONNECTIONS / LOCAL USERS ENDPOINTS =============
// - Get list of all possible connections

const {getLocalUsers} = connections_ctrl
app.get('/getLocalUsers', getLocalUsers);

// ============== MATCHES ENDPOINTS ===============================
// - Get list of all the people user matched with

// const {getMatches} = matches_ctrl.js
// app.get('/getMatches', getMatches);

// ============== MESSAGES ENDPOINTS ==============================
// - Get list of all the messages associated with the logged in user
// - Update Messages table with the logged in user

// const {getMessage, addNewMessage} = messages_ctrl.js
// app.get('/getMessage', getMessage);
// app.post('/addNewMessage', addNewMessage);
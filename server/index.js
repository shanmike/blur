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
    , matches_ctrl = require('./controllers/matches_ctrl')
    // , messages_ctrl = require('./controllers/messages_ctrl')
    , profile_ctrl = require('./controllers/profile_ctrl')
    , socket = require('socket.io')
    , stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

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
    , FB_CALLBACK
    , FB_LOGOUT_REDIRECT
    , FB_REDIRECT_DEV
    , FB_FAIL_REDIRECT
}   = process.env;
//  ================= INVOKE =======================
const app = express()
    , io = socket(app.listen(SERVER_PORT, ()=> console.log(`Sockets on port ${SERVER_PORT}`)))
// app.use(express.static(`${__dirname}/../build`));
app.use(bodyParser.json())

// =========== MASSIVE =============================
massive(CONNECTION_STRING).then(db=>{
    app.set('db', db);
    app.listen(SERVER_PORT, () => console.log(`Let it thrive on: ${SERVER_PORT}`));
});

// ============ AUTH ==============================
app.use(session({
      secret: SESSION_SECRET
    , resave:false
    , saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// ======== FACEBOOK AUTH===========================
passport.use(new FacebookStrategy({
    clientID: APP_ID,
    clientSecret: APP_SECRET,
    callbackURL: FB_CALLBACK,
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

// ============ SERIALIZE / DESERIALIZE ============
passport.serializeUser((id,done)=>{
    return done(null,id)
});

passport.deserializeUser((id, done)=>{
    app.get('db').find_user_session([id]).then(user=> {
        return done(null, user[0]);
    })
});

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
    res.redirect(FB_LOGOUT_REDIRECT)
}));

// ================ FACEBOOK PASSPORT ==============

app.get('/fb',passport.authenticate('facebook',{scope:['public_profile','user_birthday','email']}));
app.get('/fb/callback', passport.authenticate('facebook',{
      successRedirect: FB_REDIRECT_DEV
    , failureRedirect: FB_FAIL_REDIRECT
}));


// ================ SOCKETS ========================

io.on('connection', socket =>{
    console.log('User Connected')
    socket.emit("Welcome",{})

    socket.on('Message Sent', function(data){
        console.log("Sockets Data", data)
        const db = app.get('db')
        db.messages.insert(data).then(()=>{
            db.run(`select * from messages where match_id = ${data.match_id}`).then((messages)=>{
                io.to(data.match_id).emit("Received Message", messages)
            })
        })
    })

    socket.on("Join room", data => {
        console.log("Room Joined",data.match_id)
        socket.join(data.match_id);
        io.to(data.match_id).emit('Room joined', data.match_id)
    })
    socket.on('Disconnect',()=>{
        console.log('User Disconnected')
    })
})




// ============== USERS ENDPOINTS ==================================
const {updateUser} = users_ctrl
app.put('/updateUser', updateUser);

// ============== PROFILE ENDPOINTS ================================
const {getProfileInfo, updateProfile} = profile_ctrl
app.get('/getProfileInfo', getProfileInfo);
app.put('/updateProfile', updateProfile);
// app.delete('/deleteProfile', deleteProfile);

// ============== CONNECTIONS / LOCAL USERS ENDPOINTS =============
const {getLocalUsers} = connections_ctrl
app.get('/getLocalUsers', getLocalUsers);

// ============== MATCHES ENDPOINTS ===============================
const {getMatches} = matches_ctrl
app.get('/getMatches', getMatches);

// ============== MESSAGES ENDPOINTS ==============================
// const {getMessage} = messages_ctrl
// app.get('/getMessage', getMessage);


// ========================== STRIPE =============================
app.post('/api/payment', (req, res, next) => {
  
    // If needed, convert req.body.amount to pennies
  
    const charge = stripe.charges.create(
      {
        source: req.body.token.id,
        amount: req.body.amount,
        currency: 'usd',
        description: 'Stripe test charge'
      },
      function(err, charge) {
          if (err) return res.sendStatus(500);
          else return res.sendStatus(200);
      }
    );
  });
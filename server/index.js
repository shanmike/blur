// ================== MODULES ===================
require("dotenv").config();
const express = require("express"),
  session = require("express-session"),
  passport = require("passport"),
  bodyParser = require("body-parser"),
  massive = require("massive"),
  FacebookStrategy = require("passport-facebook"),
  users_ctrl = require("./controllers/users_ctrl"),
  connections_ctrl = require("./controllers/connections_ctrl"),
  matches_ctrl = require("./controllers/matches_ctrl"),
  profile_ctrl = require("./controllers/profile_ctrl"),
  socket = require("socket.io");

// ============ DOTENV =============================
const {
  SERVER_PORT,
  SESSION_SECRET,
  CONNECTION_STRING,
  FACEBOOK_APP_SECRET,
  FACEBOOK_APP_ID,
  FACEBOOK_CALLBACK,
  FACEBOOK_LOGOUT_REDIRECT,
  FACEBOOK_REDIRECT,
  FACEBOOK_FAIL_REDIRECT
} = process.env;

//  ================= INVOKE =======================
const app = express(),
  io = socket(
    app.listen(SERVER_PORT, () => console.log(`Sockets on port ${SERVER_PORT}`))
  );
app.use(bodyParser.json());

// =========== MASSIVE =============================
massive(CONNECTION_STRING).then(db => app.set("db", db));

// ============ AUTH ==============================
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
    
  })
);

// ======== FACEBOOK AUTH===========================

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: FACEBOOK_CALLBACK,
      enableProof: true,
      profileFields: [
        "id",
        "displayName",
        "birthday",
        "email",
        "gender",
        "picture.width(500).height(500)"
      ]
    },
    function(accessToken, refreshToken, profile, done) {
      const db = app.get("db");
      // console.log(profile)
      db.get_fb_user([profile.id]).then(user => {
        user[0] ? done(null, user[0].fb_id)
                : db.create_fb_user([profile.id, profile.displayName, new Date()]);
      }).catch(console.error()
      )
    }
  )
);

// ============ SERIALIZE / DESERIALIZE ============
passport.serializeUser((id, done) => done(null, id));
passport.deserializeUser((id, done) => {
  app
    .get("db")
    .get_fb_user_session([id])
    .then(user => done(null, user[0]));
});

app.use(passport.initialize());
app.use(passport.session());

// ================ FACEBOOK PASSPORT ==============

app.get(
  "/fb",
  passport.authenticate("facebook", {
    scope: ["public_profile", "user_birthday", "email"]
  })
);
app.get(
  "/fb/callback",
  passport.authenticate("facebook", {
    successRedirect: FACEBOOK_REDIRECT,
    failureRedirect: FACEBOOK_FAIL_REDIRECT
  })
);

// =============== Auth Endpoints ==================
app.get("/auth/me", (req, res) => {
  console.log("USER AUTH:", req.user)
  req.user
    ? res.status(200).send(req.user)
    : res.status(401).send("Please sign in.");
});

app.get("/auth/logout", (req, res) => {
  console.log("Logout hit");
  req.logOut();
  res.redirect(FACEBOOK_LOGOUT_REDIRECT);
});

// ============== USERS ENDPOINTS ==================================
const { updateUser } = users_ctrl;
app.put("/updateUser", updateUser);

// ============== PROFILE ENDPOINTS ================================
const { getProfileInfo, updateProfile } = profile_ctrl;
app.get("/getProfileInfo", getProfileInfo);
app.put("/updateProfile", updateProfile);

// ============== CONNECTIONS / LOCAL USERS ENDPOINTS =============
const { getLocalUsers } = connections_ctrl;
app.get("/getLocalUsers", getLocalUsers);

// ============== MATCHES ENDPOINTS ===============================
const { getMatches } = matches_ctrl;
app.get("/getMatches", getMatches);

// ================ SOCKETS ========================

io.on("connection", socket => {
  // WELCOME USERS TO SESSION
  socket.emit("Welcome", {});
  // SEND A MESSAGE
  socket.on("Message Sent", data => {
    const db = app.get("db");
    db.messages.insert(data).then(() => {
      db.query(`SELECT * FROM messages WHERE match_id = ${data.match_id}`).then(
        messages => {
          io.to(data.match_id).emit("Received Message", messages);
        }
      );
    });
  });
  // JOIN A SESSION
  socket.on("Join room", data => {
    const db = app.get("db");
    socket.join(data.match_id);
    db.query(`SELECT * FROM messages WHERE match_id = ${data.match_id}`).then(
      messages => {
        io.to(data.match_id).emit("Room joined", messages);
      }
    );
    // io.to(data.match_id).emit('Room joined', data.match_id)
  });
  // DISCONNECT FROM SESSION
  socket.on("disconnect", () => {});
});

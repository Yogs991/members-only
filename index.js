require("dotenv").config();
const path = require("node:path");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const pgPool = require("./db/pool");
const db = require("./db/queries");
const pgSession = require("connect-pg-simple")(session);
const bcrypt = require("bcryptjs");

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));

const passportStrategy = new LocalStrategy(async(username, password, done)=>{
    try {
        const user = await db.getUserByUserName(username);
        if(!user){
            return done(null, false, {message: "Incorrect username"});
        }
        const match = await bcrypt.compare(password, user.password);
        if(!match){
            return done(null, false, {message: "Incorrect password"});
        }
        return done(null,user);
    } catch (err) {
        return done(err);
    }
});

passport.serializeUser((user,done)=>{
    done(null, user.id);
});

passport.deserializeUser(async(id, done)=>{
    try{
        const user = await db.getUserById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
})

passport.use(passportStrategy);

app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        resave:false,
        saveUninitialized: true,
        store: new pgSession({
            pool: pgPool,
            tableName: "member_sessions",
            createTableIfMissing: true,
        }),
        cookie: {maxAge: 1000 * 60 * 60 * 24},
    }),
);
app.use(passport.session());

app.get("/", route);

const PORT = process.env.PORT || 3000;

app.listen(PORT, (error)=>{
    if(error){
        throw error;
    }

    console.log(`app listening on port ${PORT}`);
});
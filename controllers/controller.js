const db = require("../db/queries");
const bcrypt = require("bcryptjs");

async function getSignUpPage(req, res){
    res.render("sign-up");
}

async function getLoginPage(req,res){
    res.render("log-in");
}

async function saveSignUpUser(req,res) {
    const {firstName, lastName, email} = req.body;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    try {
        const saveDataToDb = await db.createUser(firstName, lastName, email, hashedPassword);
        console.log("User succesfully created");
        res.redirect("/log-in", login);
    } catch (err) {
        console.error(err);        
    }
}

async function getUserFromDb(req,res){
    const {username, password} = req.body;
    try {
        const getUser = await db.getUserByUserName(username)
        console.log("user logged in successfully");
        res.redirect("/");
    } catch (error) {
        console.log(error);
    }
}

module.exports={
    getSignUpPage,
    getLoginPage,
    saveSignUpUser,
    getUserFromDb
}
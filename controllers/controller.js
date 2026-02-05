const db = require("../db/queries");
const bcrypt = require("bcryptjs");

async function getSignUpPage(req, res){
    res.render("sign-up");
}

async function getLoginPage(req,res){
    res.render("log-in");
}

async function getNewMessagePage(req,res){
    res.render("new-message", {user: req.user});
}

async function saveSignUpUser(req,res) {
    const {firstName, lastName, username, email} = req.body;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    try {
        const saveDataToDb = await db.createUser(firstName, lastName, username, email, hashedPassword);
        console.log("User succesfully created");
        res.redirect("/log-in");
    } catch (err) {
        console.error(err);        
    }
}

async function saveMessageToDb(req,res){
    const {title, description} = req.body;
    const userId = req.user.id;
    try {
        await db.createMessage(title, description, userId);
        res.redirect("/");
    } catch (error) {
        console.log(error);        
    }
}

async function getUserFromDb(req,res){
    const username = req.body.username;
    try {
        const getUser = await db.getUserByUserName(username, hashedPassword)
        console.log("user logged in successfully");
        res.redirect("/");
    } catch (error) {
        console.log(error);
    }
}

async function showMessages(req, res){
    const messages = await db.getAllMessages();
    const messageInfo = messages.map(message=>({
        title: message.title,
        description: message.description,
        date: message.added,
        author: message.author
    }));

    res.render("index", {messageInfo, user:req.user});
}

module.exports={
    getSignUpPage,
    getLoginPage,
    getNewMessagePage,
    saveSignUpUser,
    saveMessageToDb,
    getUserFromDb,
    showMessages
}
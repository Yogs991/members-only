require("dotenv").config();
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

async function saveUserToDb(req,res) {
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

async function getMessages(req, res){
    const messages = await db.getAllMessages();

    const isMember = req.isAuthenticated() && req.user.member === true;

    const isAdmin = req.isAuthenticated() && req.user.admin === true;
    
    const messageInfo = messages.map(message=>({
        id: message.id,
        title: message.title,
        description: message.description,
        date: new Date(message.added).toLocaleDateString('en-US',{year: 'numeric', month: 'long', day:'numeric'}),
        author: message.author || 'Unknown'
    }));

    res.render("index", {messageInfo, user:req.user, isMember: isMember, isAdmin: isAdmin});
}

async function getMemberPage(req,res){
    res.render("member");
}

async function getAdminPage(req,res){
    res.render("admin");
}

async function setMember(req,res){
    try {
        if(req.body.member === process.env.MEMBER_PASSCODE){
            await db.updateMemberStatus(req.user.id);
            console.log("You are a member");
        }else{
            console.log("Incorrect passcode");            
        }
        res.redirect("/");    
    } catch (error) {
        console.log(error);        
    }
}

async function setAdmin(req,res){
    try {
        if(req.body.admin === process.env.ADMIN_PASSCODE){
            await db.updateAdminStatus(req.user.id);
            console.log("You are an admin");
        }else{
            console.log("Incorrect passcode");            
        }
        res.redirect("/");
    } catch (error) {
        console.log(error);        
    }
}

async function deleteMessage(req, res){
    try {
        const messageId = parseInt(req.params.id,10);
        const result = await db.deleteMessage(messageId);
        res.redirect("/");
    } catch (error) {
        console.error("Error deleting message:", error);
        res.status(500).send("Error deleting message");        
    }
}

module.exports={
    getSignUpPage,
    getLoginPage,
    getNewMessagePage,
    saveUserToDb,
    saveMessageToDb,
    getUserFromDb,
    getMessages,
    getMemberPage,
    getAdminPage,
    setMember,
    setAdmin,
    deleteMessage
}
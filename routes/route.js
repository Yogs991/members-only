const express = require("express");
const { Router } = require("express");
const router = Router();
const controller = require("../controllers/controller");
const passport = require("passport");

router.get("/", controller.showMessages);

router.get("/sign-up", controller.getSignUpPage);
router.get("/log-in", controller.getLoginPage);
router.get("/new-message",controller.getNewMessagePage);

router.post("/sign-up", controller.saveSignUpUser);
router.post("/log-in", 
    passport.authenticate("local",{
        successRedirect: "/",
        failureRedirect: "/log-in"
    }
));

router.post("/log-out", (req, res, next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        res.redirect("/");
    })
})
router.post("/new-message", controller.saveMessageToDb);

module.exports = router;
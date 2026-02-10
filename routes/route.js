const express = require("express");
const { Router } = require("express");
const router = Router();
const controller = require("../controllers/controller");
const passport = require("passport");
const {requireMember, requireAdmin} = require("../authentication");
const validation = require("../validator");

router.get("/", controller.getMessages);

router.get("/sign-up", controller.getSignUpPage);
router.get("/log-in", controller.getLoginPage);
router.get("/new-message",controller.getNewMessagePage);
router.get("/admin-page", requireAdmin, controller.getAdminPage);
router.get("/member-page", requireMember ,controller.getMemberPage);

router.post("/sign-up", validation.validateSignUp, controller.saveUserToDb);
router.post("/log-in", validation.validateLogin,
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
});

router.post("/new-message", controller.saveMessageToDb);
router.post("/admin-page", controller.setAdmin);
router.post("/member-page", controller.setMember);
router.post("/delete-message/:id", controller.deleteMessage);

module.exports = router;
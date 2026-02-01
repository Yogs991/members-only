const express = require("express");
const { Router } = require("express");
const router = Router();
const controller = require("../controllers/controller");

router.get("/",(req,res)=>{
    res.render("index");
});

router.get("/sign-up", controller.getSignUpPage);
router.get("/log-in", controller.getLoginPage);

router.post("/sign-up", controller.saveSignUpUser);
router.post("/log-in", controller.getUserFromDb);

module.exports = router;
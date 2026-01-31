const express = require("express");
const { Router } = require("express");
const router = Router();
const controller = require("../controllers/controller");

router.get("/",(req,res)=>{
    res.render("index");
});

module.exports = router;
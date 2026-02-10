const {body} = require("express-validator");
const db = require("./db/queries");

const validateSignUp = [
    body("firstName").trim().notEmpty().withMessage("First name is required").escape(),
    body("lastName").trim().notEmpty().withMessage("Last name is required").escape(),
    body("email").trim().notEmpty().withMessage("Email is required").escape(),
    body("username").trim().notEmpty().withMessage("Username is required").escape(),
    body("username").trim().notEmpty().withMessage("Username is required").custom(async(name)=>{
        const existingUsername = await db.getUserByUserName(name);
        if(existingUsername){
            throw new Error("this username already exists")
        }
        return true;
    }).escape(),
    body("password").isLength({min: 8}).withMessage("password must contain at least 8 characters"),
    body("confirm-password").custom((value,{req})=>{
        if(value !== req.body.password){
            throw new Error("Confirm password does not match password");
        }
        return true;
    }),
];

const validateLogin = [
    body("username").trim().notEmpty().withMessage("username is required").isLength({max: 50}),
    body("password").trim().notEmpty().withMessage("password is required")
];

module.exports = {
    validateSignUp,
    validateLogin
}
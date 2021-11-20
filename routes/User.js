const express = require("express");
const router = express.Router();
const { CreateUser, Login } = require("../controllers/UserController");

//@route  POST api/users
//@desc   Register User
//@access Public
router.post("/api/register", CreateUser);
router.post("/api/login", Login);

module.exports = router;

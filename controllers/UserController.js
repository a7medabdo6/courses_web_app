const express = require("express");
const connectDB = require("../models");
const env = process.env.NODE_ENV || "development";

const config = require(__dirname + "/../config/config.json")[env];
const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");

exports.CreateUser = async (req, res) => {
  const { username, email, password } = req.body;
  const userData = {
    username,
    email,
    password,
  };
  const salt = await bcrypt.genSalt(10);
  userData.password = await bcrypt.hash(userData.password, salt);

  const user = await connectDB.user.create(userData).catch((err) => {
    return res.send(err.errors);
  });

  res.send(user);
};

exports.Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // See if user exists

    let user = await connectDB.user.findOne({
      where: {
        email,
      },
    });
    // console.log(user);
    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    // console.log(isMatch, "isMatch");

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    // Return jsonwebtoken
    const payload = {
      user: {
        id: user.id,
      },
    };
    console.log(payload);
    jwt.sign(
      payload,
      config.jwtSecret,
      {
        expiresIn: 3600,
      },
      (err, token) => {
        if (err) throw err;
        res.cookie("token", token, { httpOnly: true, maxAge: 3600 });

        res.json({ token, expiresIn: 3600 });
      }
    );
  } catch (e) {
    res.status(500).send("Server error");
  }
};

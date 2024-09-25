const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../utils/db.js");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const usersRoute = express.Router();

usersRoute.post("/register", async (req, res) => {
  const { username, email, password, privacy } = req.body;
  let errorMsg = [];

  if (
    !validator.isAlphanumeric(username) ||
    !validator.isLength(username, { min: 2, max: 50 })
  ) {
    errorMsg.push(
      "Username must be alphanumeric and between 2 to 50 characters long."
    );
  }
  if (!validator.isEmail(email)) {
    errorMsg.push("Please enter a valid email address.");
  }
  if (!validator.isStrongPassword(password)) {
    errorMsg.push(
      "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character."
    );
  }
  if (!privacy) {
    errorMsg.push("You must accept the privacy policy to register");
  }
  if (Object.keys(errorMsg).length > 0) {
    return res.status(400).json({ errorMsg });
  }

  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const user = { username, email, password: hash, privacy, book_ids: [] };

    const result = await db.users.insertOne(user);
    console.log(result);
    res.status(200).json({ redirectUrl: "/login" });
  } catch (err) {
    console.log(err);
  }
});

usersRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await db.users.findOne({ email });

  const errorMsg = ["Email or password not correct"];

  if (!user) {
    return res.status(400).json({ errorMsg });
  }

  if (user) {
    const passwordCheck = bcrypt.compareSync(password, user.password);

    if (passwordCheck) {
      const payload = { _id: user._id, isLogged: true }; //dati che ci scambiamo con il client

      const options = { expiresIn: "1d" };

      const token = jwt.sign(payload, process.env.JWT_KEY, options);

      res.cookie("tokenJWT", token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: false,
        sameSite: "lax", // Allow cookies to be sent on same-site requests
      });
      console.log("Login successful");
      console.log(token);
      res.status(200).json({
        message: "Login successful",
        redirectUrl: "/books",
      });
    } else {
      return res.status(400).json({ errorMsg });
    }
  } else {
    return res.status(401).json({ message: "User not found" });
  }
});

usersRoute.get("/logout", (req, res) => {
  const cookieSetting = {
    expires: new Date(0),
    httpOnly: true,
    secure: false,
  };
  res
    .cookie("tokenJWT", "", cookieSetting)
    .json({ message: "logout effettuato" });
});

usersRoute.get("/check-auth", (req, res) => {
  const token = req.cookies.tokenJWT;
  if (!token) {
    return res
      .status(401)
      .json({ isLogged: false, redirectUrl: "/logged-out" });
  }

  jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ isLogged: false, redirectUrl: "/logged-out" });
    } else {
      return res.status(200).json({ isLogged: true });
    }
  });
});

module.exports = usersRoute;

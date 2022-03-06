// Require router from express
const router = require("express").Router();

// Require bcrypt
const bcrypt = require("bcrypt");

// Require the json web token
const jwt = require("jsonwebtoken");

// Require the User Schema
const User = require("../models/User");

// Require the isAuth middleware
const isAuth = require("../middlewares/isAuth");

// require validators
const {
  validator,
  registerRules,
  loginRules,
} = require("../middlewares/validator");
//@role: testing
//@url: http://localhost:5000/api/user/test
router.get("/test", (req, res) => {
  res.send("it works ..");
});
//@route POST
//@url: http://localhost:5000/api/user/register
//@desc Register new user
//@access Public
router.post("/register", registerRules(), validator, async (req, res) => {
  const { name, lastName, email, password } = req.body;
  try {
    const { name, email, password } = req.body;

    // Check for existing user
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Create new User
    user = new User({ name, lastName, email, password });

    // Create Salt & hash
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);

    // Replace user password with hashed password
    user.password = hashedPassword;

    // Save the user
    await user.save();

    // sign user
    const payload = {
      id: user._id,
    };

    // Generate token
    const token = await jwt.sign(payload, process.env.secretOrKey, {
      expiresIn: "7 days",
    });

    res.status(200).send({ msg: "User registred with success", user, token });
  } catch (error) {
    res.status(500).send({ msg: "Server Error" });
  }
});

//@route POST
//@url: http://localhost:5000/api/user/login
//@desc Login User
//@access Public
router.post("/login", loginRules(), validator, async (req, res) => {
  const { email, password } = req.body;
  try {
    //simple Validation
    /* if (!email || !password) {
      return res.status(400).send({ msg: 'Please enter all fields' });
    } */

    // Check for existing user
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send({ msg: "Bad Credentials! email" });
    }

    //Check password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).send({ msg: "Bad Credentials! password" });
    }

    // sing user
    const payload = {
      id: user._id,
    };

    // Generate token
    const token = await jwt.sign(payload, process.env.secretOrKey, {
      expiresIn: "7 days",
    });

    res.send({ msg: "Logged in with success", user, token });
  } catch (error) {
    res.status(500).send({ msg: "Server Error" });
  }
});

router.get("/user", isAuth, (req, res) => {
  try {
    res.status(200).json({ user: req.user });
  } catch (error) {
    res.status(500).json({ message: "catch", msg: error.message });
  }
});

router.get("/all", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.status(500).json({ msg: "catch", msg: error.message });
  }
});

module.exports = router;

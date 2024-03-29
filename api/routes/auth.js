const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// Register

router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashPass,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Login

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if(!user){
      res.status(400).json("Wrong Credentials");
      return;
    }

    const validate = await bcrypt.compare(req.body.password, user.password)
    if(!validate){
      res.status(400).json("Wrong Credentials");
      return;
    }

    const{password, ...other} = user;
    res.status(200).json(other._doc);

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

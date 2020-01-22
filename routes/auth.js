const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//generating key for JWT-token
const secretkey = "7edgesec";

//imported User model
const User = require("../model/User");

//creating post-route for user signup
router.post("/signup", async (req, res) => {
  //requesting email from User
  const emailExist = await User.findOne({
    email: req.body.email
  });
  //checking email existence
  if (emailExist) return res.status(500).send("Email is Already exist");
  //Hashing password
  const hashpass = await bcrypt.hash(req.body.password, 10);
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashpass,
    phone: req.body.phone
  });
  user
    .save()
    .then(user => {
      res.status(200).send({ user });
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

//creating post-route for user signin
router.post("/signin", async (req, res) => {
  //requesting email from User
  const user = await User.findOne({
    email: req.body.email
  });
  if (user) {
    //comparing the password input
    if (bcrypt.compareSync(req.body.password, user.password)) {
      const payload = {
        _id: user.id,
        name: user.name,
        phone: user.phone,
        email: user.email
      };
      //generating the token
      let token = jwt.sign(payload, secretkey, {
        expiresIn: 2000
      });
      res.send(token);
    } else {
      res.status(400).send("check your password");
    }
  } else {
    res.status(400).send("email not recognised");
  }
});

//creating post-route for update the user field
router.post("/update/:id", verifyToken, async (req, res) => {
  jwt.verify(req.token, secretkey, {});
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.status(200).send({ updatedUser });
  } catch (err) {
    res.status(400).send(err);
  }
});

//creating get-route for displaying the All users
router.get("/list", verifyToken, async (req, res) => {
  jwt.verify(req.token, secretkey, {});
  try {
    const users = await User.find({});
    res.status(200).send({ users });
  } catch (err) {
    res.status(404).send(err);
  }
});

//creating delete-route for delete the particular user by using id
router.delete("/delete/:id", async (req, res) => {
  await User.findOneAndDelete({ _id: req.params.id })
    .then(doc => {
      res.status(200).send("doc is deleted");
    })
    .catch(err => {
      res.status(400).send("user not found");
    });
});

function verifyToken(req, res, next) {
  //get Auth Header value
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader != "undefined") {
    const bearer = bearerHeader;
    const beareToken = bearer;
    req.token = beareToken;
    next();
  } else {
    res.send(403);
  }
}
module.exports = router;

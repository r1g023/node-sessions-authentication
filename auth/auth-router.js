const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Users = require("../users/users-helper");

router.post("/register", (req, res, next) => {
  const credentials = req.body;
  const hashedPassword = bcrypt.hashSync(credentials.password, 10);
  Users.registerUser({
    email: credentials.email,
    username: credentials.username,
    password: hashedPassword,
  })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => next(err));
});

router.post("/login", (req, res, next) => {
  const credentials = req.body;
  Users.loginUser({ username: credentials.username })
    .then((user) => {
      if (user && bcrypt.compareSync(credentials.password, user.password)) {
        req.session.user = user;
        res.json({ message: `welcome ${credentials.username} have a cookie!` });
      } else {
        res.json({ message: "no acces invalid login credentials" });
      }
    })
    .catch((err) => next(err));
});

//LOGOUT
router.get("/logout", (req, res, next) => {
  console.log("logout user....");
  if (req.session) {
    req.session.destroy((err) => {
      err
        ? res.json({ message: "you can't logout yet" })
        : res.json({ message: "logged out" });
    });
  } else {
    res.json({ message: "this user doesnt exist at all" });
  }
});

module.exports = router;

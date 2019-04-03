const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secrets = require('../api/secrets');
const Users = require("../users/users-model.js");

router.post("/register", async (req, res) => {
  let credentials = req.body;

  try {
    if (credentials.username && credentials.password && credentials.department) {
      const hash = bcrypt.hashSync(credentials.password, 14);
      credentials.password = hash;

      const newUser = await Users.add(credentials);
      res.status(201).json(newUser);
    } else {
      res.status(400).json({ error: "Please include a username, password, and department" });
    }
  } catch (error) {
    res.status(500).json({
      error: "Username already exists or failed to connect to router"
    });
  }
});

router.put("/login", async (req, res) => {
  let { username, password } = req.body;

  try {
    if (username && password) {
      const foundUser = await Users.findBy({ username: username });
      if (foundUser && bcrypt.compareSync(password, foundUser.password)) {
        const token = generateToken(user);

        res.status(200).json({ message: `Welcome ${foundUser.username}. You are now logged in!`, token });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } else {
      res.status(400).json({ error: "Please include a username and password" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// router.get("/logout", (req, res) => {
//   if (req.session.user) {
//     req.session.destroy(error => {
//       if (error) {
//         res.status(500).json({ message: "Server error" });
//       } else {
//         res.status(200).json({ message: "Logged out successfully" });
//       }
//     });
//   } else {
//     res.status(400).json({ message: "You are not logged in!" });
//   }
// });

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    roles: ['student', 'ta'] // this would be a DB call
  };
  const options = {
    expiresIn: "1d"
  };

  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;

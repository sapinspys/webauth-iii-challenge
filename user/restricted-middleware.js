const jwt = require("jsonwebtoken");
const secrets = require('../api/secrets');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secrets.jwtSecret, (error, decodedToken) => {
      if (error) {
        // if token is NOT valid
        res.status(401).json({ message: "Invalid authorization token" });
      } else {
        // token IS valid
        req.decodedJwt = decodedToken // adds all decoded info to REQ, including roles!
        next();
      }
    })
  } else {
    res.status(400).json({ message: "No authorization token provided" });
  }
};



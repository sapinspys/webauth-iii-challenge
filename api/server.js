const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

// Router Imports:
const authRouter = require("../auth/auth-router.js");
const usersRouter = require("../users/users-router.js");

const server = express();

server.use(express.json()); // to enable json res
server.use(helmet());
server.use(cors());

// Logger MW:
server.use(function(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`);

  next();
});

// Endpoints:
server.get("/", (req, res) => {
  res.send("Thanks for visiting the Web Authorization III Challenge API");
});

// Route Handlers:
server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);

// Non-Existant Route MW:
server.use(function(req, res) {
  res.status(404).send("Turn back, route not found.");
});

module.exports = server;

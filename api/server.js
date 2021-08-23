const express = require("express");
const server = express();

//SERVER SESSIONS

//GLOBAL MIDDLEARE

//IPORT ROUTERS
const welcomeRouter = require("../welcome/welcome-router");
const userRouter = require("../users/users-router");

//SERVER Endpoints ------------>
server.use("/", welcomeRouter);
server.use("/api/users", userRouter);

//middleware for CATCH ERROR on all endpoints of /api/messages
server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: "500 error: Something went wrong",
  });
});

module.exports = server;

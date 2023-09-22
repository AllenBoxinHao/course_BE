const { Router } = require("express");
const studentRouter = require("./student.routes.js");
const courseRouter = require("./course.routes.js");
const authRouter = require("./auth.routes.js");
const userRouter = require("./user.routes.js");
const verifyToken = require("../middleware/auth.js");

const v1Router = Router();

v1Router.use("/students", verifyToken, studentRouter);
v1Router.use("/courses", verifyToken, courseRouter);
v1Router.use("/users", userRouter);
v1Router.use("/", authRouter);

module.exports = v1Router;

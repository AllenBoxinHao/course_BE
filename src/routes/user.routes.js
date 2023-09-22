const { Router } = require("express");
const {
    addUser,
    getAllUsers,
    getUserByEmail,
    updateUserByEmail,
    deleteUserByEmail,
} = require("../controllers/user.controller");

const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUserByEmail);
userRouter.post("/", addUser);
userRouter.patch("/", updateUserByEmail);
userRouter.delete("/", deleteUserByEmail);

module.exports = userRouter;

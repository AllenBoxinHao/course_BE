const User = require("../models/user.model");

const addUser = async (req, res, next) => {
    const { username, password, email } = req.body;
    // data validation
    const user = new User({ username, password, email });
    await user.save();
    res.json(user);
};
const getAllUsers = async (req, res) => {
    const users = await User.find().exec();
    res.json(users);
};
const getUserByEmail = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email }).exec();
    if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
    }
    res.json(user);
};
const updateUserByEmail = async (req, res) => {
    const { username, password, email } = req.body;
    const user = await User.findOneAndUpdate(
        { email },
        {
            username,
            password,
            email,
        },
        { new: true }
    ).exec();
    if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
    }
    res.json(user);
};
const deleteUserByEmail = async (req, res) => {
    const { email } = req.body;
    const user = await User.findByIdAndDelete({ email }).exec();
    if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
    }
    res.sendStatus(204);
};

module.exports = {
    addUser,
    getAllUsers,
    getUserByEmail,
    updateUserByEmail,
    deleteUserByEmail,
};

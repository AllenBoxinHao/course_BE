const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    const { username, password, email } = req.body;
    // validation
    if (!(username && email && password)) {
        res.status(400).json({ error: "All input is required" });
    }
    // check if already exists in DB
    const oldUser = await User.findOne({ email }).exec();
    if (oldUser) {
        return res.status(400).json({ error: "User already exists, please login instead" });
    }
    // Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: encryptedPassword });
    // Create token
    const token = jwt.sign({ user_id: user._id, email }, process.env.TOKEN_KEY, {
        expiresIn: "2h",
    });
    // save user token
    user.token = token;

    await user.save();
    res.status(201).json({ _id: user._id, username });
};

const login = async (req, res) => {
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
        res.status(400).json({ error: "All input is required" });
        return;
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const updatedUser = await User.generateAuthToken();
        // user
        res.status(200).json(updatedUser);
        return;
    }
    res.status(401).send("Invalid Credentials");
};

module.exports = {
    register,
    login,
};

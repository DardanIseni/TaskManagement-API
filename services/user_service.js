const User = require('../models/user_model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const {  username, password } = req.body;

        if (!(username && password)) {
            res.status(400).send("All input is required");
        }

        const oldUser = await User.findOne({ where: { username: username } });
        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            ...req.body,
            password: encryptedPassword,
        });

        user.token = jwt.sign(
            {user_id: user._id, username},
            'SECRET_KEY',
            {
                expiresIn: "2h",
            }
        );

        res.status(201).json(user);
    } catch (err) {
        console.log(err);
    }
}

const login = async (req, res) => {
    try {
        // Get user input
        const { username, password } = req.body;

        // Validate user input
        if (!(username && password)) {
            res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await User.findOne({ username });

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                {user_id: user._id, username},
                'SECRET_KEY',
                {
                    expiresIn: "2h",
                }
            );

            res.status(200).json({user,token:token});
        }
        res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    register,
    login
}
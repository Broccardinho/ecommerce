const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const User = require('../models/Users');
const router = express.Router();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

router.post(`/users/register`, async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        const hashedPass = await bcrypt.hash(password, 10); // Ensure this is hashing correctly

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPass,
        })
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Something went wrong' });
    }
})


router.post(`/users/login`, async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        // Find user by email
        const user = await User.findOne({ email: email });
        console.log("User found:", user); // Debugging: Check if user exists

        if (!user) {
            return res.status(401).json({ message: "User does not exist" });
        }

        // Check if password matches
        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Entered Password:", password);
        console.log("Stored Hashed Password:", user.password);
        console.log("Password Match:", isMatch);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Ensure access level is set correctly
        if (user.accessLevel === 0) {
            user.accessLevel = 1;
            await user.save();
        }

        // Generate JWT token
        const token = jwt.sign(
            { userID: user._id, email: user.email, accessLevel: user.accessLevel },
            JWT_SECRET_KEY,
            { algorithm: "HS256", expiresIn: '1h' }
        );

        res.status(200).json({
            message: "User logged in successfully",
            token: token,
            accessLevel: user.accessLevel,
            user: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                accessLevel: user.accessLevel,
            },
            redirect: "/"
        });

    } catch (err) {
        console.error("Error in login:", err);
        res.status(500).json({ message: 'Something went wrong' });
    }
});

module.exports = router;

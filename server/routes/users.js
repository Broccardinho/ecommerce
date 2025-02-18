const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/Users');
const router = express.Router();
// const res = require("express/lib/response");

// router.post(`/users/register`, (req, res) => {
//     User.create({
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         email: req.body.email,
//         password: req.body.password,
//     }, (err, user) => {
//         if (err) {
//             return res.status(500).send({
//                 message: "Something went wrong",
//             })
//         }
//     })
// })

router.post(`/users/register`, async (req, res) => {
    const {firstName, lastName, email, password} = req.body

    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({message: 'All fields are required'})
    }

    try {
        const existingUser = await User.findOne({email: email})
        if (existingUser) {
            return res.status(200).json({message: `User already exists`})
        }

        const hashedPass = await bcrypt.hash(password, 10)

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPass,
        })
        await newUser.save()
        res.status(201).json({message: 'User registered successfully', user: newUser});
    } catch (err) {
        console.log(err);
        return res.status(500).json({message: 'Something went wrong'});
    }
})

// router.post(`/users/login`, (req, res) => {
//     User.findOne({email: req.body.email}, (err, data) => {
//         console.log({
//             "USER DATA" : data
//         })
//
//         if (data) {
//             res.status(200).json({
//                 name: data.name,
//                 email: data.email,
//                 redirect: "/"
//             })
//         } else {
//             res.status(401).json({errorMessage: `User does not exist`})
//         }
//     })
// })

router.post(`/users/login`, async (req, res) => {
    const {email, password} = req.body


    if (!email || !password) {
        return res.status(400).json({message: "Email and password are required"})
    }

    try {
        const user = await User.findOne({email})
        if (!user) {
            return res.status(401).json({message: "User does not exist"})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({message: "Invalid credentials"})
        }

        const token = jwt.sign(
            {userID: user._id, email: user.email},
            process.env.JWT_SECRET_KEY,
            {expiresIn: '1h'}
        )

        res.status(200).json({
            message: "User logged in successfully",
            token: token,
            user: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            },
            redirect: "/"
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'Something went wrong'})
    }
})


// router.post(`/users/logout`, (req, res) => {
//     res.json({message: "Logged out successfully"})
// })

module.exports = router;
const router = require(`express`).Router()
const usersModel = require(`../models/Users`)
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

console.log(usersModel)


router.post(`/users/register/:name/:email/:password`, (req, res) => {
    // If a user with this email does not already exist, then create new user
    usersModel.findOne({email: req.params.email}, (uniqueError, uniqueData) => {
        if (uniqueData) {
            res.json({errorMessage: `User already exists`})
        } else {
            bcrypt.hash(req.params.password, parseInt(process.env.PASSWORD_HASH_SALT_ROUNDS), (err, hash) => {
                usersModel.create({name: req.params.name, email: req.params.email, password: hash}, (error, data) => {
                    if (data) {
                        const token = jwt.sign({
                            email: data.email,
                            accessLevel: data.accessLevel
                        }, process.env.JWT_PRIVATE_KEY, {algorithm: 'HS256', expiresIn: process.env.JWT_EXPIRY})

                        res.json({name: data.name, accessLevel: data.accessLevel, token: token})
                    } else {
                        res.json({errorMessage: `User was not registered`})
                    }
                })
            })
        }
    })
})

router.post(`/users/login`, (req, res) => {
    // console.log(req.body)
    usersModel.findOne({email: req.body.email}, (err, data) => {
        console.log({
            "USER DATA" : data
        })

        if (data) {
            res.status(200).json({
                name: data.name,
                email: data.email,
                redirect: "/"
            })
        } else {
            res.status(401).json({errorMessage: `User does not exist`})
        }
    })
})

router.post(`/users/logout`, (req, res) => {
    res.json({})
})


module.exports = router;
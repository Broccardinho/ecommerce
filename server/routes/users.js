const router = require(`express`).Router()
const usersModel = require(`../models/Users`)
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post(`/users/register`, (req, res) => {
    usersModel.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
    }, (err, user) => {
        if (err) {
            return res.status(500).send({
                message: "Something went wrong",
            })
        }
    })
})

router.post(`/users/login`, (req, res) => {
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
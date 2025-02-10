const router = require(`express`).Router()

const usersModel = require(`../models/users`)


// IMPORTANT
// Obviously, in a production release, you should never have the code below, as it allows a user to delete a database collection
// The code below is for development testing purposes only
router.post(`/users/reset_user_collection`, (req, res) =>
{
    usersModel.deleteMany({}, (error, data) =>
    {
        if (data)
        {
            res.json(data)
        } else
        {
            res.json({errorMessage: `Failed to delete "user" collection for testing purposes`})
        }
    })
})


router.post(`/users/register/:name/:email/:password`, (req, res) =>
{
    // If a user with this email does not already exist, then create new user
    usersModel.findOne({email: req.params.email}, (uniqueError, uniqueData) =>
    {
        if (uniqueData)
        {
            res.json({errorMessage: `User already exists`})
        } else
        {
            usersModel.create({name: req.params.name, email: req.params.email, password: req.params.password}, (error, data) =>
            {
                if (data)
                {
                    res.json({name: data.name})
                } else
                {
                    res.json({errorMessage: `User was not registered`})
                }
            })
        }
    })
})


module.exports = router
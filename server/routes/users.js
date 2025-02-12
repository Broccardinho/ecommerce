const router = require(`express`).Router()
const usersModel = require(`../models/users`)
const bcrypt = require(`bcryptjs`)
const jwt = require(`jsonwebtoken`)



router.post(`/users/reset_user_collection`, (req,res) =>
{
    usersModel.deleteMany({}, (error, data) =>
    {
        if(data)
        {
            const adminPassword = `123!"£qweQWE`
            bcrypt.hash(adminPassword, parseInt(process.env.PASSWORD_HASH_SALT_ROUNDS), (err, hash) =>
            {
                usersModel.create({name:"Administrator",email:"admin@admin.com",password:hash}, (createError, createData) =>
                {
                    if(createData)
                    {
                        res.json(createData)
                    }
                    else
                    {
                        res.json({errorMessage:`Failed to create Admin user for testing purposes`})
                    }
                })
            })
        }
        else
        {
            res.json({errorMessage:`User is not logged in`})
        }
    })
})



// router.post(`/users/register/:name/:email/:password`, (req,res) => {
//     // If a user with this email does not already exist, then create new user
//     usersModel.findOne({email:req.params.email}, (uniqueError, uniqueData) =>
//     {
//         if(uniqueData)
//         {
//             res.json({errorMessage:`User already exists`})
//         }
//         else
//         {
//             bcrypt.hash(req.params.password, parseInt(process.env.PASSWORD_HASH_SALT_ROUNDS), (err, hash) =>
//             {
//                 if(err){
//                     return res.json({errorMessage:"Error hashing password"})
//                 }
//                 usersModel.create({name:req.params.name,email:req.params.email,password:hash}, (error, data) =>
//                 {
//                     if(data)
//                     {
//                         res.json({name: data.name})
//                     }
//                     else
//                     {
//                         res.json({errorMessage:`User was not registered`})
//                     }
//                 })
//             })
//         }
//     })
// })

router.post(`/users/login/:email/:password`,(req,res) => {

    usersModel.findOne({email:req.params.email}, (error, user) =>{
        if(!user){
            res.json({errorMessage:`Invalid email or password`})
        }else{
            bcrypt.compare(req.params.password, user.password, (err, match) =>{
                if(match){
                    const token = jwt.sign({id:user.id},process.env.JWT_SECRET,{expiresIn: '1h'})
                    res.json({token,user: {name:user.name, email:user.email}})
                }else{
                    res.json({errorMessage:`Invalid email or password`})
                }
            })
        }
    })
})

module.exports = router
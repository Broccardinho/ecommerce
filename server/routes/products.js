const router = require(`express`).Router()
const Product = require("../models/Products")


router.get('/', async (req, res) => {
    Product.find((err, data) => {
        if (err) {
            console.log(err)
        }

        res.json(data)
    })
})

module.exports = router
const mongoose = require(`mongoose`)

let cartsSchema = new mongoose.Schema(
    {
        userID: {type: Number},
        productID: {type: Number},
    },
    {
        collection: `carts`
    })

module.exports = mongoose.model(`carts`, productsSchema)
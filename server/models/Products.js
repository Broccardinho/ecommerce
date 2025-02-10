const mongoose = require(`mongoose`)

let productsSchema = new mongoose.Schema(
    {
        name: {type: String},
        category: {type: String},
        price: {type: Number},
        brand: {type: String},
        stock: {type: Number},
    },
    {
        collection: `products`
    })

module.exports = mongoose.model(`products`, productsSchema)
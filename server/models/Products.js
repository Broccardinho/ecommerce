const mongoose = require(`mongoose`)

let productsSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        category: {type: String, required: true},
        imgURL: {type: String, required: true},//IMAGE HERE - Cal :)
        price: {type: Number, required: true, min: 0},
        brand: {type: String, required: true},
        stock: {type: Number, required: true, min: 0},
        description: {type: String, required: true}
    },
    {
        collection: `products`
    })

module.exports = mongoose.model(`products`, productsSchema)
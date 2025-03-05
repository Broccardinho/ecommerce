
const router = require('express').Router();
const Product = require("../models/Products");

// Get all products
// router.get('/', async (req, res) => {
//     try {
//         const data = await Product.find(); // Use async/await instead of callback
//         res.json(data);
//     } catch (err) {
//         console.error("Error fetching products:", err); // Improved error logging
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

// Get all products from `/products` route
router.get('/products', async (req, res) => {
    console.log("line 17")
    try {
        const data = await Product.find(); // Use async/await
        res.json(data);
    } catch (err) {
        console.error("Error fetching products from /products route:", err); // Improved error logging
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get('/products/:productId', async (req, res) => {
    try{
        const product = await Product.findById(req.params.productId);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json(product);
    }catch (err){
        console.error("Error fetching product by ID:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
})
module.exports = router;

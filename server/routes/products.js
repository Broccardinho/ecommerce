const router = require('express').Router();
const Product = require("../models/Products");
const {isAdmin} = require("../middleware/auth");

// Get all products from `/products` route
router.get('/products', async (req, res) => {
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
router.put('/products/:productId', isAdmin, async (req, res) => {
    try {
        const {name, category, imageURL, price, brand, stock, description} = req.body;

        if (!name || !category || !imageURL || !price || !brand || !stock || !description) {
            return res.status(400).json({error: "Missing required fields"});
        }
        if (price < 0 || stock < 0) {
            return res.status(400).json({error: "Price and stock must be greater than 0"});
        }
        const product = await Product.findByIdAndUpdate(
            req.params.productId,
            {name, category, imageURL, price, brand, stock, description},
            {new: true});

        if (!product) {
            return res.status(404).json({error: "Product not found"});
        }
        res.json({message: "Product successfully updated",product});
    }catch(err){
        console.error("Error updating product by ID:", err);
        res.status(500).json({error: "Internal Server Error"});
    }
})

router.delete('/products/:productId', isAdmin, async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.productId);
        if (!product) {
            return res.status(404).json({error: "Product not found"});
        }
        res.json({message: "Product deleted successfully"})
    } catch (err) {
        console.log("Error deleting product by ID:", err)
        res.status(500).json({error: "Internal Server Error"})
    }
})

module.exports = router;
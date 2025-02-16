const router = require('express').Router();
const Product = require("../models/Products");

// Get all products
router.get('/', async (req, res) => {
    try {
        const data = await Product.find(); // Use async/await instead of callback
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
});

// Get all products from `/products` route
router.get('/products', async (req, res) => {
    try {
        const data = await Product.find(); // Use async/await
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

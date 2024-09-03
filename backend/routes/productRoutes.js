const express = require("express");
const Product = require("../models/product");
const Popular = require("../models/PopularProduct.js")
const { verifyToken } = require("../utils/verifyToken.js");
const PopularProduct = require("../models/PopularProduct.js");

const router = express.Router();

// Get all products
router.get("/", verifyToken, async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
});

router.get("/popular", async (req, res) => {

const pop_products = await Popular.find().populate("products");

res.send(pop_products)
})

module.exports = router;

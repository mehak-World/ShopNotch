const express = require("express");
const Category = require("../models/category");
const { verifyToken, verifyAdminToken } = require("../utils/verifyToken.js");

const router = express.Router();

// Get all categories
router.get("/", verifyToken, async (req, res) => {
    try {
        const categories = await Category.find().populate({
            path: "subcategories",
            populate: "products"
        }).populate("products");
        res.json(categories);
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
});

router.get("/admin", verifyAdminToken, async (req, res) => {
    try {
        const categories = await Category.find().populate({
            path: "subcategories",
            populate: "products"
        }).populate("products");
        res.json(categories);
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
});




module.exports = router;

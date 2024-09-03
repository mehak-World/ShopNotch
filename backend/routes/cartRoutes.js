const express = require("express");
const Cart = require("../models/Cart");
const { verifyToken } = require("../utils/verifyToken.js");

const router = express.Router();

// Add item to cart
router.post("/addItem", verifyToken, async (req, res) => {
    const { quantity, id } = req.body;

    try {
        let user_cart = await Cart.findOne({ user_id: req.user.id });

        if (user_cart) {
            const productIndex = user_cart.items.findIndex(item => item.product.toString() === id);
            if (productIndex > -1) {
                user_cart.items[productIndex].quantity += parseInt(quantity, 10);
            } else {
                user_cart.items.push({ product: id, quantity: parseInt(quantity, 10) });
            }
        } else {
            user_cart = new Cart({
                user_id: req.user.id,
                items: [{ product: id, quantity: parseInt(quantity, 10) }]
            });
        }
        const updatedCart = await user_cart.save();
        res.json(updatedCart);
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
});

// Delete item from cart
router.post("/deleteItem", verifyToken, async (req, res) => {
    const { id } = req.body;

    try {
        let user_cart = await Cart.findOne({ user_id: req.user.id });
        const productIndex = user_cart.items.findIndex(item => item.product.toString() === id);
        if (productIndex > -1) {
            user_cart.items.splice(productIndex, 1);
            const result = await user_cart.save();
            res.json({ success: true, message: "Product deleted successfully" });
        } else {
            res.status(404).json({ success: false, message: "Product not found in cart" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
});

// Update cart
router.post("/update", verifyToken, async (req, res) => {
    const { id, quantity } = req.body;

    try {
        const user_cart = await Cart.findOne({ user_id: req.user.id });
        const productIndex = user_cart.items.findIndex(item => item.product.toString() === id);
        if (productIndex > -1) {
            user_cart.items[productIndex].quantity = quantity;
            const result = await user_cart.save();
            res.json(result);
        } else {
            res.status(404).json({ success: false, message: "Product not found in cart" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
});

// Get cart
router.get("/", verifyToken, async (req, res) => {
    try {
        const data = await Cart.find({ user_id: req.user.id }).populate({
            path: "items",
            populate: "product"
        });
        res.json(data);
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
});

module.exports = router;

const mongoose = require("mongoose");

const popularProductSchema = new mongoose.Schema({
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
})

module.exports = mongoose.model("Popular", popularProductSchema)
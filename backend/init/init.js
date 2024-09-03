const mongoose = require('mongoose');
const db_connect = require("../utils/database_setup")
const Category = require("../models/category")
const Product = require("../models/category")

db_connect()

// Data generation function
const generateData = async () => {
    try {
        // Clear existing data
        await Category.deleteMany({});
        await Product.deleteMany({});

        // Define categories and subcategories
        const categories = [
            { name: 'Gaming', subcategories: [] },
            { name: 'Beauty', subcategories: [] },
            { name: 'Fashion', subcategories: ['Jeans', 'Shoes', 'Dress', 'Tops'] },
            { name: 'School supplies', subcategories: [] },
            { name: 'Toys', subcategories: [] },
            { name: 'Home arrivals', subcategories: ['Decor', 'Home improvement', 'Kitchen and dining', 'Bedding and bath'] },
        ];

        // Generate categories and subcategories
        for (const cat of categories) {
            const category = new Category({ name: cat.name });

            await category.save();

            // If subcategories exist, generate them
            for (const subcat of cat.subcategories) {
                const subcategory = new Category({ name: subcat, parentCategory: category._id });
                await subcategory.save();

                category.subcategories.push(subcategory._id);
            }

            await category.save();
        }

        // Generate products for each category and subcategory
        const products = [
            { name: 'Gaming Chair', price: 199.99, category: 'Gaming' },
            { name: 'Gaming Console', price: 499.99, category: 'Gaming' },
            { name: 'Lipstick', price: 19.99, category: 'Beauty' },
            { name: 'Skinny Jeans', price: 49.99, category: 'Jeans' },
            { name: 'Running Shoes', price: 79.99, category: 'Shoes' },
            { name: 'Summer Dress', price: 39.99, category: 'Dress' },
            { name: 'Casual Tops', price: 29.99, category: 'Tops' },
            { name: 'Notebooks', price: 5.99, category: 'School supplies' },
            { name: 'Action Figures', price: 14.99, category: 'Toys' },
            { name: 'Wall Art', price: 59.99, category: 'Decor' },
            { name: 'Tool Kit', price: 79.99, category: 'Home improvement' },
            { name: 'Cookware Set', price: 129.99, category: 'Kitchen and dining' },
            { name: 'Comforter Set', price: 89.99, category: 'Bedding and bath' },
        ];

        for (const prod of products) {
            // Find the relevant category or subcategory
            const category = await Category.findOne({ name: prod.category });

            if (category) {
                const product = new Product({
                    name: prod.name,
                    price: prod.price,
                    category: category._id,
                    image: `https://via.placeholder.com/150?text=${encodeURIComponent(prod.name)}`, // Placeholder image
                });

                await product.save();
                category.products.push(product._id);
                await category.save();
            }
        }

        console.log('Data generation complete');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error generating data:', error);
        mongoose.connection.close();
    }
};

generateData();

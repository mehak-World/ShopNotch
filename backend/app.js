const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const path = require("path");
const cors = require("cors");
const jwt = require("jsonwebtoken")
require('dotenv').config();

const db_connect = require("./utils/database_setup");
const userRoutes = require("./routes/userRoute");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const adminRoutes = require("./routes/adminRoutes");

// Initialize express app
const app = express();
db_connect();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/public', express.static(path.join(__dirname, 'public')));

// Passport configuration
require('./config/passportConfig')(passport);

// Routes
app.use("/", userRoutes);
app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/upload", uploadRoutes);
app.use("/admin", adminRoutes);

app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    function (req, res) {
        const token = jwt.sign({ id: req.user._id }, 'mysecret', { expiresIn: '1h' });
        res.redirect(`http://localhost:3000/browse?token=${token}`);
    });

app.get("/authSuccess", (req, res) => {
    res.send("Authorization is successful");
});


// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({ success: false, message });
});

// Start server
app.listen(8080, () => {
    console.log("The server is listening");
});

// routes/userRoutes.js
const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { verifyToken } = require("../utils/verifyToken.js");

const router = express.Router();

// Sign-up route
router.post("/signup", (req, res, next) => {
    const { username, password } = req.body;
    console.log(req.body);
    const user = new User({ username });

    User.register(user, password, (err, result) => {
        console.log(err);
        if (result) {
            console.log(result);
            const token = jwt.sign({ id: user._id, username: user.username },process.env.TOKEN_SECRET, { expiresIn: "1h" });
            return res.json({ success: true, token: `Bearer ${token}` });
        }
        if (err) {
            next(err);
        }
    });
});

router.get("/getUser", verifyToken, async (req, res) => {
    
    const user = await User.findById(req.user.id)
    res.send(user);
})


router.get('/getUserImg', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user || !user.image) {
            return res.status(404).send('Image not found');
        }

        // Construct the URL of the image
        const imageUrl = `/public/images/uploads/${user.image}` 
        console.log(imageUrl)
        res.json({ imageUrl });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});



// Login route
router.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            return next(err); // Pass error to the error handler
        }
        if (!user) {
            return res.status(401).json({ message: info.message || "Invalid username or password" });
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err); // Pass error to the error handler
            }

            const token = jwt.sign({ id: user._id, username: user.username }, "mysecret", { expiresIn: "1h" });
            return res.json({ success: true, token: `Bearer ${token}` });
        });
    })(req, res, next);
});

// Protected route example
router.get("/protected-route", verifyToken, (req, res) => {
    res.json({
        message: "This is a protected route",
        user: req.user // The user data from the token
    });
});

// Logout route
router.get("/logout", (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.send({ success: true, message: "Logout successful" });
    });
});

module.exports = router;

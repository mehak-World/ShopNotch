const jwt = require("jsonwebtoken");
require('dotenv').config();


const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log("auth: ", authHeader)
    let token = authHeader && authHeader.split(' ')[2];
    console.log(token)
    if (!token) {
        token = authHeader && authHeader.split(' ')[1];
        if (!token) return res.sendStatus(401);
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};


const verifyAdminToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log("auth: ", authHeader)
    let token = authHeader && authHeader.split(' ')[2];
    console.log(token)
    if (!token) {
        token = authHeader && authHeader.split(' ')[1];
        if (!token) return res.sendStatus(401);
    }

    jwt.verify(token, process.env.ADMIN_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

module.exports = { verifyToken, verifyAdminToken};

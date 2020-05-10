const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require("express-validator");

const { User } = require('../db/models');
const { asyncHandler, handleValidationErrors } = require('../utils');
const { getUserToken, requireAuth } = require('../auth');

const router = express.Router();

const validateEmailAndPassword = [
    check('email')
        .exists({ checkFalsy: true })
        .withMessage('Please enter an email.')
        .isEmail()
        .withMessage('Please enter a valid email.'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please give a password.'),
    handleValidationErrors
];

const validateUsername = [
    check("username")
        .exists({ checkFalsy: true })
        .withMessage("Please provide a username."),
]

router.post('/users', validateUsername, validateEmailAndPassword, asyncHandler(async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ userName: username, userEmail: email, hashedPassword });
    const token = getUserToken(user);
    res.json({ token, user: { id: user.id } });
}));

router.put('/users', validateEmailAndPassword, handleValidationErrors, asyncHandler(async (req, res, next) => {
    // Get values from form:
    const { email, password } = req.body;

    // Find user with email:
    const user = await User.findOne({ where: { userEmail: email } });

    // If user is not found or password does not match, make new error object:
    if (!user || !user.validatePassword(password)) {
        const err = new Error("Login failed");
        err.status = 401;
        err.title = "Login failed";
        err.errors = ["The provided credentials were invalid."];

        return next(err);
    }

    // Generate JWT token and send JSON response with token and user ID
    const token = getUserToken(user);
    res.json({ token, user: { id: user.id, name: user.userName }, });
}));


module.exports = router;
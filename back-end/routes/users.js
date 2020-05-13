const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require("express-validator");

const { User, Project } = require('../db/models');
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
    check("name")
        .exists({ checkFalsy: true })
        .withMessage("Please provide a username."),
]

router.post('/users', validateUsername, validateEmailAndPassword, asyncHandler(async (req, res, next) => {
    // try {
    const { name, email, password } = req.body;
    console.log(name);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, hashedPassword });
    const token = getUserToken(user);
    res.json({ token, user: { id: user.id } });
    // } catch (e) {
    //     console.log(e)
    // }
}));

router.put('/users', validateEmailAndPassword, handleValidationErrors, asyncHandler(async (req, res, next) => {
    // Get values from form:
    try {
        const { email, password } = req.body;

        // Find user with email:
        const user = await User.findOne({ where: { email } });

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
        res.json({ token, user: { id: user.id }, });
    } catch (e) { console.log(e) }
}));


// router.get('/projects/:projectId/users', asyncHandler(async (req, res) => {
//     const projectId = parseInt(req.params.projectId, 10);

//     const users = await Project.findByPk(projectId, { include: User })

//     res.json({ users })

// }))


module.exports = router;
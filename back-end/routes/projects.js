const express = require('express');
const { check } = require("express-validator");
const { requireAuth } = require('../auth');

const { Project, User } = require('../db/models');
const { asyncHandler, handleValidationErrors } = require('../utils');

const router = express.Router();

// router.use(requireAuth);

router.get('/users/:userId/projects', asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.userId, 10);

    const projects = await User.findByPk(userId, { include: Project });

    res.json({ projects })
}))


module.exports = router;
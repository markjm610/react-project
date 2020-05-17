const express = require('express');
const { check } = require("express-validator");
const { requireAuth } = require('../auth');

const { UsersProject, Invite } = require('../db/models');
const { asyncHandler, handleValidationErrors } = require('../utils');

const router = express.Router();

// router.use(requireAuth);

router.post('/usersprojects', asyncHandler(async (req, res, next) => {
    const { userId, projectId, inviteId } = req.body;

    await UsersProject.create({ userId: userId, projectId: projectId })

    const invite = await Invite.findByPk(inviteId)
    await invite.destroy()

    res.json({ message: 'confirmed' })
}))

module.exports = router;
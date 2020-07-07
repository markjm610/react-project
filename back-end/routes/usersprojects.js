const express = require('express');
const { check } = require("express-validator");
const { requireAuth } = require('../auth');

const { UsersProject, Invite } = require('../db/models');
const { asyncHandler, handleValidationErrors } = require('../utils');

const router = express.Router();

// router.use(requireAuth);

router.post('/usersprojects', asyncHandler(async (req, res, next) => {
    const { userId, projectId, inviteId, position } = req.body;

    await UsersProject.create({ userId: userId, projectId: projectId, position: position })

    const invite = await Invite.findByPk(inviteId)
    await invite.destroy()

    res.json({ message: 'confirmed' })
}))

router.delete('/usersprojects/:userId/:projectId', asyncHandler(async (req, res, next) => {
    const userId = parseInt(req.params.userId, 10)
    const projectId = parseInt(req.params.projectId, 10)

    const association = await UsersProject.findOne({ where: { userId, projectId } })
    await association.destroy()
    res.json({ message: 'left project' })
}))

module.exports = router;
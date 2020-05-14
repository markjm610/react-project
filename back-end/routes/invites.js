const express = require('express');
const { check } = require("express-validator");
const { requireAuth } = require('../auth');

const { Invite, Project, User } = require('../db/models');
const { asyncHandler, handleValidationErrors } = require('../utils');

const router = express.Router();

// router.use(requireAuth);


router.put('/users/invites', asyncHandler(async (req, res, next) => {
    const { inviteReceiver, inviteSender, projectId } = req.body;

    const newInvite = await Invite.create({ inviteReceiver, inviteSender, projectId })

    res.json({ newInvite })
}))

router.get('/users/:userId/invites', asyncHandler(async (req, res, next) => {
    const userId = parseInt(req.params.userId, 10);

    // Switch to storing name of invite sender in Invites table

    const invites = await Invite.findAll(
        {
            where: { inviteReceiver: userId },
            include: Project
        })

    res.json({ invites })
}))


module.exports = router;
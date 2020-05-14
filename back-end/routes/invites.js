const express = require('express');
const { check } = require("express-validator");
const { requireAuth } = require('../auth');

const { Invite } = require('../db/models');
const { asyncHandler, handleValidationErrors } = require('../utils');

const router = express.Router();

// router.use(requireAuth);


router.put('/users/invites', asyncHandler(async (req, res, next) => {
    const { inviteReceiver, inviteSender, projectId } = req.body;

    const newInvite = await Invite.create({ inviteReceiver, inviteSender, projectId })

    res.json({ newInvite })
}))



module.exports = router;
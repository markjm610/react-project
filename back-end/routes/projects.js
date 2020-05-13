const express = require('express');
const { check } = require("express-validator");
const { requireAuth } = require('../auth');

const { Project, User, Column, Task } = require('../db/models');
const { asyncHandler, handleValidationErrors } = require('../utils');

const router = express.Router();

// router.use(requireAuth);

router.get('/users/:userId/projects', asyncHandler(async (req, res, next) => {
    const userId = parseInt(req.params.userId, 10);

    const projects = await User.findByPk(userId, { include: { model: Project } });

    res.json({ projects })
}))

router.get('/projects/:projectId/users', asyncHandler(async (req, res, next) => {
    const projectId = parseInt(req.params.projectId, 10);

    const projects = await Project.findByPk(projectId,
        {
            include:
            {
                model: User
            }

        });

    res.json({ projects })



}))




module.exports = router;
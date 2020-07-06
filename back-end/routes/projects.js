const express = require('express');
const { check } = require("express-validator");
const { requireAuth } = require('../auth');

const { Project, User, Column, Task, UsersProject } = require('../db/models');
const { asyncHandler, handleValidationErrors } = require('../utils');

const router = express.Router();

// router.use(requireAuth);

router.get('/users/:userId/projects', asyncHandler(async (req, res, next) => {
    const userId = parseInt(req.params.userId, 10);

    const projects = await User.findByPk(userId, { include: { model: Project }, order: [[Project, UsersProject, 'position']] });

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

router.post('/users/:userId/projects', asyncHandler(async (req, res, next) => {
    const userId = parseInt(req.params.userId, 10);
    const { name, position } = req.body;
    const newProject = await Project.create({ name, creatorId: userId })
    const newUsersProject = await UsersProject.create({ userId, projectId: newProject.id, position })
    await Column.create({ name: 'Completed', pagePosition: 0, projectId: newProject.id })
    res.json({ newProject, newUsersProject })
}))

router.get('/projects/:projectId', asyncHandler(async (req, res, next) => {
    const projectId = parseInt(req.params.projectId, 10);

    const projectInfo = await Project.findByPk(projectId, {
        include:
        {
            model: Column,
            include: {
                model: Task,
            }
        }, order: [[Column, 'pagePosition'], [Column, Task, 'columnPosition']]
    })

    res.json({ projectInfo })

}))

router.put('/projects', asyncHandler(async (req, res, next) => {
    try {
        const { sendArr } = req.body;

        sendArr.forEach(async (project) => {
            await UsersProject.update(
                { position: project.UsersProject.position },
                { where: { projectId: project.id } });
        })
        res.json({ message: 'success' })
    } catch (e) {
        console.error(e)
    }


}))


module.exports = router;
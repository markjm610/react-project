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

router.get('/users/:userId/projects/instructions', asyncHandler(async (req, res, next) => {

    const userId = parseInt(req.params.userId, 10)

    const newProject = await Project.create({ name: 'Using the site', creatorId: userId })
    const newUsersProject = await UsersProject.create({ userId: userId, projectId: newProject.id, position: 0 })
    const completedColumn = await Column.create({ name: 'Completed', pagePosition: 3, projectId: newProject.id })
    const completedTask = await Task.create({
        heading: 'heading',
        description: 'I have been completed. Click the trash icon to delete me forever.',
        columnPosition: 0,
        columnId: completedColumn.id,
        creatorId: userId
    })
    const tasksColumn = await Column.create({ name: 'Tasks', pagePosition: 0, projectId: newProject.id })
    const task0 = await Task.create({
        heading: 'heading',
        description: 'Welcome to Taskflow!',
        columnPosition: 0,
        columnId: tasksColumn.id,
        creatorId: userId
    })
    const task1 = await Task.create({
        heading: 'heading',
        description: "Taskflow lets you and your team manage projects together.",
        columnPosition: 1,
        columnId: tasksColumn.id,
        creatorId: userId
    })
    const task2 = await Task.create({
        heading: 'heading',
        description: "Create a task by clicking the plus sign to the left of the column name.",
        columnPosition: 2,
        columnId: tasksColumn.id,
        creatorId: userId
    })
    const task3 = await Task.create({
        heading: 'heading',
        description: "Drag tasks and drop them in any column. They'll stay there when you reload or switch projects.",
        columnPosition: 3,
        columnId: tasksColumn.id,
        creatorId: userId
    })
    const task4 = await Task.create({
        heading: 'heading',
        description: "When a task is complete, move it over to the completed column to delete it.",
        columnPosition: 4,
        columnId: tasksColumn.id,
        creatorId: userId
    })
    const task5 = await Task.create({
        heading: 'heading',
        description: "Right of a column's name is the ABC button. Click it to alphabetize its tasks. Pretty cool, huh?",
        columnPosition: 5,
        columnId: tasksColumn.id,
        creatorId: userId
    })
    const task6 = await Task.create({
        heading: 'heading',
        description: "Right of the ABC is an X. Try clicking it. Don't worry - these tasks aren't going anywhere.",
        columnPosition: 6,
        columnId: tasksColumn.id,
        creatorId: userId
    })
    const task7 = await Task.create({
        heading: 'heading',
        description: "Click any task to move it up to the top spot in its column.",
        columnPosition: 7,
        columnId: tasksColumn.id,
        creatorId: userId
    })

    const columnsColumn = await Column.create({ name: 'Columns', pagePosition: 1, projectId: newProject.id })
    const columnsTask0 = await Task.create({
        heading: 'heading',
        description: "Columns can be moved around, too.",
        columnPosition: 0,
        columnId: columnsColumn.id,
        creatorId: userId
    })
    const columnsTask1 = await Task.create({
        heading: 'heading',
        description: "In the bottom right of the working area is the button to create a column.",
        columnPosition: 1,
        columnId: columnsColumn.id,
        creatorId: userId
    })
    const projectsColumn = await Column.create({ name: 'Projects', pagePosition: 2, projectId: newProject.id })
    const projectsTask0 = await Task.create({
        heading: 'heading',
        description: "Your list of projects is on the left sidebar and can be rearranged too.",
        columnPosition: 0,
        columnId: projectsColumn.id,
        creatorId: userId
    })
    const projectsTask1 = await Task.create({
        heading: 'heading',
        description: "Five projects can be in the sidebar at a time. After that, the projects overflow into another list.",
        columnPosition: 1,
        columnId: projectsColumn.id,
        creatorId: userId
    })
    const projectsTask2 = await Task.create({
        heading: 'heading',
        description: "Projects can be dragged between lists. See what happens if you try to add too many to the main list.",
        columnPosition: 2,
        columnId: projectsColumn.id,
        creatorId: userId
    })
    const projectsTask3 = await Task.create({
        heading: 'heading',
        description: "Share projects by inviting team members! On top of the right sidebar, you'll find the invite button.",
        columnPosition: 3,
        columnId: projectsColumn.id,
        creatorId: userId
    })
    const projectsTask4 = await Task.create({
        heading: 'heading',
        description: "The notification icon in the top left will let you see any projects you've been invited to.",
        columnPosition: 4,
        columnId: projectsColumn.id,
        creatorId: userId
    })

    res.json({ newProject, newUsersProject })


}))


module.exports = router;
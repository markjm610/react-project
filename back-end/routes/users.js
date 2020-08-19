const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require("express-validator");

const { User, Invite, UsersProject, Project, Column, Task } = require('../db/models');
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
    try {
        const { name, email, password } = req.body;
        // console.log(name);
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, hashedPassword });

        const token = getUserToken(user);


        if (user && token) {

            const newProject = await Project.create({ name: 'Using the site', creatorId: user.id })
            const newUsersProject = await UsersProject.create({ userId: user.id, projectId: newProject.id, position: 0 })
            const completedColumn = await Column.create({ name: 'Completed', pagePosition: 3, projectId: newProject.id })
            const completedTask = await Task.create({
                heading: 'heading',
                description: 'I have been completed. Click the trash icon to delete me forever.',
                columnPosition: 0,
                columnId: completedColumn.id,
                creatorId: user.id
            })
            const tasksColumn = await Column.create({ name: 'Tasks', pagePosition: 0, projectId: newProject.id })
            const task0 = await Task.create({
                heading: 'heading',
                description: 'Welcome to Taskflow!',
                columnPosition: 0,
                columnId: tasksColumn.id,
                creatorId: user.id
            })
            const task1 = await Task.create({
                heading: 'heading',
                description: "Taskflow lets you and your team manage projects together.",
                columnPosition: 1,
                columnId: tasksColumn.id,
                creatorId: user.id
            })
            const task2 = await Task.create({
                heading: 'heading',
                description: "Create a task by clicking the plus sign to the left of the column name.",
                columnPosition: 2,
                columnId: tasksColumn.id,
                creatorId: user.id
            })
            const task3 = await Task.create({
                heading: 'heading',
                description: "Drag tasks and drop them in any column. They'll stay there when you reload or switch projects.",
                columnPosition: 3,
                columnId: tasksColumn.id,
                creatorId: user.id
            })
            const task4 = await Task.create({
                heading: 'heading',
                description: "When a task is complete, move it over to the completed column to delete it.",
                columnPosition: 4,
                columnId: tasksColumn.id,
                creatorId: user.id
            })
            const task5 = await Task.create({
                heading: 'heading',
                description: "Right of a column's name is the ABC button. Click it to alphabetize its tasks. Pretty cool, huh?",
                columnPosition: 5,
                columnId: tasksColumn.id,
                creatorId: user.id
            })
            const task6 = await Task.create({
                heading: 'heading',
                description: "Right of the ABC is an X. Try clicking it. Don't worry - these tasks aren't going anywhere.",
                columnPosition: 6,
                columnId: tasksColumn.id,
                creatorId: user.id
            })
            const task7 = await Task.create({
                heading: 'heading',
                description: "Click any task to move it up to the top spot in its column.",
                columnPosition: 7,
                columnId: tasksColumn.id,
                creatorId: user.id
            })

            const columnsColumn = await Column.create({ name: 'Columns', pagePosition: 1, projectId: newProject.id })
            const columnsTask0 = await Task.create({
                heading: 'heading',
                description: "Columns can be moved around, too.",
                columnPosition: 0,
                columnId: columnsColumn.id,
                creatorId: user.id
            })
            const columnsTask1 = await Task.create({
                heading: 'heading',
                description: "In the bottom right of the working area is the button to create a column.",
                columnPosition: 1,
                columnId: columnsColumn.id,
                creatorId: user.id
            })
            const projectsColumn = await Column.create({ name: 'Projects', pagePosition: 2, projectId: newProject.id })
            const projectsTask0 = await Task.create({
                heading: 'heading',
                description: "Your list of projects is on the left sidebar and can be rearranged too.",
                columnPosition: 0,
                columnId: projectsColumn.id,
                creatorId: user.id
            })
            const projectsTask1 = await Task.create({
                heading: 'heading',
                description: "Five projects can be in the sidebar at a time. After that, the projects overflow into another list.",
                columnPosition: 1,
                columnId: projectsColumn.id,
                creatorId: user.id
            })
            const projectsTask2 = await Task.create({
                heading: 'heading',
                description: "Projects can be dragged between lists. See what happens if you try to add too many to the main list.",
                columnPosition: 2,
                columnId: projectsColumn.id,
                creatorId: user.id
            })
            const projectsTask3 = await Task.create({
                heading: 'heading',
                description: "Share projects by inviting team members! On top of the right sidebar, you'll find the invite button.",
                columnPosition: 3,
                columnId: projectsColumn.id,
                creatorId: user.id
            })
            const projectsTask4 = await Task.create({
                heading: 'heading',
                description: "The notification icon in the top left will let you see any projects you've been invited to.",
                columnPosition: 4,
                columnId: projectsColumn.id,
                creatorId: user.id
            })


            res.json({ token, user: { id: user.id, name: user.name }, newProject, newUsersProject });
        }



    } catch (e) {
        console.log(e)
    }
}));

router.put('/users/token', validateEmailAndPassword, handleValidationErrors, asyncHandler(async (req, res, next) => {
    // Get values from form:
    try {
        const { email, password } = req.body;

        // Find user with email:
        const user = await User.findOne({ where: { email }, include: Invite });

        // If user is not found or password does not match, make new error object:
        // if (!user || !user.validatePassword(password)) {
        //     const err = new Error("Login failed");
        //     err.status = 401;
        //     err.title = "Login failed";
        //     err.errors = ["The provided credentials were invalid."];

        //     return next(err);
        // }
        if (!user || !user.validatePassword(password)) {
            res.json({ token: null, user: { id: null, name: null, invites: null } })
            return
        }

        // Generate JWT token and send JSON response with token and user ID
        const token = getUserToken(user);
        res.json({ token, user: { id: user.id, name: user.name, invites: user.Invites }, });
    } catch (e) { console.log(e) }
    // { id: user.id,  },
}));

router.put('/users', asyncHandler(async (req, res, next) => {
    const { name, projectId } = req.body;

    const user = await User.findOne({ where: { name: name } });

    if (user) {
        const alreadyInProject = await UsersProject.findOne({ where: { userId: user.id, projectId } })
        if (alreadyInProject) {
            res.json({ message: 'already in project' })
        } else {
            res.json({ user })
        }
    } else {
        res.json('user not found')
    }



}));

module.exports = router;
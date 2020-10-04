const express = require('express');
const { check } = require("express-validator");
const { requireAuth } = require('../auth');
const fetch = require('node-fetch');
const { Project, User, Column, Task, UsersProject } = require('../db/models');
const { asyncHandler, handleValidationErrors } = require('../utils');

const router = express.Router();

// router.use(requireAuth);
// h1xUD26WcDuihTwW0ugX255E
router.post('/users/test', asyncHandler(async (req, res, next) => {
    // console.log('REQ.BODY', JSON.stringify(req.body))
    try {
        // const testRes = await fetch('https://mark-mansolino.atlassian.net/rest/api/2/issue', {
        //     method: 'POST',
        //         body: JSON.stringify(req.body),
        //             headers: {
        //         "Content-Type": 'application/json',
        //         }
        // })
        // const testRes = await fetch('https://jira.atlassian.com/rest/api/2/project/')
        // const testRes = await fetch('https://mark-mansolino.atlassian.net/rest/api/3/issue/MP-1', {
        //     method: 'GET',
        //     headers: {
        //         'Authorization': `Basic ${Buffer.from(
        //             'markjm610@gmail.com:h1xUD26WcDuihTwW0ugX255E'
        //         ).toString('base64')}`,
        //         'Accept': 'application/json'
        //     }
        // })

        const bodyData = {
            update: {},
            fields: {
                "summary": "Main order flow broken",
                // "parent": {
                //     "key": "MP"
                // },
                "issuetype": {
                    "id": "10002"
                },
                // "components": [
                //     {
                //         "id": "10000"
                //     }
                // ],
                // "customfield_20000": "06/Jul/19 3:25 PM",
                // "customfield_40000": {
                //     "type": "doc",
                //     "version": 1,
                //     "content": [
                //         {
                //             "type": "paragraph",
                //             "content": [
                //                 {
                //                     "text": "Occurs on all orders",
                //                     "type": "text"
                //                 }
                //             ]
                //         }
                //     ]
                // },
                // "customfield_70000": [
                //     "jira-administrators",
                //     "jira-software-users"
                // ],
                "project": {
                    "id": "10000"
                },
                // "description": {
                //     "type": "doc",
                //     "version": 1,
                //     "content": [
                //         {
                //             "type": "paragraph",
                //             "content": [
                //                 {
                //                     "text": "Order entry fails when selecting supplier.",
                //                     "type": "text"
                //                 }
                //             ]
                //         }
                //     ]
                // },
                // "fixVersions": [
                //     {
                //         "id": "10001"
                //     }
                // ],
                // "priority": {
                //     "id": "20000"
                // },
                // "labels": [
                //     "bugfix",
                //     "blitz_test"
                // ],
                // timetracking: {
                //     "remainingEstimate": "5",
                //     "originalEstimate": "10"
                // },
                // "security": {
                //     "id": "10000"
                // },
                // "environment": {
                //     "type": "doc",
                //     "version": 1,
                //     "content": [
                //         {
                //             "type": "paragraph",
                //             "content": [
                //                 {
                //                     "text": "UAT",
                //                     "type": "text"
                //                 }
                //             ]
                //         }
                //     ]
                // },
                // "versions": [
                //     {
                //         "id": "10000"
                //     }
                // ],
                // "duedate": "2020-12-12",
                // "customfield_60000": "jira-software-users",
                // "customfield_50000": {
                //     "type": "doc",
                //     "version": 1,
                //     "content": [
                //         {
                //             "type": "paragraph",
                //             "content": [
                //                 {
                //                     "text": "Could impact day-to-day work.",
                //                     "type": "text"
                //                 }
                //             ]
                //         }
                //     ]
                // },
            }
        }

        const testRes = await fetch('https://mark-mansolino.atlassian.net/rest/api/3/issue', {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${Buffer.from(
                    'markjm610@gmail.com:h1xUD26WcDuihTwW0ugX255E'
                ).toString('base64')}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyData)
        })
        // const testRes = await fetch('https://mark-mansolino.atlassian.net/rest/api/3/issue/createmeta', {
        //     method: 'GET',
        //     headers: {
        //         'Authorization': `Basic ${Buffer.from(
        //             'markjm610@gmail.com:h1xUD26WcDuihTwW0ugX255E'
        //         ).toString('base64')}`,
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        // })
        // console.log('TESTRES', testRes)
        const parsedTestRes = await testRes.json()
        console.log('PARSEDTESTRES', parsedTestRes)
        // console.log('ISSUETYPES', parsedTestRes.projects[0].issuetypes)

    } catch (e) {
        console.error(e)
    }
    res.json('asdf')
}))


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
    const completedColumn = await Column.create({ name: 'Completed', pagePosition: 4, projectId: newProject.id })
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

    const overflowColumn = await Column.create({ name: 'Overflow Demo', pagePosition: 3, projectId: newProject.id })
    const overflowTask0 = await Task.create({
        heading: 'heading',
        description: "This column is here to show what happens when a column overflows passed the bottom of the page with tasks.",
        columnPosition: 0,
        columnId: overflowColumn.id,
        creatorId: userId
    })
    const overflowTask1 = await Task.create({
        heading: 'heading',
        description: "Try scrolling to the bottom and clicking on one of the tasks.",
        columnPosition: 1,
        columnId: overflowColumn.id,
        creatorId: userId
    })
    const overflowTask2 = await Task.create({
        heading: 'heading',
        description: "Try clicking the ABC button.",
        columnPosition: 2,
        columnId: overflowColumn.id,
        creatorId: userId
    })
    const overflowTask3 = await Task.create({
        heading: 'heading',
        description: "Filler task",
        columnPosition: 3,
        columnId: overflowColumn.id,
        creatorId: userId
    })
    const overflowTask4 = await Task.create({
        heading: 'heading',
        description: "I am a filler task",
        columnPosition: 4,
        columnId: overflowColumn.id,
        creatorId: userId
    })
    const overflowTask5 = await Task.create({
        heading: 'heading',
        description: "I am also a filler task",
        columnPosition: 5,
        columnId: overflowColumn.id,
        creatorId: userId
    })
    const overflowTask6 = await Task.create({
        heading: 'heading',
        description: "You can change the speed of this script while it's running by clicking the top right buttons",
        columnPosition: 6,
        columnId: overflowColumn.id,
        creatorId: userId
    })
    const overflowTask7 = await Task.create({
        heading: 'heading',
        description: "Another filler task",
        columnPosition: 7,
        columnId: overflowColumn.id,
        creatorId: userId
    })
    const overflowTask8 = await Task.create({
        heading: 'heading',
        description: "There are a lot of filler tasks in this column.",
        columnPosition: 8,
        columnId: overflowColumn.id,
        creatorId: userId
    })
    const overflowTask9 = await Task.create({
        heading: 'heading',
        description: "So many tasks in this column.",
        columnPosition: 9,
        columnId: overflowColumn.id,
        creatorId: userId
    })
    const overflowTask10 = await Task.create({
        heading: 'heading',
        description: "If this was a real column, there'd be a lot of work to get done.",
        columnPosition: 10,
        columnId: overflowColumn.id,
        creatorId: userId
    })
    const overflowTask11 = await Task.create({
        heading: 'heading',
        description: "Another one",
        columnPosition: 11,
        columnId: overflowColumn.id,
        creatorId: userId
    })
    const overflowTask12 = await Task.create({
        heading: 'heading',
        description: "Yet another task",
        columnPosition: 12,
        columnId: overflowColumn.id,
        creatorId: userId
    })
    const overflowTask13 = await Task.create({
        heading: 'heading',
        description: "You can change the speed of this script while it's running by clicking the top right buttons",
        columnPosition: 13,
        columnId: overflowColumn.id,
        creatorId: userId
    })
    const overflowTask14 = await Task.create({
        heading: 'heading',
        description: "Making the seed data for this column was pretty tedious",
        columnPosition: 14,
        columnId: overflowColumn.id,
        creatorId: userId
    })
    const overflowTask15 = await Task.create({
        heading: 'heading',
        description: "Is anyone reading these?",
        columnPosition: 15,
        columnId: overflowColumn.id,
        creatorId: userId
    })
    const overflowTask16 = await Task.create({
        heading: 'heading',
        description: "I hope your day is going well",
        columnPosition: 16,
        columnId: overflowColumn.id,
        creatorId: userId
    })
    const overflowTask17 = await Task.create({
        heading: 'heading',
        description: "Z This task starts with a Z",
        columnPosition: 17,
        columnId: overflowColumn.id,
        creatorId: userId
    })
    const overflowTask18 = await Task.create({
        heading: 'heading',
        description: "Q This task starts with a Q",
        columnPosition: 18,
        columnId: overflowColumn.id,
        creatorId: userId
    })
    const overflowTask19 = await Task.create({
        heading: 'heading',
        description: "You can change the speed of this script while it's running by clicking the top right buttons",
        columnPosition: 19,
        columnId: overflowColumn.id,
        creatorId: userId
    })
    const overflowTask20 = await Task.create({
        heading: 'heading',
        description: "You can change the speed of this script while it's running by clicking the top right buttons",
        columnPosition: 20,
        columnId: overflowColumn.id,
        creatorId: userId
    })
    const overflowTask21 = await Task.create({
        heading: 'heading',
        description: "I want there to be a lot of overflow in this column so you see the scrolling",
        columnPosition: 21,
        columnId: overflowColumn.id,
        creatorId: userId
    })
    const overflowTask22 = await Task.create({
        heading: 'heading',
        description: "The scrolling during alphabetizing was the hardest feature to add",
        columnPosition: 22,
        columnId: overflowColumn.id,
        creatorId: userId
    })

    res.json({ newProject, newUsersProject })


}))


module.exports = router;
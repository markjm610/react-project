const express = require('express');
const { check } = require("express-validator");
const { requireAuth } = require('../auth');
const fetch = require('node-fetch');
const { Task } = require('../db/models');
const { asyncHandler, handleValidationErrors } = require('../utils');
const { key, token, boardId } = require('../tokens')

const router = express.Router();


// router.use(requireAuth);

router.get('/columns/:columnId/tasks', asyncHandler(async (req, res) => {
    const columnId = parseInt(req.params.columnId, 10);

    const tasks = await Task.findAll({ where: { columnId: columnId }, order: [['columnPosition']] });

    res.json({ tasks })

}))

router.post('/columns/:columnId/tasks', asyncHandler(async (req, res) => {
    const columnId = parseInt(req.params.columnId, 10);
    const { heading, description, columnPosition, creatorId } = req.body;
    const newTask = await Task.create({ heading, description, columnPosition, columnId, creatorId });

    res.json({ newTask })
}))

router.post('/columns/:columnId/tasks/integration', asyncHandler(async (req, res) => {
    const columnId = req.params.columnId;
    const { description } = req.body;

    const apiRes = await fetch(`https://api.trello.com/1/cards`, {
        method: 'POST',
        body: JSON.stringify({
            key: key,
            token: token,
            idList: columnId,
            name: description,
            pos: 'bottom'
        }),
        headers: {
            "Content-Type": 'application/json',
        }
    })

    const { id, idList, name } = await apiRes.json()

    res.json({
        newTask: {
            heading: 'heading',
            id: id,
            description: name,
            columnId: idList
        }
    })
}))

router.delete('/tasks/:taskId', asyncHandler(async (req, res) => {

    const taskId = parseInt(req.params.taskId, 10);

    const task = await Task.findByPk(taskId);

    await task.destroy();
    res.json({ message: 'deleted' })

}))

// router.delete('/tasks/:taskId/integration', asyncHandler(async (req, res) => {

//     const taskId = parseInt(req.params.taskId, 10);

//     const res = await fetch(`https://api.trello.com/1/cards/${taskId}`, {
//         method: 'DELETE'
//     })
// }))

router.put('/tasks', asyncHandler(async (req, res) => {
    try {
        const { sendArr } = req.body;

        sendArr.forEach(async (task) => {
            await Task.update(
                { columnPosition: task.columnPosition, columnId: task.columnId },
                { where: { id: task.id } });
        })
        res.json({ message: 'success' })
    } catch (e) {
        console.error(e)
    }
}))

router.delete('/columns/:columnId/tasks', asyncHandler(async (req, res) => {

    const columnId = parseInt(req.params.columnId, 10);

    const tasks = await Task.destroy({ where: { columnId } });

    res.json({ message: 'deleted' })

}))



module.exports = router;
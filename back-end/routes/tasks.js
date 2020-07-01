const express = require('express');
const { check } = require("express-validator");
const { requireAuth } = require('../auth');

const { Task } = require('../db/models');
const { asyncHandler, handleValidationErrors } = require('../utils');

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

router.delete('/tasks/:taskId', asyncHandler(async (req, res) => {

    const taskId = parseInt(req.params.taskId, 10);
    console.log(taskId)
    const task = await Task.findByPk(taskId);

    await task.destroy();
    res.json({ message: 'deleted' })

}))

router.put('/tasks', asyncHandler(async (req, res) => {
    try {
        const { sendArr } = req.body;
        console.log(sendArr)
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

module.exports = router;
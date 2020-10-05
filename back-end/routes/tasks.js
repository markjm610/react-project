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

router.delete('/tasks/:taskId/integration', asyncHandler(async (req, res) => {

    const taskId = req.params.taskId

    const apiRes = await fetch(`https://api.trello.com/1/cards/${taskId}`, {
        method: 'PUT'
    })
}))

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

router.put('/tasks/integration', asyncHandler(async (req, res) => {
    try {
        const { sendArr } = req.body;
        // console.log(sendArr)
        for (let i = sendArr.length - 1; i >= 0; i--) {
            const apiRes = await fetch(`https://api.trello.com/1/cards/${sendArr[i].id}?key=${key}&token=${token}&pos=top&idList=${sendArr[i].columnId}`, {
                method: 'PUT',
                // body: JSON.stringify({
                //     pos: task.columnPosition + 1
                // }),
                headers: {
                    'Accept': 'application/json'
                }
            })
            // console.log(await apiRes.json())
            // const { id, name, pos } = await apiRes.json()
            // console.log(id, name, pos)
        }



        // const apiRes = await fetch(`https://api.trello.com/1/cards/${sendArr[0].id}?key=${key}&token=${token}&pos=top`, {
        //     method: 'PUT',
        //     // body: JSON.stringify({
        //     //     pos: 'top'
        //     // }),
        //     headers: {
        //         'Accept': 'application/json'
        //     }
        // })
        // console.log(await apiRes.json())

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
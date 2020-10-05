const express = require('express');
const { check } = require("express-validator");
const { requireAuth } = require('../auth');
const fetch = require('node-fetch');
const { Column, Task } = require('../db/models');
const { asyncHandler, handleValidationErrors } = require('../utils');
const { key, token, boardId } = require('../tokens')


const router = express.Router();

// router.use(requireAuth);

router.get('/projects/:projectId/columns', asyncHandler(async (req, res) => {
    const projectId = parseInt(req.params.projectId, 10);

    const columns = await Column.findAll({ where: { projectId: projectId }, order: [['pagePosition']] });

    res.json({ columns })

}))

router.post('/projects/:projectId/columns', asyncHandler(async (req, res) => {
    const projectId = parseInt(req.params.projectId, 10);
    const { name, pagePosition } = req.body;
    const newColumn = await Column.create({ name, pagePosition, projectId });

    res.json({ newColumn })

}))

router.delete('/columns/:columnId', asyncHandler(async (req, res) => {
    try {
        const columnId = parseInt(req.params.columnId, 10);

        await Task.destroy({ where: { columnId } })

        const column = await Column.findByPk(columnId);

        await column.destroy();

        res.json({ message: 'deleted' })
    } catch (e) {
        console.error(e)
    }

}))

router.delete('/columns/:columnId/integration', asyncHandler(async (req, res) => {
    try {
        const columnId = req.params.columnId

        await fetch(`https://api.trello.com/1/lists/${columnId}/closed?key=${key}&token=${token}`, {
            method: 'PUT',
            body: JSON.stringify({
                value: true
            }),
            headers: {
                "Content-Type": 'application/json',
            }
        })

        res.json({ message: 'deleted' })
    } catch (e) {
        console.error(e)
    }

}))


router.put('/columns', asyncHandler(async (req, res) => {
    try {
        const { sendArr } = req.body;
        sendArr.forEach(async (column) => {
            await Column.update(
                { pagePosition: column.pagePosition },
                { where: { id: column.id } });
        })
        res.json({ message: 'success' })
    } catch (e) {
        console.error(e)
    }
}))

router.post('/columns/integration', asyncHandler(async (req, res) => {
    const { name } = req.body
    try {
        const apiRes = await fetch(`https://api.trello.com/1/lists?key=${key}&token=${token}&name=${name}&idBoard=${boardId}&pos=bottom`, {
            method: 'POST'
        })

        const { name: apiName, id: apiId } = await apiRes.json()

        res.json({
            newColumn: {
                name: apiName,
                id: apiId
            }
        })
    } catch (e) {
        console.error(e)
    }


}))

module.exports = router;
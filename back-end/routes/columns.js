const express = require('express');
const { check } = require("express-validator");
const { requireAuth } = require('../auth');

const { Column } = require('../db/models');
const { asyncHandler, handleValidationErrors } = require('../utils');



const router = express.Router();

// router.use(requireAuth);


router.get('/projects/:projectId/columns', asyncHandler(async (req, res) => {
    const projectId = parseInt(req.params.projectId, 10);

    const columns = await Column.findAll({ where: { projectId: projectId }, order: [['pagePosition']] });

    res.json({ columns })

}))

router.post('/projects/:projectId/columns', asyncHandler(async (req, res) => {
    const projectId = parseInt(req.params.projectId, 10);
    const { name, pagePosition, projectId } = req.body;
    const newColumn = await Column.create({ name, pagePosition, projectId });

    res.json({ newColumn })

}))

router.delete('/columns/:columnId', asyncHandler(async (req, res) => {
    const columnId = parseInt(req.params.columnId, 10);

    const column = await Column.findByPk(columnId);

    await column.destroy();

}))

module.exports = router;
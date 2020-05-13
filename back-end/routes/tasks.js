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


module.exports = router;
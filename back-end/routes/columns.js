const express = require('express');
const { check } = require("express-validator");
const { requireAuth } = require('../auth');

const { Column } = require('../db/models');
const { asyncHandler, handleValidationErrors } = require('../utils');



const router = express.Router();

// router.use(requireAuth);


router.get('/projects/:projectId/columns', asyncHandler(async (req, res) => {
    const projectId = parseInt(req.params.projectId, 10);

    const columns = await Column.findAll({ where: { projectId: projectId } });

    res.json({ columns })

}))

module.exports = router;
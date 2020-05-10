const express = require('express');
const { check } = require("express-validator");
const { requireAuth } = require('../auth');

const { Task } = require('../db/models');
const { asyncHandler, handleValidationErrors } = require('../utils');

const router = express.Router();


router.use(requireAuth);

module.exports = router;
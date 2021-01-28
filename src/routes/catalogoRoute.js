'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controller/catalogoController');

router.get('/', controller.index);

module.exports = router;
'use strict'

const bodyParser = require('body-parser');
const express = require('express');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Loading Routes
const catalogoRoute = require('./routes/catalogoRoute');

app.use('/', catalogoRoute);

module.exports = app;
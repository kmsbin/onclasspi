const express = require('express');

const app = express();

const webRoute = require('./web/web');
const userRoute = require('./user/user');

app.use('/', webRoute);
app.use('/user', userRoute);

module.exports = app;
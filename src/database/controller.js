const controller = {};

controller.users = require('./controllers/user.controller');
controller.alternative = require('./controllers/alternative.controller');
controller.class = require('./controllers/class.controller');

module.exports = controller;
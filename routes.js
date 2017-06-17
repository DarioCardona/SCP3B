var usersController = require('./controllers/usersController');
var classController = require('./controllers/classController');
var historyController = require('./controllers/historyController');
var authController = require('./controllers/authController');

exports.endpoints = [{method: 'GET', path: '/', config: {handler: function(request, reply){reply('API v1, productos')}}},
					 {method: 'POST', path: '/v1/register', config: usersController.createUser},
					 {method: 'POST', path: '/v1/updateUser', config: usersController.modifUser},
					 {method: 'DELETE', path: '/v1/deleteUser/{id}', config: usersController.deleteUser},
					 {method: 'GET', path: '/v1/getUser', config: usersController.getUser},
					 {method: 'POST', path: '/v1/registerClass', config: classController.createClass},
					 {method: 'POST', path: '/v1/updateClass', config: classController.modifClass},
					 {method: 'DELETE', path: '/v1/deleteClass/{id}', config: classController.deleteClass},
					 {method: 'GET', path: '/v1/getClass', config: classController.getClass},
					 {method: 'POST', path: '/v1/registerMatricula', config: historyController.createHistory},
					 {method: 'GET', path: '/v1/getHistory', config: historyController.getHistory},
					 {method: 'POST', path: '/v1/login', config: authController.login},
					 {method: 'GET', path: '/v1/logout', config: authController.logout}
			];

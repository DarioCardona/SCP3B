var usersController = require('./controllers/usersController');
var roomController = require('./controllers/classController');
var authController = require('./controllers/authController');

exports.endpoints = [{method: 'GET', path: '/', config: {handler: function(request, reply){reply('API v1, productos')}}},
					 {method: 'POST', path: '/v1/register', config: usersController.createUser},
					 {method: 'POST', path: '/v1/updateUser', config: usersController.modifUser},
					 {method: 'DELETE', path: '/v1/deleteUser', config: usersController.deleteUser},
					 {method: 'GET', path: '/v1/getUser', config: usersController.getUser},


					 

					 {method: 'POST', path: '/v1/login', config: authController.login},
					 {method: 'GET', path: '/v1/logout', config: authController.logout}
			];
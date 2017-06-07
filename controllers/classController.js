var SHA3 = require("crypto-js/sha3");
var boom = require('boom');
var clase = require('../schemas/class');



	exports.createClass = {
		handler: function(request, reply) {
	   console.log(request.payload);
			var seccion = new clase({
				class_code: request.payload.class_code,
				class_name: request.payload.class_name,
				unity: request.payload.unity,

			});
		  seccion.save(function (err) {
		  	console.log("Class saved")
		  	if(err){
		  		return reply('El usuario debe ser unico ' + err);
		  	}else{
	        return reply('Usuario agregado exitosamente');
	      }
	    });
	  }
	};


  //Metodo para Modificar  usuario
	exports.modifClass = {
		handler: function(request, reply) {

			var seccion = clase.findOne({name:request.payload.name},function(err,answer){
	      //console.log(request.payload)
	      if(request.payload.password){
	         answer.password = SHA3(request.payload.password)
					 //console.log("entro")
	      }
				answer.user_type = request.payload.user_type,
				answer.username = request.payload.username,
	      answer.department_id = request.payload.department_id

				answer.save();
				return reply(answer);
			});
		}
	};

	exports.deleteClass={
		/*auth: {
			mode:'required',
			strategy:'session'
		},*/
		handler: function(request, reply){
			console.log(request.payload + "estoy en backend")
			var seccion =	clase.findOneAndRemove({ _id:request.params.id }, function(err) {

				if (err) {
					throw err;
				}
				return reply('Eliminado exitosamente');
			});
		}
	};

	exports.getClass = {
		handler: function(request, reply){
			var seccion = clase.find({},function(err,data){
				if(!err){
	        var array = [];
	        for (var i = 0; i < data.length; i++) {
	          var new_user = {
							_id: data[i]._id,
	            username: data[i].username,
							name: data[i].name,
	            user_type: data[i].user_type,
	            department_id: data[i].department_id
	          }
	          array.push(new_user);
	        };
					return reply(array);
				}else{
					return reply(err);
				}
			});
	  }
	};

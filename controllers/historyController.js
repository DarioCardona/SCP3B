var SHA3 = require("crypto-js/sha3");
var boom = require('boom');
var history = require('../schemas/history');
var key = 'real secret keys should be long and random';

var encryptor = require('simple-encryptor')(key);



	exports.createHistory = {
		handler: function(request, reply) {
	   console.log(request.payload);
			var historial = new history({
				class_code: request.payload.class_code,
				student: request.payload.student,
				year: request.payload.year,
				semester: request.payload.semester,
	      period:  request.payload.period,
	      score:  request.payload.score,
	      state:encryptor.encrypt( request.payload.state),

			});
		  historial.save(function (err) {
		  	console.log("historial saved")
		  	if(err){
		  		return reply('El historial debe ser unico ' + err);
		  	}else{
	        return reply('Usuario agregado exitosamente');
	      }
	    });
	  }
	};


  //Metodo para Modificar  usuario
  exports.modifUser = {
  	handler: function(request, reply) {

  		var usuario = user.findOne({usuarioname:request.payload.usuarioname},function(err,answer){
        console.log(request.payload)

  			answer.Firstname= request.payload.Firstname
  			answer.Secondname= request.payload.Secondname
  			answer.account= request.payload.account
				answer.id= request.payload.id
        answer.cel = request.payload.cel
        answer.direction = request.payload.direction
        answer.carrier = request.payload.carrier


  			answer.save();
  			return reply(answer);
  		});
  	}
  };

	exports.deleteUser={

	handler: function(request, reply){
		console.log(request.payload + "estoy en backend")
		var historial =	user.findOneAndRemove({ _id:request.params.id }, function(err) {

			if (err) {
				throw err;
			}
			return reply('Eliminado exitosamente');
		});
	}
};


	exports.getHistory = {

  	handler: function(request, reply){
  		var historial = history.find({},function(err,data){
  			if(!err){
          var array = [];
          for (var i = 0; i < data.length; i++) {
            var historia = {
							_id: data[i]._id,
							class_code: data[i].class_code,
							student: data[i].student,
							year: data[i].year,
							semester: data[i].semester,
				      period:  data[i].period,
				      score:  data[i].score,
				      state:encryptor.decrypt( data[i].state),

            }
            array.push(historia);
          };

  				return reply(array);

  			}else{
  				return reply(err);
  			}
  		});
   // console.log(usuario);

	}
};

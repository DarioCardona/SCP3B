var SHA3 = require("crypto-js/sha3");
var boom = require('boom');
var user = require('../schemas/user');

var key = 'real secret keys should be long and random';

var encryptor = require('simple-encryptor')(key);



	exports.createUser = {
		handler: function(request, reply) {
	   console.log(request.payload);
			var usuario = new user({
				Firstname: request.payload.Firstname,
				password: encryptor.encrypt(request.payload.password),
				Secondname: request.payload.Secondname,
				account: request.payload.account,
	      id: encryptor.encrypt( request.payload.id),
	      cel: encryptor.encrypt( request.payload.cel),
	      direction:encryptor.encrypt( request.payload.direction),
				carrier: request.payload.carrier,
				role: request.payload.role,
			});
		  usuario.save(function (err) {
		  	console.log("usuario saved")
		  	if(err){
		  		return reply('El usuario debe ser unico ' + err);
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
				if(request.payload.password){
         answer.password = SHA3(request.payload.password)
				 //console.log("entro")
      	}
  			answer.Firstname= request.payload.Firstname
  			answer.Secondname= request.payload.Secondname
  			answer.account= request.payload.account
				answer.id= encryptor.encrypt(request.payload.id)
        answer.cel = encryptor.encrypt(request.payload.cel)
        answer.direction = encryptor.encrypt(request.payload.direction)
        answer.carrier = request.payload.carrier
				answer.role = request.payload.role


  			answer.save();
  			return reply(answer);
  		});
  	}
  };

	exports.deleteUser={

	handler: function(request, reply){
		console.log(request.payload + "estoy en backend")
		var usuario =	user.findOneAndRemove({ _id:request.params.id }, function(err) {

			if (err) {
				throw err;
			}
			return reply('Eliminado exitosamente');
		});
	}
};


	exports.getUser = {

  	handler: function(request, reply){
  		var usuario = user.find({},function(err,data){
  			if(!err){
          var array = [];
          for (var i = 0; i < data.length; i++) {
            var new_usuario = {
							_id: data[i]._id,
              Firstname: data[i].Firstname,
              Secondname: data[i].Secondname,
              account: data[i].account,
              id: encryptor.decrypt(data[i].id),
              cel: encryptor.decrypt(data[i].cel),
              direction:encryptor.decrypt( data[i].direction),
              carrier: data[i].carrier,// dia/mes/año
							role: data[i].role,//
            }
            array.push(new_usuario);
          };

  				return reply(array);

  			}else{
  				return reply(err);
  			}
  		});
   // console.log(usuario);

	}
};

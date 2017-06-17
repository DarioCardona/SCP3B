var joi = require('joi');
var boom = require('boom');
var user = require('../schemas/user');
var SHA3 = require("crypto-js/sha3");
var key = 'real secret keys should be long and random';
var encryptor = require('simple-encryptor')(key);

exports.login = {
/*  auth: false,
  validate: {
    payload: {
      Firstname: joi.string().required(),
      password: joi.string().min(1).max(200).required()
    }
  },*/
  handler: function(request, reply) {
      var entro = false;
      console.log(request.payload)
      user.find({Firstname: request.payload.Firstname, password: String(encryptor.encrypt(request.payload.password))}, function(err, data){
        if(!err){
          if(user.length > 0){
            //request.auth.session.set(user[0]);
            //console.log(Firstname: data[0].Firstname)
            return reply({});
            entro = true;
          }
        }else{
          return reply("error")
        }
      })

  }
}

exports.logout = {
  handler: function(request, reply) {
    request.auth.session.clear();
    return reply('Logout Successful!');
  }
}

exports.loginWithPin = {
  auth: false,
  validate: {
    payload: {
      username: joi.string().required(),
      pin: joi.string().max(4).required()
    }
  },
  handler: function(request, reply) {
      var entro = false;
      user.find({username: request.payload.username, pin: request.payload.pin}, function(err, data){
        if(!err){
          if(user.length > 0){
            //request.auth.session.set(user[0]);
            return reply({username: data[0].username, name:data[0].name,employee_type:data[0].employee_type,
              status: data[0].status,role:data[0].role});
            entro = true;
          }
        }else{
          return reply("error")
        }
      })

  }
}

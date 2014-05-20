'use strict';

var users = global.nss.db.collection('users');
var Mongo = require('mongodb');
var bcrypt = require('bcrypt');

class User{
  constructor(obj){
    this.email = obj.email;
    this.password = obj.password;
  }

  static findByUserId(userId, fn){
      userId = Mongo.ObjectID(userId);
      users.findOne({_id:userId}, (e,u)=>{
        fn(u);
      });
    }

  login(fn){
    users.findOne({email:this.email}, (e,u)=>{
      if(u){
        var isMatch = bcrypt.compareSync(this.password, u.password); //this.password is what came in req.body, u.password is what is in the database
        if(isMatch){
          fn(u); //if the passwords match send back user
        }else{
          fn(null); //if the passwords dont match will send back null.
        }
      }else{
        this.password = bcrypt.hashSync(this.password, 8); //hashes the password
        users.save(this, (e,u)=>{
          fn(u);
        });
      }
    });
  }
}

module.exports = User;

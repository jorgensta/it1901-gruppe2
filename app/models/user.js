

let bcrypt = require('bcrypt-nodejs');

let mongoose = require('mongoose');


let userSchema = mongoose.Schema({

      local :   {

        email : String,
        password: String,
        name : String,
        role : String

      }


});


userSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.local.password);
};


module.exports = mongoose.model('User', userSchema);

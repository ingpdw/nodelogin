var mongoose = require('mongoose');

module.exports = {
  'login': {
    'url': 'mongodb://localhost/pdw',
    'connect': function(){
      mongoose.connect( this.url, function( err ){
        if( err ){
          console.log( err );
        }else{
          console.log( 'open' );
        }
      });

      var teamInfoSchema = mongoose.Schema({
        name: String,
        age: Number,
        company: String,
        password: Number,
        isFacebook: Boolean,
        facebookID: String
      });

      var user = mongoose.model('member', teamInfoSchema);

      return user;
    }
  }
};

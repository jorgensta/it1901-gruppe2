let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Band = new Schema({

    managerEpost: String,
    band: String,
    teknisk: String
    
},{
	collection: 'bands'
});


module.exports = mongoose.model('Band', Band);

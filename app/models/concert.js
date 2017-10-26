
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Concert = new Schema({

	artist : String,
    scene : String,
    date : String,
    time : String,
    lights : [String],
    sound : [String],
    rig : [String],
    arranger : String,
    approvedByBookingSjef : Boolean,
    approvedByManager : Boolean,
    ticketPrice: String,
    mention: String

},{
	collection: 'concerts'
});


module.exports = mongoose.model('Concert', Concert);

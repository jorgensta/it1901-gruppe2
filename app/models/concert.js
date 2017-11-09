
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Concert = new Schema({

	artist : String,
    scene : String,
    //start og end må gjøres til date-objekter
    start : String,
    end: String,
    lights : [String],
    sound : [String],
    rig : [String],
    arranger : String,
    approvedByBookingSjef : Boolean,
    approvedByManager : Boolean,
    ticketPrice: String,
    mention: String,
    songs: String

},{
	collection: 'concerts'
});


module.exports = mongoose.model('Concert', Concert);

let Datastore = require('nedb');

let arbeidere = new Datastore( {filename: __dirname + "/filer/arbeidere.db", autoload: true});


let scott = {
  navn: 'Scott',
  rolle: 'Manager',
  epost: "scottManager@gmail.com",
  nummer: '1'
};


/*arbeidere.insert(scott, function(err,doc){
  console.log("Inserted", doc.navn, "arbeiderID: " , doc._id);
});
*/

arbeidere.findOne({nummer: '1'}, function(err,doc){
  console.log("Found user by ID = 1, name: " , doc.navn);
});

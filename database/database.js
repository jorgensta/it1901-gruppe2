let Datastore = require('nedb'); //henter databasen

//Lager en database for alle arbeidere som er lagret i /filer/arbeidere.db, denne IKKE ny fil hver gang
let arbeidere = new Datastore( {filename: __dirname + "/filer/arbeidere.db", autoload: true});

// Lag en variabel = funksjon () som teller over antall objekt (Susanne)

let count = arbeidere.count({}, function (err, count){
  console.log("Count variable is now: ", count);

});

console.log(count);

//Kunne laste inn databasen for å tak i data som er lagret og lagre ny data uten at vi oppretter ny database hver gang, dette er nå løst.


let scott = {
  navn: 'Scott',
  rolle: 'Manager',
  id: '1'
};


/*

//objectfactory for å lage nye brukere (ULRIK)
const createUser ({navn, rolle});

*/

/*
arbeidere.insert(scott, function(err,doc){
  console.log("Inserted", doc.navn, "arbeiderID: " , doc._id);
});
*/



arbeidere.findOne({id: '1'}, function(err,doc){
  console.log("Found user by ID = 1, name: " , doc.navn);
});

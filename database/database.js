let Datastore = require('nedb'); //henter databasen

//Lager en database for alle arbeidere som er lagret i /filer/arbeidere.db, denne IKKE ny fil hver gang
let arbeidere = new Datastore( {filename: __dirname + "/filer/arbeidere.db", autoload: true});

// Lag en variabel = funksjon () som teller over antall objekt (Susanne)

//Kunne laste inn databasen for å tak i data som er lagret og lagre ny data uten at vi oppretter ny database hver gang, dette er nå løst.

let arbID = null;


// Får en sortert liste og finner høyeste id, for så å sette den globale variabelen arbID = nowNumber ( som er høyeste ID)


arbeidere.find({}).sort({id: 1}).exec(function (err,docs){
  let nowNumber = 0;
  docs.forEach(function(d){
    if(d.id > nowNumber){
      nowNumber = d.id;
    };
    console.log(d.navn);
  });
  console.log(nowNumber);
  arbID = nowNumber;
  console.log(arbID);

});

function incrementId(){
  arbID = parseInt(arbID) + 1;
}


function getID(){
  setTimeout(function(){
    incrementId();
    incrementId();
    console.log(arbID);
  }, 1000);

};

getID();






/*

//objectfactory for å lage nye brukere (ULRIK)
const createUser ({navn, rolle});

*/

arbeidere.findOne({id: '1'}, function(err,doc){
  console.log("Found user by ID = 1, name: " , doc.navn);
});

let Datastore = require('nedb'); //henter databasen
let objectfactory = require('./objectfactory');

//Lager en database for alle arbeidere som er lagret i /filer/arbeidere.db, denne IKKE ny fil hver gang
let arbeidere = new Datastore( {filename: __dirname + "/filer/arbeidere.db", autoload: true});

// Lag en variabel = funksjon () som teller over antall objekt (Susanne)

//Kunne laste inn databasen for å tak i data som er lagret og lagre ny data uten at vi oppretter ny database hver gang, dette er nå løst.

let arbID = null;

// Får en sortert liste og finner høyeste id, for så å sette den globale variabelen arbID = nowNumber ( som er høyeste ID)
/*
arbeidere.find({}).sort({id: 1}).exec(function (err,docs)
{
    let nowNumber = 0;
    docs.forEach(function(d)
    {
      if(d.id > nowNumber)
      {
        nowNumber = d.id;
      };
      console.log(d.navn);
    });
    arbID = nowNumber;
    console.log(arbID);
    incrementId();
    console.log(arbID);
    
});
*/

function incrementId(){
  arbID = parseInt(arbID) + 1;
}


function getNextID()
{
  console.log("Dette er arbID før kjøring: " + String(arbID));
  arbeidere.find({}).sort({id: 1}).exec(function (err,docs)
  {
    let nowNumber = 0;
    docs.forEach(function(d)
    {
      if(d.id > nowNumber)
      {
        nowNumber = d.id;
        console.log("nowNumber i loop: " + String(nowNumber));
      };
    });
    arbID = nowNumber;
    console.log("arbID: " + String(arbID));
    incrementId();
    console.log("inkrementert arbID: " + String(arbID));
    return arbID;
  });

  //console.log("Denne arbID skal brukes: " + String(arbID));
};

//Insertion i arbeidere.db
function insertArbeider(nyArbeider){
  arbeidere.insert(nyArbeider, function(err, doc) {  
    console.log('Inserted', doc.navn, 'with ID: ', doc.id);
  });  
}


let currentID = getNextID();
console.log("currentID " + String(currentID));


/* modul fra objectfactory.js
let nyArbeider = objectfactory.nyArbeider("Ulrik", "lydtekniker");
console.log(nyArbeider);
*/

/*	T0D0
	- 	serial-id	
	- 	error msg
	- 	Lage tilsvarende object factory for konserter, band ++
*/

let roller = ["konsertarrangor", "manager", "bookingsjef", 
				"bookingansvarlig", "lystekniker", "lydtekniker"]; //Hente roller fra DB? 

const nyArbeider = (navn, rolle) => {
	if (checkArbeiderNavn(navn) && checkArbeiderRolle(rolle)){
			let arbeider = {
			  navn: navn,
			  rolle: rolle
			};
			return arbeider
	}

	else {
		console.log("Wrong input"); 	//T0D0: printe en bedre error msg, evt. try catch
	}	
}

//Godtar bare navn med første char upper, og resten lower. i.e. : Ulrik, ikke ULrik eller ulrik
function checkArbeiderNavn (navn){
	let regExNavn = /^[A-Z][a-z]+$/;
	return regExNavn.test(navn);
}

function checkArbeiderRolle (rolle){
	return roller.indexOf(rolle) != -1;
}

module.exports.nyArbeider = nyArbeider;
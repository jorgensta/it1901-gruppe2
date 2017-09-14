

let express = require('express');
let app = express();



app.get('/', function(req,res){
  res.sendFile(__dirname + "/templates/index.html");
});


app.listen(3000, function(){
  console.log("Server now running on localhost:3000");

});



let express = require('express');
let app = express();
let path = require('path');
let bodyParser = require('body-parser');
let logger = require('logger');


app.use(express.static(path.join(__dirname, 'templates')));
app.use(bodyParser());

app.get('/', function(req,res){
  res.sendFile(__dirname + "/templates/index.html");
});


app.listen(3000, function(){
  console.log("Server now running on localhost:3000");

});

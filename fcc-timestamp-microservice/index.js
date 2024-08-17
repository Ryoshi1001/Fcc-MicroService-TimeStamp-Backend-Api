// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});




// Me API endpoint made for: Timestamp Microservice Freecodecamp Express/API/JS
app.get("/api/:date?", function(req, res){
  //capture input from url
  const inputRouteParam = req.params.date; 

  //start initialize date variable
  let date; 

  // check if input is empty or not
  if(inputRouteParam === '' || inputRouteParam === undefined){
    date = new Date() 
  } else if(!isNaN(inputRouteParam)){
    date = new Date(Number(inputRouteParam))
  } else{
    date = new Date(inputRouteParam)
  }

  //validate the date
  if(isNaN(date.getTime())){
    return res.json({ error : "Invalid Date"})
  }

  //variable for unix time and utc date
  const time = date.getTime(); 
  const dateUTC = date.toUTCString(); 

  //res.json to client with format needed
  res.json({ unix: time, utc: dateUTC})
})





// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

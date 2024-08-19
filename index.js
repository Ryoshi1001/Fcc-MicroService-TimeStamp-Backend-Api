// index.js
// where your node app starts

// init project
var express = require('express');

var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');

app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers don't work every time on 204

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


app.get("/api/", (req, res) => {
  const timestamp = Date.now();
  const utc = new Date();  
  res.json({unix: timestamp, utc: utc.toUTCString()})
})


//Me favorite and clean way of unix & utc input validation in API
//!isNaN && unix length for unix validation
//instanceof Date and !isNaN(onDate) for date validation
app.get("/api/:date", (req, res) =>{
  const input = req.params.date; 

  if(!isNaN(Number(input)) && input.length === 13){
    const unixTimeStamp = Number(input)
    return res.json({
      unix: unixTimeStamp, 
      utc: new Date(Number(input)).toUTCString()
    })
  }

  const date = new Date(input); 
  console.log(date)
  if(date instanceof Date && !isNaN(date)){
    return res.json({
      unix: date.getTime(), 
      utc: date.toUTCString()
    })
  } else{
    return res.json({
      error: "Invalid Date"
    })
  }
})

//Other ways of making code work also below: 

//code1 working
// Route to handle date parsing
// app.get("/api/:date?", (req, res) => {
//   const input = req.params.date; 
  
//   // Check if the input is a valid Unix timestamp
//   if(!isNaN(Number(input)) && input.length === 13){
//     console.log('this code is running 1')
//     const unixTimeStamp = Number(input)
//     return res.json({
//       unix: unixTimeStamp, 
//       utc: new Date(Number(input)).toUTCString()
//     })
//   }

//   // Check if the input is a valid date string
// const date = new Date(input)
// if(!isNaN(date.getTime())){
//   console.log('this code is running 2')
//   return res.json({
//     unix: date.getTime(), 
//     utc: date.toUTCString()
//   })
//       // If the input is invalid
// } else{
//   console.log('this code is running 3')
//   return res.json({
//     error: "Invalid Date"
//   })
// }
// })


//code2 working
// app.get("/api/:timestamp", (req,res) => {
//   const timestamp = req.params.timestamp; 

//   if(!isNaN(Number(timestamp)) && timestamp.length === 13){
//     const dateObject = new Date(Number(timestamp)); 
//     return res.json({
//       unix: timestamp, 
//       utc: dateObject.toUTCString()
//     })
//   }

//   if(new Date(Number(timestamp).toUTCString()) !== "Invalid Date"){
//     const dateObject = new Date(timestamp).getTime(); 
//     return res.json({
//       unix: dateObject, 
//       utc: timestamp
//     })
//   } 
// })



//code3 working
// //API endpoint made for: Timestamp Microservice Freecodecamp Express/API/JS
// app.get("/api/:date?", function(req, res){
//   //capture input from url
//   const inputRouteParam = req.params.date; 

//   //start initialize date variable
//   let date; 

//   // check if input is empty or not
//   if(inputRouteParam === '' || inputRouteParam === undefined){
//     date = new Date() 
//   } else if(!isNaN(inputRouteParam)){
//     date = new Date(Number(inputRouteParam))
//   } else{
//     date = new Date(inputRouteParam)
//   }

//   //validate the date
//   if(isNaN(date.getTime())){
//     return res.json({ error : "Invalid Date"})
//   }

//   //variable for unix time and utc date
//   const time = date.getTime(); 
//   const dateUTC = date.toUTCString(); 

//   //res.json to client with format needed
//   res.json({ unix: time, utc: dateUTC})
// })



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

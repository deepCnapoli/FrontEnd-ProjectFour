var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const bodyParser = require('body-parser')
const cors = require('cors')
const fetch = require('node-fetch')

var json = {
    'title': 'test json response',
    'message': 'this is a message',
    'time': 'now'
}

const app = express()
// to use json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(cors())

//app.use(express.json())
// to use url encoded values

app.use(express.static('dist'))

//Meaningcloud credentials for API
const baseUrl = "https://api.meaningcloud.com/summarization-1.0?key=";
const API_KEY = "3673be2ada95646265bfc9c9bb08b4fe";
const numSentences = 5;
//const API_KEY = process.env.API_KEY; 

//console.log("mockAPI: "+JSON.stringify(mockAPIResponse))

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

app.get('/test', function (req, res) {
    res.json(mockAPIResponse);
})

// *** must be reviewed
app.post("/myURL", async (req, res) => {
  const body = req.body;
  //const body = "https://www.theguardian.com/us-news/2021/feb/17/texas-winter-storm-sea-turtles-cold-stunned";
  console.log("body: "+body);
  const resp = await fetch(`${baseUrl}${API_KEY}&sentences=${numSentences}&url=${body}`);
    console.log("resp: "+resp);
  try {
    const data = await resp.json();
    console.log(data);
    res.send(data);
  } catch (err) {
    console.log("error", err);
  }
});

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

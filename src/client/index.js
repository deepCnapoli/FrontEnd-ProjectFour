var path = require('path');
const express = require('express');
const mockAPIResponse = require('./mockAPI.js');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');
const dotenv = require('dotenv');

dotenv.config();

var json = {
    'title': 'test json response',
    'message': 'this is a message',
    'time': 'now'
}

const app = express()
// to use json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cors());

// to use url encoded values
app.use(express.static('dist'));

//Meaningcloud credentials for API
const baseUrl = "https://api.meaningcloud.com/sentiment-2.1?key=";
const API_KEY = process.env.API_KEY

//console.log("mockAPI: "+JSON.stringify(mockAPIResponse))

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

app.get('/test', function (req, res) {
    res.json(mockAPIResponse);
})

// POST the URL input to the API
app.post("/myURL", async (req, res) => {
  //const bodyURL = req.body.url;
  const bodyURL = req.body;
  console.log(bodyURL);
  const resp = await fetch(`${baseUrl}${API_KEY}&txt=${bodyURL}&lang=en`);
  //  console.log("resp: "+resp);
  try {
    const data = await resp.json();
   // console.log(data);
    res.send(data);
  } catch (err) {
    console.log("error", err);
  }
});

// designates what port the app will listen to for incoming requests
app.listen(3030, function () {
    console.log('Example app listening on port 3030!')
})

var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
var bodyParser = require('body-parser')
var cors = require('cors')

var json = {
    'title': 'test json response',
    'message': 'this is a message',
    'time': 'now'
}

const app = express()
app.use(cors())
// to use json
app.use(bodyParser.json())
// to use url encoded values
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(express.static('dist'))

//Meaningcloud credentials for API
const baseUrl = "https://api.meaningcloud.com/sentiment-2.1?key=";
const API_KEY = `&appid=3673be2ada95646265bfc9c9bb08b4fe`;
//const API_KEY = process.env.API_KEY; 

//console.log("mockAPI: "+JSON.stringify(mockAPIResponse))

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

app.get('/test', function (req, res) {
    res.json(mockAPIResponse);
})

// *** copied, must be reviewed
app.post("/article", async (req, res) => {
  const resp = await fetch(`${baseUrl}${API_KEY}&lang=auto&url=${req.body}`);
    console.log("resp: "+resp);
  try {
    const data = await resp.json();
    res.send(data);
  } catch (err) {
    console.log("error", err);
  }
});

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

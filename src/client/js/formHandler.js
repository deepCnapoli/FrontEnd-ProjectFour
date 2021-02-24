// file:  src/client/js/formHandler.js
const { checkForUrl } = require("./checkForUrl");

function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let urlText = document.getElementById("inputBox").value

  //  Client.checkForName(urlText)

    Client.checkForUrl(urlText)
    //console.log("urlText: "+urlText);

    fetch('http://localhost:3030/myURL', {
      method: "POST",
      cache: "no-cache",
      credentials: "same-origin",
      mode: "cors",
      headers: {
       "Content-Type": "application/json"
      },
      body: JSON.stringify({url: urlText}),
    })
    .then(res => {
      console.log("::: Form Submitted :::");
        return res.json()
    })
    .then(function(data) {
     //  document.getElementById('results').innerHTML = data.message 
     document.getElementById('results').innerHTML = data.subjectivity
		    //console.log(data);
    // new code for subjectivity translate
    results.innerHTML = "Subjectivity of the text: " + subjectScore(data.subjectivity);
    })
    .catch(err => {
      console.log(err);
    })
}

//Function to translate subjectivity score
function subjectScore(text) {
let textScore;
switch (text) {
  case "OBJECTIVE":
    textScore = "OBJECTIVE-the text does not have any subjectivity marks.";
    break;
  case "SUBJECTIVE":
    textScore = "SUBJECTIVE-the text has subjective marks.";
    break;
  default:
    textScore = "No subjectivity provided";
} // end: switch
  return textScore;
}; // end: function subjectScore


export { handleSubmit }






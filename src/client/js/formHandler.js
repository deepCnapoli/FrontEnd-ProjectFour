function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById("inputBox").value
    // let formText = "https://www.theguardian.com/world/2021/feb/21/greek-theatre-director-arrested-on-charges";

    Client.checkForName(formText)
    console.log("formText-CT: "+formText);

    fetch('http://localhost:3030/myURL', {
      method: "POST",
      cache: "no-cache",
      credentials: "same-origin",
      mode: "cors",
      headers: {
       "Content-Type": "application/json"
      },
      body: JSON.stringify({url: formText}),
    })
    .then(res => {
      console.log("::: Form Submitted-CT1 :::");
        return res.json()
    })
    .then(function(data) {
      // document.getElementById('results').innerHTML = "itsHere"
     //  document.getElementById('results').innerHTML = data.message 
     document.getElementById('results').innerHTML = data.subjectivity
     //document.getElementById('results').innerHTML = data.score_tag
		console.log(data);
    // new code for subjectivity translate - 22feb21
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
}
  return textScore;
}; // end function subjectScore


export { handleSubmit }






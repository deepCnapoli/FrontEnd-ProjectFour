function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('inputBox').value

    Client.checkForName(formText)
    console.log(formText);

    fetch('http://localhost:8080/myURL', {
    //  changed test to article
      method: "POST",
      cache: "no-cache",
      credentials: "same-origin",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({url: formText}),
    })
    .then(res => {
      console.log("::: Form Submitted :::")
        return res.json()
    })
    .then(function(data) {
        document.getElementById('results').innerHTML = data.message
    })
    .catch(err => {
      console.log(err);
    })
}

export { handleSubmit }

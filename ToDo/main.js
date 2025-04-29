
document.getElementById("registerSubmitButton").addEventListener("click", () => {
    var username = document.getElementById("usernameInput").value;
    var firstname = document.getElementById("firstnameInput").value;
    var lastname = document.getElementById("surnameInput").value;
    var password = document.getElementById("passwordInput").value;

    console.log(username, firstname, lastname, password);

    fetch("http://demo2.z-bit.ee/users", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            
                "username": username,
                "firstname": fistname,
                "lastname": lastname,
                "newPassword": password
        })
    }).then(response =>{
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    }).then(() => {
        
    })
});
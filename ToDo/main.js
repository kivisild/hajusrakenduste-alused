
document.addEventListener("DOMContentLoaded", () => {
    // Redirect to register
    const redirectToRegister = document.getElementById("redirectToRegister");
    if (redirectToRegister) {
        redirectToRegister.addEventListener("click", () => {
            window.location.href = "register.html"
        });
    }

    // Redirect to login
    const redirectToLogin = document.getElementById("redirectToLogin");
    if (redirectToLogin){
        redirectToLogin.addEventListener("click", () => {
            window.location.href = "login.html"
        })
    }

    // Redirect to main
    const redirectToMain = document.getElementById("mainBtn");
    if (redirectToMain){
        
        redirectToMain.addEventListener("click", () => {
            console.log("click")
            window.location.href = "index.html"
        })
    }


    // Register POST
    const registerSubmitButton = document.getElementById("registerSubmitButton");
    if (registerSubmitButton) {
        registerSubmitButton.addEventListener("click", () => {
            var username = document.getElementById("usernameInput").value;
            var firstname = document.getElementById("firstnameInput").value;
            var lastname = document.getElementById("surnameInput").value;
            var password = document.getElementById("passwordInput").value;

            fetch("http://demo2.z-bit.ee/users", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({

                    "username": username,
                    "firstname": firstname,
                    "lastname": lastname,
                    "newPassword": password
                })
            }).then(response => {
                return response.json().then(payload => {
                    if (!response.ok) {
                        throw payload;
                    }
                    return payload;
                })
                
            }).then(() => {
                const registrationConfirmMessage = document.getElementById("registrationConfirmMessage");
                registrationConfirmMessage.innerHTML = "Registration successful";
            }).catch(err => {
               registrationConfirmMessage.innerHTML = err.map(e => `<div>${e.message}</div>`).join("");
            })
        });
    }

    const loginBtn = document.getElementById("loginBtn");
    if (loginBtn){
        loginBtn.addEventListener("click", () => {
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;
    
            fetch("http://demo2.z-bit.ee/users/get-token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "username": username,
                    "password": password
                    })
                }).then(response => {
                if (!response.ok){
                    throw new Error("Network response was not ok" + response.statusText)
                    
                }
                return response.json()
            }).then(data => {
                console.log("Login response JSON (access_token): ", data.access_token)
                const authorizationToken = data.access_token;
                document.cookie = "authorizationToken=" + authorizationToken;
                window.location.href="index.html"
            })
        })

    }


})


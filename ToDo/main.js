// Helper functions
function getCookie(name) {
    return document.cookie.split('; ').find(row => row.startsWith(name + '='))?.split('=')[1] || '';
}



document.addEventListener("DOMContentLoaded", () => {
    // ==================== ELEMENT IDS ==================== //
    const redirectToRegister = document.getElementById("redirectToRegister");
    const redirectToLogin = document.getElementById("redirectToLogin");
    const redirectToMain = document.getElementById("mainBtn");
    
    const loginBtn = document.getElementById("loginBtn");
    const logOutBtn = document.getElementById("logOut");

    // UI
    const loggedOutMsg = document.getElementById("loggedOutMsg");
    const taskCreatePopup = document.getElementById("task-create-popup");
    const exitPopupBtn = document.getElementById("exitPopupBtn");
    const addTaskBtn = document.getElementById("addTaskBtn");

    
    const registerSubmitButton = document.getElementById("registerSubmitButton");
    const createTaskBtn = document.getElementById("createTaskBtn");
    
    


    // ==================== REDIRECTS AND OTHER LOGIC ==================== //
    // Redirect to register
    if (redirectToRegister) {
        redirectToRegister.addEventListener("click", () => {
            window.location.href = "register.html"
        });
    }

    // Redirect to login
    if (redirectToLogin) {
        redirectToLogin.addEventListener("click", () => {
            window.location.href = "login.html"
        })
    }

    // Redirect to main
    if (redirectToMain) {
        redirectToMain.addEventListener("click", () => {
            console.log("click")
            window.location.href = "index.html"
        })
    }

    // Logout and redirect to index
    if (logOutBtn) {
        logOutBtn.addEventListener("click", () => {
            {
                console.log("click");
                document.cookie = "authorizationToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
                window.location.href = "index.html";

            }
        })
    }

    if(addTaskBtn){
        addTaskBtn.addEventListener("click", () => {
            taskCreatePopup.style.visibility = "visible";
            addTaskBtn.style.visibility = "hidden";
        })
    }

    if (exitPopupBtn){
        exitPopupBtn.addEventListener("click", () => {
            addTaskBtn.style.visibility = "visible";
            taskCreatePopup.style.visibility = "hidden";
            
        })
    }
    console.log(window.location.href);
    // ==================== GET ==================== //
    // GET: Tasks
    if (getCookie("authorizationToken") && window.location.href.endsWith("index.html")) {
        fetch("http://demo2.z-bit.ee/tasks", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + getCookie("authorizationToken")
            },
        }).then(response => {
            return response.json().then(payload => {
                if (!response.ok) {
                    throw payload
                }
                return payload;
            })
            
        }).then((data) => {
            console.log(data[0]);
            var length = data.length;
            for (let i = 0; i < length; i++){
                var text = `<div class="todo-item"><div class="todo-item--name">Name: ${data[i].title}</div> <div class="todo-item--description">Description: ${data[i].desc}</div></div>`
                document.getElementById("tasks-container").innerHTML += text;
            }
        })
    }



    // ==================== POST ==================== //
    // POST: Register
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

    // POST: Getting the token
    if (loginBtn) {
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
                return response.json().then(payload => {
                    if (!response.ok) {
                        throw payload
                    }
                    return payload
                })
            }).then(data => {
                console.log("Login response JSON (access_token): ", data.access_token)
                const authorizationToken = data.access_token;
                document.cookie = "authorizationToken=" + authorizationToken;
                window.location.href = "index.html"
            }).catch(err => {
                const errMsg = document.getElementById("errMsg");
                errMsg.innerHTML = err.message;
            });
        });
    }

    // POST: Add Task
    if (createTaskBtn) {
        createTaskBtn.addEventListener("click", () => {
            const taskName = document.getElementById("taskName").value;
            const taskDescription = document.getElementById("taskDescription").value;

            fetch("http://demo2.z-bit.ee/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + getCookie("authorizationToken")
                },
                body: JSON.stringify({
                    "title": taskName,
                    "desc": taskDescription
                })
            }).then(response => {
                if (!response.ok){
                    throw Error("Error", error)
                }
                taskCreatePopup.style.visibility = "hidden"
                return response.json();
            })
        })
    }


    // ==================== UI ==================== //
    // Hides logout button
    if (getCookie("authorizationToken")) {

        if (loggedOutMsg) {
            loggedOutMsg.remove();
        }

    }
    else {
        if (logOutBtn) {
            logOutBtn.remove();
        }

        if (addTaskBtn) {
            addTaskBtn.remove();
        }

        if (taskCreatePopup) {
            taskCreatePopup.remove();
        }
    }


})


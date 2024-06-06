const loginForm = document.getElementById("login")

async function loginResponse(request) {
  const response = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: request,
  })
  
}

loginForm.addEventListener("submit", async function (event) {
  event.preventDefault()

  const logInfos = {
    email: event.target.querySelector("[name=email").value,
    password: event.target.querySelector("[name=password]").value,
  }

  const request = JSON.stringify(logInfos)

  const response = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: request,
  })
  const status = await response.json();

  if (status.message === "user not found" || status.message =="not authorized") {
    const section = document.getElementById("login")
    const error = document.getElementById("error")
    if (error) {
      section.removeChild(error);
    }
    section.innerHTML += `
      <p id="error">Erreur dans l’identifiant ou le mot de passe</p>
    `
  } else {
    window.localStorage.setItem("token", status.token)
    window.location.href = "index.html"
  }
})
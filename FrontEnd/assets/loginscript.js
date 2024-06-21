const loginForm = document.getElementById("login")
loginForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  const data = {
  email: event.target.querySelector("[name=email]").value,
  password: event.target.querySelector("[name=password]").value
  }
  const request = JSON.stringify(data)

    fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json"},
    body: request
  }).then( async function(response) {
    if (!response.ok) {
      const section = document.getElementById("login")
      const error = document.getElementById("error")
        if (error) {
            section.removeChild(error);
        }
      section.innerHTML += `
          <p id="error">Erreur dans l’identifiant ou le mot de passe</p>
        `
    }
    else {
      const status = await response.json()
      window.localStorage.setItem("token", status.token)
      window.location.href = "index.html"
    }
  }
)})
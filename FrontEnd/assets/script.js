const works = await fetch("http://localhost:5678/api/works").then(works => works.json())
const categories = await fetch("http://localhost:5678/api/categories").then(categories => categories.json())

getWorks(works);
getFilters(categories);

const button = document.querySelectorAll(".filters__btn");

button[0].addEventListener("click", () => {
  displayWorks(works, 0)
})

button[1].addEventListener("click", () => {
  let objects = sortWorks(works, 1)
  displayWorks(objects, 1)
})

button[2].addEventListener("click", () => {
  let apartments = sortWorks(works, 2)
  displayWorks(apartments, 2)
})

button[3].addEventListener("click", () => {
  let hotels = sortWorks(works, 3)
  displayWorks(hotels, 3)
})


if (window.localStorage.getItem("token")) {
  document.getElementById("login-btn").innerHTML = "logout"
  document.getElementById("edit-mode").innerHTML += `
    <i class="fa-regular fa-pen-to-square"></i>
    Mode édition
  ` 
  document.getElementById("edit-mode").classList.toggle("active")
  document.getElementById("portfolio--title").innerHTML += `
  <div class="edit modal-trigger">
    <i class="fa-regular fa-pen-to-square"></i>
    modifier
  </div>
  `
  document.querySelector(".filters").innerHTML = ""
  const modalPreview = document.querySelector(".modal-preview")
  for (let i = 0; i < works.length; i++) {
    modalPreview.innerHTML += `
        <figure class="work--${works[i].id}">
          <img src="${works[i].imageUrl}" alt="${works[i].title}">
          <i class="fa-solid fa-trash-can" data-id=${works[i].id}></i>
        </figure>
      `
  }
}

const modalContainer = document.querySelector(".modal-container")
const modalTriggers = document.querySelectorAll(".modal-trigger")

modalTriggers.forEach(trigger => trigger.addEventListener("click", () => {
  modalContainer.classList.toggle("active")
}))

const removeWork = document.querySelectorAll(".fa-trash-can")

removeWork.forEach(icon => icon.addEventListener("click", (event) => {
  event.preventDefault();
  const id = icon.getAttribute("data-id")
  
  if (window.localStorage.getItem("token")) {
    fetch(`http://localhost:5678/api/works/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${window.localStorage.getItem("token")}`,
        "Content-Type": "application/json"
        }
   }).then(async function(response) {
    if (response.ok) {
      const workRemoved = document.querySelectorAll(`.work--${id}`)
      workRemoved.forEach(work => {
        work.remove()
      })
    }
   })
  }
}))
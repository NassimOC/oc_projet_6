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
  document.getElementById("portfolio--title").innerHTML += `
  <div class="edit modal-trigger">
    <i class="fa-regular fa-pen-to-square"></i>
    modifier
  </div>
  `
  document.querySelector(".filters").innerHTML = ""
}

const modalContainer = document.querySelector(".modal-container")
const modalTriggers = document.querySelectorAll(".modal-trigger")

modalTriggers.forEach(trigger => trigger.addEventListener("click", togglemodal))

function togglemodal(){
  modalContainer.classList.toggle("active")
}
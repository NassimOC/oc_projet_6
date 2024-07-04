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

  getModalworks(works)

  const categoryList = document.getElementById("category")
  
  for (let i = 0; i < categories.length; i++) {
    categoryList.innerHTML += `
      <option value="${categories[i].id}">${categories[i].name}</option>
    `
  }
}

const modalEdit1 = document.querySelector(".modal-container")
const modalEdit2 = document.querySelector(".modal-container--2")
const modalTriggers = document.querySelectorAll(".modal-trigger")

modalTriggers.forEach(trigger => trigger.addEventListener("click", () => {
  if (!modalEdit1.classList.contains("active") && modalEdit2.classList.contains("active") ) {
    modalEdit2.classList.toggle("active")
  } else {
    modalEdit1.classList.toggle("active")
  }
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

const modalBtn = document.querySelector(".modal-btn")
const modalBack = document.querySelector(".modal-back")

modalBtn.addEventListener("click", () => {
  modalEdit1.classList.toggle("active")
  modalEdit2.classList.toggle("active")
})
modalBack.addEventListener("click",() => {
  modalEdit1.classList.toggle("active")
  modalEdit2.classList.toggle("active")
})

const form = document.getElementById("upload-form")
const formFile = document.getElementById("image")
const formTitle = document.getElementById("title")
const formCategory = document.getElementById("category")

formTitle.addEventListener("input", ()=> {
  validateForm(formTitle,formCategory, formFile)
})
formCategory.addEventListener("input",() => {
  validateForm(formTitle,formCategory,formFile)
})
formFile.addEventListener("input", () => {
  validateForm(formTitle,formCategory,formFile)
})

formFile.addEventListener('change', event => {
  const file = event.target.files[0]
  const section = document.querySelector(".upload-info")
  const image = document.getElementById("previewImg")
  
  if (file) {
    section.style.display = "none"
    image.style.display = "block"
    const reader = new FileReader();
    reader.onload = e => {
      image.src = e.target.result
    }

    reader.readAsDataURL(file)

    modalTriggers.forEach(trigger => trigger.addEventListener("click", () => {
      section.style.display = "flex"
      image.style.display = "none"
    }))
  }
})

modalTriggers.forEach(trigger => trigger.addEventListener("click", () => {
  formFile.value = ""
  formTitle.value =""
  formCategory.value =""
  validateForm(formTitle,formCategory, formFile)
  document.querySelector(".error-message").style.display = "none"
}))

form.addEventListener("submit", (event) => {
  event.preventDefault();
  new FormData(form)
})
form.addEventListener("formdata", (event) => {
  const data = event.formData;

  fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${window.localStorage.getItem("token")}`
      },
    body: data
  }).then( async function(response) {
    if (response.ok) {
      console.log(response.status)
      const newWorks = await fetch("http://localhost:5678/api/works").then(works => works.json())
      getWorks(newWorks)
      getModalworks(newWorks)
      modalEdit2.classList.toggle("active")
    } else {
      console.log(response.status)
      document.querySelector(".error-message").style.display = "block"
    }
  })
})
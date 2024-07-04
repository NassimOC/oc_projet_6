function getWorks(works) {
  const gallery = document.querySelector(".gallery")
  for (let i = 0; i < works.length; i++) {
    gallery.innerHTML += `
        <figure class="work--${works[i].id}">
          <img src="${works[i].imageUrl}" alt="${works[i].title}">
          <figcaption>${works[i].title}</figcaption>
        </figure>
      `
  }
}

function getFilters(categories) {
  const categoryList = new Set();
  const section = document.querySelector(".filters")

  for (let i = 0; i < categories.length; i++) {
    categoryList.add(categories[i].name)
  }
  for (let i = 0; i < categoryList.size; i++) {
    if (i == 0) {
      section.innerHTML += `
        <button class="filters__btn filters__btn--active">Tous</button>
      `
    }
    section.innerHTML += `
      <button class="filters__btn filters__btn--${categories[i].id}">${categories[i].name}</button>
    `
   }
   return categoryList
}

function sortWorks(works, categoryId) {
  const categorySet = new Set();
  for (let i = 0; i < works.length; i++) {
    if (works[i].category.id === categoryId) {
      categorySet.add(works[i])
    }}
  const set = Array.from(categorySet)
  return set
}

function displayWorks(set, btnNumber) {
  const gallery = document.querySelector(".gallery")
  const button = document.querySelectorAll(".filters__btn");
  
  for (let i = 0; i < button.length; i++) {
    button[i].classList.remove("filters__btn--active")
  }
  button[btnNumber].classList.add("filters__btn--active")
  gallery.innerHTML = ""
  getWorks(set)
}

function validateForm(formTitle, formCategory, formFile) {
  const submitBtn = document.querySelector(".modal-btn--2")
  if (formTitle.value !== "" && formCategory.value !== "" && formFile.files.length > 0) {
    submitBtn.disabled = false
  } else { 
    submitBtn.disabled = true
  }
}

function getModalworks(works) {
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
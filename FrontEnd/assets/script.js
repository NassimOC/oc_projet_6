const reponse = await fetch("http://localhost:5678/api/works");
const works = await reponse.json();

// Récupération des travaux depuis le back-end
const gallery = document.querySelector(".gallery");

for (let i = 0; i < works.length; i++) {
  gallery.innerHTML += `
      <figure>
        <img src="${works[i].imageUrl}" alt="${works[i].title}">
        <figcaption>${works[i].title}</figcaption>
      </figure>
    `
}

// Création des sets par catégorie
const objectSet = new Set();
const apartmentSet = new Set();
const hotelSet = new Set();

for (let i = 0; i < works.length; i++) {
  if (works[i].category.id === 1) {
    objectSet.add(works[i])
  } else if (works[i].category.id === 2) {
    apartmentSet.add(works[i])
  } else {
    hotelSet.add(works[i])
  }
}
const objects = Array.from(objectSet)
const apartments = Array.from(apartmentSet)
const hotels = Array.from(hotelSet)

const button = document.querySelectorAll(".filters button");
button[0].classList.add("selected-button")

button[0].addEventListener("click", () => {
  for (let i = 0; i < button.length; i++) {
    button[i].classList.remove("selected-button")
  }
  button[0].classList.add("selected-button")
  gallery.innerHTML = ""
  for (let i = 0; i < works.length; i++) {
    gallery.innerHTML += `
        <figure>
          <img src="${works[i].imageUrl}" alt="${works[i].title}">
          <figcaption>${works[i].title}</figcaption>
        </figure>
      `
  }
})

button[1].addEventListener("click", () => {
  for (let i = 0; i < button.length; i++) {
    button[i].classList.remove("selected-button")
  }
  button[1].classList.add("selected-button")
  gallery.innerHTML = ""
  for (let i = 0; i < objects.length; i++) {
    gallery.innerHTML += `
        <figure>
          <img src="${objects[i].imageUrl}" alt="${objects[i].title}">
          <figcaption>${objects[i].title}</figcaption>
        </figure>
      `
  }
})

button[2].addEventListener("click", () => {
  for (let i = 0; i < button.length; i++) {
    button[i].classList.remove("selected-button")
  }
  button[2].classList.add("selected-button")
  gallery.innerHTML = ""
  for (let i = 0; i < apartments.length; i++) {
    gallery.innerHTML += `
        <figure>
          <img src="${apartments[i].imageUrl}" alt="${apartments[i].title}">
          <figcaption>${apartments[i].title}</figcaption>
        </figure>
      `
  }
})

button[3].addEventListener("click", () => {
  for (let i = 0; i < button.length; i++) {
    button[i].classList.remove("selected-button")
  }
  button[3].classList.add("selected-button")
  gallery.innerHTML = ""
  for (let i = 0; i < hotels.length; i++) {
    gallery.innerHTML += `
        <figure>
          <img src="${hotels[i].imageUrl}" alt="${hotels[i].title}">
          <figcaption>${hotels[i].title}</figcaption>
        </figure>
      `
  }
})
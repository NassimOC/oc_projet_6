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
//


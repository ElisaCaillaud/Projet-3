/*Affichage des projets dynamique, parcourt tableau avec les données et concaténation des données dans nouvelles balises html*/
async function getProjets(param) {
  const response = await fetch(`http://localhost:5678/api/works`);
  const data = await response.json();

  var gallery = document.querySelector(".gallery");

  var texte = "";

  for (let i = 0; i < data.length; i++) {
    console.log(i);
    console.log(data[i]["title"]);
    console.log(data[i]["imageUrl"]);

    /*Afficher le tri directement + indiqué*/
    if (param == data[i]["category"]["id"] || param == "0") {
      texte += `
      <figure>
              <img src="${data[i]["imageUrl"]}" alt="${data[i]["title"]}" />
              <figcaption>${data[i]["title"]}</figcaption>
      </figure>
      `;
    }
  }

  gallery.innerHTML = texte;
}
//afficher la bonne page si l'utilisateur est connecté
function checkAuthentification() {
  const modifBtn = document.getElementById("modif");
  modifBtn.style.display = "none";
  const token = window.localStorage.getItem("token");

  if (token != null) {
    modif.style.display = "block";
  }
}
//Lancement fonction
document.addEventListener("DOMContentLoaded", function () {
  getProjets("0");

  checkAuthentification();
});

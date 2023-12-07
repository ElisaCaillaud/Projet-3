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

/*Affichage des projets dynamiques SUR LA MODAL*/
async function getProjetsModal() {
  const response = await fetch(`http://localhost:5678/api/works`);
  const data = await response.json();

  var gallery = document.querySelector(".galleryModal");

  var texte = "";

  for (let i = 0; i < data.length; i++) {
    /*Afficher les images actualisées avec récupération de l'ID
    Pour afficher la poubelle, Image des projets en background pour placer
    plus facilement la poubelle dessus*/
    texte += `
      <div class="itemGallery" style="background-image:url('${data[i]["imageUrl"]}');">
              <a onclick="deleteProject(${data[i]["id"]})" class="removeGallery"><i class="fa-solid fa-trash-can fa-xs" style="color: #ffffff;"></i></a>
      </div>
      `;
  }

  gallery.innerHTML = texte;
}

/*Fonction de suppression des projets DANS LA MODAL*/
async function deleteProject(id) {
  /*Vérification du token pour autorisation suppression*/
  const headers = {
    Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  };
  /*Suppression*/
  await fetch(`http://localhost:5678/api/works/${id}`, {
    method: "DELETE",
    headers: headers,
  });
  getProjetsModal();
  getProjets("0");
}

//afficher la bonne page si l'utilisateur est connecté
function checkAuthentification() {
  const modifBtn = document.getElementById("modif");
  modifBtn.style.display = "none";
  const token = window.localStorage.getItem("token");

  //PROBLEME : le token reste toujours meme si je suis partie depuis la derniere fois
  //donc le bouton modifier est toujours apparent
  if (token != null) {
    modifBtn.style.display = "block";
  }
}

//Lancement fonction
document.addEventListener("DOMContentLoaded", function () {
  getProjets("0");
  getProjetsModal();

  checkAuthentification();
  /*Event d'apparition et de disparition de la modal au clic*/
  var jsModal = document.getElementById("modif");
  var modal = document.getElementById("modal1");
  var modalWrapper = document.querySelector(".modal-wrapper");
  var closeModalButton = document.querySelector(".js-modal-close");

  if (modal.style.display === "flex") {
    document.addEventListener("click", function (event) {
      if (
        event.target.matches(".js-modal-close") ||
        !event.target.closest("#modal1")
      ) {
        modal.style.display = "none";
      }
    });
  }

  jsModal.addEventListener("click", function () {
    // Ouvrir la modal
    modal.style.display = "flex";
  });
});

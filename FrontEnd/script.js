/*****Affichage des projets dynamique, parcourt tableau avec les données 
 et concaténation des données dans nouvelles balises html*******/
async function getProjets(param) {
  const response = await fetch(`http://localhost:5678/api/works`);
  const data = await response.json();

  var gallery = document.querySelector(".gallery");

  var texte = "";

  for (let i = 0; i < data.length; i++) {
    console.log(i);
    console.log(data[i]["title"]);
    console.log(data[i]["imageUrl"]);

    /*Afficher le tri directement + indiqué, on parcourt le tableau de l'API
    et on l'injecte dans le html avec une nouvelle balise*/
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

/*****Affichage des catégories dans la liste deroulante de la modal ajoutPhoto*****/
async function getCategories() {
  const response = await fetch(`http://localhost:5678/api/categories`);
  const data = await response.json();

  var select = document.querySelector("#categoryAddPhoto");
  var textSelect = "";

  for (let i = 0; i < data.length; i++) {
    //console.log(i);
    //console.log(data[i]["id"]);
    //console.log(data[i]["name"]);

    /*Ajouter les categories*/
    textSelect += `
      <option value="${data[i]["id"]}">${data[i]["name"]}</option>
      `;
  }
  /*ajout des balises dans select*/
  select.innerHTML = textSelect;
}

/*****Affichage des projets dynamiques SUR LA MODAL*****/
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

  /*ajout des balises dans galerie*/
  gallery.innerHTML = texte;
}

/*****Fonction de suppression des projets DANS LA MODAL*****/
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
  /*relance des fonctions pour afficher les projets actualisés*/
  getProjetsModal();
  getProjets("0");
}

/******Affichage de la bonne page ACCUEIL si l'utilisateur est connecté*****/
function checkAuthentification() {
  const token = window.localStorage.getItem("token");
  const loginJsHome = document.querySelector(".homeLogin");
  const logoutJsHome = document.querySelector(".homeLogout");
  const modifBtn = document.querySelector(".modif");

  /*si le token est ok, on affiche les boutons*/
  if (token) {
    modifBtn.style.display = "flex";
    loginJsHome.style.display = "none";
    logoutJsHome.style.display = "inline";
  } else {
    modifBtn.style.display = "none";
    loginJsHome.style.display = "inline";
    logoutJsHome.style.display = "none";
  }
}

/*****Lancement fonction*******/
document.addEventListener("DOMContentLoaded", function () {
  getProjets("0");
  getProjetsModal();
  getCategories();
  checkAuthentification();

  /*Event pour deconnexion au click de logout*/
  const logoutJsHome = document.querySelector(".homeLogout");
  logoutJsHome.addEventListener("click", function () {
    window.localStorage.removeItem("token");
    window.location.href = "index.html";
  });

  var jsModal = document.getElementById("modif"); // Btn modifier
  var modal = document.getElementById("modal1"); // la modale entière, qui couvre la fenêtre
  var closeModalButton = document.querySelector(".js-modal-close");
  var modalContenu = document.querySelector(".modal-wrapper"); // corps de la modale

  /*****OUVRIR MODALE*****/
  jsModal.addEventListener("click", function (event) {
    event.stopPropagation(); // Empêche la propagation du clic pour éviter la fermeture immédiate
    modal.style.display = "flex";
  });

  /*****FERMER MODALE*****/
  /*Verifier que le clic est en dehors de la modale, si oui on ferme*/
  document.addEventListener("click", function (event) {
    var isClickInsideModal = modalContenu.contains(event.target);
    if (!isClickInsideModal) {
      modal.style.display = "none";
    }
  });

  /*fermeture avec le bouton*/
  closeModalButton.addEventListener("click", function (event) {
    event.stopPropagation();
    modal.style.display = "none";
  });

  /******AFFICHER DEUXIEME FENETRE MODALE******/
  var afficherGalerieJS = document.querySelector(".afficherGalerie");
  var ajoutPhotoJS = document.querySelector(".ajoutPhoto");
  var btnAjoutJS = document.querySelector("#addPhoto");
  var flecheRetour = document.querySelector("#arrowLeft");

  /*Afficher une preview de la nouvelle image ajoutée dans la modale en miniature*/
  var imageUpload = document.getElementById("newPhoto");
  var imagePreview = document.getElementById("imagePreview");
  /*affichage avec le file reader*/
  imageUpload.addEventListener("change", function () {
    var hideBlocImg = document.getElementById("iconeImage");
    var hideBlocBtn = document.getElementById("btnAjouter");
    var hideBlocTxt = document.getElementById("textJpg");
    var fileImage = event.target.files[0];
    if (fileImage) {
      var reader = new FileReader();
      reader.onload = function (event) {
        imagePreview.src = event.target.result;
        imagePreview.style.display = "block"; //masquer les autres boutons
        hideBlocImg.style.display = "none";
        hideBlocBtn.style.display = "none";
        hideBlocTxt.style.display = "none";
      };
      reader.readAsDataURL(fileImage);
    }
  });

  /*affichage deuxieme modale et retour arriere avec fleche*/
  btnAjoutJS.addEventListener("click", function () {
    //console.log("clique");
    afficherGalerieJS.style.display = "none";
    ajoutPhotoJS.style.display = "block";
    flecheRetour.style.display = "block";
  });

  flecheRetour.addEventListener("click", function () {
    afficherGalerieJS.style.display = "block";
    ajoutPhotoJS.style.display = "none";
    flecheRetour.style.display = "none";
  });

  /******BOUTON DISABLED*******/
  /*Stocker les champs dans un array*/
  var inputArray = [
    document.querySelector(".newPhoto"),
    document.querySelector("#titre"),
    document.querySelector("#categoryAddPhoto"),
  ];

  /*Parcourir le tableau a chaque fois pour reverifier a chaque champs que tous 
  les autres champs sont remplis*/
  inputArray.forEach((element) => {
    element.addEventListener("focusout", function (event) {
      var vide = false;
      inputArray.forEach((el) => {
        if (el.value == "") {
          vide = true;
        }
      });
      /*Activer ou non le bouton du formulaire*/
      var btnPhoto = document.querySelector(".btnPhoto");
      if (vide) {
        btnPhoto.setAttribute("disabled", "");
        btnPhoto.style.backgroundColor = "#a7a7a7";
      } else {
        btnPhoto.removeAttribute("disabled");
        btnPhoto.style.backgroundColor = "#1d6154";
      }
    });
  });

  /******Ajout nouveau projet modale*****/
  var ajoutFormPhotoJs = document.querySelector(".ajoutPhotoForm");

  /*Evenement au submit du formulaire*/
  ajoutFormPhotoJs.addEventListener("submit", async function (event) {
    var inputFile = document.querySelector(".newPhoto").files[0];
    var titreFile = document.querySelector("#titre").value;
    var catFile = document.querySelector("#categoryAddPhoto").value;
    /*Evite rechargement de la page*/
    event.preventDefault();
    const output = document.querySelector("#output");

    /*utilisation de l'objet formData pour traiter le form plus facilement 
    - le body du fetch*/
    const formData = new FormData();

    /*Verification de la taille des fichiers et du format*/
    if (inputFile.size > 4 * 1024 * 1024) {
      //4 mo
      output.innerHTML =
        "Erreur : La taille du fichier dépasse la limite de 4 Mo.";
      return;
    }

    if (!/\.jpg|\.png$/i.test(inputFile.name)) {
      output.innerHTML = "Erreur : Le fichier doit être au format JPG ou PNG.";
      return;
    }

    /*Correspondance clé API*/
    formData.append("title", titreFile);
    formData.append("category", catFile);
    formData.append("image", inputFile);

    /*Ajout token*/
    const token = window.localStorage.getItem("token");

    const request = new XMLHttpRequest();

    /*Mise en place du POST + lien vers API + Verification token*/
    request.open("POST", "http://localhost:5678/api/works", true);
    request.setRequestHeader("Authorization", `Bearer ${token}`);
    request.onload = (event) => {
      output.innerHTML =
        request.status === 201
          ? "Image ajoutée !"
          : `Erreur ${request.status} lors de la tentative de téléversement du fichier.<br />`;

      if (request.status === 201) {
        // Réinitialiser chaque champ du formulaire après l'envoi réussi
        document.querySelector(".newPhoto").value = "";
        document.querySelector("#titre").value = "";
        document.querySelector("#categoryAddPhoto").value = "";
      }

      /*Actualisation des images en dynamique lors de l'ajout*/
      getProjetsModal();
      getProjets("0");
    };

    request.send(formData);
  });
});

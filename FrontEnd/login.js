var lienAPI = "http://localhost:5678/api/";

// Fonction asynchrone pour Login
async function ajoutListenerEnvoyerLogin() {
  //sélection du formulaire
  const formLogin = document.querySelector(".formConnexion");

  //Ajout event au clic du btn submit
  formLogin.addEventListener("submit", async function (event) {
    event.preventDefault();

    /*objet login avec mail et mdp*/
    const login = {
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    };

    /*transformation en JSON*/
    const loginJson = JSON.stringify(login);

    /*requete serveur*/
    const response = await fetch(`${lienAPI}users/login`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: loginJson,
    });

    const data = await response.json();
    const statusCode = response.status;

    const status401 = document.getElementById("errorText401");
    const status404 = document.getElementById("errorText404");
    const statusError = document.getElementById("errorText");

    /*messages d'erreur/ validation et redirection*/
    if (statusCode === 200) {
      window.localStorage.setItem("token", data["token"]);
      window.localStorage.setItem("userId", data["userId"]);
      window.location.href = "index.html";
    } else if (statusCode === 401) {
      status401.style.display = "block";
      status404.style.display = "none";
      statusError.style.display = "none";
    } else if (statusCode === 404) {
      status404.style.display = "block";
      status401.style.display = "none";
      statusError.style.display = "none";
    } else {
      statusError.style.display = "block";
      status401.style.display = "none";
      status404.style.display = "none";
    }
  });
}

// Fonction lancée après chargement du DOM
document.addEventListener("DOMContentLoaded", function () {
  ajoutListenerEnvoyerLogin();

  /*ne pas afficher logout sur la page de connexion*/
  const logLogout = document.querySelector(".logLogout");
  logLogout.style.display = "none";
});

//Fonction asynchrone pour Login
async function ajoutListenerEnvoyerLogin() {
  //séléction du formulaire
  const formLogin = document.querySelector(".formConnexion");

  //Ajout event au clic du btn submit
  formLogin.addEventListener("submit", async function (event) {
    event.preventDefault();
    //alert("Ok");
    //Récupération des bonnes données html
    const login = {
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    };
    //Transformation en string JSON pour le fetch qui ne lit que du string
    const loginJson = JSON.stringify(login);
    //fetch pour envoyer les données de login
    const response = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: loginJson,
    });
    //Réponse
    const data = await response.json();

    //Récupérer statuts code, 404, 200 ou 401
    const statusCode = response.status;

    //Système message d'erreur
    const status401 = document.getElementById("errorText401");
    const status404 = document.getElementById("errorText404");
    const statusError = document.getElementById("errorText");

    //Récupération du token si login/mdp OK sinon erreur + message erreur
    if (statusCode === 200) {
      //alert(data["token"]);
      window.localStorage.setItem("token", data["token"]);
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

//Fonction lancée après chargement du DOM
document.addEventListener("DOMContentLoaded", function () {
  ajoutListenerEnvoyerLogin();
});

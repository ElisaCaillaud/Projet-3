async function ajoutListenerEnvoyerLogin() {
  const formLogin = document.querySelector(".formConnexion");
  formLogin.addEventListener("submit", async function (event) {
    event.preventDefault();
    //alert("Ok");

    const login = {
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    };

    const loginJson = JSON.stringify(login);

    const response = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: loginJson,
    });

    const data = await response.json();

    //alert(data["token"]);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  ajoutListenerEnvoyerLogin();
});

let user_mail;
let user_pass;

function test_login() {
  let fetchData = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: user_mail.value,
      password: user_pass.value,
    }),
  };
  fetch("http://localhost:5678/api/users/login", fetchData)
    .then(function (reponse) {
      if (!reponse.ok) {
        throw reponse;
      } else {
       
        return reponse.json();
      }
    })

    .then(function (reponse) {
      sessionStorage.setItem("token", reponse.token);
      sessionStorage.setItem("userId", reponse.userId);

      document.location.href = "./index.html";
      const affiche = document.querySelector(".bloc_mode_edition");
      affiche.style.display = "flex";
      return;
    })
    .catch((e) => {
      if (e.status === 401) {
        document.querySelector(".erreur_message").innerHTML =
          "Mot de passe incorrect";
        document.querySelector(".erreur_message").style.display = "flex";
        return;
      }
      if (e.status === 404) {
        document.querySelector(".erreur_message").innerHTML =
          "Email utilisateur inconnu";
        document.querySelector(".erreur_message").style.display = "flex";
        return;
      }
      if (!sessionStorage.getItem("token")) {
        document.querySelector(".erreur_message").innerHTML =
          "problème de connexion au serveur ou à internet";
        document.querySelector(".erreur_message").style.display = "flex";
      }
    });
}

const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  user_mail = document.getElementById("mail");
  user_pass = document.getElementById("pass");
  test_login();
});

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
        document.querySelector(".erreur_identifiants").style.display = "flex";
        return;
      }
      return reponse.json();
    })
    .then(function (reponse) {
      sessionStorage.setItem("token", reponse.token);
      sessionStorage.setItem("userId", reponse.userId);

      document.location.href = "./index.html";
      const affiche = document.querySelector(".bloc_mode_edition");
      affiche.style.display = "flex";
    })
    .catch((error) => {
      console.log("erreur " + error.code);
      return;
    }
      
    );
}

const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  user_mail = document.getElementById("mail");
  user_pass = document.getElementById("pass");
  test_login();
});



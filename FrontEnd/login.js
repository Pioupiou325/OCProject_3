const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const user_mail = document.getElementById("mail");
  const user_pass = document.getElementById("pass");

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
        document.querySelector(".erreur_identifiants").style.display="flex";
        throw new Error("identifient et/ou mot de passe incorrect");
      }
      return reponse.json();
    })
    .then(function (reponse) {
      sessionStorage.setItem("token", reponse.token);
      sessionStorage.setItem("userId", reponse.userId);

      var token = sessionStorage.getItem("token");
      var userId = sessionStorage.getItem("userId");

      document.location.href = "./index.html";
      const affiche = document.querySelector(".bloc_mode_edition");
      affiche.style.display = "flex";
    });
});

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
  console.log(fetchData);

  fetch("http://localhost:5678/api/users/login", fetchData)
    .then(function (reponse) {
      if (!reponse.ok) {
        throw new Error(
          `erreur HTTP! ou identifient et/ou mot de passe incorrect statut: ${reponse.status}`
        );
      }
      return reponse.json();
    })
    .then(function (reponse) {
      console.log(reponse.token);
      sessionStorage.setItem("token", reponse.token);
      sessionStorage.setItem("userId", reponse.userId);

      var token = sessionStorage.getItem("token");
      var userId = sessionStorage.getItem("userId");

      console.log(token);
      console.log(userId);
      document.location.href = "./index.html";
      const affiche = document.querySelector(".bloc_mode_edition");
      affiche.style.display = "flex";
    });
});

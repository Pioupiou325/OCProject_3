const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const user_mail = document.getElementById("mail");
  const user_pass = document.getElementById("pass");
  console.log(user_mail.value);
  console.log(user_pass.value);

  let fetchData = {
    method: "POST",
    body: JSON.stringify({
      email: "sophie.bluel@test.tld",
      password: "S0phie",
    }),
  };
  console.log(fetchData);
  fetch("http://localhost:5678/api/users/login", fetchData)
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
    });
});

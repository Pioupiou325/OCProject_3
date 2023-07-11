// boutons filtres :

// const filters = document.createElement("filters");
// const tous = document.createElement("button");
// tous.innerText = "Tous";

// const btn_objets = document.createElement("button");
// btn_objets.innerText = "Objets";
// const btn_appartements = document.createElement("button");
// btn_appartements.innerText = "Appartements";
// const btn_barsetrestos = document.createElement("button");
// btn_barsetrestos.innerText = "Bars et Restaurants";

// filters.appendChild(tous);
// filters.appendChild(btn_objets);
// filters.appendChild(btn_appartements);
// filters.appendChild(btn_barsetrestos);

// document.querySelector(".projets").appendChild(filters);

fetch("http://localhost:5678/api/works")
  .then((response) => response.json())
  .then((response) => {
    console.table(response);
    // boucle pour chaque travail
    for (let i = 0; i < response.length; i++) {
      console.log(response[i].imageUrl);
      console.log(response[i].categoryId);

      // test de tri pour les 3 catégories

      // crée une div figure
      const figure = document.createElement("figure");
      // cree la div image
      const image = document.createElement("img");
      // indique la source de l image
      image.src = response[i].imageUrl;
      image.alt = response[i].title;
      const figcaption = document.createElement("figcaption");
      figcaption.innerText = response[i].title;
      // crée la div paragraphe pour le titre de la photo
      //   const title = document.createElement("p");
      // indique le titre de la photo
      //   title.innerText = response[i].title;
      //   inclut les 2 enfants image+titre dans la div figure
      figure.appendChild(image);

      figure.appendChild(figcaption);

      //   inclut l' enfant figure dans la div gallery

      // gallery.appendChild(figure); ceci ne fonctionne pas car gallery pas créée en js ?

      document.querySelector(".gallery").appendChild(figure);
    }

    // prise en compte des 4 boutons (à faire en JS ou dans html ?)
    const tous = document.querySelector(".tous");
    const objets = document.querySelector(".objets");
    const appartements = document.querySelector(".appartements");
    const barsetrestos = document.querySelector(".barsetrestos");

    tous.addEventListener("click", () => {
      console.log("tous");
      document.querySelector(".gallery").innerText = "";
      // boucle pour chaque travail
      for (let i = 0; i < response.length; i++) {
        console.log(response[i].imageUrl);
        console.log(response[i].categoryId);

        // test de tri pour les 3 catégories

        // crée une div figure
        const figure = document.createElement("figure");
        // cree la div image
        const image = document.createElement("img");
        // indique la source de l image
        image.src = response[i].imageUrl;
        // crée la div paragraphe pour le titre de la photo
        const title = document.createElement("p");
        // indique le titre de la photo
        title.innerText = response[i].title;
        //   inclut les 2 enfants image+titre dans la div figure
        figure.appendChild(image);
        figure.appendChild(title);
        //   inclut l' enfant figure dans la div gallery

        // gallery.appendChild(figure); ceci ne fonctionne pas car gallery pas créée en js ?

        document.querySelector(".gallery").appendChild(figure);
      }
    });
    objets.addEventListener("click", () => {
      console.log("objets");
      document.querySelector(".gallery").innerText = "";
      // boucle pour chaque travail
      for (let i = 0; i < response.length; i++) {
        console.log(response[i].imageUrl);
        console.log(response[i].categoryId);

        // test de tri pour les 3 catégories
        if (response[i].categoryId === 1) {
          // crée une div figure
          const figure = document.createElement("figure");
          // cree la div image
          const image = document.createElement("img");
          // indique la source de l image
          image.src = response[i].imageUrl;
          // crée la div paragraphe pour le titre de la photo
          const title = document.createElement("p");
          // indique le titre de la photo
          title.innerText = response[i].title;
          //   inclut les 2 enfants image+titre dans la div figure
          figure.appendChild(image);
          figure.appendChild(title);
          //   inclut l' enfant figure dans la div gallery

          // gallery.appendChild(figure); ceci ne fonctionne pas car gallery pas créée en js ?

          document.querySelector(".gallery").appendChild(figure);
        }
      }
    });
    appartements.addEventListener("click", () => {
      console.log("appartements");
      document.querySelector(".gallery").innerText = "";
      // boucle pour chaque travail
      for (let i = 0; i < response.length; i++) {
        console.log(response[i].imageUrl);
        console.log(response[i].categoryId);

        // test de tri pour les 3 catégories
        if (response[i].categoryId === 2) {
          // crée une div figure
          const figure = document.createElement("figure");
          // cree la div image
          const image = document.createElement("img");
          // indique la source de l image
          image.src = response[i].imageUrl;
          // crée la div paragraphe pour le titre de la photo
          const title = document.createElement("p");
          // indique le titre de la photo
          title.innerText = response[i].title;
          //   inclut les 2 enfants image+titre dans la div figure
          figure.appendChild(image);
          figure.appendChild(title);
          //   inclut l' enfant figure dans la div gallery

          // gallery.appendChild(figure); ceci ne fonctionne pas car gallery pas créée en js ?

          document.querySelector(".gallery").appendChild(figure);
        }
      }
    });
    barsetrestos.addEventListener("click", () => {
      console.log("barsetrestos");
      document.querySelector(".gallery").innerText = "";
      // boucle pour chaque travail
      for (let i = 0; i < response.length; i++) {
        console.log(response[i].imageUrl);
        console.log(response[i].categoryId);

        // test de tri pour les 3 catégories
        if (response[i].categoryId === 3) {
          // crée une div figure
          const figure = document.createElement("figure");
          // cree la div image
          const image = document.createElement("img");
          // indique la source de l image
          image.src = response[i].imageUrl;
          // crée la div paragraphe pour le titre de la photo
          const title = document.createElement("p");
          // indique le titre de la photo
          title.innerText = response[i].title;
          //   inclut les 2 enfants image+titre dans la div figure
          figure.appendChild(image);
          figure.appendChild(title);
          //   inclut l' enfant figure dans la div gallery

          // gallery.appendChild(figure); ceci ne fonctionne pas car gallery pas créée en js ?

          document.querySelector(".gallery").appendChild(figure);
        }
      }
    });
  });

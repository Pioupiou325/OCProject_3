let works;
let array_works;

fetch("http://localhost:5678/api/works")
  .then((response) => response.json())
  .then((response) => {
    // sauvegarde du tableau de travaux
    works = response;

    array_works = response;
    // chargement de la page d accueil avec tous les travaux de base
    show_images(array_works);
  });

if (sessionStorage.getItem("token") != null) {
  const affiche = document.querySelector(".bloc_mode_edition");
  affiche.style.display = "flex";
  const affiche2 = document.querySelector(".afficher_modifier");
  affiche2.style.display = "flex";
  document.querySelector(".login_ok").style.display = "inline";
  document.querySelector(".login_none").style.display = "none";
  afficher_modifier.addEventListener("click", () => {
    console.log("modale à lancer");
  });
} else {
  // création des boutons de filtres si le token est absent
  const filters = document.createElement("div");
  filters.id = "filtres";

  const tous = document.createElement("button");

  tous.id = "tous";
  tous.innerText = "Tous";
  console.log(tous.class);
  console.log(tous.id);
  const objets = document.createElement("button");
  objets.class = "filters-buttons";
  objets.id = "objets";
  objets.innerText = "Objets";
  const appartements = document.createElement("button");
  tous.class = "filters-buttons";
  appartements.id = "appartements";
  appartements.innerText = "Appartements";
  const hotelsetrestos = document.createElement("button");
  hotelsetrestos.class = "filters-buttons";
  hotelsetrestos.id = "hotelsetrestos";
  hotelsetrestos.innerText = "Hôtels et Restaurants";

  filters.appendChild(tous);
  filters.appendChild(objets);
  filters.appendChild(appartements);
  filters.appendChild(hotelsetrestos);

  document.querySelector(".filters").appendChild(filters);

  const show_filters = document.querySelector(".filters");
  show_filters.classList.add("show_filters");

  // si le bouton Tous cliqué
  tous.addEventListener("click", () => {
    document.querySelector(".gallery").innerText = "";
    // boucle pour chaque travail
    array_works = works;
    // on envoie le tableau de base
    show_images(array_works);
  });

  // si le bouton Objets cliqué
  objets.addEventListener("click", () => {
    console.log("objets");
    document.querySelector(".gallery").innerText = "";
    array_works = works;
    // tri des works en catégorie objets (Category.Id=1)
    function filterByCategorie(element) {
      if (element.categoryId === 1) {
        return true;
      } else {
        console.log(element.categoryId);
        return false;
      }
    }
    // on crée le tableau filtré par Objets
    array_works = works.filter(filterByCategorie);
    // on affiche le tableau
    show_images(array_works);
  });

  // si le bouton Appartements est cliqué
  appartements.addEventListener("click", () => {
    console.log("appartements");
    document.querySelector(".gallery").innerText = "";
    // tri des works en catégorie Appart (Category.Id=2)
    function filterByCategorie(element) {
      if (element.categoryId === 2) {
        return true;
      } else {
        console.log(element.categoryId);
        return false;
      }
    }
    // on crée le tableau filtré par Appart
    array_works = works.filter(filterByCategorie);
    // on affiche le tableau
    show_images(array_works);
  });

  // si le bouton hotels et restos est cliqué
  hotelsetrestos.addEventListener("click", () => {
    console.log("hotelsetrestos");
    document.querySelector(".gallery").innerText = "";
    // tri des works en catégorie hotels et restos (CategoryId=3)
    function filterByCategorie(element) {
      if (element.categoryId === 3) {
        return true;
      } else {
        console.log(element.categoryId);
        return false;
      }
    }
    // on créée le tableau filtré par hotels et restos
    array_works = works.filter(filterByCategorie);
    // on affiche le tableau
    show_images(array_works);
  });
}

//   IIIIIIIIIIIIIIi

// boucle pour chaque travail
function show_images(tab) {
  for (let i = 0; i < tab.length; i++) {
    // crée une div figure
    const figure = document.createElement("figure");
    // cree la div image
    const image = document.createElement("img");
    // indique la source de l image
    image.src = tab[i].imageUrl;
    // crée la div paragraphe pour le titre de la photo
    const title = document.createElement("p");
    // indique le titre de la photo
    title.innerText = tab[i].title;
    //   inclut les 2 enfants image+titre dans la div figure
    figure.appendChild(image);
    figure.appendChild(title);
    //   inclut l' enfant figure dans la div gallery
    document.querySelector(".gallery").appendChild(figure);
  }
}

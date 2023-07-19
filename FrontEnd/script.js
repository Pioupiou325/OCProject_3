let works;
fetch("http://localhost:5678/api/works")
  .then((response) => response.json())
  .then((response) => {
    works = response;
    let array_works = response;
    show_images(array_works);
  })
  .catch((error) => {
    console.log(error);
  });

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
function mode_edition() {
  document.getElementById("filtres").style.display = "none";
  const affiche = document.querySelector(".bloc_mode_edition");
  affiche.style.display = "flex";
  const affiche2 = document.querySelector(".afficher_modifier");
  affiche2.style.display = "flex";
  document.querySelector(".login_ok").style.display = "inline";
  document.querySelector(".login_none").style.display = "none";
  afficher_modifier.addEventListener("click", () => {
    modale_start();
  });
  document.getElementById("login_ok").addEventListener("click", () => {
    mode_deconnect();
  });
}

function mode_deconnect() {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("userId");
  document.getElementById("filtres").style.display = "flex";
  // create_boutons_filters(array_categories);
  const affiche = document.querySelector(".bloc_mode_edition");
  affiche.style.display = "none";
  const affiche2 = document.querySelector(".afficher_modifier");
  affiche2.style.display = "none";
  document.querySelector(".login_ok").style.display = "none";
  document.querySelector(".login_none").style.display = "inline";
}

// fonction de creation des boutons suivant le tableau categories
function create_boutons_filters() {
  fetch("http://localhost:5678/api/categories")
    .then((reponse) => reponse.json())
    .then((reponse) => {
      categories = reponse;
      array_categories = reponse;
      // bouton pour toutes les catégories
      const filters = document.getElementById("filtres");
      const tous = document.createElement("button");
      tous.class = "filters-buttons";
      tous.id = "tous";
      tous.innerText = "Tous";
      filters.appendChild(tous);
      tous.addEventListener("click", () => {
        document.querySelector(".gallery").innerText = "";
        show_images(works);
      });
      // boucle pour créer les boutons de chaque catégorie
      for (let i = 0; i < array_categories.length; i++) {
        const btn_filter = document.createElement("button");
        btn_filter.class = "filters-buttons";
        btn_filter.id = array_categories[i].name;
        btn_filter.innerText = array_categories[i].name;
        filters.appendChild(btn_filter);
        btn_filter.addEventListener("click", () => {
          console.log(filters.id);
          document.querySelector(".gallery").innerText = "";
          array_works = works;
          // tri des works par catégorie
          function filterByCategorie(element) {
            if (element.category.name === btn_filter.id) {
              return true;
            } else {
              console.log(element.category.name);
              return false;
            }
          }
          // on crée le tableau filtré par Objets
          array_works = works.filter(filterByCategorie);
          // on affiche le tableau
          show_images(array_works);
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

// fonction pour afficher les filtres
function show_filters() {
  const show_filters = document.querySelector(".filters");
  show_filters.classList.add("show_filters");
}
// page 1 modale
function modale_start() {
  document.getElementById("overlay").style.display = "block";
  document.getElementById("modale").style.display = "block";

  const title = document.createElement("h2");
  title.innerHTML = "Galerie photo";
  document.getElementById("modale").appendChild(title);
  const modale_gallery = document.createElement("div");
  modale_gallery.id = "modale_gallery";
  document.getElementById("modale").appendChild(modale_gallery);

  const btn_modale_Ajouter_photo = document.createElement("button");
  btn_modale_Ajouter_photo.id = "btn_Ajouter";
  btn_modale_Ajouter_photo.innerHTML = "Ajouter une photo";
  document.getElementById("modale").appendChild(btn_modale_Ajouter_photo);

  const modale_delete_all = document.createElement("a");
  modale_delete_all.innerText = "Supprimer la galerie";
  modale_delete_all.id = "modale_delete_All";
  document.getElementById("modale").appendChild(modale_delete_all);

  const barre = document.createElement("div");
    barre.id="barre";
    document.getElementById("modale").appendChild(barre);

  // affichage des works dans la modale
  for (let i = 0; i < works.length; i++) {
    // crée une div figure
    const figure = document.createElement("figure");
    // cree la div image
    const image = document.createElement("img");
    // indique la source de l image
    image.src = works[i].imageUrl;
    // crée la div paragraphe pour le titre de la photo
    const title = document.createElement("p");
    // indique le titre de la photo
    title.innerText = "éditer";
    //   inclut les 2 enfants image+titre dans la div figure
    figure.appendChild(image);
    figure.appendChild(title);


    const container_trash=document.createElement("div")
    container_trash.id="container_trash";
    const trash = document.createElement("i");
    trash.innerHTML='<i class="fa-solid fa-trash-can" </i>';
    trash.class="trash";
    trash.id=works[i].id;

      container_trash.appendChild(trash); 
    figure.appendChild(container_trash);
  
    //   inclut l' enfant figure dans la div gallery
    document.getElementById("modale_gallery").appendChild(figure);
  }

  btn_Ajouter.addEventListener("click", () => {
    modale_Ajouter();
  });

  // page 2 modale
  function modale_Ajouter() {
    document.getElementById("modale").innerText = "";
    const title = document.createElement("h2");
    title.innerText = "Ajout photo";
    document.getElementById("modale").appendChild(title);
    const Ajouter_Photo_Part = document.createElement("div");
    Ajouter_Photo_Part.id = "Ajouter_Photo_Part";
    document.getElementById("modale").appendChild(Ajouter_Photo_Part);

    const btn_Ajouter_photo = document.createElement("button");
    btn_Ajouter_photo.id = "btn_Ajouter_photo";
    btn_Ajouter_photo.innerHTML = "+ Ajouter photo";
    document
      .getElementById("Ajouter_Photo_Part")
      .appendChild(btn_Ajouter_photo);

    const explication = document.createElement("p");
    explication.innerText = "jpg, png : 4mo max";
    explication.id = "explication";
    document.getElementById("Ajouter_Photo_Part").appendChild(explication);

    const btn_Valider_Ajouter_photo = document.createElement("button");
    btn_Valider_Ajouter_photo.id = "btn_Valider_Ajouter_photo";
    btn_Valider_Ajouter_photo.innerHTML = "Valider";
    document.getElementById("modale").appendChild(btn_Valider_Ajouter_photo);

    const label_Title_TEXT = document.createElement("p");
    label_Title_TEXT.innerText = "Titre";
    label_Title_TEXT.id="label_Title_TEXT";
    document.getElementById("modale").appendChild(label_Title_TEXT);
    const label_Title = document.createElement("input");
    label_Title.label = "Titre";
    label_Title.title = "Titre";
    label_Title.id = "label_Title";
    document.getElementById("modale").appendChild(label_Title);

    const label_Categorie_TEXT = document.createElement("p");
    label_Categorie_TEXT.innerText = "Catégories";
    label_Categorie_TEXT.id="label_Categorie_TEXT";
    document.getElementById("modale").appendChild(label_Categorie_TEXT);
    const label_Categorie = document.createElement("input");
    label_Categorie.label = "Catégorie";
    label_Categorie.title = "Catégorie";
    label_Categorie.id = "label_Catégorie";
    document.getElementById("modale").appendChild(label_Categorie);

    const barre = document.createElement("div");
    barre.id="barre";
    document.getElementById("modale").appendChild(barre);

  }
}
//   IIIIIIIIIIIIIIi

// show_images(array_works);

create_boutons_filters();
show_filters();
if (sessionStorage.getItem("token") != null) {
  mode_edition();
}

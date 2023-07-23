var array_categories;
let array_works;
function fetch_works() {
  fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((response) => {
      works = response;
      show_images(works);

      if (!document.getElementById("modale_gallery")) {
        console.log("pas de gallerie modale");
      } else {
        console.log("gallerie modale ouverte");
        modale_start();
      }

      return;
    })
    .catch((error) => {
      console.log(error);
    });
  return;
}
// fonction pour effacer un work
function fetch_delete(id) {
  let Data = {
    method: "DELETE",
    headers: {
      Accept: "*/*",
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  };
  fetch("http://localhost:5678/api/works/" + id, Data)
    .then(function (reponse) {
      if (!reponse.ok) {
        throw new Error(error);
      }
    })
    .then(function (reponse) {
      reponse;
      document.querySelector(".gallery").innerHTML = "";
      document.getElementById("modale_gallery").innerText = "";
      fetch_works();
      console.log("OK");
      return;
    });
}
// fonction affichage images galerie principale
function show_images(tab) {
  for (let i = 0; i < tab.length; i++) {
    const figure = document.createElement("figure");
    const image = document.createElement("img");
    image.src = tab[i].imageUrl;
    const title = document.createElement("p");
    title.innerText = tab[i].title;
    figure.appendChild(image);
    figure.appendChild(title);
    document.querySelector(".gallery").appendChild(figure);
  }
}
// fonction mode edition quand login OK
function mode_edition() {
  document.getElementById("filtres").style.display = "none";
  const affiche = document.querySelector(".bloc_mode_edition");
  affiche.style.display = "flex";
  const affiche2 = document.querySelector(".afficher_modifier");
  affiche2.style.display = "flex";
  document.querySelector("#login_ok").style.display = "inline";
  document.querySelector("#login_none").style.display = "none";
  afficher_modifier.addEventListener("click", () => {
    modale_start();
  });
  document.getElementById("login_ok").addEventListener("click", () => {
    mode_deconnect();
  });
}
// fonction deconnexion et donc suppression du token
function mode_deconnect() {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("userId");
  document.getElementById("filtres").style.display = "flex";
  const affiche = document.querySelector(".bloc_mode_edition");
  affiche.style.display = "none";
  const affiche2 = document.querySelector(".afficher_modifier");
  affiche2.style.display = "none";
  document.querySelector("#login_ok").style.display = "none";
  document.querySelector("#login_none").style.display = "inline";
}

// fonction de creation des boutons suivant le tableau categories
function create_boutons_filters() {
  // bouton pour le bouton Tous (toutes les images de toutes les catégories)
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
  fetch("http://localhost:5678/api/categories")
    .then((reponse) => reponse.json())
    .then((reponse) => {
      categories = reponse;
      array_categories = reponse;
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
    });
}
function show_images_modale() {
  for (let i = 0; i < works.length; i++) {
    const figure = document.createElement("figure");
    const image = document.createElement("img");
    image.src = works[i].imageUrl;
    const subtitle = document.createElement("p");
    subtitle.innerText = "éditer";
    //   inclut les 2 enfants image+titre dans la div figure
    figure.appendChild(image);
    figure.appendChild(subtitle);
    const container_trash = document.createElement("div");
    container_trash.id = "container_trash";
    const trash = document.createElement("i");
    trash.innerHTML = '<i class="fa-solid fa-trash-can" </i>';
    trash.class = "trash";
    trash.id = works[i].id;
    container_trash.appendChild(trash);
    figure.appendChild(container_trash);
    //   inclut l' enfant figure dans la div gallery
    document.getElementById("modale_gallery").appendChild(figure);
    // ajoute un eventListener sur chaque trash pour effacer 1 seul  travail à la fois
    trash.addEventListener("click", () => {
      fetch_delete(trash.id);
    });
  }
}

// fonction pour afficher les filtres
function show_filters() {
  const show_filters = document.querySelector(".filters");
  show_filters.classList.add("show_filters");
}
// page 1 modale
function modale_start() {
  document.getElementById("modale").innerText = "";
  document.getElementById("overlay").style.display = "block";
  document.getElementById("modale").style.display = "block";
  const modale_croix_close = document.createElement("i");
  modale_croix_close.innerHTML = '<i class="fa-solid fa-xmark" </i>';
  modale_croix_close.id = "modale_croix_close";
  document.getElementById("modale").appendChild(modale_croix_close);
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
  modale_delete_all.href = "#";
  modale_delete_all.innerText = "Supprimer la galerie";
  modale_delete_all.id = "modale_delete_All";
  document.getElementById("modale").appendChild(modale_delete_all);
  const barre = document.createElement("div");
  barre.id = "barre";
  document.getElementById("modale").appendChild(barre);
  // affichage des works dans la modale
  show_images_modale();

  // supprimer toutes les images de la galerie en 1 fois
  modale_delete_all.addEventListener("click", () => {
    works.forEach((element) => {
      fetch_delete(element.id);
    });
  });

  // overlay.addEventListener("click", ()=>{
  //   close_modale();
  // })

  modale_croix_close.addEventListener("click", () => {
    close_modale();
    return;
  });
  btn_Ajouter.addEventListener("click", () => {
    modale_Ajouter();
  });

  // page 2 modale
  function modale_Ajouter() {
    document.getElementById("modale").innerText = "";
    const modale_croix_close = document.createElement("i");
    modale_croix_close.innerHTML = '<i class="fa-solid fa-xmark" </i>';
    modale_croix_close.id = "modale_croix_close";
    document.getElementById("modale").appendChild(modale_croix_close);
    const modale_fleche_retour = document.createElement("i");
    modale_fleche_retour.innerHTML = '<i class="fa-solid fa-arrow-left" </i>';
    modale_fleche_retour.id = "modale_fleche_retour";
    document.getElementById("modale").appendChild(modale_fleche_retour);
    const title = document.createElement("h2");
    title.innerText = "Ajout photo";
    document.getElementById("modale").appendChild(title);
    const Ajouter_Photo_Part = document.createElement("div");
    Ajouter_Photo_Part.id = "Ajouter_Photo_Part";
    document.getElementById("modale").appendChild(Ajouter_Photo_Part);
    const modale_picture = document.createElement("i");
    modale_picture.innerHTML = '<i class="fa-solid fa-image" </i>';
    modale_picture.id = "modale_picture";
    document.getElementById("modale").appendChild(modale_picture);

    // document
    //   .getElementById("Ajouter_Photo_Part")
    //   .appendChild(btn_Ajouter_photo);

    const explication = document.createElement("p");
    explication.innerText = "jpg, png : 4mo max";
    explication.id = "explication";
    document.getElementById("Ajouter_Photo_Part").appendChild(explication);

    const btn_Valider_Ajouter_photo = document.createElement("button");
    btn_Valider_Ajouter_photo.id = "btn_Valider_Ajouter_photo";
    btn_Valider_Ajouter_photo.innerHTML = "Valider";
    document.getElementById("modale").appendChild(btn_Valider_Ajouter_photo);

    // IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIdebut formIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII
    const form_ajout_photo = document.createElement("form");
    form_ajout_photo.id = "form_categories";

    const btn_Ajouter_photo = document.createElement("input");
    btn_Ajouter_photo.id = "btn_Ajouter_photo";
    btn_Ajouter_photo.innertext = "+ Ajouter photo";
    btn_Ajouter_photo.setAttribute("accept", "image/png, image/jpeg");
    btn_Ajouter_photo.setAttribute("type", "file");

    document.getElementById("modale").appendChild(form_ajout_photo);

    label_title = document.createElement("label");
    label_title.setAttribute("for","input_Title")
    label_title.id="label_title";
    label_title.innerText="Titre";

    const input_Title = document.createElement("input");
    input_Title.setAttribute("type", "text");
    input_Title.setAttribute("name", "Title");
    input_Title.setAttribute("for", "nombre");
    input_Title.id = "input_Title";
    form_categories.appendChild(label_title);
    form_categories.appendChild(input_Title);
    form_categories.appendChild(btn_Ajouter_photo);
   

    const label_ajout_photo = document.createElement("button");
    label_ajout_photo.id="Masque_btn_Ajouter_photo";
    label_ajout_photo.innerHTML="+ Ajouter photo";
    form_categories.appendChild(label_ajout_photo);

    const label_Categorie = document.createElement("label");
    // label_Categorie.id = "label_Catégorie";
    label_Categorie.setAttribute("for", "select_categories");
    label_Categorie.setAttribute("class", "label_Categorie");
    label_Categorie.innerText = "Catégories";

    form_categories.appendChild(label_Categorie);

    const select_categories = document.createElement("select");
    select_categories.id = "select_categories";
    select_categories.setAttribute("value", " ");
    select_categories.innerText = " ";
    form_categories.appendChild(select_categories);

    //  créations des options value = catégopries
    for (i = 0; i < array_categories.length; i++) {
      const option_categories = document.createElement("option");
      option_categories.setAttribute("value", array_categories[i].name);
      option_categories.innerText = array_categories[i].name;
      select_categories.appendChild(option_categories);
    }

    const barre = document.createElement("div");
    barre.id = "barre";
    document.getElementById("modale").appendChild(barre);

    modale_croix_close.addEventListener("click", () => {
      close_modale();
    });

    modale_fleche_retour.addEventListener("click", () => {
      modale_start();
    });
  }
}
// fermeture de la modale
function close_modale() {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("modale").style.display = "none";
  return;
}

fetch_works();
create_boutons_filters();
show_filters();
if (sessionStorage.getItem("token") != null) {
  mode_edition();
}

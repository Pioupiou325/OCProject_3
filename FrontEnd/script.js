function fetch_works() {
  fetch("http://localhost:5678/api/works")
    .then((response) => {
      if (!response.ok) {
        throw response;
      }
      return response.json();
    })

    .then((response) => {
      works = response;
      show_images(works);

      if (document.getElementById("modale_gallery")) {
        modale_start();
      }

      return;
    })
    .catch((e) => {
      if (e.status === 500) {
        document.querySelector(".erreur_message_modale").innerHTML =
          "Unexpected Error";
        document.querySelector(".erreur_message_modale").style.display = "flex";
        return;
      }
    });
  return;
}
// fonction pour ajouter un work
function fetch_Ajouter(form) {
  let Data = {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
    body: form,
  };
  fetch("http://localhost:5678/api/works/", Data)
    .then(function (reponse) {
      if (!reponse.ok) {
        throw reponse;
      }
      return reponse.json();
    })
    .then(function (reponse) {
      for (i = 0; i < array_categories.length; i++) {
        if (reponse.categoryId == array_categories[i].id) {
          reponse.category = {
            id: reponse.id,
            name: array_categories[i].name,
          };
        }
      }
      close_modale();
      works.push(reponse);
      show_images(works);
      return;
    })
    .catch((e) => {
      if (e.status === 400) {
        document.querySelector(".erreur_message_modale").innerHTML =
          "Bad request";
        document.querySelector(".erreur_message_modale").style.display = "flex";
        return;
      }
      if (e.status === 401) {
        document.querySelector(".erreur_message_modale").innerHTML =
          "!! Utilisateur non connecté !!";
        document.querySelector(".erreur_message_modale").style.display = "flex";
        return;
      }
      if (e.status === 500) {
        document.querySelector(".erreur_message_modale").innerHTML =
          "Unexpected Error";
        document.querySelector(".erreur_message_modale").style.display = "flex";
        return;
      }
    });
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
        throw reponse;
      }
    })
    .then(function (reponse) {
      reponse;
      document.querySelector(".gallery").innerHTML = "";
      document.getElementById("modale_gallery").innerText = "";

      let new_works = works.filter((work) => work.id != id);
      works = new_works;
      show_images(works);
      show_images_modale();
      return;
    })
    .catch((e) => {
      if (e.status === 401) {
        document.querySelector(".erreur_message_modale").innerHTML =
          "!! Utilisateur non connecté !!";
        document.querySelector(".erreur_message_modale").style.display = "flex";
        return;
      }
      if (e.status === 500) {
        document.querySelector(".erreur_message_modale").innerHTML =
          "Unexpected Error";
        document.querySelector(".erreur_message_modale").style.display = "flex";
        return;
      }
    });
}
// fonction affichage images galerie principale
function show_images(tab) {
  document.querySelector(".gallery").innerText = "";
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
// création et affichage des images dans la modale
function show_images_modale() {
  for (let i = 0; i < works.length; i++) {
    const figure = document.createElement("figure");
    const image = document.createElement("img");
    image.src = works[i].imageUrl;
    image.id = works[i].id;
    const subtitle = document.createElement("p");
    subtitle.innerText = "éditer";
    //   inclut les 2 enfants image+titre dans la div figure
    figure.appendChild(image);
    figure.appendChild(subtitle);
    // création de l icone trash dans un container pour un fond noir

    const container_trash = document.createElement("div");
    container_trash.id = "container_trash";
    const trash = document.createElement("i");
    trash.innerHTML = '<i class="fa-solid fa-trash-can" </i>';
    trash.class = "trash";
    trash.id = works[i].id;
    container_trash.appendChild(trash);
    figure.appendChild(container_trash);
    if (i === 0) {
      const container_arrows = document.createElement("div");
      container_arrows.id = "container_arrows";
      const arrows = document.createElement("i");
      arrows.innerHTML =
        '<i class="fa-solid fa-arrows-up-down-left-right" </i>';
      arrows.id = "arrows";
      arrows.class = "arrows";
      container_arrows.appendChild(arrows);
      figure.appendChild(container_arrows);
    }

    //   inclut l' enfant figure dans la div gallery
    document.getElementById("modale_gallery").appendChild(figure);
    // ajoute un eventListener sur chaque trash pour effacer 1 seul  travail à la fois
    trash.addEventListener("click", () => {
      fetch_delete(trash.id);
    });
  }
}
// fonction mode edition quand login OK
function mode_edition() {
  document.getElementById("filtres").style.display = "none";
  const affiche = document.querySelector(".bloc_mode_edition");
  affiche.style.display = "flex";
  document.querySelector(".afficher_noeffect").style.display = "flex";
  const affiche2 = document.querySelector(".afficher_modifier");
  affiche2.style.display = "flex";
  document.querySelector("#login_ok").style.display = "inline";
  document.querySelector("#login_none").style.display = "none";
  afficher_modifier.addEventListener("click", () => {
    modale_start();
  });
  bouton_edition_haut.addEventListener("click", () => {
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
  document.querySelector(".afficher_noeffect").style.display = "none";
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
    .then((reponse) => {
      if (!reponse.ok) {
        throw reponse;
      }
      return reponse.json();
    })
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
          document.querySelector(".gallery").innerText = "";
          array_works = works;
          // tri des works par catégorie
          function filterByCategorie(element) {
            if (element.category.name === btn_filter.id) {
              return true;
            } else {
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
    .catch((e) => {
      if (e.status === 500) {
        document.querySelector(".erreur_message_modale").innerHTML =
          "Unexpected Error";
        document.querySelector(".erreur_message_modale").style.display = "flex";
        return;
      }
    });
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
  // lien pour supprimer toute la galerie
  const modale_delete_all = document.createElement("a");
  modale_delete_all.href = "#";
  modale_delete_all.innerText = "Supprimer la galerie";
  modale_delete_all.id = "modale_delete_All";
  document.getElementById("modale").appendChild(modale_delete_all);
  // barrre de séparation avant bouton
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
  // fermeture de la modale en cliquant sur la croix
  modale_croix_close.addEventListener("click", () => {
    close_modale();
  });
  // bouton pour aller sur la partie ajouter (modale 2)
  btn_Ajouter.addEventListener("click", () => {
    modale_Ajouter();
  });
  overlay.addEventListener("click", (e) => {
    if (
      !e.target.closest("#modale") &&
      !e.target.closest("#btn_Ajouter") &&
      !e.target.closest("#modale_fleche_retour") &&
      !e.target.closest("#modale_delete_All")
    ) {
      close_modale();
    }
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
    btn_Ajouter_photo.setAttribute("accept", "image/*");
    btn_Ajouter_photo.setAttribute("type", "file");
    document.getElementById("modale").appendChild(form_ajout_photo);

    label_title = document.createElement("label");
    label_title.setAttribute("for", "input_Title");
    label_title.id = "label_title";
    label_title.innerText = "Titre";
    var input_Title = document.createElement("input");
    input_Title.setAttribute("type", "text");
    input_Title.setAttribute("name", "Title");
    input_Title.setAttribute("for", "nombre");
    input_Title.id = "input_Title";
    form_categories.appendChild(label_title);
    form_categories.appendChild(input_Title);
    form_categories.appendChild(btn_Ajouter_photo);
    const label_ajout_photo = document.createElement("button");
    label_ajout_photo.id = "Masque_btn_Ajouter_photo";
    label_ajout_photo.innerHTML = "+ Ajouter photo";
    form_categories.appendChild(label_ajout_photo);
    const label_Categorie = document.createElement("label");
    // label_Categorie.id = "label_Catégorie";
    label_Categorie.setAttribute("for", "select_categories");
    label_Categorie.setAttribute("class", "label_Categorie");
    label_Categorie.innerText = "Catégories";
    form_categories.appendChild(label_Categorie);
    const select_categories = document.createElement("select");
    select_categories.id = "select_categories";
    form_categories.appendChild(select_categories);
    //  créations des options value = catégopries
    for (i = 0; i < array_categories.length; i++) {
      const option_categories = document.createElement("option");
      option_categories.setAttribute("value", array_categories[i].id);
      option_categories.innerText = array_categories[i].name;
      option_categories.setAttribute("selected", "false");
      select_categories.appendChild(option_categories);
    }
    // création d' une option vide pour affichage neutre par défaut
    const option_categories = document.createElement("option");
    option_categories.setAttribute("value", 0);
    option_categories.innerText = "    ";
    option_categories.setAttribute("selected", "true");
    select_categories.appendChild(option_categories);
    // création de la barre de séparation avant le bouton en bas de page
    const barre = document.createElement("div");
    barre.id = "barre";
    document.getElementById("modale").appendChild(barre);
    //création pour le message d' erreurs
    const error_modale_ajout = document.createElement("p");
    error_modale_ajout.id = "error_modale_ajout";
    document.getElementById("modale").appendChild(error_modale_ajout);

    // affichage photo en preview
    var image_A_Ajouter = document.createElement("img");
    btn_Ajouter_photo.addEventListener("change", () => {
      // création d'un filereader
      var reader = new FileReader();
      // fonction au chargement de l image pour sa lecture
      reader.addEventListener("load", function () {
        image_A_Ajouter.src = reader.result;
        // rajoute l image preview dans la partie du haut
        Ajouter_Photo_Part.appendChild(image_A_Ajouter);
      });
      // envoie la photo en lecture pour affichage à la fonction
      reader.readAsDataURL(btn_Ajouter_photo.files[0]);
      // vérification des 3 conditions pour afficher le bouton valider

      test_form_full();
    });
    input_Title.addEventListener("change", () => {
      // vérification des 3 conditions pour afficher le bouton valider

      test_form_full();
    });
    select_categories.addEventListener("change", () => {
      // vérification des 3 conditions pour afficher le bouton valider

      test_form_full();
    });

    let ajouter_valid = false;
    btn_Valider_Ajouter_photo.addEventListener("click", () => {
      ajouter_valid = true;
      test_form_full();
    });

    function test_form_full() {
      if (
        btn_Ajouter_photo.value != "" &&
        input_Title.value != "" &&
        select_categories.value != 0
      ) {
        btn_Valider_Ajouter_photo.style.backgroundColor = "#1d6154";
        if (ajouter_valid === true) {
          const form_Ajouter = new FormData();
          form_Ajouter.append("image", btn_Ajouter_photo.files[0]);
          form_Ajouter.append("title", input_Title.value);
          form_Ajouter.append("category", select_categories.value);
          fetch_Ajouter(form_Ajouter);
        }
      } else {
        if (ajouter_valid === true) {
          error_modale_ajout.innerHTML = "Tous les champs sont obligatoires";
          error_modale_ajout.style.display = "flex";
        }
        ajouter_valid = false;
        btn_Valider_Ajouter_photo.style.backgroundColor = "#a7a7a7";
      }
    }
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

// main à exécuter
// récupération des travaux
fetch_works();
// création des boutons
create_boutons_filters();
// affichage des filtres
show_filters();
// si le token existe lancement du mode édition
if (sessionStorage.getItem("token") != null) {
  mode_edition();
}

fetch("http://localhost:5678/api/works")

.then(response => response.json())
.then(response => {
   console.table(response);
   // boucle pour chaque travail
   for (let i=0;i<response.length;i++){
      console.log(response[i].imageUrl);
      console.log(response[i].categoryId);

      // test de tri pour les 3 catégories 
      if (response[i].categoryId!=3){
// crée une div figure
      const figure = document.createElement("figure");
// cree la div image
      const image = document.createElement("img");
      // indique la source de l image
      image.src=response[i].imageUrl;
      // crée la div paragraphe pour le titre de la photo
      const title = document.createElement("p");
      // indique le titre de la photo
      title.innerText=response[i].title
   //   inclut les 2 enfants image+titre dans la div figure
     figure.appendChild(image);
     figure.appendChild(title);
   //   inclut l' enfant figure dans la div gallery

   // gallery.appendChild(figure); ceci ne fonctionne pas car gallery pas créée en js ?
   
   document.querySelector(".gallery").appendChild(figure);

      }

      


      

}

// prise en compte des 4 boutons (à faire en JS ou dans html ?)
const tous = document.querySelector(".tous");
const objets = document.querySelector(".objets");
const appartements = document.querySelector(".appartements");
const barsetrestos = document.querySelector(".barsetrestos");


tous.addEventListener("click", () =>{
   console.log("tous");
     // boucle pour chaque travail
     for (let i=0;i<response.length;i++){
      console.log(response[i].imageUrl);
      console.log(response[i].categoryId);

      // test de tri pour les 3 catégories 
      if (response[i].categoryId!=3){
// crée une div figure
      const figure = document.createElement("figure");
// cree la div image
      const image = document.createElement("img");
      // indique la source de l image
      image.src=response[i].imageUrl;
      // crée la div paragraphe pour le titre de la photo
      const title = document.createElement("p");
      // indique le titre de la photo
      title.innerText=response[i].title
   //   inclut les 2 enfants image+titre dans la div figure
     figure.appendChild(image);
     figure.appendChild(title);
   //   inclut l' enfant figure dans la div gallery

   // gallery.appendChild(figure); ceci ne fonctionne pas car gallery pas créée en js ?
   
   document.querySelector(".gallery").appendChild(figure);

      }

      


      

}
})
objets.addEventListener("click",()=>{
   console.log("objets");
     // boucle pour chaque travail
     for (let i=0;i<response.length;i++){
      console.log(response[i].imageUrl);
      console.log(response[i].categoryId);

      // test de tri pour les 3 catégories 
      if (response[i].categoryId===1){
// crée une div figure
      const figure = document.createElement("figure");
// cree la div image
      const image = document.createElement("img");
      // indique la source de l image
      image.src=response[i].imageUrl;
      // crée la div paragraphe pour le titre de la photo
      const title = document.createElement("p");
      // indique le titre de la photo
      title.innerText=response[i].title
   //   inclut les 2 enfants image+titre dans la div figure
     figure.appendChild(image);
     figure.appendChild(title);
   //   inclut l' enfant figure dans la div gallery

   // gallery.appendChild(figure); ceci ne fonctionne pas car gallery pas créée en js ?
   
   document.querySelector(".gallery").appendChild(figure);

      }

      


      

}
})
appartements.addEventListener("click",()=>{
   console.log("appartements");
     // boucle pour chaque travail
     for (let i=0;i<response.length;i++){
      console.log(response[i].imageUrl);
      console.log(response[i].categoryId);

      // test de tri pour les 3 catégories 
      if (response[i].categoryId===2){
// crée une div figure
      const figure = document.createElement("figure");
// cree la div image
      const image = document.createElement("img");
      // indique la source de l image
      image.src=response[i].imageUrl;
      // crée la div paragraphe pour le titre de la photo
      const title = document.createElement("p");
      // indique le titre de la photo
      title.innerText=response[i].title
   //   inclut les 2 enfants image+titre dans la div figure
     figure.appendChild(image);
     figure.appendChild(title);
   //   inclut l' enfant figure dans la div gallery

   // gallery.appendChild(figure); ceci ne fonctionne pas car gallery pas créée en js ?
   
   document.querySelector(".gallery").appendChild(figure);

      }

      


      

}
})
barsetrestos.addEventListener("click",()=>{
   console.log("barsetrestos");
     // boucle pour chaque travail
     for (let i=0;i<response.length;i++){
      console.log(response[i].imageUrl);
      console.log(response[i].categoryId);

      // test de tri pour les 3 catégories 
      if (response[i].categoryId===3){
// crée une div figure
      const figure = document.createElement("figure");
// cree la div image
      const image = document.createElement("img");
      // indique la source de l image
      image.src=response[i].imageUrl;
      // crée la div paragraphe pour le titre de la photo
      const title = document.createElement("p");
      // indique le titre de la photo
      title.innerText=response[i].title
   //   inclut les 2 enfants image+titre dans la div figure
     figure.appendChild(image);
     figure.appendChild(title);
   //   inclut l' enfant figure dans la div gallery

   // gallery.appendChild(figure); ceci ne fonctionne pas car gallery pas créée en js ?
   
   document.querySelector(".gallery").appendChild(figure);

      }

      


      

}
})

}
)

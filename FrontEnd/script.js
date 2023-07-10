let works;
let array_works;


// création des boutons de filtres
const filters = document.createElement("div");
filters.id="filtres";



const tous = document.createElement("button");

tous.id="tous";
tous.innerText="Tous";
console.log(tous.class);
console.log(tous.id);
const objets = document.createElement("button");
objets.class="filters-buttons";
objets.id="objets";
objets.innerText="Objets";
const appartements = document.createElement("button");
tous.class="filters-buttons";
appartements.id="appartements";
appartements.innerText="Appartements";
const hotelsetrestos = document.createElement("button");
hotelsetrestos.class="filters-buttons";
hotelsetrestos.id="barsetrestos";
hotelsetrestos.innerText="Hôtels et Restaurants";

filters.appendChild(tous);
filters.appendChild(objets);
filters.appendChild(appartements);
filters.appendChild(hotelsetrestos);




document.querySelector(".filters").appendChild(filters);
// document.querySelector("#portfolio").appendChild(filters);


const show_filters = document.querySelector(".filters");
show_filters.classList.add("show_filters");

// prise en compte des 4 boutons pour écouter les évènements
const btn_tous = document.querySelector("#tous");
const btn_objets = document.querySelector("#objets");
const btn_appartements = document.querySelector("#appartements");
const btn_barsetrestos = document.querySelector("#barsetrestos");


fetch("http://localhost:5678/api/works")

.then(response => response.json())
.then(response => {
      // sauvegarde du tableau de travaux
      works=response;

      array_works=response;

  
   // boucle pour chaque travail
   for (let i=0;i<response.length;i++){
      


      
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




tous.addEventListener("click", () =>{
   console.log("tous");
   document.querySelector(".gallery").innerText="";
     // boucle pour chaque travail
     array_works=works;
  

      


      

})

objets.addEventListener("click",()=>{
    console.log("objets");
   document.querySelector(".gallery").innerText="";
   array_works=works;

function filterByCategorie(element){
      if (element.categoryId===1){
            return true;
      }else{
            console.log(element.categoryId);
            return false;
      }
      }
      array_works = works.filter(filterByCategorie);
      console.table(array_works);
}


    

          


)
appartements.addEventListener("click",()=>{
   console.log("appartements");
   document.querySelector(".gallery").innerText="";
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
hotelsetrestos.addEventListener("click",()=>{
   console.log("barsetrestos");
   document.querySelector(".gallery").innerText="";
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

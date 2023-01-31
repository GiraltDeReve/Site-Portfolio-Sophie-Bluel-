// ------------------------------------Appel FETCH de l'API---------------------

let works;

fetch("http://localhost:5678/api/works")
  .then((res) => {
    if (res.ok) {
      return res.json();
      // convertit les données de la reponse en format json
    } else {
      console.log("ERREUR");
      // si réponse pas ok, message d'erreur dans la console
    }
  })
  .then((data) => {
    works = data;
    // les données de la réponse sont affectées à la variable "works"
    let userToken = JSON.parse(localStorage.getItem("user"));
    // on récupére les informations de l'user (id et token) stockées dans le local storage
    if (userToken == null) {
      // dans le cas où le userToken n'est pas trouvé et qu'il n'y a pas eu de login réussi
      console.log(userToken);
      genererWorks(works);
      // fonction "genererWorks" est appelée avec "works" comme argument
    } else {
      // le token de l'user est présent et donc login réussi
      console.log(userToken);
      genererWorks(works);
      // ajout des différents éléments sur le DOM pour la page accueil admin
      const sectionEdition = document.getElementById("button-edition");
      const logo = document.createElement("i");
      logo.classList.add("fa-regular", "fa-pen-to-square");
      const text = document.createElement("p");
      text.innerHTML = "Mode édition";
      const button = document.createElement("button");
      button.innerHTML = "publier les changements";
      sectionEdition.appendChild(logo);
      sectionEdition.appendChild(text);
      sectionEdition.appendChild(button);
      document.getElementById("logout-button").style.display = "flex";
      document.getElementById("login-button").style.display = "none";
    }
  });

// ----------------------------Fonction qui génére l'HTML de la gallerie de maniére dynamique---------------------
function genererWorks(data) {
  // prend en entrée un tableau "data"
  for (let i = 0; i < data.length; i++) {
    // parcourt ce tableau avec boucle "for" pour créer le contenu de gallery
    const project = data[i];
    // pour recupérer l'élements du DOM qui va acceuillir TOUT les travaux
    const sectionFigure = document.querySelector(".gallery");
    // création de la balise dédié à un projet
    const workElement = document.createElement("figure");
    // création des balises dans celle projet
    const imageElement = document.createElement("img");
    imageElement.src = project.imageUrl;
    imageElement.alt = project.title;
    imageElement.crossOrigin = "";
    // pour éviter erreur sur les images : error_Blocked_BY_Response_NotSameOrigin200(OK)
    const titleElement = document.createElement("figcaption");
    titleElement.innerHTML = project.title;
    // les éléments sont ajoutés aux parents
    sectionFigure.appendChild(workElement);
    workElement.appendChild(imageElement);
    workElement.appendChild(titleElement);
  }
  console.log(data);
}

// -------------------------------------------Fonction pour filtrer la gallerie de maniére dynamique---------------------

function filterWorks(categoryId) {
  // fonction de filtrage qui prend en paramétre un id de catégorie
  document.querySelector(".gallery").innerHTML = "";
  // Vide le contenu de la section gallerie pour afficher la "nouvelle" gallerie selon filter
  const filteredWorks = works.filter((work) => work.category.id === categoryId);
  // filtrer les données "works" en fonction de l'id de catégorie

  console.log(filteredWorks);
  genererWorks(filteredWorks);
  // les données filtrées sont affectées à la variable "filteredWorks"
}

const boutonFiltrerObjects = document.getElementById("objects");
boutonFiltrerObjects.addEventListener("click", () => filterWorks(1));
// appel de la fonction filterWorks via l'écoute de l'évenement au click sur bouton

const boutonFiltrerAppartments = document.getElementById("appartments");
boutonFiltrerAppartments.addEventListener("click", () => filterWorks(2));

const boutonFiltrerHotelsRestaurants =
  document.getElementById("hotels-restaurants");
boutonFiltrerHotelsRestaurants.addEventListener("click", () => filterWorks(3));

const boutonTous = document.getElementById("all");
// bouton pour tout afficher donc, premiére ligne pour vider la section gallerie puis appel de la fonction "genererWorks" avec works comme argument
boutonTous.addEventListener("click", () => {
  document.querySelector(".gallery").innerHTML = "";
  genererWorks(works);
});

// -------------------------------------------LOGOUT-------------------------------
const boutonLogout = document.getElementById("button-logout");
boutonLogout.addEventListener("click", () => {
  localStorage.removeItem("user");
  window.location.reload();
  console.log("bien déconnecté");
});

// ----------------------------------- info user dans session storage
const userInfos = JSON.parse(sessionStorage.getItem("user"));
// lecture infos user depuis local storage sous forme objet Json

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
    if (userInfos == null) {
      // dans le cas où les userInfos n'est pas trouvé et qu'il n'y a pas eu de login réussi
      genererWorks(works);
      // fonction "genererWorks" est appelée avec "works" comme argument
    } else {
      // le token de l'user est présent et donc login réussi
      console.log(userInfos);
      console.log(token);
      genererWorks(works);
      genererWorksGallerie(works);
      document.getElementById("logout-button").style.display = "flex";
      document.getElementById("login-button").style.display = "none";
      // pour avoir le bouton logout lorsqu'on est connecté
      document.getElementById("admin-bar").style.display = "flex";
      // pour que l'élément admin-bar s'affiche quand l'utilisateur est connecté
    }
  });

const token = userInfos.token;
// Récupérer token depuis infos user de localStorage
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

// ------------------------------Fonction pour filtrer la gallerie de maniére dynamique---------------------

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
const boutonLogout = document.getElementById("logout-button");
boutonLogout.addEventListener("click", () => {
  sessionStorage.removeItem("user");
  // pour que les données utilisateurs se vide du local stroage donc l'utilisateur est déconnecté
  window.location.reload();
  // actualisation de la page dynamique pour retourner sur une page non "admin"
});

// -------------------------------------------MODALE FIRST -------------------------------
const modalFirst = document.getElementById("modalFirst");
const buttonEdition = document.getElementById("button-edition");
const closeModalFirst = document.getElementById("close-modal-first");

buttonEdition.addEventListener("click", () => {
  modalFirst.style.display = "block";
  genererWorksGallerie(works);
});

closeModalFirst.addEventListener("click", () => {
  modalFirst.style.display = "none";
  // pour fermer la boite de dialogue avec le bouton close
});

window.addEventListener("click", (event) => {
  if (event.target == modalFirst) {
    modalFirst.style.display = "none";
    // pour fermer la boite de dialogue en cliquant sur l'élément modalFirst (toute la fenêtre modale à l'exception de l'élément modalContent)
  }
});

function genererWorksGallerie(data) {
  document.getElementById("gallerieEditee").innerHTML = "";
  // on vide la gallerie de la modale
  const gallerieEditee = document.getElementById("gallerieEditee");
  for (let i = 0; i < data.length; i++) {
    const project = data[i];
    const sectionImageEditee = document.createElement("div");
    sectionImageEditee.id = "sectionImageEditee";
    const imageElement = document.createElement("img");
    imageElement.src = project.imageUrl;
    imageElement.alt = project.title;
    imageElement.crossOrigin = "";
    const buttonEdite = document.createElement("p");
    buttonEdite.innerHTML = "éditer";
    const iconModalMove = document.createElement("i");
    iconModalMove.classList.add(
      "icon-modal",
      "fa-solid",
      "fa-arrows-up-down-left-right"
    );
    iconModalMove.id = "iconModalMove";
    const iconModalSupp = document.createElement("i");
    iconModalSupp.classList.add("icon-modal", "fa-regular", "fa-trash-can");
    iconModalSupp.id = "iconModalSupp";

    gallerieEditee.appendChild(sectionImageEditee);
    sectionImageEditee.appendChild(imageElement);
    sectionImageEditee.appendChild(buttonEdite);
    sectionImageEditee.appendChild(iconModalMove);
    sectionImageEditee.appendChild(iconModalSupp);

    // -------------------------------------- Supprimer un projet ------------

    // on récupére l'image via le click sur la poubelle qui est dans le même container que l'image
    iconModalSupp.addEventListener("click", function () {
      const index = Array.from(
        this.parentElement.parentElement.children
      ).indexOf(this.parentElement);
      const project = data[index];

      console.log(project.id);
      console.log(sessionStorage.getItem("user"));

      if (window.confirm("Êtes-vous sûr de vouloir supprimer ce projet?")) {
        fetch(`http://localhost:5678/api/works/${project.id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (response.ok) {
              console.log("Project deleted successfully");
            } else {
              console.error("Failed to delete project");
            }
          })
          .catch((error) => console.error(error));
      }
    });
  }
}

// -------------------------------------------MODALE SECOND -------------------------------

const modalSecond = document.getElementById("modalSecond");
const buttonAjoutPhoto = document.getElementById("ajout-photo");
const closeModalSecond = document.getElementById("close-modal-second");

buttonAjoutPhoto.addEventListener("click", () => {
  modalSecond.style.display = "block";
  genererWorksGallerie(works);
});

closeModalSecond.addEventListener("click", () => {
  modalSecond.style.display = "none";
  // pour fermer la boite de dialogue avec le bouton close
});

window.addEventListener("click", (event) => {
  if (event.target == modalSecond) {
    modalSecond.style.display = "none";
    // pour fermer la boite de dialogue en cliquant sur l'élément modalSecond(toute la fenêtre modale à l'exception de l'élément modalContent)
  }
});

// fetch catégorie pour liste déroulante modalSecond
let categories;
fetch("http://localhost:5678/api/categories")
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
    categories = data;
    console.log(categories);
    // création de la liste déroulante :
    const formListDeroulante = document.getElementById("category");
    for (let i = 0; i < categories.length; i++) {
      const option = document.createElement("option");
      option.value = categories[i].id;
      option.text = categories[i].name;
      formListDeroulante.appendChild(option);
      console.log(option);
    }
  });

// ----------------------------requête post pour envoyer formulaire
const form = document.getElementById("form");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const image = document.getElementById("image").files[0];
  const title = document.getElementById("title");
  const category = document.getElementById("category");

  const formData = new FormData();
  formData.append("image", image, image.name);
  formData.append("title", title.value);
  formData.append("category", category.value);

  console.log(Array.from(formData));

  fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Données du formulaire envoyées avec succès", data);
    })
    .catch((error) => {
      console.error("Erreur lors de l'envoi du formulaire", error);
    });
});

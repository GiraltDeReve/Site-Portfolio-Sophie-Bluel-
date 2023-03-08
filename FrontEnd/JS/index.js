// ----------------------------------- info user dans session storage
const userInfos = JSON.parse(sessionStorage.getItem("user"));
// lecture infos user depuis local storage sous forme objet Json

// ------------------------------------Appel FETCH de l'API---------------------

let works;
let token;
try {
  const res = await fetch("http://localhost:5678/api/works");
  if (res.ok) {
    const data = await res.json();
    works = data;
    // les données de la réponse sont affectées à la variable "works"
    if (userInfos == null) {
      // dans le cas où les userInfos n'est pas trouvé et qu'il n'y a pas eu de login réussi
      genererWorks(works);
      // fonction "genererWorks" est appelée avec "works" comme argument
    } else {
      // le token de l'user est présent et donc login réussi
      token = userInfos.token;
      // // Récupérer token depuis infos user de localStorage
      console.log(userInfos);
      genererWorks(works);
      document.getElementById("logout-button").style.display = "flex";
      document.getElementById("login-button").style.display = "none";
      // pour avoir le bouton logout lorsqu'on est connecté
      document.getElementById("admin-bar").style.display = "flex";
      // pour que l'élément admin-bar s'affiche quand l'utilisateur est connecté
    }
  } else {
    console.log("ERREUR");
    // si réponse pas ok, message d'erreur dans la console
  }
} catch (error) {
  console.error(error);
}

// ----------------------------Fonction qui génére l'HTML de la gallerie de maniére dynamique---------------------
function genererWorks(works) {
  // Vide le contenu de la section gallerie pour afficher la "nouvelle" gallerie selon filter
  document.querySelector(".gallery").innerHTML = "";
  // prend en entrée le tableau "works"
  for (let i = 0; i < works.length; i++) {
    // parcourt ce tableau avec boucle "for" pour créer le contenu de gallery
    const project = works[i];
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
  console.log(works);
}

// ------------------------------Fonction pour filtrer la gallerie de maniére dynamique---------------------

function filterWorks(categoryId) {
  // fonction de filtrage qui prend en paramétre un id de catégorie
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
// pour faire apparaitre la boite de dialogue à l'évenemnt du click sur bouton

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

function genererWorksGallerie(works) {
  document.getElementById("gallerieEditee").innerHTML = "";
  // on vide la gallerie de la modale
  const gallerieEditee = document.getElementById("gallerieEditee");
  for (let i = 0; i < works.length; i++) {
    const project = works[i];
    const sectionImageEditee = document.createElement("div");
    sectionImageEditee.id = "sectionImageEditee";
    const imageElement = document.createElement("img");
    imageElement.src = project.imageUrl;
    imageElement.alt = project.title;
    imageElement.crossOrigin = "";
    imageElement.classList.add("imageGallery");
    const buttonEdite = document.createElement("p");
    buttonEdite.innerHTML = "éditer";
    buttonEdite.id = "buttonEdite";
    buttonEdite.classList.add("button");
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

    // écoute de l'évenement au click sur bouton de suppression
    iconModalSupp.addEventListener("click", async function (event) {
      // empéche évenement par default
      event.preventDefault();

      const projectListItems = Array.from(
        this.parentElement.parentElement.children
      );
      // on récupère et convertit en un tableau JavaScript les enfants de gallerieEditées :
      // iconModalSupp cliquée .sectionImageEditee de l'icon cliquée .gallerieEditee .TOUTES les sectionImageEditees
      // this                    .parentElement                           . parentElement    .children
      const projectIndex = projectListItems.indexOf(this.parentElement);
      // dans la liste projectListItems, on récupére le numéro(index) d'emplacement dans la liste du projet à supprimer grâce à la méthode indexOf qui a comme argument l'élément "sectionImageEditee"
      const project = works[projectIndex];
      // on utilise cet index pour récupérer le projet de l'architecte correspondant dans le tableau works (data) de l'api
      console.log(project);
      console.log(projectIndex);
      console.log(projectListItems);
      console.log(project.id);
      console.log(sessionStorage.getItem("user"));

      // fenêtre qui demande confirmation pour suppression du projet.
      if (window.confirm("Êtes-vous sûr de vouloir supprimer ce projet?")) {
        try {
          const response = await fetch(
            `http://localhost:5678/api/works/${project.id}`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            }
          );

          if (response.ok) {
            console.log("Projet supprimé avec succès");
            // Supprimer le projet de la liste des projets
            // retourne un nouveau tableau works sans l'élément correspondant à l'id de project. tableau stocké dans la variable works
            // filtre tous les éléments du tableau works qui ont un id.work différent de l'id.projet
            works = works.filter((work) => work.id !== project.id);
            // Mettre à jour la page avec les nouvelles données
            genererWorks(works);
            genererWorksGallerie(works);
          } else {
            console.error("Echec de la suppression du projet sélectionné");
          }
        } catch (error) {
          console.error(error);
        }
      }
    });
  }
}
// -------------------------------------------MODALE SECOND -------------------------------

const modalSecond = document.getElementById("modalSecond");
const buttonAjoutPhoto = document.getElementById("ajout-photo");
const closeModalSecond = document.getElementById("close-modal-second");

// fonction pour vider le form et l'apperçu de l'imag est remplacé par l'input file
function resetForm() {
  form.reset();
  apperçuImage.style.display = "none";
  inputImage.style.display = "flex";
  buttonImage.style.display = "flex";
}

buttonAjoutPhoto.addEventListener("click", () => {
  // pour faire apparaitre la boite de dialogue à l'évenemnt du click sur bouton
  modalSecond.style.display = "block";
  modalFirst.style.display = "none";
});

closeModalSecond.addEventListener("click", () => {
  // pour fermer la boite de dialogue avec le bouton close
  modalSecond.style.display = "none";
  modalFirst.style.display = "block";
  // Réinitialisation des valeurs du formulaire
  resetForm();
});

window.addEventListener("click", (event) => {
  if (event.target == modalSecond) {
    // pour fermer la boite de dialogue en cliquant sur l'élément modalSecond(toute la fenêtre modale à l'exception de l'élément modalContent)
    modalSecond.style.display = "none";
    modalFirst.style.display = "block";
    // Réinitialisation des valeurs du formulaire
    resetForm();
  }
});

// -------------Pour afficher apperçu image dans modal--------------------------------
const inputImage = document.getElementById("image");
const apperçuImage = document.getElementById("apperçu");
const buttonImage = document.getElementById("buttonImage");

// écouteur événement sur changement du fichier (selection image)
inputImage.addEventListener("change", () => {
  const file = inputImage.files[0];
  // nouveau objet FileReader pour lire contenu du fichier
  const reader = new FileReader();

  // écouteur événement sur la lecture du fichier par new FileReader
  reader.addEventListener("load", () => {
    apperçuImage.src = reader.result;
    // reader.result renvoie l'URL de données encodée en base64 qui permet de mettre ajour le src de aperçuImage
    apperçuImage.style.display = "block";
    inputImage.style.display = "none";
    buttonImage.style.display = "none";
  });
  if (file) {
    reader.readAsDataURL(file);
    // si fichier selectionné, methode readAsDataUrl eest appelée sur l'objet reader pour lire contenu de file en tant quURL
    // permet de lire l'image selectionnée et afficher son apperçu
  }
});
// -------------------- fetch catégorie pour liste déroulante modalSecond

let categories;
// fetch catégorie pour liste déroulante modalSecond
async function fetchCategories() {
  try {
    const res = await fetch("http://localhost:5678/api/categories");
    if (res.ok) {
      const data = await res.json();
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
    } else {
      console.log("ERREUR");
      // si réponse pas ok, message d'erreur dans la console
    }
  } catch (error) {
    console.error(error);
  }
}

fetchCategories();

// ---------------------------- Envoyer un projet ----------------------
const form = document.getElementById("form");
// écoute de l'événement de soumission. Objet event contient infos événement + données formulaire soumis
form.addEventListener("submit", async function (event) {
  // l'événement par defaut de la soumission du formulaire est empéchée
  event.preventDefault();

  // on récupére l'élément de fichier d'image, le titre et la catégorie donnée par l'utilisateur
  const image = document.getElementById("image").files[0];
  const title = document.getElementById("title");
  const category = document.getElementById("category");

  // Vérifier si tous les champs requis sont remplis
  if (title.value.length < 1) {
    alert("Veuillez donner un titre au nouveau projet !");
    return;
  }

  // on créer un objet formData auquel on ajoute les valeurs ci-dessous récupérées dans form
  const formData = new FormData();
  formData.append("image", image, image.name);
  formData.append("title", title.value);
  formData.append("category", category.value);
  // formData.append permet de récupérer plusieurs valeurs

  // console log sous format tableau de l'objet FormData
  console.log(Array.from(formData));

  try {
    const response = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (response.status === 201) {
      console.log("Projet ajouté avec succès");
      const data = await response.json();
      // permet de récupérer les données renvoyées par le serveur sous forme de JSON.

      // Ajouter le nouveau projet à la liste des projets(works)
      works.push(data);
      // Mettre à jour la page avec les nouvelles données
      genererWorks(works);
      genererWorksGallerie(works);
      // on fait "disparaitre" la seconde modal et apparaitre la premiére
      modalSecond.style.display = "none";
      modalFirst.style.display = "block";
      resetForm();
    } else {
      console.error("Echec de l'ajout du nouveau projet");
    }
  } catch (error) {
    console.error(error);
  }
});

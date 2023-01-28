// fetch("http://localhost:5678/api/works").then((res) => {
//   if (res.ok) {
//     res.json().then((works) => {
//       genererWorks(works);
//     });
//   } else {
//     console.log("ERREUR");
//   }
// });

// function genererWorks(works) {
//   for (let i = 0; i < works.length; i++) {
//     const project = works[i];
//     // recupérer l'élements du DOM qui va acceuillir TOUT les travaux
//     const sectionFigure = document.querySelector(".gallery");
//     // création de la balise dédié à un projet
//     const workElement = document.createElement("figure");
//     // création des balises dans celle projet
//     const imageElement = document.createElement("img");
//     imageElement.src = project.imageUrl;
//     imageElement.alt = project.title;
//     imageElement.crossOrigin = "";
//     // pour éviter erreur sur les images : error_Blocked_BY_Response_NotSameOrigin200(OK)
//     const titleElement = document.createElement("figcaption");
//     titleElement.innerHTML = project.title;
//     sectionFigure.appendChild(workElement);
//     workElement.appendChild(imageElement);
//     workElement.appendChild(titleElement);
//   }
//   console.log(works);
// }

// fetch("http://localhost:5678/api/works").then((res) => {
//   if (res.ok) {
//     res.json().then((works) => {
//       const boutonFiltrer = document.getElementById("objects");

//       boutonFiltrer.addEventListener("click", function () {
//         // Efface le contenu de la balise body et donc l’écran
//         document.querySelector(".gallery").innerHTML = "";
//         const worksFiltrees = works.filter(function (works) {
//           return works.category.id < 2;
//         });
//         console.log(worksFiltrees);
//         genererWorks(worksFiltrees);
//       });
//     });
//   }
// });

// fetch("http://localhost:5678/api/works").then((res) => {
//   if (res.ok) {
//     res.json().then((works) => {
//       const boutonFiltrer = document.getElementById("appartments");
//       boutonFiltrer.addEventListener("click", function () {
//         // Efface le contenu de la balise body et donc l’écran
//         document.querySelector(".gallery").innerHTML = "";
//         const worksFiltrees = works.filter(function (works) {
//           return works.category.id > 1;
//         });
//         console.log(worksFiltrees);
//         genererWorks(worksFiltrees);
//       });
//     });
//   }
// });

// fetch("http://localhost:5678/api/works").then((res) => {
//   if (res.ok) {
//     res.json().then((works) => {
//       const boutonFiltrer = document.getElementById("hotels-restaurants");

//       boutonFiltrer.addEventListener("click", function () {
//         // Efface le contenu de la balise body et donc l’écran
//         document.querySelector(".gallery").innerHTML = "";
//         const worksFiltrees = works.filter(function (works) {
//           return works.category.id > 2;
//         });
//         console.log(worksFiltrees);
//         genererWorks(worksFiltrees);
//       });
//     });
//   }
// });

let works;

fetch("http://localhost:5678/api/works")
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      console.log("ERREUR");
    }
  })
  .then((data) => {
    works = data;
    genererWorks(works);
  });

function genererWorks(data) {
  for (let i = 0; i < data.length; i++) {
    const project = data[i];
    // recupérer l'élements du DOM qui va acceuillir TOUT les travaux
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
    sectionFigure.appendChild(workElement);
    workElement.appendChild(imageElement);
    workElement.appendChild(titleElement);
  }
  console.log(data);
}

function filterWorks(categoryId) {
  // Efface le contenu de la balise body et donc l’écran
  document.querySelector(".gallery").innerHTML = "";
  const filteredWorks = works.filter((work) => work.category.id === categoryId);
  console.log(filteredWorks);
  genererWorks(filteredWorks);
}

const boutonFiltrerObjects = document.getElementById("objects");
boutonFiltrerObjects.addEventListener("click", () => filterWorks(1));

const boutonFiltrerAppartments = document.getElementById("appartments");
boutonFiltrerAppartments.addEventListener("click", () => filterWorks(2));

const boutonFiltrerHotelsRestaurants =
  document.getElementById("hotels-restaurants");
boutonFiltrerHotelsRestaurants.addEventListener("click", () => filterWorks(3));

// In this example, I moved the fetch call to the API outside of the event listeners and stored the data in a variable named works. I also created a function named filterWorks() that takes in a categoryId parameter and filters the works data based on that parameter. Then I added the event listeners to the buttons and passed in the appropriate category ID to the filterWorks() function. This way, we only make one call to the API and we don't repeat the same code three times.

const boutonTous = document.getElementById("all");
boutonTous.addEventListener("click", () => {
  document.querySelector(".gallery").innerHTML = "";
  genererWorks(works);
});

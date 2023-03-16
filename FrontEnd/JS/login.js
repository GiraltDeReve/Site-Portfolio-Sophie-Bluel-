// -----------------------------------------------------LOGIN -----------------------------------------------------
const form = document.getElementById("formulaire-login");
// écoute de l'événement de soumission. Objet event contient infos événement + données formulaire soumis
form.addEventListener("submit", async (event) => {
  // l'événement par defaut de la soumission du formulaire est empéchée
  event.preventDefault();

  // récupération des données du formulaire
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  async function connexionUser() {
    // envoi une requête HTTP POST à l'API de connexion avec les informations d'authentification de l'architecte
    const response = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        // pour indiquer le type de données : chaine de caractères (string)
        "Content-Type": "application/json",
      },
      //   Ici le body qu'on envoi avec l'objet qui est convertit en json
      body: JSON.stringify({
        email,
        password,
      }),
    });

    // traite la réponse de l'API pour savoir si connexion réussie ou non
    if (response.status === 200) {
      // stock réponse serveur qui représente les informations de l'utilisateur dans variable userInfos
      const userInfos = await response.json();
      sessionStorage.setItem("user", JSON.stringify(userInfos));
      // redirige l'utilisateur vers la page d'accueil
      window.location.href = "./index.html";
    } else {
      // affiche à l'user un message d'erreur quand mdp et/ou email incorrect
      alert("Le mot de passe et/ou l'e-mail est incorrecte");
    }
  }
  connexionUser();
});

// ----------- changer couleur bouton submit quand champs remplis ---------------
function checkInputs() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (email && password.length > 0) {
    document.getElementById("button-login").classList.add("filled");
    document.getElementById("button-login").classList.remove("button-submit");
  } else {
    document.getElementById("button-login").classList.remove("filled");
    document.getElementById("button-login").classList.add("button-submit");
  }
}

form.addEventListener("input", checkInputs);

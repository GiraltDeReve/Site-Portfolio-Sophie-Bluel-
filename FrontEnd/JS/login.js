// -----------------------------------------------------LOGIN -----------------------------------------------------

// on récupére le formulaire qu'on stock dans une constante
const form = document.getElementById("formulaire-login");
// écoute de l'événement de soumission. Objet event contient infos événement + données formulaire soumis
form.addEventListener("submit", async (event) => {
  // l'événement par defaut de la soumission du formulaire est empéchée
  event.preventDefault();

  // collect des données du formulaire en utilisant l'objet "FormData" et en y associant l'email et password (append)
  const formData = new FormData();
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  formData.append("email", email.value);
  formData.append("password", password.value);

  // envoi une requête HTTP POST à l'API de connexion avec les informations d'authentification de l'architecte
  const response = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      // pour indiquer le type de données : chaine de caractères (string)
      "Content-Type": "application/json",
    },
    //   Ici le body qu'on envoi avec l'objet qui est convertit en json
    body: JSON.stringify({
      email: "sophie.bluel@test.tld",
      password: "S0phie",
    }),
  });

  // traite la réponse de l'API pour savoir si connexion réussie ou non
  if (response.ok) {
    // stock réponse serveur (chaîne JSON qui représente les informations de l'utilisateur) dans variable userInfos
    const userInfos = await response.json();
    console.log(userInfos);
    // sessionStorage: objet JavaScript pour stocker données temporairement et localement côté client le temps session
    // setItem prend deux arguments : une clé("user") pour identifier l'élément stocké et sa valeur(userInfos)
    // JSON.stringify() : convertir objet JavaScript userInfos en chaîne JSON pour stockage
    sessionStorage.setItem("user", JSON.stringify(userInfos));
    // redirige l'utilisateur vers la page d'accueil
    window.location.href = "./index.html";
  } else {
    // affiche à l'user un message d'erreur quand mdp et/ou email incorrect
    alert("Les informations d'authentification sont incorrectes");
  }
});

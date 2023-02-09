// -----------------------------------------------------LOGIN -----------------------------------------------------

// gestion de l'événement de soumission du formulaire
document
  .getElementById("formulaire-login")
  // on récupére le formulaire sur le DOM
  .addEventListener("submit", async (event) => {
    // écoute de l'événement de soumission du formulaire
    event.preventDefault();
    // l'événement par defaut de la soumission du formulaire est empéchée
    // (evt par defaut = envoi des données au serveur pour traitement du formulaire quand on click entrée)

    // collect des données du formulaire en utilisant l'objet "FormData" et appelant la méthode get()
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");

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
      const userInfos = await response.json();
      console.log(userInfos);
      // stock dans le local storage les informations d'identification de l'utilisateur (idUser et token de la session)
      localStorage.setItem("user", JSON.stringify(userInfos));
      // redirige l'utilisateur vers la page d'accueil
      window.location.href = "./index.html";
    } else {
      // affiche à l'user un message d'erreur quand mdp et/ou email incorrect
      alert("Les informations d'authentification sont incorrectes");
    }
  });

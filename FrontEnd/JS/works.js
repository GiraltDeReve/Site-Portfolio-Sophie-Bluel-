class Works {
  // aurait aussi pu être  uen fonction mais plus simple comme ça
  constructor(jsonWorks) {
    jsonWorks && Objects.assign(this, jsonWorks);
    // object.assign asign toutes les propriétes de l'objet jsonWorks (le 2iéme de la liste) dans l'objet this, sans acraser celles qui existent déjà.
    // This représente une instance de la clss Works, donc un objet Works
    // on va donc être capable d'assigné toutes les propriétes de l'obejt jsonWorks dans le premier de la ligne
  }
}

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const formData = {
    prenom,
    nom,
    email,
    entreprise,
    site_web,
    categorie,
    contexte,
    sujet,
    objectif,
    ton,
    // ajoute tous les champs que tu veux transmettre
  };

  try {
    await fetch("https://hook.eu2.make.com/y4ohogsldw3jijjkzumub8vlkrt3b6kw", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    alert("Commande envoyée avec succès !");
  } catch (error) {
    console.error("Erreur envoi webhook:", error);
    alert("Erreur lors de l'envoi de la commande.");
  }
};

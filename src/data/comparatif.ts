// Tableau comparatif de la page Tarifs. Une valeur par offre, dans l'ordre de formules.ts (Solo, Studio, Agence).
// true / false : Oui / Non. Un nombre : affiché tel quel. Un texte : clé de Tarifs.valeurs dans messages/*.json.
// Les libellés des lignes sont dans Tarifs.lignes.<cle>, avec une aide facultative.
export type Valeur = boolean | number | "illimite" | "zeroPct" | "jusqua5" | "email" | "prioritaire" | "dedie";

type Groupe = {
  groupe: "relances" | "encaissement" | "equipe";
  lignes: { cle: string; valeurs: [Valeur, Valeur, Valeur] }[];
};

export const comparatif: Groupe[] = [
  {
    groupe: "relances",
    lignes: [
      { cle: "facturesMois", valeurs: [20, "illimite", "illimite"] },
      { cle: "email", valeurs: [true, true, true] },
      { cle: "whatsapp", valeurs: [false, true, true] },
      { cle: "calendrier", valeurs: [true, true, true] },
      { cle: "tons", valeurs: [true, true, true] },
      { cle: "personnalises", valeurs: [false, true, true] },
    ],
  },
  {
    groupe: "encaissement",
    lignes: [
      { cle: "lien", valeurs: [true, true, true] },
      { cle: "detection", valeurs: [true, true, true] },
      { cle: "commission", valeurs: ["zeroPct", "zeroPct", "zeroPct"] },
    ],
  },
  {
    groupe: "equipe",
    lignes: [
      { cle: "utilisateurs", valeurs: [1, "jusqua5", "illimite"] },
      { cle: "domaine", valeurs: [false, true, true] },
      { cle: "rapports", valeurs: [false, true, true] },
      { cle: "api", valeurs: [false, false, true] },
      { cle: "support", valeurs: ["email", "prioritaire", "dedie"] },
    ],
  },
];

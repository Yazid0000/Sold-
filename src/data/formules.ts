// Prix hors taxes, par mois. Les textes de chaque offre sont dans messages/*.json, sous Formules.<id>.
// prix: null veut dire "sur devis".
type Formule = {
  id: "solo" | "studio" | "agence";
  prix: { mensuel: number; annuel: number } | null;
  miseEnAvant?: boolean;
};

export const formules: Formule[] = [
  { id: "solo", prix: { mensuel: 9, annuel: 7.2 } },
  { id: "studio", prix: { mensuel: 29, annuel: 23.2 }, miseEnAvant: true },
  { id: "agence", prix: null },
];

export const emailDevis = "equipe@solde.app";

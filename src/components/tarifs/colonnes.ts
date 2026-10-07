import { formules } from "@/data/formules";

// Classes communes à toutes les lignes du comparatif, pour que l'en-tête et les lignes restent alignés.
// Large : libellé à gauche, 3 colonnes à droite. Étroit : le libellé passe au-dessus des 3 colonnes.
export const ligne = "flex flex-wrap";
export const libelle = "flex-[1_1_300px]";
export const colonnes = "grid flex-[2_1_420px] grid-cols-3";

// La colonne de l'offre mise en avant (Studio) : fond vert pâle, et bordures vertes en large seulement.
// En mobile, les libellés passent par-dessus la colonne : des bordures y barreraient les mots.
export const enAvant = (i: number) => (formules[i].miseEnAvant ? "bg-soft wide:border-x-2 wide:border-accent" : "");

// Sur les libellés en mobile, prolonge le fond de cette colonne pour qu'elle reste continue.
// bande-studio (globals.css) suppose que l'offre mise en avant est celle du milieu.
export const bandeLibelle = "bande-studio wide:bg-none";

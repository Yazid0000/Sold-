import { notFound } from "next/navigation";

// Toute adresse qui ne correspond à aucune page (/xyz, /en/xyz) arrive ici et affiche not-found.tsx,
// dans le layout du site : bonne langue, header et pied de page, au lieu de l'écran par défaut de Next en anglais.
export default function PageInconnue() {
  notFound();
}

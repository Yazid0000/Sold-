"use server";

// "use server" : ces fonctions tournent uniquement sur le serveur. Le formulaire les appelle
// directement, Next.js crée la requête HTTP tout seul. Rien n'est envoyé ni enregistré : Soldé est une démo.

// Une erreur par cause, pour que le message dise quoi corriger (champ vide, arobase oubliée, autre chose).
export type EtatEssai = { statut: "attente" | "ok" | "vide" | "arobase" | "format"; email: string };

// Lettres (accents compris), chiffres et . _ % + ' - avant l'arobase ; un domaine avec au moins un point.
// \p{L} accepte "léa@studio.fr" ; les emoji, espaces et autres symboles sont refusés.
const FORMAT_EMAIL = /^[\p{L}\p{N}._%+'-]+@[\p{L}\p{N}-]+(\.[\p{L}\p{N}-]+)*\.\p{L}{2,}$/u;

export async function demanderEssai(_precedent: EtatEssai, donnees: FormData): Promise<EtatEssai> {
  const email = String(donnees.get("email") ?? "").trim();

  // Piège à robots : un humain ne voit pas ce champ, un robot le remplit. On lui répond "ok" sans rien faire,
  // pour qu'il ne sache pas qu'il a été repéré.
  if (donnees.get("site")) return { statut: "ok", email: "" };

  // La validation qui compte est ici : un robot peut contourner le navigateur, pas le serveur.
  // La longueur est vérifiée avant le motif : une adresse géante ne fait pas travailler le serveur pour rien.
  if (!email) return { statut: "vide", email };
  if (!email.includes("@")) return { statut: "arobase", email };
  if (email.length > 254 || email.includes("..") || !FORMAT_EMAIL.test(email)) return { statut: "format", email };

  return { statut: "ok", email };
}

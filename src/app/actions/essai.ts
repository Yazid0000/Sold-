"use server";

// "use server" : ces fonctions tournent uniquement sur le serveur. Le formulaire les appelle
// directement, Next.js crée la requête HTTP tout seul. Rien n'est envoyé ni enregistré : Soldé est une démo.

export type EtatEssai = { statut: "attente" | "ok" | "invalide"; email: string };

const FORMAT_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function demanderEssai(_precedent: EtatEssai, donnees: FormData): Promise<EtatEssai> {
  const email = String(donnees.get("email") ?? "").trim();

  // Piège à robots : un humain ne voit pas ce champ, un robot le remplit. On lui répond "ok" sans rien faire,
  // pour qu'il ne sache pas qu'il a été repéré.
  if (donnees.get("site")) return { statut: "ok", email: "" };

  // La validation qui compte est ici : un robot peut contourner le navigateur, pas le serveur.
  if (email.length > 254 || !FORMAT_EMAIL.test(email)) return { statut: "invalide", email };

  return { statut: "ok", email };
}

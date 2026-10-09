"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { demanderEssai, type EtatEssai } from "@/app/actions/essai";
import RecuEssai from "@/components/RecuEssai";

// useActionState relie le formulaire à la Server Action : il garde la dernière réponse du serveur (etat)
// et indique si l'envoi est en cours (enCours). Sans JavaScript, le formulaire marche quand même.
export default function FormulaireEssai() {
  const t = useTranslations("Essai");
  const [etat, envoyer, enCours] = useActionState<EtatEssai, FormData>(demanderEssai, { statut: "attente", email: "" });
  const invalide = etat.statut === "invalide";
  const reussi = etat.statut === "ok";

  // Le reçu d'essai attend au-dessus du formulaire. Quand l'essai est demandé, il prend l'adresse
  // du visiteur et reçoit le tampon : la promesse du produit, vécue sur sa propre facture.
  return (
    // min-w-0 et grid-cols-1 : une adresse très longue est tronquée dans le reçu au lieu d'élargir la page.
    <div className="grid min-w-0 flex-[1_1_400px] grid-cols-1 gap-6">
      <RecuEssai paye={reussi} client={reussi ? etat.email : undefined} chute="animate-tampon" className="w-full max-w-[360px] justify-self-end" />
      <form action={envoyer} noValidate className="grid gap-2">
        <label htmlFor="email" className="text-sm font-medium">{t("label")}</label>
        <div className="flex flex-wrap gap-2.5">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            defaultValue={etat.email}
            aria-invalid={invalide}
            aria-describedby="email-aide"
            className="h-13 min-w-0 flex-[1_1_220px] rounded-md border border-border bg-background px-3.5 text-base aria-invalid:border-late"
          />
          <button
            type="submit"
            disabled={enCours}
            className="h-13 flex-none cursor-pointer whitespace-nowrap rounded-md bg-accent px-[22px] text-base font-semibold text-on-accent hover:bg-accent-hover disabled:cursor-wait disabled:opacity-70"
          >
            {t("bouton")}
          </button>
        </div>
        <div aria-hidden className="absolute -left-[9999px]">
          <label htmlFor="site">{t("piege")}</label>
          <input id="site" name="site" type="text" tabIndex={-1} autoComplete="off" />
        </div>
        <p
          id="email-aide"
          role="status"
          className={`text-sm ${invalide ? "text-late" : etat.statut === "ok" ? "text-accent" : "text-muted"}`}
        >
          {t(etat.statut === "attente" ? "aide" : etat.statut)}
        </p>
      </form>
    </div>
  );
}

"use client";

import { Component, useActionState, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { demanderEssai, type EtatEssai } from "@/app/actions/essai";
import RecuEssai from "@/components/RecuEssai";

// Filet de sécurité : si l'envoi échoue (connexion coupée…), React remonte l'erreur jusqu'ici.
// Sans lui, toute la page serait remplacée par l'écran d'erreur de Next.js.
// Un "error boundary" doit encore être une classe en React : c'est la seule du projet.
class FiletErreur extends Component<{ repli: React.ReactNode; children: React.ReactNode }, { erreur: boolean }> {
  state = { erreur: false };
  static getDerivedStateFromError() {
    return { erreur: true };
  }
  render() {
    return this.state.erreur ? this.props.repli : this.props.children;
  }
}

export default function FormulaireEssai() {
  const t = useTranslations("Essai");
  // Ce que le visiteur a tapé, gardé ici (au-dessus du filet) pour le lui rendre après un échec.
  const [saisie, setSaisie] = useState("");
  // Changer la clé recrée le filet et le formulaire : c'est le bouton Réessayer.
  const [tentative, setTentative] = useState(0);

  const repli = (
    <div role="alert" className="grid min-w-0 flex-[1_1_400px] content-end gap-4">
      <p className="text-[15px] leading-normal text-late">{t("reseau")}</p>
      <button
        type="button"
        onClick={() => setTentative(tentative + 1)}
        className="h-13 cursor-pointer justify-self-start rounded-md border border-foreground px-[22px] text-base font-semibold"
      >
        {t("reessayer")}
      </button>
    </div>
  );

  return (
    <FiletErreur key={tentative} repli={repli}>
      <Formulaire adresse={saisie} onSaisie={setSaisie} />
    </FiletErreur>
  );
}

// useActionState relie le formulaire à la Server Action : il garde la dernière réponse du serveur (etat)
// et indique si l'envoi est en cours (enCours). Sans JavaScript, le formulaire marche quand même.
function Formulaire({ adresse, onSaisie }: { adresse: string; onSaisie: (valeur: string) => void }) {
  const t = useTranslations("Essai");
  const [etat, envoyer, enCours] = useActionState<EtatEssai, FormData>(demanderEssai, { statut: "attente", email: adresse });
  const [saisie, setSaisie] = useState(adresse);
  const champ = useRef<HTMLInputElement>(null);
  const reussi = etat.statut === "ok";
  const erreur = etat.statut !== "attente" && !reussi;
  // Déjà envoyé avec cette adresse : le bouton se désactive, et revient si le visiteur la corrige.
  const dejaEnvoye = reussi && saisie.trim() === etat.email;

  // En cas d'erreur, le curseur revient dans le champ : le visiteur corrige sans chercher où cliquer.
  useEffect(() => {
    if (erreur) champ.current?.focus();
  }, [etat, erreur]);

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
            ref={champ}
            id="email"
            name="email"
            type="email"
            required
            maxLength={254}
            autoComplete="email"
            autoCapitalize="none"
            spellCheck={false}
            enterKeyHint="send"
            defaultValue={etat.email}
            onInput={(e) => {
              setSaisie(e.currentTarget.value);
              onSaisie(e.currentTarget.value);
            }}
            aria-invalid={erreur}
            aria-describedby="email-aide"
            className="h-13 min-w-0 flex-[1_1_220px] rounded-md border border-border bg-background px-3.5 text-base aria-invalid:border-late"
          />
          <button
            type="submit"
            disabled={enCours || dejaEnvoye}
            className="h-13 w-full flex-none cursor-pointer whitespace-nowrap rounded-md bg-accent px-[22px] wide:w-auto text-base font-semibold text-on-accent hover:bg-accent-hover disabled:cursor-default disabled:opacity-70 aria-busy:cursor-wait"
            aria-busy={enCours}
          >
            {t(dejaEnvoye ? "envoye" : "bouton")}
          </button>
        </div>
        <div aria-hidden className="absolute -left-[9999px]">
          <label htmlFor="site">{t("piege")}</label>
          <input id="site" name="site" type="text" tabIndex={-1} autoComplete="off" />
        </div>
        <p id="email-aide" role="status" className={`text-sm ${erreur ? "text-late" : reussi ? "text-accent" : "text-muted"}`}>
          {t(etat.statut === "attente" ? "aide" : etat.statut)}
        </p>
      </form>
    </div>
  );
}

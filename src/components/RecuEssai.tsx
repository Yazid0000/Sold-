import { useFormatter, useTranslations } from "next-intl";
import Tampon from "./Tampon";
import Montant from "./Montant";

type Props = {
  // Le tampon "SOLDÉ" est posé : sur la garantie (Tarifs) toujours, sur l'accueil une fois l'essai demandé.
  paye: boolean;
  // L'adresse du visiteur, à la place du mot "Essai" : c'est son reçu à lui.
  client?: string;
  // Classe de l'animation du tampon (animate-tampon ou animate-tampon-retard).
  chute: string;
  className?: string;
};

// Le reçu d'essai à 0,00 €. Sans "use client" : il sert dans un composant serveur (Garantie)
// comme dans un composant client (FormulaireEssai).
export default function RecuEssai({ paye, client, chute, className = "" }: Props) {
  const t = useTranslations("Recu");
  const format = useFormatter();

  return (
    // bg-surface : le double cadre du tampon est découpé dans cette couleur (box-shadow inset), le fond doit la reprendre.
    <div className={`relative rounded-md border border-border bg-surface px-[22px] pt-[22px] pb-[84px] ${className}`}>
      <div className="flex justify-between gap-4 text-[13px] text-muted">
        <span className="flex-none">{t("abonnement")}</span>
        <span className="min-w-0 truncate font-mono" title={client}>{client || t("essai")}</span>
      </div>
      <div className="mt-[18px] grid gap-2 font-mono text-sm tabular-nums">
        <div className="flex justify-between"><span className="font-sans text-muted">{t("ligne")}</span><span><Montant texte={format.number(0, { minimumFractionDigits: 2 })} /></span></div>
        <div className="flex justify-between border-t border-rule pt-2.5 text-lg font-semibold">
          <span className="font-sans">{t("total")}</span>
          <span><Montant texte={format.number(0, { style: "currency", currency: "EUR" })} /></span>
        </div>
      </div>
      {paye && (
        <Tampon
          label={t("tampon")}
          className={`absolute right-[22px] bottom-[18px] ${chute} border-[2.5px] px-3 py-[5px] text-2xl shadow-[inset_0_0_0_1.5px_var(--color-surface),inset_0_0_0_3.5px_var(--color-accent)]`}
        />
      )}
    </div>
  );
}

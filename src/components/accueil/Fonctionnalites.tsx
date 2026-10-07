import { useFormatter, useTranslations } from "next-intl";
import Tampon from "@/components/Tampon";
import Interrupteurs from "./Interrupteurs";

const carte = "rounded-md border border-border p-7";
const titre = "mb-2 font-display text-[22px] font-semibold";
const texte = "leading-normal text-muted";

export default function Fonctionnalites() {
  const t = useTranslations("Fonctionnalites");
  const format = useFormatter();
  const decimales = (v: number) => format.number(v, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const euros = (v: number) => format.number(v, { style: "currency", currency: "EUR" });

  const pastille = "whitespace-nowrap rounded-md px-[7px] py-[3px] text-[12.5px]";
  const factures = [
    { client: "Atelier Morel", montant: 2480, etat: t("tableau.retard"), style: `${pastille} bg-late-soft font-semibold text-late` },
    { client: "Maison Ferrand", montant: 1150, etat: t("tableau.relancee"), style: `${pastille} text-muted` },
    { client: "Studio Bléone", montant: 640, etat: t("tableau.payee"), style: `${pastille} bg-soft font-semibold text-accent`, payee: true },
    { client: "Les Ateliers Duval", montant: 1530, etat: t("tableau.echeance"), style: `${pastille} text-muted` },
  ];
  const total = factures.reduce((somme, f) => ("payee" in f ? somme : somme + f.montant), 0);

  return (
    <section className="mx-auto max-w-page px-5 pb-section">
      <h2 className="mb-10 max-w-[18ch] text-balance font-display text-title font-semibold">{t("title")}</h2>
      <div className="grid grid-cols-1 gap-4 wide:grid-cols-6">

        <article className={`${carte} flex flex-col gap-6 bg-paper bg-[repeating-linear-gradient(0deg,transparent_0_31px,var(--color-rule)_31px_32px)] wide:col-span-3 wide:row-span-2`}>
          <div>
            <h3 className={`${titre} text-2xl`}>{t("canaux.title")}</h3>
            <p className={`${texte} max-w-[38ch]`}>{t("canaux.text")}</p>
          </div>
          <div className="mt-auto grid gap-3 text-sm">
            <div className="max-w-[340px] rounded-md border border-border bg-surface px-3.5 py-3">
              <div className="mb-1 flex justify-between text-xs text-muted"><span>{t("canaux.emailMeta")}</span><span className="font-mono">09:12</span></div>
              <div className="font-medium">{t("canaux.emailSujet")}</div>
            </div>
            <div className="max-w-[320px] justify-self-end rounded-md border border-border bg-soft px-3.5 py-3 leading-[1.45]">
              <div className="mb-1 flex justify-between text-xs text-muted"><span>{t("canaux.whatsappMeta")}</span><span className="font-mono">{t("canaux.lu")}</span></div>
              {t("canaux.whatsappTexte")}
            </div>
          </div>
        </article>

        <article className={`${carte} flex flex-wrap items-center justify-between gap-6 bg-soft wide:col-span-3`}>
          <div className="flex-[1_1_220px]">
            <h3 className={titre}>{t("arret.title")}</h3>
            <p className={texte}>{t("arret.text")}</p>
          </div>
          <div className="relative min-w-[200px] flex-[0_1_220px] rounded-md border border-border bg-surface p-4 text-[13px]">
            <div className="text-muted">Studio Bléone</div>
            <div className="mt-1.5 font-mono text-xl font-semibold tabular-nums">{euros(640)}</div>
            <div className="mt-3.5 text-muted line-through">{t("arret.relance")}</div>
            <Tampon className="absolute top-[22px] right-2.5 -rotate-9 border-2 px-[9px] py-1 text-[19px] opacity-95 shadow-[inset_0_0_0_1.5px_var(--color-surface),inset_0_0_0_3px_var(--color-accent)]" />
          </div>
        </article>

        <article className={`${carte} flex flex-wrap items-center gap-6 bg-surface wide:col-span-3`}>
          <div className="flex-[1_1_200px]">
            <h3 className={titre}>{t("calendrier.title")}</h3>
            <p className={texte}>{t("calendrier.text")}</p>
          </div>
          <Interrupteurs />
        </article>

        <article className={`${carte} bg-surface wide:col-span-4`}>
          <h3 className={titre}>{t("tableau.title")}</h3>
          <p className={`${texte} mb-5`}>{t("tableau.text")}</p>
          <div className="overflow-hidden rounded-md border border-border text-sm">
            {factures.map((f) => (
              <div key={f.client} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-rule px-3.5 py-2.5">
                <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1"><span>{f.client}</span><span className={f.style}>{f.etat}</span></span>
                <span className="whitespace-nowrap text-right font-mono tabular-nums">{decimales(f.montant)}</span>
              </div>
            ))}
            <div className="flex justify-between bg-background px-3.5 py-3 font-semibold">
              <span>{t("tableau.total")}</span>
              <span className="font-mono tabular-nums">{euros(total)}</span>
            </div>
          </div>
        </article>

        <article className="flex flex-col gap-6 rounded-md bg-ink-card p-7 text-[#eceae4] wide:col-span-2">
          <div>
            <h3 className={titre}>{t("paiement.title")}</h3>
            <p className="leading-normal opacity-85">{t("paiement.text")}</p>
          </div>
          <div className="mt-auto grid gap-3 rounded-md bg-background p-4 text-foreground">
            <div className="flex justify-between text-[13px] text-muted"><span>{t("paiement.facture")}</span><span>Atelier Morel</span></div>
            <div className="flex h-11 items-center justify-center rounded-md bg-accent font-mono text-[15px] font-semibold text-on-accent">
              {t("paiement.regler", { montant: euros(2480) })}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

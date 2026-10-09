import { useFormatter, useTranslations } from "next-intl";
import Montant from "@/components/Montant";

// Trois tuiles, chacune pour ce que le reste de la page ne montre pas : les vrais messages (e-mail et WhatsApp),
// le tableau de bord, le lien de paiement. L'arrêt des relances et le calendrier sont déjà dans « Comment ça marche ».
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
      <div className="grid grid-cols-1 gap-4 wide:grid-cols-3">

        <article className={`${carte} flex flex-col gap-6 bg-paper`}>
          <div>
            <h3 className={`${titre} text-2xl`}>{t("canaux.title")}</h3>
            <p className={`${texte} max-w-[38ch]`}>{t("canaux.text")}</p>
          </div>
          {/* Le papier ligné sous le texte, jusqu'aux bords de la carte (-mx-7 -mb-7), messages en bas (content-end) :
              derrière le titre et le texte, les lignes gênaient la lecture. */}
          <div className="-mx-7 -mb-7 grid flex-1 content-end gap-3 rounded-b-md bg-[repeating-linear-gradient(0deg,transparent_0_31px,var(--color-rule)_31px_32px)] px-7 pt-6 pb-7 text-sm">
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

        <article className={`${carte} bg-surface`}>
          <h3 className={titre}>{t("tableau.title")}</h3>
          <p className={`${texte} mb-5`}>{t("tableau.text")}</p>
          <div className="overflow-hidden rounded-md border border-border text-sm">
            {factures.map((f) => (
              <div key={f.client} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-rule px-3.5 py-2.5">
                <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1"><span>{f.client}</span><span className={f.style}>{f.etat}</span></span>
                <span className="whitespace-nowrap text-right font-mono tabular-nums"><Montant texte={decimales(f.montant)} /></span>
              </div>
            ))}
            <div className="flex justify-between bg-background px-3.5 py-3 font-semibold">
              <span>{t("tableau.total")}</span>
              <span className="font-mono tabular-nums"><Montant texte={euros(total)} /></span>
            </div>
          </div>
        </article>

        <article className="flex flex-col gap-6 rounded-md bg-ink-card p-7 text-[#eceae4]">
          <div>
            <h3 className={titre}>{t("paiement.title")}</h3>
            <p className="leading-normal opacity-85">{t("paiement.text")}</p>
          </div>
          <div className="mt-auto grid gap-3 rounded-md bg-background p-4 text-foreground">
            <div className="flex justify-between text-[13px] text-muted"><span>{t("paiement.facture")}</span><span>Atelier Morel</span></div>
            <div className="flex h-11 items-center justify-center rounded-md bg-accent font-mono text-[15px] font-semibold text-on-accent">
              <Montant texte={t("paiement.regler", { montant: euros(2480) })} />
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

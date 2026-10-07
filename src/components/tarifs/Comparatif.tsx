import { useFormatter, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { comparatif, type Valeur } from "@/data/comparatif";
import { emailDevis, formules } from "@/data/formules";
import { bandeLibelle, colonnes, enAvant, libelle, ligne } from "./colonnes";
import TableauTarifs from "./TableauTarifs";

// Un vrai tableau pour les lecteurs d'écran (role="table", "row", "cell"),
// mais en flex : sur mobile, chaque libellé passe au-dessus de ses 3 valeurs au lieu de déborder.
export default function Comparatif() {
  const t = useTranslations("Tarifs");
  const f = useTranslations("Formules");
  const format = useFormatter();

  const texte = (v: Valeur) =>
    typeof v === "boolean" ? t(v ? "valeurs.oui" : "valeurs.non") : typeof v === "number" ? format.number(v) : t(`valeurs.${v}`);

  const bouton = "flex min-h-11 items-center justify-center rounded-md px-2 py-1.5 text-center text-[13px] leading-tight font-semibold no-underline";
  const contour = `${bouton} border border-foreground text-foreground hover:bg-background hover:text-foreground`;
  const plein = `${bouton} bg-accent text-on-accent hover:bg-accent-hover hover:text-on-accent`;

  const corps = (
    <>
      {comparatif.map(({ groupe, lignes }) => (
        <div role="rowgroup" key={groupe}>
          <div role="row" className={`${ligne} border-b border-border bg-background`}>
            <div role="rowheader" className={`${libelle} ${bandeLibelle} px-6 py-3.5`}>
              <h3 className="font-display font-semibold">{t(`groupes.${groupe}`)}</h3>
            </div>
            <div aria-hidden className={colonnes}>
              {formules.map((offre, i) => <span key={offre.id} className={enAvant(i)} />)}
            </div>
          </div>
          {lignes.map(({ cle, valeurs }) => (
            <div role="row" key={cle} className={`${ligne} border-b border-rule`}>
              <div role="rowheader" className={`${libelle} ${bandeLibelle} px-6 pt-3.5 pb-2 text-[15px] wide:pb-3.5 leading-[1.4]`}>
                {t(`lignes.${cle}.label`)}
                {t.has(`lignes.${cle}.aide`) && <div className="mt-0.5 text-[13px] text-muted">{t(`lignes.${cle}.aide`)}</div>}
              </div>
              <div role="none" className={`${colonnes} text-sm`}>
                {valeurs.map((v, i) => (
                  <div
                    role="cell"
                    key={i}
                    className={`flex items-center gap-2 px-[clamp(8px,1.5vw,20px)] pt-2 pb-3.5 wide:pt-3.5 wide:items-start ${enAvant(i)} ${v === false ? "text-muted" : "font-medium"}`}
                  >
                    <span aria-hidden className={`size-2 flex-none rounded-xs wide:mt-1.5 border-[1.5px] ${v === false ? "border-muted" : "border-accent bg-accent"}`} />
                    <span>{texte(v)}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
      <div role="row" className={ligne}>
        <div role="cell" className={`${libelle} hidden wide:block`} />
        <div role="none" className={colonnes}>
          {formules.map((offre) => (
            <div
              role="cell"
              key={offre.id}
              className={`px-[clamp(6px,1.2vw,16px)] pt-4 pb-5 ${offre.miseEnAvant ? "rounded-b-md bg-soft wide:border-2 wide:border-t-0 wide:border-accent" : ""}`}
            >
              {offre.prix ? (
                <Link
                  href="/#essai"
                  aria-label={t("essaiOffre", { offre: f(`${offre.id}.nom`) })}
                  className={offre.miseEnAvant ? plein : contour}
                >
                  {f("essai")}
                </Link>
              ) : (
                <a href={`mailto:${emailDevis}`} className={contour}>{f("devis")}</a>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <TableauTarifs corps={corps}>
      <h1 className="mb-4 max-w-[16ch] text-balance font-display text-[clamp(38px,5vw,64px)] leading-[1.02] font-semibold tracking-[-0.035em]">
        {f("title")}
      </h1>
      <p className="max-w-[46ch] text-lg leading-normal text-muted">{t("lead")}</p>
    </TableauTarifs>
  );
}

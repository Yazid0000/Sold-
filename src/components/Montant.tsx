// En police mono, chaque caractère a la même largeur, espaces compris : "2 480,00 €" s'étirait en "2  480,00  €".
// Intl.NumberFormat met des espaces insécables (fine U+202F entre les milliers, normale U+00A0 avant €) :
// on rétrécit seulement celles-là. Les espaces entre les mots (U+0020) restent normaux, l'espace reste copiable.
export const INSECABLES = /[\u00a0\u202f]/;

// Largeur de typographe : étroite entre les milliers (fine), une demi-chasse avant le symbole € (normale).
export const largeurEspace = (c: string) => (c.codePointAt(0) === 0x202f ? "inline-block w-[0.3ch]" : "inline-block w-[0.5ch]");

export default function Montant({ texte }: { texte: string }) {
  return (
    <>
      {[...texte].map((c, i) =>
        INSECABLES.test(c) ? (
          <span key={i} className={largeurEspace(c)}>
            {c}
          </span>
        ) : (
          c
        ),
      )}
    </>
  );
}

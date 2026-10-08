// Le remplacement de "<" empêche un texte contenant "</script>" de fermer la balise avant la fin
// (méthode recommandée par la doc de Next.js).
export default function DonneesStructurees({ donnees }: { donnees: object }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(donnees).replace(/</g, "\\u003c") }} />
  );
}

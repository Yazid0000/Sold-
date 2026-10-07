import { useTranslations } from "next-intl";

// Le tampon "SOLDÉ" posé sur les factures payées. className règle la taille et la position.
export default function Tampon({ className = "", children }: { className?: string; children?: React.ReactNode }) {
  const t = useTranslations("Tampon");

  return (
    <div
      role="img"
      aria-label={t("label")}
      className={`pointer-events-none rounded-md border-accent text-center font-display font-bold leading-none tracking-[.14em] text-accent mix-blend-(--blend) ${className}`}
    >
      {t("texte")}
      {children}
    </div>
  );
}

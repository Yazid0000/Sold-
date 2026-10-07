"use client";

import { useTranslations } from "next-intl";

// Les deux libellés sont dans le HTML. Le CSS affiche le bon selon la classe "dark",
// dès le premier affichage, sans attendre React.
export default function ThemeToggle() {
  const t = useTranslations("Theme");

  const basculer = () => {
    const sombre = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", sombre ? "dark" : "light");
  };

  return (
    <button
      onClick={basculer}
      className="h-[46px] cursor-pointer whitespace-nowrap rounded-md border border-border bg-surface px-3.5 text-sm font-medium hover:border-foreground"
    >
      <span className="dark:hidden">{t("sombre")}</span>
      <span className="hidden dark:inline">{t("clair")}</span>
    </button>
  );
}

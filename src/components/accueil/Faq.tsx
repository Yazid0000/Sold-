import { useTranslations } from "next-intl";
import Accordeon from "./Accordeon";

export default function Faq() {
  const t = useTranslations("Faq");

  return (
    <section id="faq" className="scroll-mt-16 border-t border-border">
      <div className="mx-auto flex max-w-page flex-wrap items-start gap-x-16 gap-y-8 px-5 py-[clamp(72px,10vw,120px)]">
        <h2 className="flex-[1_1_280px] font-display text-title font-semibold wide:sticky wide:top-24">{t("title")}</h2>
        <Accordeon />
      </div>
    </section>
  );
}

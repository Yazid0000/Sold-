import { useTranslations } from "next-intl";
import ChoixTon from "./ChoixTon";

export default function Ton() {
  const t = useTranslations("Ton");

  return (
    <section className="border-y border-border bg-surface">
      <div className="mx-auto max-w-[760px] px-5 py-[clamp(72px,10vw,120px)] text-center">
        <h2 className="mb-4 font-display text-[clamp(32px,4.4vw,56px)] leading-[1.05] font-semibold tracking-[-0.03em]">{t("title")}</h2>
        <p className="mx-auto mb-9 max-w-[46ch] text-pretty text-lg leading-[1.55] text-muted">{t("lead")}</p>
        <ChoixTon />
      </div>
    </section>
  );
}

import { setRequestLocale } from "next-intl/server";
import DonneesStructurees from "@/components/DonneesStructurees";
import { logiciel, questionsFrequentes } from "@/i18n/donneesStructurees";
import { metadonnees } from "@/i18n/metadonnees";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/accueil/Hero";
import Chiffres from "@/components/accueil/Chiffres";
import Probleme from "@/components/accueil/Probleme";
import Fonctionnement from "@/components/accueil/Fonctionnement";
import Simulateur from "@/components/accueil/Simulateur";
import Fonctionnalites from "@/components/accueil/Fonctionnalites";
import Ton from "@/components/accueil/Ton";
import Avis from "@/components/accueil/Avis";
import Formules from "@/components/accueil/Formules";
import Faq from "@/components/accueil/Faq";
import Essai from "@/components/accueil/Essai";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  return metadonnees("/", (await params).locale);
}

export default async function Accueil({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <DonneesStructurees donnees={await logiciel(locale)} />
      <DonneesStructurees donnees={await questionsFrequentes(locale)} />
      <Header page="accueil" />
      <main>
        <Hero />
        <Chiffres />
        <Probleme />
        <Fonctionnement />
        <Simulateur />
        <Fonctionnalites />
        <Ton />
        <Avis />
        <Formules />
        <Faq />
        <Essai />
      </main>
      <Footer chemin="/" />
    </>
  );
}

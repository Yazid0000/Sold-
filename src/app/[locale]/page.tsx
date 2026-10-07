import { setRequestLocale } from "next-intl/server";
import { use } from "react";
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

export default function Accueil({ params }: { params: Promise<{ locale: string }> }) {
  setRequestLocale(use(params).locale);

  return (
    <>
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

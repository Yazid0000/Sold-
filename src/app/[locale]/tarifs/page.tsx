import { setRequestLocale } from "next-intl/server";
import DonneesStructurees from "@/components/DonneesStructurees";
import { logiciel } from "@/i18n/donneesStructurees";
import { metadonnees } from "@/i18n/metadonnees";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Comparatif from "@/components/tarifs/Comparatif";
import Garantie from "@/components/tarifs/Garantie";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  return metadonnees("/tarifs", (await params).locale);
}

export default async function Tarifs({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <DonneesStructurees donnees={await logiciel(locale)} />
      <Header page="tarifs" />
      <main>
        <Comparatif />
        <Garantie />
      </main>
      <Footer chemin="/tarifs" />
    </>
  );
}

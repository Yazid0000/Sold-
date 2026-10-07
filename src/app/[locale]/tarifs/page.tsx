import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Comparatif from "@/components/tarifs/Comparatif";
import Garantie from "@/components/tarifs/Garantie";

export default function Tarifs({ params }: { params: Promise<{ locale: string }> }) {
  setRequestLocale(use(params).locale);

  return (
    <>
      <Header page="tarifs" />
      <main>
        <Comparatif />
        <Garantie />
      </main>
      <Footer chemin="/tarifs" />
    </>
  );
}

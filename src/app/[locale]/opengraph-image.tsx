import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { euros } from "@/lib/euros";

// Image affichée quand un lien du site est partagé (WhatsApp, LinkedIn, X…), pour l'accueil comme pour Tarifs.
// Elle reprend la promesse du hero et le tampon, l'effet signature du site.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Soldé";

const encre = "#14161A";
const papier = "#F6F5F1";
const vert = "#0B7A4B";

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const hero = await getTranslations({ locale, namespace: "Hero" });
  const tampon = await getTranslations({ locale, namespace: "Tampon" });
  // Le moteur d'image n'a qu'une police normale intégrée : sans ce fichier, le gras ne s'afficherait pas.
  const gras = await readFile(join(process.cwd(), "src/app/fonts/InstrumentSans-Bold.ttf"));

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", gap: 64, padding: 80, background: papier, color: encre, fontFamily: "Instrument Sans" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 32, flex: 1 }}>
          <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: -1 }}>Soldé</div>
          <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>{hero("title")}</div>
        </div>
        <div
          style={{
            display: "flex",
            width: 380,
            height: 300,
            position: "relative",
            background: "white",
            border: "2px solid #E3E1DA",
            borderRadius: 12,
            padding: 36,
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          <div style={{ fontSize: 28, color: "#5E626B" }}>Atelier Morel</div>
          <div style={{ fontSize: 48, fontWeight: 700 }}>
            {euros(locale).format(2480)}
          </div>
          <div
            style={{
              position: "absolute",
              top: 40,
              right: 28,
              display: "flex",
              padding: "10px 22px",
              border: `6px solid ${vert}`,
              borderRadius: 10,
              color: vert,
              fontSize: 52,
              fontWeight: 700,
              letterSpacing: 8,
              transform: "rotate(-9deg)",
            }}
          >
            {tampon("texte")}
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Instrument Sans", data: gras, weight: 700, style: "normal" }] },
  );
}

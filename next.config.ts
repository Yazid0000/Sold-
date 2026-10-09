import type { NextConfig } from "next";

// Politique de sécurité du contenu (CSP) : le navigateur refuse tout ce qui ne vient pas du site lui-même.
// 'unsafe-inline' pour les scripts : Next.js et le script anti-flash du thème sont écrits dans la page.
// Les interdire demanderait un nonce par requête, et les pages ne seraient plus pré-générées.
// Le site n'affiche aucun contenu saisi par un visiteur, ce qui limite ce risque.
// 'unsafe-eval' seulement en développement : le rechargement à chaud de React en a besoin.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'", // Motion anime via l'attribut style
  "img-src 'self' data:",
  "font-src 'self'", // next/font sert les polices depuis le site
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'", // personne ne peut afficher le site dans une iframe (anti-clickjacking)
].join("; ");

const nextConfig: NextConfig = {
  reactCompiler: true,
  // N'annonce pas "X-Powered-By: Next.js" : inutile de dire aux robots quelle technologie viser.
  poweredByHeader: false,
  // next-intl : on indique où se trouve la configuration des traductions.
  // (Équivalent du plugin next-intl, sans sa dépendance SWC.)
  turbopack: {
    resolveAlias: {
      "next-intl/config": "./src/i18n/request.ts",
    },
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;

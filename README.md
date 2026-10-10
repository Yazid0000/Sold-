# Soldé

Landing page d'un SaaS fictif qui relance automatiquement les factures impayées des freelances et des petites agences.
Projet de démonstration : le produit n'existe pas et le formulaire d'essai n'envoie ni n'enregistre aucune adresse.

**En ligne : https://sold-five.vercel.app**

Deux pages (accueil et tarifs), en français sur `/` et en anglais sur `/en`, en mode clair et sombre.

## Ce que la page montre

- **Une facture qui se paie.** Dans le hero, la relance J+7 part, puis le tampon SOLDÉ tombe sur la facture. Le même tampon tombe sur le reçu d'essai du visiteur quand il s'inscrit.
- **Un simulateur.** Deux curseurs (factures par mois, montant moyen) calculent l'argent qui dort chez les clients et le temps gagné. Les chiffres roulent comme un compteur mécanique.
- **Un sélecteur de ton.** Le même rappel de paiement en version cordiale, neutre ou ferme.
- **Une page Tarifs** avec un tableau comparatif lisible sur mobile et une bascule mensuel ou annuel.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack), TypeScript, React 19 avec React Compiler
- [Tailwind CSS v4](https://tailwindcss.com) : couleurs, polices et espacements en variables `@theme`
- [Motion](https://motion.dev) pour les animations pilotées par le code (chiffres qui roulent, ligne de temps au défilement)
- [next-intl](https://next-intl.dev) pour le français et l'anglais. Tous les textes sont dans `messages/fr.json` et `messages/en.json`.

## Lancer le projet

```bash
npm install
npm run dev
```

Puis ouvrir http://localhost:3000 (français) ou http://localhost:3000/en (anglais).

| Commande | Rôle |
|---|---|
| `npm run dev` | serveur de développement |
| `npm run build` | build de production |
| `npm run start` | serveur de production (après le build) |
| `npm run lint` | ESLint |

Aucune variable d'environnement n'est nécessaire. En production, ajouter `NEXT_PUBLIC_SITE_URL=https://ton-domaine` pour que le sitemap, les balises de partage et les données structurées utilisent le bon domaine. Sur Vercel, l'adresse du projet est prise automatiquement.

## Organisation

```
messages/              textes FR et EN
src/app/[locale]/      pages (accueil, tarifs, 404), image de partage
src/app/actions/       Server Action du formulaire d'essai
src/components/        composants partagés (header, pied de page, tampon, reçu…)
src/components/accueil sections de l'accueil
src/components/tarifs  page Tarifs
src/data/              formules, FAQ, avis, tableau comparatif
src/i18n/              config next-intl, adresses, métadonnées SEO
src/lib/               formatage des euros
```

## Choix

- **Composants serveur par défaut.** Seules les parties qui bougent sont des composants client (simulateur, sélecteurs, FAQ, formulaire, animations).
- **Formulaire sans JavaScript.** Il passe par une Server Action : validation côté serveur, piège à robots, et un filet si la connexion tombe pendant l'envoi.
- **Accessibilité.** Navigation au clavier, rôles ARIA (tableau comparatif, accordéon, sélecteurs), textes lisibles par les lecteurs d'écran pour les chiffres animés. Toutes les animations s'arrêtent si le système demande moins d'animations (`prefers-reduced-motion`).
- **SEO.** Métadonnées et hreflang par page et par langue, image de partage, sitemap, robots.txt, données structurées SoftwareApplication et FAQPage.
- **Sécurité.** En-têtes HTTP (Content-Security-Policy, HSTS, X-Frame-Options…) dans `next.config.ts`. Aucun secret ni clé d'API.

## Limites connues

- Sans JavaScript, la page 404 renvoie bien le code 404, mais son contenu ne s'affiche pas (il passe par le flux React de Next.js).
- Les prix, avis et chiffres sont fictifs, comme le produit.

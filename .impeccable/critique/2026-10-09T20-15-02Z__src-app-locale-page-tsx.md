---
target: page d accueil
total_score: 28
max_score: 36
na_heuristics: 7
p0_count: 0
p1_count: 2
target_identity: "file:C:\\Users\\DELL\\Documents\\solde-landing\\src\\app\\[locale]\\page.tsx"
target_fingerprint: "sha256:b0d19d65f2bbcb5ae10797726a21cab93442b46ab5ab2f9ca52e0b8006e27af4"
target_path: "C:\\Users\\DELL\\Documents\\solde-landing\\src\\app\\[locale]\\page.tsx"
timestamp: 2026-10-09T20-15-02Z
slug: src-app-locale-page-tsx
---
Method: dual-agent (A : revue de design, relancée après une limite d'utilisation · B : détecteur et navigateur)

# Critique n° 2 : page d'accueil de Soldé

Score : 28/36 (78 %, Bon). Heuristique 7 en n/a. L'heuristique 10, n/a lors de la critique n° 1, est notée cette fois.
Sur les 8 heuristiques communes aux deux critiques : 24/32 → 25/32 (gain : prévention des erreurs 2 → 3).

## Heuristiques
| # | Heuristique | Score | Problème clé |
|---|---|---|---|
| 1 | Visibilité de l'état | 3 | États du formulaire et simulateur clairs |
| 2 | Monde réel | 4 | Vocabulaire du métier |
| 3 | Contrôle et liberté | 3 | Pas de navigation mobile |
| 4 | Cohérence | 3 | Montants mono encore mal espacés par endroits |
| 5 | Prévention des erreurs | 3 | Un champ, bouton désactivé après envoi |
| 6 | Reconnaître plutôt que se souvenir | 3 | Tarifs à retenir sur mobile |
| 7 | Flexibilité | n/a | Page vitrine |
| 8 | Esthétique et minimalisme | 3 | 11 sections, ~12 écrans mobile |
| 9 | Récupération après erreur | 3 | Anneau de focus vert sur champ invalide |
| 10 | Aide | 3 | FAQ sur les vraies objections |

## Détecteur
CLI : 1 constat (bounce-easing, globals.css:39, voulu). Navigateur (CSP contournée) : 19 sur /, 18 mobile, 19 /en, 7 /tarifs (contre 22/21/22/7).
Disparus : text-occlusion des cartes du fond du hero, papier ligné derrière le texte.
Faux positifs : text-overflow (sr-only du brouillon), overused-font (colonnes 0-9 des rouleaux), bounce-easing et kicker (maquette), nested-cards (maquettes produit, lignes de tableau).
Plausibles : heading-rhythm des h2 « Ce que Soldé fait » (0/40) et « Un prix fixe » (16/40) ; gpt-thin-border-wide-shadow (goût).

## Problèmes prioritaires
1. [P1] Pas de navigation mobile (Header.tsx, hidden wide:flex). Lien Tarifs compact ou ancres sous le header. Commande : adapt.
2. [P1] Simulateur ambigu : vert lisible comme gain ou coût, logique abstraite. Résultat concret (X € encaissés N jours plus tôt), temps gagné mis en avant. Commande : clarify.
3. [P2] Montants mal espacés : phrase du simulateur sans Montant, « (2 480 €) » WhatsApp sans insécable (coupé en mobile), espaces de « 12 j », « 3 j », « 1 h 55 » en mono. Commande : typeset.
4. [P2] Anneau de focus vert sur champ aria-invalid. Focus rouge si invalide. Commande : harden.
5. [P3] Section finale : reçu aligné à droite vs formulaire à gauche, vide du tampon, CTA du header redondant à l'écran du formulaire. Commande : polish.

## Personas
- Jordan : aucun outil de facturation cité (affirmation à arbitrer pour un produit fictif), Studio sans « Recommandé ».
- Riley : focus vert sur erreur ; valeurs extrêmes du simulateur non testées.
- Casey : pas de navigation, CTA hors du pouce, boutons FAQ ~28 px.

## Mineures
Colonne vide à gauche du brouillon ; avis à initiales seulement ; « Résiliable en un clic » absent près du formulaire ; sombre et anglais propres.

## Questions
- Un seul chiffre à retenir : « 12 j → 3 j » ou le simulateur ?
- Le tampon final sur une facture du visiteur, avec le montant du simulateur ?
- Onze sections : pour le visiteur mobile ou pour l'auteur ?

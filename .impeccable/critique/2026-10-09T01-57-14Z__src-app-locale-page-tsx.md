---
target: page d accueil
total_score: 24
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 2
target_identity: "file:C:\\Users\\DELL\\Documents\\solde-landing\\src\\app\\[locale]\\page.tsx"
target_fingerprint: "sha256:5685c7c1a1815329464083b081f71ea992b5d3661e195a3d2cdc2b35a8f82613"
target_path: "C:\\Users\\DELL\\Documents\\solde-landing\\src\\app\\[locale]\\page.tsx"
timestamp: 2026-10-09T01-57-14Z
slug: src-app-locale-page-tsx
closed: true
---
Method: dual-agent (A : revue de design · B : détecteur et navigateur)

# Critique : page d'accueil de Soldé

Score : 24/32 (75 %, Bon). Heuristiques 7 et 10 en n/a (page de persuasion).

## Heuristiques
| # | Heuristique | Score | Problème clé |
|---|---|---|---|
| 1 | Visibilité de l'état | 3 | Succès du formulaire = une ligne verte de 14 px, champ rempli, bouton actif |
| 2 | Correspondance monde réel | 4 | Vocabulaire du métier juste (J+7, TTC, échéance) |
| 3 | Contrôle et liberté | 3 | Interrupteurs du calendrier sans effet |
| 4 | Cohérence | 3 | Prix sans « HT » sur l'accueil, « hors taxes » sur /tarifs |
| 5 | Prévention des erreurs | 2 | Emoji accepté dans l'e-mail, pas d'inputMode="email" |
| 6 | Reconnaître plutôt que se souvenir | 3 | Pas de menu mobile, FAQ à ~9 écrans |
| 7 | Flexibilité | n/a | Page de persuasion |
| 8 | Esthétique et minimalisme | 3 | 11 sections, ~8 100 px desktop / 10 900 px mobile |
| 9 | Récupération après erreur | 3 | Focus non renvoyé au champ après erreur |
| 10 | Aide | n/a | FAQ suffisante |

## Spécificité
Authored : facture + tampon, brouillon raturé, aperçu des tons, montants mono. Génériques : bento des fonctionnalités, 3 cartes de prix.
Détecteur : CLI 1 constat (bounce-easing, globals.css:39). Navigateur (CSP contournée) : 22 sur /, 22 sur /en, 21 mobile, 7 sur /tarifs.
Recoupés : text-occlusion des cartes du fond du hero (FactureHero.tsx:49-54) ; papier ligné derrière le texte (Fonctionnalites.tsx:29).
Faux positifs : text-overflow (bloc sr-only de Brouillon), gpt-thin-border-wide-shadow (spread -24px), heading-rhythm, bounce-easing et kicker voulus par la maquette, overused-font gonflé par les colonnes 0-9 des rouleaux, nested-cards = illustrations voulues.

## Problèmes prioritaires
1. [P1] Inscription sans moment fort : en succès, mini-facture « Essai · 0,00 € » qui reçoit le tampon, focus + annonce, combler le vide de la carte Essai. Commande : delight.
2. [P1] Simulateur sans appel à l'action : bouton vers #essai sous le résultat. Commande : clarify.
3. [P2] Formulaire fragile : inputMode email, focus sur erreur, refuser les caractères improbables, désactiver après succès. Commande : harden.
4. [P2] Collisions et espaces : tampon sur le € de 640,00 €, espace insécable pleine chasse en mono (espace fine avant €), texte coupé des cartes du fond du hero. Commande : polish.
5. [P3] Page trop longue : bento redondant avec Fonctionnement, J+1/J+7/J+15 répété 3 fois. Commande : distill.

## Personas
- Jordan : pas de HT sur l'accueil, interrupteurs qui ressemblent à un vrai réglage, « produit fictif » discret.
- Riley : emoji accepté, adresse longue tronquée sans retour, focus perdu après envoi vide.
- Casey : CTA du header de 40 px hors du pouce, bouton du formulaire pas pleine largeur, pas de CTA collant, « minutes » orphelin.

## Mineures
Trait d'union au lieu du signe moins dans « -20 % » ; carte « Payer en un clic » peu contrastée en sombre (non vérifié) ; pas de lien d'évitement ; boutons de la grille de prix sans nom d'offre pour les lecteurs d'écran.

## Questions
- Pourquoi le visiteur ne déclenche-t-il jamais le tampon lui-même ?
- Quelle section supprimer en premier sans perdre d'inscriptions ?
- Le freelance voit-il assez tôt que 9 €/mois sont remboursés par la première facture payée plus vite ?


# Application d'impression avec une imprimante thermique

Cette application est une API qui vous permet d'imprimer des titres sur une imprimante thermique. Elle utilise Express.js et la librairie "node-thermal-printer".

## Installation

1. Clonez ce référentiel sur votre machine locale.
2. Exécutez `npm install` pour installer les dépendances nécessaires.

## Configuration

1. Assurez-vous que vous avez une imprimante thermique connectée et accessible sur le réseau.
2. Dans le fichier `printRoute.js`, modifiez l'interface de l'imprimante en spécifiant l'adresse IP ou l'URL de votre imprimante.

## Utilisation

1. Exécutez l'application en utilisant `npm start`.
2. Envoyez une requête POST à l'URL `http://localhost:3000/print` avec le titre que vous souhaitez imprimer.

Exemple de requête avec cette URL : curl -X POST -H "Content-Type: application/json" -d '{"title": "Mon titre à imprimer"}' http://localhost:3000/print


## Dépendances

- Express.js
- "node-thermal-printer"

## Contributions

Les contributions sont les bienvenues ! Si vous avez des suggestions, des améliorations ou des corrections à apporter, n'hésitez pas à ouvrir une issue ou à proposer une pull request.

## Licence

Ce projet est sous licence MIT. Veuillez consulter le fichier `LICENSE` pour plus d'informations.



# printPost-it
Imprimer des post-it simplement avec votre propre imprimante:

Utilisez directement le service sur http://post-it.nicolas-boe.fr

- Imprimez le template
- Collez les post-it (mais décollez les de droite à gauche (comprendre horizontalement) et non par le bas pour éviter le bourrage papier)
- Imprimez le contenu

# Comment développer
Vous aurez besoin de node, bower et grunt

- Cloner le projet
- Puis dans un terminal au niveau du repertoire:
```
npm install bower install
```
- Lancer app/index.html
- Pour minifier les sources:
```
grunt
```

# Reste à faire

- [ ] Optimisation
  - [ ] Retirer jquery et materialize.js
  - [ ] Faire une fonction pour ajouter des todos;
- [X] Utiliser différentes tailles de post-it

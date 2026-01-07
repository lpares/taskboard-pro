Angular est un framework développé et maintenu par Google destiné à créer des application SAP (Single Page Application), c'est-à-dire des applications web qui ne disposent que d'une seule page dynamique. Ce framework permet d'éviter les latences due aux chargements des pages, les flash écrans et améliore la fludité de l'expérience utilisateur.

Angular utilise une architecture MVC (Modèle Vue Contrôleur), en utilisant des composants. Un composant fait office de "morceau" de l'application qui peut être réutilisé. Chaque composant possède un code source, un template et une feuille de style.

## BehaviorSubject
L'une des particularités d'Angular est son utilisation des Observables, qui sont des types de données asynchrones. Un BehaviorSubject est un type d'Observable qui émet à tous les composants abonnés la dernière valeur ajoutée. Ainsi, le composant peut savoir en temps réel si l'Observable a été mis à jour. 
En utilisant un BehaviorSubject, il est facile de produire une application qui peut être mise à jour en temps réel (exemple : un tchat, des notifications, etc).

## | async
Une application Angular peut être asynchrone, c'est-à-dire qu'elle peut effectuer plusieurs opérations en simultané sans qu'une opération ne vienne bloquer une autre.
Pour utiliser des données asynchrones dans l'application, il faut utiliser le pipe | async dans le template. Ce pipe permet de souscrire à un observable et de se désabonner automatiquement lorsque le composant est détruit.

## Fonctionnement du flux service -> composant -> template
Le service émet une donnée à l'aide d'un BehaviorSubject.
Le composant s'abonne à ce BehaviorSubject et récupère la donnée.
Le template affiche la donnée à l'aide du pipe | async.
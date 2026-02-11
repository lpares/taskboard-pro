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

## Lazy Loading & Composants dynamiques

### Qu'est-ce que le Lazy Loading
Le lazy loading est une méthode de développement qui consiste à charger les composants nécessaires uniquement lorsqu'on en a besoin. Cette méthode permet de ne pas surcharger la mémoire de l'application, améliorant ainsi sa fluidité.

### Comment structurer une app avec features/
Les fonctionnalités d'une application Angular peuvent être regroupées dans des dossiers appelés features. Des sous-dossiers peuvent être créés suivant le type des fonctionnalités produites.
Cette architecture est une bonne pratique à adopter durant le développement d'une appli, car elle permet de mieux organiser le code.

### Ce qu'est un composant dynamique
Un composant dynamique est un composant qui n'est créé que lorsqu'on le demande. Cette création est effectuée avec la méthode createComposant de la classe ViewContainerRef.

### Comment fonctionne ViewContainerRef + createComponent()
ViewContainerRef est une classe Angular qui permet de manipuler des composants dynamiques.
La méthode createComponent() de la classe permet de créer un composant à l'emplacement souhaité sur le template du composant qui appelle la méthode. Pour se faire, une balise avec identifiant doit être placé dans le template. Ce dernier est récupéré avec la méthode ViewChild de la classe ComponentFixture. La méthode createComponent() prend en paramètre le composant à créer et le place dans le template à l'emplacement de la balise.

## Tests unitaires Angular

### Pourquoi tester
Tester les composants d'une application est primordial pour s'assurer du bon fonctionnement de cette dernière. Cela permet de visualiser les erreurs de syntaxe et de fonctionnement d'une ou de plusieurs parties de l'application avant son déploiement.

### Outils utilisés
Pour tester une application Angular, nous disposons des outils Jasmine, Karma et TestBed.
Jasmine est le paquet principal de tests, il contient les fonctions de tests et les assertions.
Karma est le serveur de tests qui permet de lancer les tests et de visualiser les résultats.
TestBed est le module qui permet de créer un environnement de tests Angular.

### Concepts clés
Fixture : données fictives
detectChanges() : lié à Fixture, force Angular à mettre à jour le template
Spy : observation des appels d'une méthode (nombre d'appels réalisés, quels paramètres utilisés, etc)
Mock : données simulées
Test Runner : exécute les tests dans un environnement dédié sur navigateur
Matcher : méthodes de comparaison sur un test
AAA Patterns : ARRANGE, ACT, ASSERT ; c'est une structure de test :
    - ARRANGE : préparation des données
    - ACT : exécution du test
    - ASSERT : vérification des résultats (comparaison entre l'attente du test et son résultat réel)

### Types de tests pratiqués
Les types de tests sont : 
- unitaires
- d'intégration
- end-to-end
- visuels
Dans cette séquence, nous n'avons réalisé que des tests unitaires, qui représentent le type de tests le plus bas, au niveau fonctionnel. Ils permettent de tester les fonctions des composants de manière isolée.

## Performances
### Audit de performance
Avant de modifier le code de l'application, son score Lighthouse était de 82, au niveau des performances et de l'accessibilité. Cette défaillance se situe au niveau du composant tasks-page, soit le composant le plus important de l'application, qui charge et affiche la liste des tâches. C'est l'opération initiale du chargement des sous-composants au lancement de l'application qui prend le plus de temps et ralentit sa performance.

Le diagnostic Lighthouse conseille de réduire la taille des ressources JavaScript utilisées et inutilisées.
Il faudrait également diviser le composant TasksPage en sous-composants, pour diviser sa charge de travail.

### Optimisations
changeDetection: ChangeDetectionStrategy.OnPush a été ajouté sur le composant TasksPage, et tous les tracking de boucles utilise track id, et non track element-liste directement.

### Audit de sécurité
Aucun innerHTML n'est utilisé dans le code.
Idem pour les scripts inline.
L'ajout d'une tâche avec du HTML malveillant ne fonctionne comme attendu (en exécutant le HTML), car tous les noms des tâches passe par {{nom tâche}}.
Lighthouse indique un score de 100 concernant les bonnes pratiques.

## SSR Prerender
Après ajout de SSR au projet, le score Lighthouse au niveau des performes passe à 99. C'est une nette amélioration.
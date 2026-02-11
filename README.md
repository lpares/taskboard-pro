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

## Performances et optimisations
Pour mesurer la performance d'une application Angular, nous pouvons utiliser les outils Lighthouse et Angular DevTools. Ces outils permettent d'analyser les performances, l'accessibilité, les bonnes pratiques et le SEO de l'application.
Lighthouse fonctionne comme extension sur le navigateur Google Chrome et donne une série de scores au développeur lorsqu'il effectue un diagnostic sur son application. Ce diagnostic mesure :
- les performances
- l'accessibilité
- les bonnes pratiques
- le SEO
de l'application. 
Un bon score de performance se situe entre 90 et 100.
Un score moyen est entre 50 et 89, signifiant que des améliorations sont à mettre en place.
Un score médiocre se situe en dessous de 49, l'application n'est pas optimisée correctement.
Lighthouse fournit en plus des scores des conseils pour améliorer le code afin d'obtenir un score plus élevé.
Il est important de souligner qu'un score élevé en local ne signifie pas forcément que l'application aura un bon score en production. En effet, une application Angular en phase de développement possède un code JavaScript parfois non minifié et des chargements via le serveur de développement, faussant donc les scores. En revanche, une application en production possède un code JS minifié et optimisé, du lazy loading et des chargements via un serveur de production, ce qui améliore les scores et est plus représentatif pour les utilisateurs finaux.

Angular DevTools est une extension sur navigateur qui permet de visualiser la structure d'une application Angular ouverte. Cela permet de voir en temps réel quels composants sont utilisés, leur agencement et leur état.

Afin d'optimiser une application Angular, plusieurs bonnes pratiques sont à réaliser :
- L'application doit vérifier si les inputs des composants changent, et non si les composants changent dans leur intégralité à chaque événement. Il est donc recommendé d'utiliser **changeDetection: ChangeDetectionStrategy.OnePush** dans l'application.
- Si une liste sans identité stable est utilisée dans une boucle, il est préférable d'utiliser **track id** plutôt que **track element-list**.
- Regrouper les **| async** pour éviter de créer plusieurs souscriptions.
- Remplacer les créations impérative **ViewContainerRef** par des composants créés par déclarations basées sur un ou des états.

### Audit de performance sur l'application
Avant de modifier le code de l'application, son score Lighthouse était de 82, au niveau des performances et de l'accessibilité. Cette défaillance se situe au niveau du composant tasks-page, soit le composant le plus important de l'application, qui charge et affiche la liste des tâches. C'est l'opération initiale du chargement des sous-composants au lancement de l'application qui prend le plus de temps et ralentit sa performance.

Le diagnostic Lighthouse conseille de réduire la taille des ressources JavaScript utilisées et inutilisées.
Il faudrait également diviser le composant TasksPage en sous-composants, pour diviser sa charge de travail.

### Optimisations sur l'application
changeDetection: ChangeDetectionStrategy.OnPush a été ajouté sur le composant TasksPage, et tous les tracking de boucles utilise track id, et non track element-liste directement.

## Sécurité
Il est important de sécuriser une application frontend, pour éviter de révéler des données utilisateurs, de modifier le comportement d'APIs externes, de manipuler le DOM dynamiquement et d'avoir du code client lisible.

Les principales menaces sur une application frontend sont :
- XSS (Cross-Site Scripting) : injection de code malveillant dans la BDD (stored XSS), dans l'URL (reflected XSS) ou dans le DOM (DOM based XSS).
- CSRF (Cross-Site Request Forgery) : déclenchement d'actions à la place de l'utilisateur, en utilisant ses cookies de navigateur.
- Injection de code

Pour protéger son appli face à ces menaces :
- Utiliser des cookies SameSite côté serveur
- Vérifier l'origin/referer côté serveur
- Ne pas modifier directement les données des API (GET, POST, PUT, DELETE)
- Définir une CSP (Content Security Policy), qui est une règle de sécurité appliquée par le navigateur pour limiter les droits de la page (ce qu'elle a le droit de charger et d'exécuter). Cette configuration se réalise en backend. Le rôle du CSP est de créer une liste blanche pour le navigateur.

### Audit de sécurité
Aucun innerHTML n'est utilisé dans le code.
Idem pour les scripts inline.
L'ajout d'une tâche avec du HTML malveillant ne fonctionne comme attendu (en exécutant le HTML), car tous les noms des tâches passe par {{nom tâche}}.
Lighthouse indique un score de 100 concernant les bonnes pratiques.
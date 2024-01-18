
# Readme pour le Projet d'API de Youtube Music

## Introduction

Ce projet est une application de streaming musical qui permet aux utilisateurs d'accéder à une bibliothèque de musique, de visualiser des playlists et de récupérer des URLs de streaming pour des morceaux individuels. Ce document décrit l'usage des différentes routes fournies par l'API du projet.

## Routes API

L'API offre plusieurs routes pour interagir avec les différentes fonctionnalités de l'application :

### 1. Bibliothèque Musicale

- **GET /library**
  - Cette route permet d'accéder à la bibliothèque musicale de l'utilisateur.
  - Elle renvoie une liste de toutes les chansons disponibles dans la bibliothèque de l'utilisateur.

### 2. Playlist

- **GET /playlist/:playlistId**
  - Cette route permet d'obtenir les détails d'une playlist spécifique.
  - `:playlistId` doit être remplacé par l'identifiant de la playlist que l'utilisateur souhaite consulter.
  - La réponse inclut les détails de la playlist, tels que le titre, la description, et une liste des morceaux qu'elle contient.

### 3. URL de Streaming

- **GET /streamUrl/:id**
  - Cette route est utilisée pour récupérer l'URL de streaming d'un morceau spécifique.
  - `:id` est l'identifiant du morceau pour lequel l'URL de streaming est demandée.
  - La réponse contient l'URL permettant de streamer directement la musique.

### 4. Music
- **GET /music/:musicId**
- Cette route permet d'obtenir les détails d'une musique spécifique.
- `:musicId` doit être remplacé par l'identifiant de la musique que l'utilisateur souhaite consulter.
- La réponse inclut les détails de la musique, tels que le titre, l'artiste, l'album, la durée, et l'URL de streaming.
## Lancement de l'API

Pour lancer le serveur, il faut exécuter la commande suivante :

```bash
npm start
```

## Utilisation

Pour utiliser ces routes, il faut avoir un client HTTP comme Postman ou utiliser des requêtes HTTP dans votre application. Voici un exemple de requête pour obtenir une playlist :

\```http
GET /playlist/{playlistId}
Host: [Votre_Hôte_API]
Authorization: [Token de google]
\```

Remplacez `[Votre_Hôte_API]` par l'adresse de votre serveur et `{playlistId}` par l'ID de la playlist souhaitée.

## Sécurité et Authentification

Notez que ces routes peuvent nécessiter une authentification et des autorisations appropriées pour accéder aux données. Assurez-vous d'inclure les en-têtes d'authentification nécessaires dans vos requêtes.

---

Pour plus d'informations ou d'aide, n'hésitez pas à contacter les développeurs ou à consulter la documentation de l'API.

---

Ce README est destiné à fournir une vue d'ensemble de base de l'utilisation des routes de l'API. Il peut être étendu ou modifié en fonction des développements futurs et des retours des utilisateurs.

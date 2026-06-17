# ChâTop - Portail de Location Saisonnière

Application full-stack TypeScript pour mettre en relation locataires et propriétaires dans une zone touristique.

## 📋 Contexte du projet

Ce repository contient le **front-end React** et le **back-end NestJS** de l'application ChâTop.

L'API REST NestJS est désormais **entièrement implémentée** et remplace l'API mockée (Mockoon) utilisée durant la phase de conception. Mockoon reste disponible en option pour tester le front-end de manière isolée, sans dépendre de la base de données.

## 🚀 Démarrage rapide

### Prérequis

- **Node.js** 22 LTS ou supérieur
- **npm** (inclus avec Node.js)
- **MySQL** 8.0+ (ou MariaDB 10.5+, compatible via l'adapter Prisma)
- **Mockoon** Desktop (optionnel, pour tester le front-end seul)

### Installation

#### 1. Cloner le repository

```bash
git clone <url-du-repo>
cd p3-dfsjs-starter
```

#### 2. Installer et lancer le back-end NestJS

```bash
cd backend
npm install
```

Créer un fichier `.env` à la racine de `backend/` :

```env
DATABASE_URL="mysql://user:password@localhost:3306/chatop_db"  # Prisma.config
JWT_SECRET="votre_secret_jwt"                                  # Génerer avec crypto
PORT=3001
DB_USER=user                                                   # Prisma.service
DB_PASSWORD=password                                           # Prisma.service
DB_NAME=chatop_db                                              # Prisma.service
SERVER_URL="http://localhost"                                  # Storage-service.service
```

Créer la base de données MySQL :

```bash
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS chatop_db;"

```

> Puis créer un user MySQL limité à la base de données chatop_db

```bash
CREATE USER 'user'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON chatop_db.* TO 'user'@'localhost';
FLUSH PRIVILEGES;
```

Générer le client Prisma et appliquer le schéma :

```bash
npx prisma generate
npx prisma migrate deploy
```

Lancer le serveur :

```bash
npm run start:dev
```

L'API sera accessible sur [http://localhost:3001](http://localhost:3001), et la documentation Swagger sur [http://localhost:3001/api/swagger](http://localhost:3001/api/swagger) (selon configuration).

L'application communique avec l'API sur `http://localhost:3001`.

## 📂 Structure du projet

```
p3-dfsjs-starter/
├── frontend/                # Application React 19
│
├── backend/                 # API NestJS
│   ├── src/
│   │   ├── auth/            # Authentification JWT (Passport)
│   │   ├── users/           # Gestion des utilisateurs
│   │   ├── rentals/         # Gestion des locations
│   │   ├── messages/        # Gestion des messages
│   │   ├── storage-service/ # Gestion des écritures de fichier
│   │   ├── common/          # Gestion des exceptions http et des messages de succès
│   │   ├── utils/           # Fonction utiles
│   │   └── main.ts
│   ├── prisma/
│   │   └── schema.prisma
│   ├── .env
│   └── package.json
│
└── README.md
```

## 🎯 Fonctionnalités implémentées

### Authentification

- `POST /api/auth/register` - Créer un compte
- `POST /api/auth/login` - Se connecter (retour JWT)
- `GET /api/auth/me` - Obtenir l'utilisateur connecté
- Mots de passe chiffrés avec bcrypt
- Toutes les routes sont sécurisées par JWT (sauf register, login, swagger)

### API métier

- `GET /api/rentals` - Liste des locations
- `GET /api/rentals/:id` - Détail d'une location
- `POST /api/rentals` - Créer une location (avec upload image)
- `PUT /api/rentals/:id` - Modifier une location (avec ou sans upload image)
- `GET /api/user/:id` - Obtenir un utilisateur
- `POST /api/messages` - Envoyer un message

### Architecture

- Architecture modulaire NestJS (Module / Controller / Service / Repository)
- Accès aux données via Prisma (pas de SQL brut) comme ORM
- Validation des DTOs avec class-validator
- Utilisation d'un Json Web Token avec Passport
- Documentation API via Swagger
- Upload d'images via `@UseInterceptors(FileInterceptor())`, servies en fichiers statiques

## 🛠️ Stack technique

### Back-end

- **NestJS 11** - Framework back-end
- **TypeScript 5.7+** (Strict Mode)
- **Prisma 7** - ORM, avec l'adapter MariaDB pour la connexion à MySQL/MariaDB
- **Passport + JWT** (`passport-jwt`, `passport-local`) - Authentification
- **bcrypt** - Chiffrement des mots de passe
- **class-validator / class-transformer** - Validation des DTOs
- **@nestjs/swagger** - Documentation OpenAPI
- **@nestjs/config** - Gestion des variables d'environnement
- **@nestjs/serve-static** - Service des fichiers uploadés

## 📚 Ressources

### Documentation officielle

- [NestJS Documentation](https://docs.nestjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Passport JWT Strategy](https://docs.nestjs.com/security/authentication#jwt-functionality)
- [Swagger/OpenAPI](https://docs.nestjs.com/openapi/introduction)

### Outils

- [Mockoon](https://mockoon.com/) - Mock API server (optionnel)
- [MySQL Workbench](https://www.mysql.com/products/workbench/) - Database GUI
- [Prisma Studio](https://www.prisma.io/studio) - Database browser
- [Postman](https://www.postman.com/) - API testing

## 🔒 Points de sécurité

- ✅ JWT obligatoire pour toutes les routes (sauf register, login, swagger)
- ✅ Mots de passe chiffrés avec bcrypt (jamais en clair)
- ✅ Variables d'environnement pour les credentials BDD (`.env`, non versionné)
- ✅ Validation des entrées utilisateur (DTOs + class-validator)
- ✅ Gestion des erreurs avec Exception Filters

## 📝 Commandes utiles Back-end

```bash
cd backend
npm install              # Installer les dépendances
npm run start:dev        # Lancer en développement (watch)
npm run start:prod       # Lancer en production (après build)
npm run build             # Build production
npm run lint              # Vérifier le code
npm run format             # Formatter avec Prettier
npm run test               # Tests unitaires
npm run test:e2e           # Tests end-to-end
npm run test:cov           # Couverture de tests

npx prisma generate        # Générer le client Prisma
npx prisma migrate dev     # Créer/appliquer une migration (dev)
npx prisma studio          # Explorer la base de données
```

## ⚠️ Important

- Le front-end communique avec l'API sur `http://localhost:3001`
- Tous les appels API passent par `/api/*`

---

**Version** : 2.0.0
**Date** : Juin 2026

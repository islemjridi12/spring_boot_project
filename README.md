
# 🏭 Projet : Gestion des Ordres de Fabrication

Ce projet est une application web complète permettant de gérer le processus de fabrication industrielle. Il intègre la création et le suivi des ordres de fabrication, la gestion des produits, des machines, des employés, et le suivi des maintenances.

---

## 📋 Description du projet

Ce système permet à une entreprise de :

- Créer et gérer des **ordres de fabrication**
- Suivre les **produits** et leur stock
- Affecter les **machines** et les **employés** à des tâches
- Vérifier la **disponibilité des machines** et leur **historique de maintenance**
- Garantir la disponibilité des **matières premières** avant lancement de production

---

## 📦 Entités principales

### 🔹 OrdreFabrication
- `id`
- `projet`
- `produit`
- `quantité`
- `date`
- `état` (EN_ATTENTE, EN_PRODUCTION, DECLARE)

### 🔹 Produit
- `id`
- `nom`
- `type`
- `stock`
- `fournisseur`

### 🔹 Machine
- `id`
- `nom`
- `état` (EN_MARCHE, EN_PANNE, EN_MAINTENANCE)
- `derniere_maintenance`

### 🔹 Employé
- `id`
- `nom`
- `poste`
- `machine_assignee`

---

## ✅ Fonctionnalités

- 🔁 **CRUD complet** sur toutes les entités
- ⚙️ Création, lancement, et déclaration des **ordres de fabrication**
- 🔐 Vérification de la disponibilité du **stock** avant lancement
- 🛠️ Affectation des machines et des employés
- 🔍 Suivi des maintenances des machines
- 📦 Mise à jour automatique du stock produit et matières premières

---

## 🛠️ Technologies utilisées

### Backend
- Java 17
- Spring Boot
- Spring Data JPA + Hibernate
- REST API
- PostgreSQL
- Docker

### Frontend
- Angular 17+
- Bootstrap 5
- TypeScript
- Docker

### Infra
- Dockerfile (Backend + Frontend)
- Docker Compose
- PostgreSQL avec persistance

---

## 🚀 Instructions d’installation et d’exécution

### 📦 Prérequis

- Docker
- Docker Compose
- Git



### ▶️ Lancer l'application avec Docker

1. **Cloner le projet**

\`\`\`bash
git clone https://github.com/ton-username/projet-gof.git
cd projet-gof
\`\`\`

2. **Lancer tous les services**

\`\`\`bash
docker-compose up --build
\`\`\`

3. **Accéder aux interfaces**

- 🌐 Frontend Angular : http://localhost:4200  
- 🔗 API Spring Boot : http://localhost:8080/api

---


## 👨‍💻 Auteurs

- **Nom** : [islem jridi]
- **Projet universitaire** : Sujet 10 – Système de gestion des ordres de fabrication
- **Année** : 2025

---

## ✅ Bonus (évolutions possibles)

- Authentification + rôles (Admin, Technicien)
- Dashboard de production
- Notifications toast (erreurs/succès)
- Tests automatisés
- CI/CD GitHub Actions

# Projet de Gestion d'Assiduité

Ce projet est conçu pour automatiser la gestion de l'assiduité à l'aide de plusieurs outils et techniques, y compris un bot automatisé, un processus ETL pour manipuler les fichiers CSV, et un tableau de bord interactif pour visualiser les données.

## Table des Matières

- [Introduction](#introduction)
- [Étapes du Projet](#étapes-du-projet)
  - [1. Bot Automatisé](#1-bot-automatisé)
  - [2. Processus ETL pour les Fichiers CSV](#2-processus-etl-pour-les-fichiers-csv)
  - [3. Dashboarding (Backend et Frontend)](#3-dashboarding-backend-et-frontend)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Exécution](#exécution)
- [Conclusion](#conclusion)

## Introduction

Ce projet de gestion d'assiduité a pour objectif de simplifier et d'automatiser le suivi de la présence des étudiants en utilisant un bot automatisé pour télécharger les rapports d'assiduité, un processus ETL pour transformer les données, et un tableau de bord interactif pour leur visualisation.

## Étapes du Projet

### 1. Bot Automatisé

Le bot est conçu pour interagir automatiquement avec l'interface web d'Outlook afin de télécharger des rapports d'assiduité au format CSV. Les principales étapes comprennent :

- **Connexion à Outlook** : Utilisation de Selenium pour se connecter à un compte Outlook.
- **Recherche d'Emails** : Attente de nouveaux emails contenant les rapports d'assiduité.
- **Téléchargement des Liens Dynamiques** : Identification et téléchargement des fichiers CSV depuis les liens présents dans les emails.

### 2. Processus ETL pour les Fichiers CSV

Le processus ETL (Extract, Transform, Load) est utilisé pour manipuler les données contenues dans les fichiers CSV. Il comprend :

- **Extraction** : Extraction des données pertinentes des fichiers CSV.
- **Transformation** : Filtrage et agrégation des données pour comptabiliser le nombre d'absences et de retards par étudiant et par cours.
- **Chargement** : Enregistrement des données transformées dans un fichier CSV final, prêt à être utilisé par le tableau de bord.

### 3. Dashboarding (Backend et Frontend)

Le tableau de bord interactif permet de visualiser les données d'assiduité de manière claire et intuitive. Il est composé de deux parties principales :

- **Backend** : Serveur backend développé avec Express.js, exposant une API pour récupérer les données d'assiduité à partir des fichiers CSV traités.
- **Frontend** : Interface utilisateur développée avec React, affichant les données sous forme de tableaux, graphiques, et autres visualisations interactives.

## Téchnologie utilisée

- **Python** : Pour exécuter les scripts du bot et de manipulation des fichiers CSV.
- **Node.js** : Pour exécuter le backend Express.js.
- **React** : Pour le développement du frontend.
- **Selenium** : Pour l'automatisation du navigateur.


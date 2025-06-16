# Système de Gestion Logistique

## Vision Produit
Un système de gestion logistique moderne et intuitif pour optimiser les opérations de transport routier, la gestion des palettes, des clients et de la facturation.

## Style Visuel
- **Design** : Scandinave moderne avec influence Notion/Linear
- **Typographie** : Inter (clean, professional)
- **Couleurs** : Palette bleue logistique avec accents verts pour les statuts positifs
- **Animations** : Transitions fluides et microinteractions délicates

## Fonctionnalités Principales

### 1. Dashboard Analytique
- Métriques temps réel : véhicules actifs, livraisons, revenus
- Graphiques de performance
- Alertes et notifications importantes
- Vue d'ensemble des opérations journalières

### 2. Gestion des Conducteurs
- Planning hebdomadaire/mensuel interactif
- Profils conducteurs avec informations de contact
- Suivi des heures de conduite et repos
- Affectation des missions et itinéraires

### 3. Gestion des Palettes
- Inventaire en temps réel
- Tracking des mouvements (entrées/sorties)
- États des palettes (disponible, en transit, chez client)
- Historique des mouvements

### 4. Gestion Clients
- Base de données clients complète
- Historique des commandes et livraisons
- Informations de facturation
- Communication et notes

### 5. Facturation
- Génération automatique des factures
- Suivi des paiements
- Rapports financiers
- Intégration avec la gestion clients

## Architecture Technique
- **Frontend** : React + TypeScript + Tailwind CSS
- **UI Components** : ShadCN/UI pour une cohérence visuelle
- **État Local** : React Context + useState pour le prototype
- **Routage** : React Router pour la navigation
- **Icônes** : Lucide React pour cohérence

## Écrans Principaux
1. `/` - Dashboard principal
2. `/drivers` - Gestion conducteurs
3. `/pallets` - Gestion palettes
4. `/clients` - Gestion clients
5. `/invoicing` - Facturation

## User Journey
1. Connexion au dashboard pour vue d'ensemble
2. Planification des conducteurs selon les besoins
3. Vérification de l'inventaire palettes
4. Suivi des livraisons clients
5. Génération et envoi des factures
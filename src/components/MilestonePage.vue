<template>
    <v-container class="milestones-container">
      <!-- Tableau des milestones des patineurs -->
      <v-card class="milestones-card">
        <v-card-title class="milestones-title">Paliers - Patineurs</v-card-title>
        <v-data-table
          v-if="skatersMilestones && skatersMilestones.length"
          :headers="skatersHeaders"
          :items="skatersMilestones"
          class="milestones-table elevation-1"
          hide-default-footer
        >
          <template v-slot:[`item.firstName`]="{ item }">
            {{ item.firstName }}
          </template>
          <template v-slot:[`item.lastName`]="{ item }">
            {{ item.lastName }}
          </template>
          <template v-slot:[`item.milestone`]="{ item }">
            <span class="milestone-text">{{ item.milestone }}</span>
          </template>
          <template v-slot:[`item.milestoneAmount`]="{ item }">
            <span class="milestone-amount">{{ item.milestoneAmount }}</span>
          </template>
          <template v-slot:[`item.remainingAmount`]="{ item }">
            <span class="remaining-amount">{{ item.remainingAmount }}</span>
          </template>
          <template v-slot:[`item.gamesPlayed`]="{ item }">
            <span class="games-played">{{ item.gamesPlayed }}</span>
          </template>
        </v-data-table>
      </v-card>
  
      <!-- Tableau des milestones des gardiens -->
      <v-card class="milestones-card mt-4">
        <v-card-title class="milestones-title">Paliers - Gardiens</v-card-title>
        <v-data-table
          v-if="goaliesMilestones && goaliesMilestones.length"
          :headers="goaliesHeaders"
          :items="goaliesMilestones"
          class="milestones-table elevation-1"
          hide-default-footer
        >
          <template v-slot:[`item.firstName`]="{ item }">
            {{ item.firstName }}
          </template>
          <template v-slot:[`item.lastName`]="{ item }">
            {{ item.lastName }}
          </template>
          <template v-slot:[`item.milestone`]="{ item }">
            <span class="milestone-text">{{ item.milestone }}</span>
          </template>
          <template v-slot:[`item.milestoneAmount`]="{ item }">
            <span class="milestone-amount">{{ item.milestoneAmount }}</span>
          </template>
          <template v-slot:[`item.remainingAmount`]="{ item }">
            <span class="remaining-amount">{{ item.remainingAmount }}</span>
          </template>
          <template v-slot:[`item.wins`]="{ item }">
            <span class="wins">{{ item.wins }}</span>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        skatersMilestones: [],
        goaliesMilestones: [],
        skatersHeaders: [
          { title: 'Prénom', key: 'firstName' },
          { title: 'Nom', key: 'lastName' },
          { title: 'Type de palier', key: 'milestone' },
          { title: 'Palier', key: 'milestoneAmount' },
          { title: 'Montant restant', key: 'remainingAmount' },  // Nouvelle colonne
          { title: 'Matchs joués', key: 'gamesPlayed' },
          { title: 'Buts', key: 'goals' },
          { title: 'Assists', key: 'assists' },
          { title: 'Points', key: 'points' },
          { title: 'Équipe', key: 'teamFullName' },
        ],
        goaliesHeaders: [
          { title: 'Prénom', key: 'firstName' },
          { title: 'Nom', key: 'lastName' },
          { title: 'Type de palier', key: 'milestone' },
          { title: 'Palier', key: 'milestoneAmount' },
          { title: 'Montant restant', key: 'remainingAmount' },  // Nouvelle colonne
          { title: 'Matchs gagnés', key: 'wins' },
          { title: 'Blanchissages', key: 'so' },
          { title: 'Minutes jouées', key: 'toiMinutes' },
          { title: 'Équipe', key: 'teamFullName' },
        ],
      };
    },
    methods: {
        async fetchSkatersMilestones() {
      try {
        const response = await axios.get('http://localhost:5000/api/milestones/skaters');
        this.skatersMilestones = response.data.data.map(item => ({
          ...item,
          remainingAmount: this.calculateRemaining(item) // Ajoute le montant restant à chaque item
        }));
      } catch (error) {
        console.error('Erreur lors de la récupération des milestones des patineurs :', error);
      }
    },
    async fetchGoaliesMilestones() {
      try {
        const response = await axios.get('http://localhost:5000/api/milestones/goalies');
        this.goaliesMilestones = response.data.data.map(item => ({
          ...item,
          remainingAmount: this.calculateRemaining(item) // Ajoute le montant restant à chaque item
        }));
      } catch (error) {
        console.error('Erreur lors de la récupération des milestones des gardiens :', error);
      }
    },
      calculateRemaining(item) {
        if (item.milestone === 'Goals') {
          return item.milestoneAmount - item.goals; // Montant restant avant d'atteindre le palier pour les buts
        } else if (item.milestone === 'Wins') {
          return item.milestoneAmount - item.wins; // Montant restant pour les victoires
        } else if (item.milestone === 'Shutouts') {
          return item.milestoneAmount - item.so; // Montant restant pour les victoires
        } else if (item.milestone === 'Games Played') {
          return item.milestoneAmount - item.gamesPlayed; // Montant restant pour les victoires
        } else if (item.milestone === 'Assists') {
          return item.milestoneAmount - item.assists; // Montant restant pour les victoires
        } else if (item.milestone === 'Points') {
          return item.milestoneAmount - item.points; // Montant restant pour les victoires
        } else if (item.milestone === 'Minutes Played') {
          return item.milestoneAmount - item.toiMinutes; // Montant restant pour les victoires
        }
        // Ajouter plus de types de milestone si nécessaire
        return item.milestoneAmount;
      },
    },
    created() {
      this.fetchSkatersMilestones();
      this.fetchGoaliesMilestones();
    },
  };
  </script>
  
<style scoped>
/* Conteneur principal pour les milestones */
.milestones-container {
  padding: 20px;
  min-height: 100vh;
}

/* Carte pour les milestones */
.milestones-card {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

/* Titre de la carte */
.milestones-title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  padding: 16px;
  border-bottom: 1px solid #e0e0e0;
}

/* Styles pour le tableau des milestones */
.milestones-table {
  margin-top: 10px;
}

/* Style des en-têtes de tableau */
.v-data-table__wrapper th {
  font-size: 14px;
  font-weight: bold;
  color: #555;
  background-color: #f7f7f7;
}

/* Style des cellules de tableau */
.v-data-table__wrapper td {
  font-size: 14px;
  color: #666;
  padding: 12px 16px;
  border-bottom: 1px solid #e0e0e0;
}

/* Styles spécifiques pour les colonnes de milestone */
.milestone-text {
  color: #007bff;
  font-weight: 600;
}

.milestone-amount {
  color: #28a745;
}

.remaining-amount {
  color: #dc3545;
}

.games-played {
  color: #6c757d;
}

.wins {
  color: #17a2b8;
}

/* Effet de survol pour les lignes de tableau */
.v-data-table__wrapper tbody tr:hover {
  background-color: rgba(0, 123, 255, 0.1);
  transition: background-color 0.3s ease;
}

/* Style pour les messages d'absence de données */
.no-data {
  text-align: center;
  color: #999;
  margin-top: 20px;
}
</style>
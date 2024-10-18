<template>
  <v-container class="stats-page">
    <!-- Bande bleue avec le titre et le sélecteur de saison -->
    <v-card class="team-stats-card mt-4">
      <v-row class="card-title align-center">
        <span>Stats par Équipe</span>
        <v-spacer></v-spacer>
        <!-- Sélecteur de saison pour les stats d'équipe -->
        <v-select
          v-model="selectedTeamSeason"
          :items="teamSeasons"
          label="Select Season for Team Stats"
          @update:model-value="onTeamSeasonChange"
          class="season-select"
          hide-details
        ></v-select>
      </v-row>

      <!-- Tableau pour les stats par équipe -->
      <v-data-table
        v-if="teamStats && teamStats.length"
        :headers="teamStatsHeaders"
        :items="teamStats"
        class="team-stats-table elevation-1"
        hide-default-footer
      >
        <template v-slot:[`item.teamName`]="{ item }">
          {{ item.teamName }}
        </template>
        <template v-slot:[`item.goals`]="{ item }">
          {{ item.goals || 0 }}
        </template>
        <template v-slot:[`item.assists`]="{ item }">
          {{ item.assists || 0 }}
        </template>
        <template v-slot:[`item.points`]="{ item }">
          {{ item.points || 0 }}
        </template>
      </v-data-table>
      <div v-else class="no-data">
        <p>Aucune donnée de statistiques d'équipe disponible.</p>
      </div>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      teamStats: [],
      selectedTeamSeason: '2024/2025', // Saison sélectionnée par défaut
      teamSeasons: ['2024/2025', '2023/2024', '2022/2023', '2021/2022', '2020/2021'], // Liste des saisons
      teamStatsHeaders: [
        { title: 'Équipe', key: 'teamName' },
        { title: 'Points', key: 'points' },
        { title: 'Victoire', key: 'wins' },
        { title: 'Défaite', key: 'losses' },
        { title: 'Buts pour', key: 'goalsFor' },
        { title: 'Buts contre', key: 'goalsAgainst' },
        { title: 'Buts pour par match', key: 'goalsForPG' },
        { title: 'Buts contre par match', key: 'goalsAgainstPG' },
      ],
      loading: true,
    };
  },
  methods: {
    async fetchTeamStats(season) {
      try {
        let baseURL = null;
            if (process.env.NODE_ENV === "development") {
                baseURL = process.env.VUE_APP_API_URL_LOCAL;
            } else {
                baseURL = process.env.VUE_APP_API_URL_PROD;
            }
        const seasonStr = season.replace('/', ''); // Remplacer le '/' dans la saison pour correspondre au format attendu par l'API
        const response = await axios.get(`${baseURL}/api/team-stats/${seasonStr}`);
        this.teamStats = response.data;
        console.log(this.teamStats)
      } catch (error) {
        console.error('Error fetching team stats:', error);
      }
    },
    onTeamSeasonChange() {
      this.fetchTeamStats(this.selectedTeamSeason);
    },
  },
  created() {
    this.fetchTeamStats(this.selectedTeamSeason); // Charger les stats d'équipe dès la création du composant
  },
};
</script>

<style scoped>
/* Container styling */
/* Container styling */
.stats-page {
  padding: 24px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Season Select Styling */
.season-select {
  max-width: 200px;
}

.v-select {
  background: #ffffff;
  color:#333;
  border-radius: 8px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
}

.v-select .v-input__control {
  padding: 12px;
}

/* Card Styling */
.team-stats-card {
  width: 100%;
  max-width: 1200px;
  border-radius: 12px;
  background-color: #ffffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

.card-title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  padding: 16px;
  background-color: #1976d2;
  color: #ffffff;
  display: flex;
  align-items: center;
}

/* Table Styling */
.team-stats-table {
  border-radius: 0;
}

.v-data-table {
  background-color: #ffffff;
  border-radius: 8px;
}

.v-data-table th {
  background-color: #1976d2;
  color: #ffffff;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 14px;
}

.v-data-table td {
  padding: 16px;
  color: #333;
  font-size: 16px;
}

.v-data-table .v-data-table__wrapper {
  max-height: 600px; /* Adjust table height for overflow */
  overflow-y: auto;
}

.elevation-1 {
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
}

.no-data {
  padding: 24px;
  text-align: center;
  font-size: 18px;
  color: #555;
}

/* Media Queries for Responsiveness */
@media (max-width: 768px) {
  .team-stats-card {
    max-width: 100%;
  }

  .v-data-table td {
    padding: 12px;
  }
}
</style>

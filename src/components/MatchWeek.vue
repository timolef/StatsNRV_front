<template>
  <v-container class="matches-container">
    <v-card class="matches-card">
      <v-card-title class="matches-title">Matchs de la semaine</v-card-title>
      
      <v-data-table
        :headers="headers"
        :items="flattenedMatches"
        class="matches-table elevation-1"
      >
        <!-- Colonne Date -->
        <template v-slot:[`item.gameDate`]="{ item }">
          <div class="match-date">
            {{ formatDate(item.gameDate) }}
          </div>
        </template>

        <!-- Colonne Équipe à domicile avec logo -->
        <template v-slot:[`item.homeTeamName`]="{ item }">
          <div class="team-info">
            <img :src="item.homeTeamLogo" alt="Home Team Logo" class="team-logo" />
            <span class="team-name">{{ item.homeTeamName }}</span>
          </div>
        </template>

        <!-- Colonne Équipe visiteuse avec logo -->
        <template v-slot:[`item.awayTeamName`]="{ item }">
          <div class="team-info">
            <img :src="item.awayTeamLogo" alt="Away Team Logo" class="team-logo" />
            <span class="team-name">{{ item.awayTeamName }}</span>
          </div>
        </template>

        <!-- Colonne Heure du match -->
        <template v-slot:[`item.gameTime`]="{ item }">
          <div class="match-time">
            {{ formatTime(item.gameTime) }}
          </div>
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
        headers: [
          { title: "Date", key: "gameDate" }, // Correspond à gameDate dans flattenedMatches
          { title: "Domicile", key: "homeTeamName" }, // Correspond à homeTeamName dans flattenedMatches
          { title: "Exterieur", key: "awayTeamName" }, // Correspond à awayTeamName dans flattenedMatches
          { title: "Heure", key: "gameTime" }, // Correspond à gameTime dans flattenedMatches
        ],
        matches: [], // Matches data grouped by date
        flattenedMatches: [], // Flattened list for the table
      };
    },
    methods: {
      async fetchMatches() {
        try {
          let baseURL = null;
            if (process.env.VUE_APP_NODE_ENV === "development") {
                baseURL = process.env.VUE_APP_API_URL_LOCAL;
            } else {
                baseURL = process.env.VUE_APP_API_URL_PROD;
            }
          const response = await axios.get(`${baseURL}/matches-week`);
  
          // Flatten the matches across all dates and include logos
          this.matches = response.data; // Store raw matches data
          this.flattenedMatches = response.data.flatMap(date =>
            date.games.map(game => ({
              gameDate: date.date, // Date of the match day
              homeTeamName: game.homeTeam.abbrev, // Home team abbreviation
              homeTeamLogo: game.homeTeam.logo, // Home team logo
              awayTeamName: game.awayTeam.abbrev, // Away team abbreviation
              awayTeamLogo: game.awayTeam.logo, // Away team logo
              gameTime: game.startTimeUTC, // Game time in UTC
            }))
          );
        } catch (error) {
          console.error('Error fetching matches:', error);
        }
      },
      formatDate(date) {
        return new Date(date).toLocaleDateString(); // Format date as needed
      },
      formatTime(time) {
        return new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Format time as HH:mm
      },
    },
    mounted() {
      this.fetchMatches(); // Fetch the matches data when component is mounted
    },
  };
  </script>
  
  <style scoped>
  /* Conteneur principal */
  .matches-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 20px;
    background-color: #f5f5f5;
  }
  
  /* Carte contenant les matchs */
  .matches-card {
    width: 100%;
    max-width: 800px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    padding: 20px;
  }
  
  /* Titre des matchs de la semaine */
  .matches-title {
    font-size: 24px;
    font-weight: 600;
    color: #333;
    text-align: center;
    padding-bottom: 20px;
  }
  
  /* Tableau des matchs */
  .matches-table {
    width: 100%;
  }
  
  /* Alignement et espacement pour la colonne des logos et noms des équipes */
  .team-info {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  /* Style pour les logos des équipes */
  .team-logo {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  }
  
  /* Style pour les noms des équipes */
  .team-name {
    font-size: 16px;
    font-weight: 500;
    color: #555;
  }
  
  /* Style pour la date du match */
  .match-date {
    font-size: 14px;
    color: #666;
    text-align: center;
  }
  
  /* Style pour l'heure du match */
  .match-time {
    font-size: 14px;
    color: #666;
    text-align: center;
  }
  
  /* Ajout d'un effet de survol pour chaque ligne de match */
  .v-data-table__wrapper tbody tr:hover {
    background-color: rgba(0, 123, 255, 0.1);
    transform: scale(1.02);
    transition: background-color 0.3s, transform 0.2s ease-in-out;
  }
  
  /* Marges supplémentaires pour une présentation plus espacée */
  .v-card {
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
  }
  
  </style>
  
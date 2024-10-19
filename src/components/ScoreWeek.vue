<template>
    <v-container class="matches-container">
      <v-card class="matches-card">
        <v-card-title class="matches-title">Résultats du jour</v-card-title>
        
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
        
          <template v-slot:[`item.score`]="{ item }">
            <div class="match-score">
                {{ item.homeTeamScore }} : {{ item.awayTeamScore }}
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
          { title: "Date", key: "gameDate" },
          { title: "Domicile", key: "homeTeamName" },
          { title: "Score", key: "score" },

          { title: "Exterieur", key: "awayTeamName" },
          { title: "Heure", key: "gameTime" },
        ],
        matches: [], // Matches data
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
  
          const response = await axios.get(`${baseURL}/score-matches`);
          this.matches = response.data;
          console.log(this.matches)
          this.flattenedMatches = response.data.map(game => ({
            gameDate: game.gameDate,
            homeTeamName: game.teams.homeTeam.name,
            homeTeamLogo: game.teams.homeTeam.logo,
            homeTeamScore : game.teams.homeTeam.score,
            awayTeamName: game.teams.awayTeam.name,
            awayTeamLogo: game.teams.awayTeam.logo,
            awayTeamScore : game.teams.awayTeam.score,
            gameTime: game.gameTime,
          }));
        } catch (error) {
          console.error('Error fetching matches:', error);
        }
      },
      formatDate(date) {
        return new Date(date).toLocaleDateString();
      },
      formatTime(time) {
        return new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      },
    },
    mounted() {
      this.fetchMatches(); // Fetch live matches on component mount
    },
  };
  </script>
  
  <style scoped>
  .matches-container {
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f8f9fa; /* Light background for contrast */
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.matches-card {
  border-radius: 10px;
  background-color: white;
}

.matches-title {
  font-size: 1.8rem;
  font-weight: bold;
  text-align: center;
  color: #333;
  padding: 10px 0;
  background-color: #007BFF;
  color: white;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.matches-table {
  margin-top: 20px;
}

.team-info {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px 0;
}

.team-logo {
  width: 40px;
  height: 40px;
  object-fit: contain;
  border-radius: 50%; /* Make the logos circular */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.team-name {
  font-weight: bold;
  color: #333;
}

.match-date,
.match-time {
  text-align: center;
  font-size: 0.9rem;
  font-weight: 500;
  color: #666;
}

.match-score {
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
  color: #007BFF;
}

.v-data-table {
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.v-data-table-header th {
  background-color: #007BFF;
  color: white;
  text-transform: uppercase;
  font-size: 0.9rem;
  text-align: center;
}

.v-data-table__wrapper {
  background-color: #fff;
}

.v-data-table tbody tr {
  transition: background-color 0.3s;
}

.v-data-table tbody tr:hover {
  background-color: #f1f1f1;
}

@media (max-width: 768px) {
  .matches-container {
    padding: 10px;
  }

  .team-info {
    flex-direction: column;
    text-align: center;
  }

  .team-logo {
    margin-bottom: 5px;
  }

  .matches-title {
    font-size: 1.5rem;
  }

  .match-score {
    font-size: 1rem;
  }
}
  </style>
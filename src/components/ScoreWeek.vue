<template>
  <v-container class="matches-container">
    <v-card class="matches-card">
      <v-card-title class="matches-title">Résultats du jour</v-card-title>

      <!-- Ajout du v-date-picker -->
      <v-date-picker
        v-model="selectedDate"
        @update:model-value="fetchMatches"
        @change="fetchMatches"
      ></v-date-picker>

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

        <!-- Colonne Score -->
        <template v-slot:[`item.score`]="{ item }">
          <div class="match-score">
            <span v-if="item.homeTeamScore >= 0">{{ item.homeTeamScore }} : {{ item.awayTeamScore }}</span>
            <span v-else>Pas encore commencé</span>

            <!-- Show "Live" icon and text if the game is live -->
            <div v-if="item.gameState === 'LIVE' || item.gameState === 'CRIT'" class="live-status">
              <img src="https://img.icons8.com/color/512/youtube-live.png" alt="Live Icon" class="live-icon" />
              <span>Match en cours <span v-if="item.gameState === 'CRIT'">(Bientot fini)</span></span>
            </div>
            <div v-else-if="item.gameState === 'OFF' || item.gameState === 'FINAL'" class="finished-status">
              <span class="finished-icon"></span> Match terminé
            </div>
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
            {{ item.gameTime }}
          </div>
        </template>
        
        <!-- Colonne Détails du match -->
        <template v-slot:[`item.details`]="{ item }">
          <v-btn icon @click="goToMatchDetails(item.gameId)">
            <v-icon>mdi-eye</v-icon>
          </v-btn>
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
        { title: "Détails", key: "details" } // Nouvelle colonne Détails
      ],
      matches: [], // Matches data
      flattenedMatches: [], // Flattened list for the table
      selectedDate: new Date(), // Date sélectionnée (au format ISO, chaîne de caractères)
      maxDate: new Date().toISOString().substr(0, 10), // Date maximale autorisée (aujourd'hui)
    };
  },
  methods: {
    async fetchMatches() {
      try {
        console.log("date : ", this.selectedDate.getFullYear())
        const year = this.selectedDate.getFullYear()
        const month = String(this.selectedDate.getMonth() + 1).padStart(2, '0')
        const day = String(this.selectedDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        let baseURL = null;
        if (process.env.VUE_APP_NODE_ENV === "development") {
          baseURL = process.env.VUE_APP_API_URL_LOCAL;
        } else {
          baseURL = process.env.VUE_APP_API_URL_PROD;
        }

        const response = await axios.get(`${baseURL}/score-matches`, { params: { date: formattedDate } });
        this.matches = response.data;
        console.log(this.matches)
        this.flattenedMatches = response.data.map(game => ({
          gameDate: game.gameDate,
          gameId: game.gameId,
          homeTeamName: game.teams.homeTeam.name,
          homeTeamLogo: game.teams.homeTeam.logo,
          homeTeamScore: game.teams.homeTeam.score,
          awayTeamName: game.teams.awayTeam.name,
          awayTeamLogo: game.teams.awayTeam.logo,
          awayTeamScore: game.teams.awayTeam.score,
          gameTime: game.gameTime,
          gameState: game.gameState,
        }));
      } catch (error) {
        console.error('Error fetching matches:', error);
      }
    },
    goToMatchDetails(matchId) {
      this.$router.push({ name: 'MatchDetails', params: { id: matchId } });
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
  },
  mounted() {
    this.fetchMatches(); // Fetch matches on component mount
  },
};
</script>


  
  <style scoped>
  /* Global styling improvements */
/* Global styling improvements */
.matches-container {
  max-width: 1200px;
  margin: 20px auto;
  padding: 30px;
  background-color: #f1f3f5;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  font-family: 'Arial', sans-serif;
}

.matches-card {
  border-radius: 12px;
  background-color: white;
  overflow: hidden;
}

.matches-title {
  font-size: 28px;
  font-weight: bold;
  color: #ffffff;
  background-color: #00346c;
  text-align: center;
  padding: 15px 0;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}

.matches-table {
  margin-top: 30px;
}

.team-info {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 10px 0;
}

.team-logo {
  width: 50px;
  height: 50px;
  object-fit: contain;
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.team-name {
  font-weight: 600;
  color: #343a40;
}

.match-date,
.match-time {
  text-align: center;
  font-size: 1rem;
  font-weight: 500;
  color: #6c757d;
}

.match-score {
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  color: #007BFF;
}

.v-data-table {
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.v-data-table-header th {
  background-color: #007BFF;
  color: white;
  text-transform: uppercase;
  font-size: 0.95rem;
  text-align: center;
}

.v-data-table__wrapper {
  background-color: #fff;
}

.v-data-table tbody tr {
  transition: background-color 0.3s;
}

.v-data-table tbody tr:hover {
  background-color: #e9ecef;
}

/* LIVE match styling */
.live-status {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 1.2rem;
  color: #ff4444; /* Attention-grabbing red for live status */
  animation: blink 1s infinite; /* Blinking effect for live matches */
}

.live-icon {
  width: 20px;
  height: 20px;
  margin-right: 8px;
  animation: pulse 1.5s infinite; /* Pulsing effect for the live icon */
}

@keyframes blink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

/* Finished match styling for gameState = 'OFF' */
.finished-status {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 1.1rem;
  color: #28a745; /* Green color to indicate match finished */
  margin-top: 10px;
}

.finished-icon {
  width: 20px;
  height: 20px;
  margin-right: 8px;
  background-color: #28a745; /* Icon matches the text color */
  border-radius: 50%;
}

@media (max-width: 768px) {
  .matches-container {
    padding: 15px;
  }

  .team-info {
    flex-direction: column;
    text-align: center;
  }

  .team-logo {
    margin-bottom: 10px;
  }

  .matches-title {
    font-size: 1.7rem;
  }

  .match-score {
    font-size: 1.2rem;
  }
}


</style>

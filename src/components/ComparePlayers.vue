<template>
  <v-container>
    <v-card class="comparison-card">
      <v-card-title class="comparison-title">Comparaison de joueur</v-card-title>

      <!-- Input fields to search for players -->
      <v-row class="search-fields">
        <v-col cols="12" md="6">
          <v-text-field
            v-model="playerName1"
            label="Search Player 1"
            class="search-input"
            @update:model-value="searchPlayers(1)"
            @blur="fetchPlayerStats(1)"
          />
          <v-autocomplete
            v-model="selectedPlayer1"
            :items="players1"
            label="Select Player 1"
            item-title="name"
            item-value="playerId"
            @update:model-value="fetchPlayerStats(1)"
            class="autocomplete-input"
          />
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            v-model="playerName2"
            label="Search Player 2"
            class="search-input"
            @update:model-value="searchPlayers(2)"
            @blur="fetchPlayerStats(2)"
          />
          <v-autocomplete
            v-model="selectedPlayer2"
            :items="players2"
            label="Select Player 2"
            item-title="name"
            item-value="playerId"
            @update:model-value="fetchPlayerStats(2)"
            class="autocomplete-input"
          />
        </v-col>
      </v-row>

      <!-- Display comparison table if both players are selected -->
      <v-data-table
        v-if="player1Stats && player2Stats"
        :headers="headers"
        :items="compareStats"
        class="comparison-table"
        hide-default-footer
      >
        <template v-slot:[`item.stat`]="{ item }">
          <div>{{ item.stat }}</div>
        </template>

        <!-- Player 1 - Appliquer les classes conditionnelles -->
        <template v-slot:[`item.player1`]="{ item }">
          <div :class="getClass(item.player1, item.player2)">
            {{ item.player1 }}
          </div>
        </template>

        <!-- Player 2 - Appliquer les classes conditionnelles -->
        <template v-slot:[`item.player2`]="{ item }">
          <div :class="getClass(item.player2, item.player1)">
            {{ item.player2 }}
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
      playerName1: "",
      playerName2: "",
      players1: [],
      players2: [],
      selectedPlayer1: null,
      selectedPlayer2: null,
      player1Stats: null,
      player2Stats: null,
      headers: [
        { title: "Stat", key: "stat" },
        { title: "Player 1", key: "player1" },
        { title: "Player 2", key: "player2" },
      ],
    };
  },
  computed: {
    compareStats() {
      return [
        { stat: 'Games Played', player1: this.player1Stats?.gamesPlayed || 0, player2: this.player2Stats?.gamesPlayed || 0 },
        { stat: 'Goals', player1: this.player1Stats?.goals || 0, player2: this.player2Stats?.goals || 0 },
        { stat: 'Assists', player1: this.player1Stats?.assists || 0, player2: this.player2Stats?.assists || 0 },
        { stat: 'Points', player1: this.player1Stats?.points || 0, player2: this.player2Stats?.points || 0 },
        { stat: 'Shots', player1: this.player1Stats?.shots || 0, player2: this.player2Stats?.shots || 0 },
      ];
    },
  },
  methods: {
    // Méthode pour appliquer une classe en fonction de la comparaison
    getClass(val1, val2) {
      if (val1 > val2) {
        return 'highest-stat'; // Classe pour les valeurs les plus élevées
      } else if (val1 < val2) {
        return 'lowest-stat'; // Classe pour les valeurs les plus basses
      } else {
        return 'equal-stat'; // Pas de style si égalité
      }
    },

    async searchPlayers(playerNum) {
      const playerName = playerNum === 1 ? this.playerName1 : this.playerName2;
      if (!playerName) return;

      try {
        const response = await axios.get(`https://search.d3.nhle.com/api/v1/search/player?culture=en-us&limit=20&q=${playerName}&active`);
        if (playerNum === 1) {
          this.players1 = response.data;
        } else {
          this.players2 = response.data;
        }
      } catch (error) {
        console.error("Error fetching player list:", error);
      }
    },

    async fetchPlayerStats(playerNum) {
      const playerId = playerNum === 1 ? this.selectedPlayer1 : this.selectedPlayer2;
      if (!playerId) return;

      try {
        let baseURL = process.env.VUE_APP_API_URL_PROD;
        if (process.env.VUE_APP_NODE_ENV === "development") {
          baseURL = process.env.VUE_APP_API_URL_LOCAL;
        }

        const response = await axios.get(`${baseURL}/api/player/${playerId}`);
        if (playerNum === 1) {
          this.player1Stats = response.data.featuredStats.regularSeason.subSeason;
        } else {
          this.player2Stats = response.data.featuredStats.regularSeason.subSeason;
        }
      } catch (error) {
        console.error("Error fetching player stats:", error);
      }
    },
  },
};
</script>

<style scoped>
.comparison-card {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}

.comparison-title {
  font-size: 24px;
  font-weight: bold;
  color: #2e7d32;
  text-align: center;
  margin-bottom: 20px;
}

.search-fields {
  margin-bottom: 20px;
}

.search-input, .autocomplete-input {
  background-color: #fff;
  border-radius: 8px;
}

.v-data-table {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
}

.comparison-table {
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}

.comparison-table th {
  background-color: #2e7d32;
  color: white;
  font-weight: bold;
  text-transform: uppercase;
}

.comparison-table td {
  padding: 10px;
  font-size: 16px;
  color: #555;
}

.v-autocomplete .v-input__control, .v-text-field .v-input__control {
  border-radius: 8px;
  background-color: #fafafa;
}

.v-data-table__wrapper {
  border-radius: 8px;
}

.v-row {
  display: flex;
  justify-content: space-between;
}

/* Classe pour la statistique la plus haute (en vert) */
.highest-stat {
  background-color: green;
  font-weight: bold;
  color: white;
  text-align: center;
}

/* Classe pour la statistique la plus basse (en rouge) */
.lowest-stat {
  background-color: red;
  font-weight: bold;
  color: white;
  text-align: center;
}
.equal-stat {
  background-color: grey;
  font-weight: bold;
  color: white;
  text-align: center;
}

@media (max-width: 768px) {
  .v-col {
    margin-bottom: 15px;
  }

  .comparison-title {
    font-size: 20px;
  }
}
</style>

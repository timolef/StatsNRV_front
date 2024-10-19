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
            <div class="match-score"  v-if="item.homeTeamScore">
                
                {{ item.homeTeamScore }} : {{ item.awayTeamScore }}
            </div>
            <div class="match-score"  v-else>
                
                Pas encore commencé
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
    padding: 30px; /* Augmentation du padding pour plus d'espace */
    background-color: #f1f3f5; /* Couleur de fond plus douce pour le conteneur */
    border-radius: 12px; /* Coins plus arrondis */
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15); /* Ombre plus marquée */
    font-family: 'Arial', sans-serif; /* Police pour améliorer la lisibilité */
  }

  .matches-card {
    border-radius: 12px; /* Coins arrondis */
    background-color: white;
    overflow: hidden; /* Pour gérer le débordement */
  }

  .matches-title {
    font-size: 28px; /* Augmentation de la taille de police pour le titre */
    font-weight: bold; /* Font-weight plus audacieux */
    color: #ffffff;
    background-color: #00346c;
    text-align: center;
    padding: 15px 0; /* Espacement ajusté */
    border-top-left-radius: 12px; /* Coins arrondis */
    border-top-right-radius: 12px; /* Coins arrondis */
  }

  .matches-table {
    margin-top: 30px; /* Espace accru au-dessus du tableau */
  }

  .team-info {
    display: flex;
    align-items: center;
    gap: 15px; /* Espacement accru entre les logos et les noms */
    padding: 10px 0; /* Espacement ajusté */
  }

  .team-logo {
    width: 50px; /* Légère augmentation de la taille du logo */
    height: 50px; /* Légère augmentation de la taille du logo */
    object-fit: contain;
    border-radius: 50%; /* Logos circulaires */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15); /* Ombre plus marquée */
  }

  .team-name {
    font-weight: 600; /* Légèrement plus audacieux */
    color: #343a40; /* Couleur de texte légèrement plus sombre */
  }

  .match-date,
  .match-time {
    text-align: center;
    font-size: 1rem; /* Taille de police légèrement augmentée */
    font-weight: 500; /* Légèrement plus audacieux */
    color: #6c757d; /* Couleur de texte plus douce */
  }

  .match-score {
    font-size: 1.5rem; /* Augmentation de la taille de la police pour le score */
    font-weight: bold;
    text-align: center;
    color: #007BFF; /* Couleur dynamique pour le score */
  }

  .v-data-table {
    border-radius: 12px; /* Coins arrondis pour le tableau */
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15); /* Ombre plus marquée */
  }

  .v-data-table-header th {
    background-color: #007BFF; /* Couleur de fond pour l'en-tête */
    color: white;
    text-transform: uppercase;
    font-size: 0.95rem; /* Taille de police ajustée pour une meilleure lisibilité */
    text-align: center;
  }

  .v-data-table__wrapper {
    background-color: #fff;
  }

  .v-data-table tbody tr {
    transition: background-color 0.3s;
  }

  .v-data-table tbody tr:hover {
    background-color: #e9ecef; /* Couleur de fond plus douce au survol */
  }

  @media (max-width: 768px) {
    .matches-container {
      padding: 15px; /* Réduction du padding sur les petits écrans */
    }

    .team-info {
      flex-direction: column;
      text-align: center;
    }

    .team-logo {
      margin-bottom: 10px; /* Augmentation de la marge en bas pour le logo */
    }

    .matches-title {
      font-size: 1.7rem; /* Taille de police ajustée pour le titre sur petits écrans */
    }

    .match-score {
      font-size: 1.2rem; /* Taille de police ajustée pour le score sur petits écrans */
    }
  }
</style>

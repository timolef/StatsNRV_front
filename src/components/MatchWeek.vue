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
    background-color: #e9ecef; /* Couleur de fond plus douce */
    font-family: 'Arial', sans-serif; /* Changement de police pour une meilleure lisibilité */
  }
  
  /* Carte contenant les matchs */
  .matches-card {
    width: 100%;
    max-width: 800px;
    background-color: #ffffff;
    border-radius: 12px; /* Coins plus arrondis */
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1); /* Ombre plus marquée */
    padding: 30px; /* Padding plus généreux */
    transition: transform 0.2s; /* Transition pour un effet d'animation */
  }

  .matches-card:hover {
    transform: scale(1.02); /* Effet d'animation au survol */
  }

  /* Titre des matchs de la semaine */
  .matches-title {
    font-size: 28px; /* Taille de police augmentée */
    font-weight: bold; /* Utilisation de 'bold' pour plus d'impact */
    
    color: #ffffff;
    background-color: #00346c; /* Couleur du texte plus sombre pour un meilleur contraste */
    text-align: center;
    padding-bottom: 20px;
  }
  
  /* Tableau des matchs */
  .matches-table {
    width: 100%;
    border-collapse: collapse; /* Suppression des bordures entre les cellules */
  }
  
  /* Alignement et espacement pour la colonne des logos et noms des équipes */
  .team-info {
    display: flex;
    align-items: center;
    gap: 15px; /* Espace plus important entre le logo et le nom */
  }
  
  /* Style pour les logos des équipes */
  .team-logo {
    width: 40px; /* Augmentation de la taille du logo */
    height: 40px; /* Augmentation de la taille du logo */
    border-radius: 50%;
    object-fit: cover;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  }
  
  /* Style pour les noms des équipes */
  .team-name {
    font-size: 18px; /* Augmentation de la taille du texte */
    font-weight: 600; /* Utilisation de '600' pour un texte plus audacieux */
    color: #495057; /* Couleur du texte légèrement plus sombre */
  }
  
  /* Style pour la date du match */
  .match-date,
  /* Style pour l'heure du match */
  .match-time {
    font-size: 16px; /* Taille de police légèrement augmentée */
    color: #6c757d; /* Couleur gris plus douce */
    text-align: center;
    padding: 10px 0; /* Espacement vertical */
  }

  /* Ajout d'un effet de survol pour chaque ligne de match */
  .v-data-table__wrapper tbody tr {
    transition: background-color 0.3s ease; /* Transition pour le fond */
  }

  .v-data-table__wrapper tbody tr:hover {
    background-color: rgba(0, 123, 255, 0.1); /* Couleur de fond plus douce au survol */
  }

  /* Marges supplémentaires pour une présentation plus espacée */
  .v-card {
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
    transition: box-shadow 0.3s; /* Transition pour l'ombre */
  }
  
  .v-card:hover {
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.2); /* Ombre plus marquée au survol */
  }
</style>

  
<template>
  <v-container class="search-page">
    <v-card class="search-card">
      <v-card-title class="search-bar-container">
        <!-- Barre de recherche avec icône de loupe -->
        <v-text-field
          v-model="playerName"
          @update:model-value="searchPlayers"
          label="Rechercher un joueur..."
          prepend-icon="mdi-magnify"
          class="search-bar"
        />
      </v-card-title>

      <!-- Liste des joueurs trouvés -->
      <v-list class="player-list">
        <v-list-item
          v-for="player in players"
          :key="player.playerId"
          @click="goToPlayerStats(player.playerId)"
          class="player-item"
        >
          <v-list-item-content>
            <v-list-item-title class="player-name">{{ player.name }}</v-list-item-title>
            <v-list-item-subtitle class="player-info">
              {{ player.teamAbbrev ? player.teamAbbrev : 'INCONNU' }} - {{ player.positionCode }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-container>
</template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        playerName: '',
        players: [],
      };
    },
    methods: {
      async searchPlayers() {
        if (this.playerName) {
          try {
            console.log(this.playerName)
            const response = await axios.get(`https://search.d3.nhle.com/api/v1/search/player?culture=en-us&limit=20&q=${this.playerName}&active`);
            console.log(response.data)
            this.players = response.data; // Mettez à jour la liste des joueurs
          } catch (error) {
            console.error('Error fetching players:', error);
          }
        } else {
          this.players = [];
        }
      },
      goToPlayerStats(playerId) {
        console.log(playerId)
        // Naviguer vers la page de détails du joueur
        this.$router.push({ name: 'PlayerStats', params: { id: playerId } });
      },
    },
  };
  </script>
  
  <style scoped>
  /* Conteneur principal de la page */
  .search-page {
    display: flex;
    justify-content: center;
    padding: 20px;
  }
  
  /* Carte contenant la recherche et la liste des joueurs */
  .search-card {
    width: 100%;
    max-width: 600px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    padding: 20px;
  }
  
  /* Barre de recherche avec un peu plus d'espace et centrée */
  .search-bar-container {
    padding: 0;
  }
  
  .search-bar {
    width: 100%;
    border-radius: 4px;
  }
  
  /* Liste des joueurs */
  .player-list {
    margin-top: 20px;
  }
  
  /* Style pour chaque élément de joueur dans la liste */
  .player-item {
    padding: 12px;
    transition: background-color 0.3s ease, transform 0.2s ease;
    cursor: pointer;
    border-radius: 4px;
  }
  
  /* Effet de survol pour les éléments de joueur */
  .player-item:hover {
    background-color: rgba(0, 123, 255, 0.1);
    transform: translateY(-3px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
  
  /* Nom du joueur avec une meilleure typographie */
  .player-name {
    font-size: 18px;
    font-weight: 600;
    color: #333;
  }
  
  /* Informations sur le joueur */
  .player-info {
    font-size: 14px;
    color: #666;
  }
  
  /* Ombrages pour un effet de carte plus prononcé */
  .v-card {
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
  }
  </style>
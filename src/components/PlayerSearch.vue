<template>
  <v-container class="search-page">
    <v-card class="search-card">
      <v-card-title class="search-bar-container header-title">
        Recherche de joueurs
      </v-card-title>
      <!-- Barre de recherche avec icône de loupe -->
      <v-text-field
        v-model="playerName"
        @update:model-value="searchPlayers"
        label="Rechercher un joueur..."
        prepend-icon="mdi-magnify"
        class="search-bar"
        clearable
        outlined
      />
      
      <!-- Indicateur de chargement -->
      <v-progress-circular
        v-if="loading"
        indeterminate
        color="primary"
        class="loading-spinner"
      ></v-progress-circular>

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
        <v-list-item v-if="!loading && players.length === 0">
          <v-list-item-content>
            <v-list-item-title class="no-results">Aucun joueur trouvé</v-list-item-title>
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
      loading: false, // Ajout d'une variable de chargement
    };
  },
  methods: {
    async searchPlayers() {
      if (this.playerName) {
        this.loading = true; // Commencer le chargement
        try {
          const response = await axios.get(`https://search.d3.nhle.com/api/v1/search/player?culture=en-us&limit=20&q=${this.playerName}&active`);
          this.players = response.data; // Mettez à jour la liste des joueurs
        } catch (error) {
          console.error('Error fetching players:', error);
        } finally {
          this.loading = false; // Fin du chargement
        }
      } else {
        this.players = [];
      }
    },
    goToPlayerStats(playerId) {
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

/* Style de l'en-tête */
.header-title {
    font-size: 28px; /* Taille de police augmentée */
    font-weight: bold; /* Utilisation de 'bold' pour plus d'impact */
    
    color: #ffffff;
    background-color: #00346c; /* Couleur du texte plus sombre pour un meilleur contraste */
    text-align: center;
    padding-bottom: 20px;
    padding-top: 30px;
}

/* Barre de recherche avec un peu plus d'espace et centrée */
.search-bar-container {
  padding: 0;
}

/* Style de la barre de recherche */
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

/* Aucune résultat trouvé */
.no-results {
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  color: #dc3545; /* Couleur rouge pour signaler qu'il n'y a pas de résultats */
}

/* Indicateur de chargement */
.loading-spinner {
  margin: 20px auto;
}

/* Ombres pour un effet de carte plus prononcé */
.v-card {
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
}
</style>
<template>
    <div class="top-players-container">
      <h1 class="title">Indice de performances</h1>
  
      <div v-if="isLoading" class="loading-spinner-container">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </div>
  
      <v-data-table
        v-else
        :headers="headers"
        :items="players"
        :items-per-page="40"
        class="elevation-1 performance-table"
        dense
        hide-default-footer
      >
        <template v-slot:[`item.skaterFullName`]="{ item }">
          <router-link :to="`/player/${item.playerId}`" class="player-name">
            {{ item.skaterFullName }}
          </router-link>
        </template>
        <template v-slot:[`item.score`]="{ item }">
          <div class="player-score">{{ item.score.toFixed(2) }}</div>
        </template>
      </v-data-table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { VProgressCircular } from 'vuetify/components';
  
  export default {
    components: {
      VProgressCircular
    },
    data() {
      return {
        players: [],
        headers: [
          { title: 'Player Name', key: 'skaterFullName', align: 'start' },
          { title: 'Equipe', key: 'teamAbbrevs', align: 'center' },
          { title: 'Position', key: 'positionCode', align: 'center' },
          { title: 'Score', key: 'score', align: 'center' },
        ],
        isLoading: true, // Indicateur de chargement
      };
    },
    async mounted() {
      try {
        let baseURL = null;
        if (process.env.VUE_APP_NODE_ENV === "development") {
          baseURL = process.env.VUE_APP_API_URL_LOCAL;
        } else {
          baseURL = process.env.VUE_APP_API_URL_PROD;
        }
        const response = await axios.get(`${baseURL}/top-players?seasonId=20242025`);
        this.players = response.data;
      } catch (error) {
        console.error('Error fetching top players:', error);
      } finally {
        this.isLoading = false; // Fin du chargement
      }
    },
  };
  </script>
  
  <style scoped>
  .top-players-container {
    max-width: 800px;
    margin: 40px auto;
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .title {
    font-size: 28px;
    font-weight: bold;
    color: #ffffff;
    background-color: #00346c;
    text-align: center;
    margin-bottom: 20px;
  }
  
  .performance-table {
    background-color: white;
    border-radius: 8px;
  }
  
  .v-data-table-header th {
    background-color: #34495e;
    color: white;
    font-size: 1rem;
    font-weight: 600;
    text-transform: uppercase;
  }
  
  .v-data-table tbody tr:nth-child(even) {
    background-color: #ecf0f1;
  }
  
  .v-data-table tbody tr:nth-child(odd) {
    background-color: #ffffff;
  }
  
  .v-data-table tbody tr:hover {
    background-color: #dcdde1;
  }
  
  .player-name {
    font-weight: bold;
    color: #2980b9;
    text-decoration: none;
    position: relative;
    display: inline-block;
    transition: color 0.3s ease;
    cursor: pointer;
  }
  
  .player-name::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: -2px;
    left: 0;
    background-color: #2980b9;
    visibility: hidden;
    transform: scaleX(0);
    transition: all 0.3s ease-in-out;
  }
  
  .player-name:hover {
    color: #1d6fa5;
  }
  
  .player-name:hover::after {
    visibility: visible;
    transform: scaleX(1);
  }
  
  .player-score {
    text-align: center;
    font-weight: 600;
    color: #27ae60;
  }
  
  .loading-spinner-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
  }
  </style>
  
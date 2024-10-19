<template>
    <div class="top-players-container">
      <h1 class="title">Indice de performances</h1>
  
      <v-data-table
        :headers="headers"
        :items="players"
        :items-per-page="40"
        class="elevation-1 performance-table"
        dense
        hide-default-footer
      >
        <template v-slot:[`item.skaterFullName`]="{ item }">
          <div class="player-name">{{ item.skaterFullName }}</div>
        </template>
        <template v-slot:[`item.score`]="{ item }">
          <div class="player-score">{{ item.score.toFixed(2) }}</div>
        </template>
      </v-data-table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
    
  export default {
    data() {
      return {
        players: [],
        headers: [
          { title: 'Player Name', key: 'skaterFullName', align: 'start' },
          { title: 'Equipe', key: 'teamAbbrevs', align: 'center' },
          { title: 'Position', key: 'positionCode', align: 'center' },
          { title: 'Score', key: 'score', align: 'center' },
        ],
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
    font-size: 28px; /* Augmentation de la taille de police pour le titre */
    font-weight: bold; /* Font-weight plus audacieux */
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
  }
  
  .player-score {
    text-align: center;
    font-weight: 600;
    color: #27ae60;
  }
  </style>
  
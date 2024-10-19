<template>
  <v-container class="player-stats-container">
    <v-card class="player-stats-card">
      <v-card-title class="stats-header">
        {{ loading ? 'Loading...' : (playerInfos ? `${playerInfos.firstName?.['default'] || ''} ${playerInfos.lastName?.['default'] || ''}` : 'Unknown Player') }} - Stats
        
        <v-select
          v-model="selectedSeason"
          :items="seasons"
          label="Select Season"
          @update:model-value="onSeasonChange"
          class="season-select"
        ></v-select>
      </v-card-title>

      <!-- Carte pour les statistiques moyennes sur les 5 derniers matchs -->
      <v-card 
        class="mt-4 average-stats-card"
        :class="{
          'bg-red lighten-3': averageStats.shotsPerGoal < 3,
          'bg-orange lighten-3': averageStats.shotsPerGoal >= 3 && averageStats.shotsPerGoal <= 7,
          'bg-green lighten-3': averageStats.shotsPerGoal > 7
        }"
      >
        <v-card-title>Stats Moyennes sur les 5 Derniers Matchs</v-card-title>
        <v-card-subtitle class="average-stats-content">
          <p>But moyen: {{ averageStats.goals || 0 }}</p>
          <p>Assists moyen: {{ averageStats.assists || 0 }}</p>
          <p>Points moyen: {{ averageStats.points || 0 }}</p>
          <p>Ratio tirs/buts: {{ averageStats.shotsPerGoal || 'N/A' }}</p>
        </v-card-subtitle>
      </v-card>

      <!-- Tableaux des stats de jeu et stats par équipe -->
      <v-row>
        <!-- Si le joueur est un gardien, afficher des statistiques spécifiques aux gardiens -->
        <template v-if="isGoalie">
          <v-col cols="12" md="12">
            <v-card-title>Stats Gardien par Match</v-card-title>
            <v-data-table
              v-if="gameLog && gameLog.length"
              :headers="goalieStatsHeaders"
              :items="gameLog"
              class="stats-table elevation-1"
              hide-default-footer
            >
              <template v-slot:[`item.gameDate`]="{ item }">
                {{ formatDate(item.gameDate) || 'N/A' }}
              </template>
              <template v-slot:[`item.decision`]="{ item }">
                {{ item.decision || 'N/A' }}
              </template>
              <template v-slot:[`item.shotsAgainst`]="{ item }">
                {{ item.shotsAgainst || 0 }}
              </template>
              <template v-slot:[`item.goalsAgainst`]="{ item }">
                {{ item.goalsAgainst || 0 }}
              </template>
              <template v-slot:[`item.savePctg`]="{ item }">
                {{ item.savePctg || 'N/A' }}
              </template>
              <template v-slot:[`item.shutouts`]="{ item }">
                {{ item.shutouts || 0 }}
              </template>
              <template v-slot:[`item.toi`]="{ item }">
                {{ item.toi || 'N/A' }}
              </template>
            </v-data-table>
            <div v-else class="no-data">
              <p>Aucune donnée de match disponible pour ce gardien.</p>
            </div>
          </v-col>
        </template>

        <!-- Si le joueur n'est pas un gardien, afficher des statistiques classiques -->
        <template v-else>
          <v-col cols="12" md="12">
            <v-card-title>Stats par Match</v-card-title>
            <v-data-table
              v-if="gameLog && gameLog.length"
              :headers="statsHeaders"
              :items="gameLog"
              class="stats-table elevation-1"
              hide-default-footer
            >
              <template v-slot:[`item.gameDate`]="{ item }">
                {{ formatDate(item.gameDate) || 'N/A' }}
              </template>
              <template v-slot:[`item.opponent`]="{ item }">
                {{ item.opponentCommonName?.['default'] || 'N/A' }}
              </template>
              <template v-slot:[`item.goals`]="{ item }">
                {{ item.goals || 0 }}
              </template>
              <template v-slot:[`item.assists`]="{ item }">
                {{ item.assists || 0 }}
              </template>
              <template v-slot:[`item.points`]="{ item }">
                {{ item.points || 0 }}
              </template>
            </v-data-table>
            <div v-else class="no-data">
              <p>Aucune donnée de match disponible.</p>
            </div>
          </v-col>
        </template>
        <template v-if="isGoalie">
          <v-col cols="12" md="12">
            <v-card-title>Stats Gardien par Equipe</v-card-title>
            <v-data-table
              v-if="gameLog && gameLog.length"
              :headers="goalieTeamStatsHeaders"
              :items="teamStats"
              class="stats-table elevation-1"
              hide-default-footer
            >
              <template v-slot:[`item.gameDate`]="{ item }">
                {{ formatDate(item.gameDate) || 'N/A' }}
              </template>
              <template v-slot:[`item.decision`]="{ item }">
                {{ item.decision || 'N/A' }}
              </template>
              <template v-slot:[`item.shotsAgainst`]="{ item }">
                {{ item.shotsAgainst || 0 }}
              </template>
              <template v-slot:[`item.goalsAgainst`]="{ item }">
                {{ item.goalsAgainst || 0 }}
              </template>
              <template v-slot:[`item.savePctg`]="{ item }">
                {{ item.savePctg || 'N/A' }}
              </template>
              <template v-slot:[`item.shutouts`]="{ item }">
                {{ item.shutouts || 0 }}
              </template>
            </v-data-table>
            <div v-else class="no-data">
              <p>Aucune donnée de match disponible pour ce gardien.</p>
            </div>
          </v-col>
        </template>
        <template v-else>
          <v-col cols="12" md="12">
            <v-card-title>Stats par Equipe</v-card-title>
            <v-data-table
              v-if="gameLog && gameLog.length"
              :headers="teamStatsHeaders"
              :items="teamStats"
              class="stats-table elevation-1"
              hide-default-footer
            >
              <template v-slot:[`item.gameDate`]="{ item }">
                {{ formatDate(item.gameDate) || 'N/A' }}
              </template>
              <template v-slot:[`item.decision`]="{ item }">
                {{ item.decision || 'N/A' }}
              </template>
              <template v-slot:[`item.shotsAgainst`]="{ item }">
                {{ item.shotsAgainst || 0 }}
              </template>
              <template v-slot:[`item.goalsAgainst`]="{ item }">
                {{ item.goalsAgainst || 0 }}
              </template>
              <template v-slot:[`item.savePctg`]="{ item }">
                {{ item.savePctg || 'N/A' }}
              </template>
              <template v-slot:[`item.shutouts`]="{ item }">
                {{ item.shutouts || 0 }}
              </template>
            </v-data-table>
            <div v-else class="no-data">
              <p>Aucune donnée de match disponible pour ce gardien.</p>
            </div>
          </v-col>
        </template>
        
      </v-row>
    </v-card>
  </v-container>
</template>

  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        playerStats: null,
        playerInfos: null,
        gameLog: null,
        teamStats: [], // Initialisation des stats par équipe
        averageStats: { goals: 0, assists: 0, points: 0 }, // Pour les moyennes
        selectedSeason: '2024/2025',
        seasons: ['2024/2025', '2023/2024', '2022/2023', '2021/2022', '2020/2021', '2019/2020', '2018/2019', '2017/2018', '2016/2017'],
        statsHeaders: [
          { title: 'Date', key: 'gameDate' },
          { title: 'Adversaire', key: 'opponent' },
          { title: 'Points', key: 'points' },
          { title: 'Buts', key: 'goals' },
          { title: 'Tirs', key: 'shots' },
          { title: 'Assists', key: 'assists' },
          { title: 'Shifts', key: 'shifts' },
          { title: 'Buts overtime', key: 'otGoals' },
          { title: 'Points en inferiorité', key: 'shorthandedPoints' },
          
          { title: 'Buts en inferiorité', key: 'shorthandedGoals' },
          { title: 'Points PP', key: 'powerPlayPoints' },
          { title: 'Buts PP', key: 'powerPlayGoals' },
          { title: 'Temps', key: 'toi' },

        ],
        goalieStatsHeaders: [ /* En-têtes pour les gardiens */ 
        { title: 'Date', key: 'gameDate' },
        { title: 'Adversaire', key: 'opponentAbbrev' },
        { title: 'Décision', key: 'decision' },
        { title: 'Tirs contre', key: 'shotsAgainst' },
        { title: 'Buts encaissés', key: 'goalsAgainst' },
        { title: 'Pourcentage d\'arrêts', key: 'savePctg' },
        { title: 'Blanchissages', key: 'shutouts' },
        { title: 'Temps sur glace', key: 'toi' },
      ],
        teamStatsHeaders: [ // En-têtes pour le tableau des stats par équipe
          { title: 'Équipe', key: 'teamName' },
          { title: 'Matchs', key: 'matchs' },
          { title: 'Buts', key: 'goals' },
          { title: 'Tirs', key: 'shots' },
          { title: 'Assists', key: 'assists' },
          { title: 'Points', key: 'points' },
          { title: 'Shifts', key: 'shifts' },
          { title: 'Buts overtime', key: 'otGoals' },
          { title: 'Points en inferiorité', key: 'shPoints' },
          
          { title: 'Buts en inferiorité', key: 'shGoals' },
          { title: 'Points PP', key: 'ppPoints' },
          { title: 'Buts PP', key: 'ppGoals' },
        ],
        goalieTeamStatsHeaders: [ // En-têtes pour le tableau des stats par équipe
          { title: 'Équipe', key: 'teamName' },
          { title: 'Matchs', key: 'matchs' },
          { title: 'Tirs contre', key: 'shotsAgainst' },
          { title: 'Buts encaissés', key: 'goalsAgainst' },
          { title: 'Blanchissages', key: 'shutouts' },
        ],
        loading: true,
      };
    },
    methods: {
      async fetchPlayerStats(playerId, season) {
        const selectedSeason = season;
        console.log(selectedSeason)
        const goodSeason = selectedSeason.replace('/', '')
        try {
          let baseURL = null;
            if (process.env.VUE_APP_NODE_ENV === "development") {
                baseURL = process.env.VUE_APP_API_URL_LOCAL;
            } else {
                baseURL = process.env.VUE_APP_API_URL_PROD;
            }
          const response = await axios.get(`${baseURL}/api/player/${playerId}/stats/${goodSeason}`);
          this.gameLog = response.data.gameLog;
          this.playerStats = response.data;
          console.log("infos : ", this.playerInfos)

          this.isGoalie = this.playerInfos?.position === 'G';
  
          // Calculer les statistiques moyennes sur les 5 derniers matchs
          this.calculateAverageStats(this.gameLog);
          
          // Regrouper les stats par équipe
          this.groupTeamStats(this.gameLog);
        } catch (error) {
          console.error('Error fetching player stats:', error);
        } finally {
          this.loading = false;
        }
      },
      async fetchPlayerIdentity(playerId) {
        try {
          let baseURL = null;
            if (process.env.VUE_APP_NODE_ENV === "development") {
                baseURL = process.env.VUE_APP_API_URL_LOCAL;
            } else {
                baseURL = process.env.VUE_APP_API_URL_PROD;
            }
          const response = await axios.get(`${baseURL}/api/player/${playerId}`);
          this.playerInfos = response.data;
          this.isGoalie = this.playerInfos?.position === 'G';
          console.log(this.isGoalie)
        } catch (error) {
          console.error('Error fetching player infos:', error);
        } finally {
          this.loading = false;
        }
      },
      onSeasonChange() {
        console.log("changement")
        const playerId = this.$route.params.id;
        this.fetchPlayerStats(playerId, this.selectedSeason);
        this.fetchPlayerIdentity(playerId);
    },
      groupTeamStats(gameLog) {
        const teamStatsMap = {};
  
        // Parcourir les logs de match pour accumuler les stats par équipe
        gameLog.forEach(game => {
          const opponentName = game.opponentCommonName['default'];
  
          if (!teamStatsMap[opponentName]) {
            teamStatsMap[opponentName] = {
              teamName: opponentName,
              matchs: 0,
              goals: 0,
              assists: 0,
              points: 0,
              shots: 0,
              shifts: 0,
              otGoals: 0,
              shPoints: 0,
              shGoals: 0,
              ppPoints: 0,
              ppGoals: 0,
              shotsAgainst: 0,
              goalsAgainst: 0,
              shutouts: 0,
              savePctg: 0


            };
          }
  
          // Accumuler les stats
          teamStatsMap[opponentName].matchs += 1
          teamStatsMap[opponentName].goals += game.goals || 0;
          teamStatsMap[opponentName].assists += game.assists || 0;
          teamStatsMap[opponentName].points += game.points || 0;
          teamStatsMap[opponentName].shots += game.shots || 0;
          teamStatsMap[opponentName].shifts += game.shifts || 0;
          teamStatsMap[opponentName].otGoals += game.otGoals || 0;
          teamStatsMap[opponentName].shPoints += game.shorthandedPoints || 0;
          teamStatsMap[opponentName].shGoals += game.shorthandedGoals || 0;
          teamStatsMap[opponentName].ppPoints += game.powerPlayPoints || 0;
          teamStatsMap[opponentName].ppGoals += game.powerPlayGoals || 0;
          teamStatsMap[opponentName].shotsAgainst += game.shotsAgainst || 0;
          teamStatsMap[opponentName].goalsAgainst += game.goalsAgainst || 0;
        });
        Object.values(teamStatsMap).forEach(team => {
          if (team.shotsAgainst > 0) {
            team.savePctg = ((team.shotsAgainst - team.goalsAgainst) / team.shotsAgainst) * 100;
          } else {
            team.savePctg = 0; // Si aucun tir contre l'équipe, on met 0 pour éviter une division par zéro
          }
        });
        // Convertir le map en tableau
        this.teamStats = Object.values(teamStatsMap);
      },
      calculateAverageStats(gameLog) {
        if (!gameLog || gameLog.length === 0) return;
  
        const lastFiveGames = gameLog.slice(0, 5);
        const totalGoals = lastFiveGames.reduce((sum, game) => sum + (game.goals || 0), 0);
        const totalAssists = lastFiveGames.reduce((sum, game) => sum + (game.assists || 0), 0);
        const totalPoints = lastFiveGames.reduce((sum, game) => sum + (game.points || 0), 0);
        const totalShots = lastFiveGames.reduce((sum, game) => sum + (game.shots || 0), 0);

        const shotsPerGoal = totalGoals > 0 ? (totalShots / totalGoals).toFixed(2) : 'N/A';



        this.averageStats = {
          goals: (totalGoals / 5).toFixed(2), // Moyenne des buts
          assists: (totalAssists / 5).toFixed(2), // Moyenne des assists
          points: (totalPoints / 5).toFixed(2),
          shotsPerGoal,
        };
      },
      formatDate(date) {
        return new Date(date).toLocaleDateString();
      },
    },
    created() {
      const playerId = this.$route.params.id;
      this.fetchPlayerStats(playerId, this.selectedSeason);
      this.fetchPlayerIdentity(playerId);
    },
    mounted() {
      const playerId = this.$route.params.id;
      this.fetchPlayerStats(playerId, this.selectedSeason);
      this.fetchPlayerIdentity(playerId);
    },
  };
  </script>
  
  <style scoped>
  /* Conteneur principal pour la page des stats */
  .player-stats-container {
    padding: 20px;
    display: flex;
    justify-content: center;
    min-height: 100vh;
  }
  
  /* Carte principale pour les stats du joueur */
  .player-stats-card {
    width: 100%;
    max-width: 900px;
    padding: 20px;
    border-radius: 10px;
    background-color: #ffffff;
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.1);
  }
  
  /* Titre de la page et sélection de la saison */
  .stats-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
    font-weight: bold;
    color: #333;
  }
  
  .season-select {
    width: 200px;
  }
  .v-data-table th {
  background-color: #1976d2;
  color: #ffffff;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 14px;
}
  
  /* Carte pour les stats moyennes */
  .average-stats-card {
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;
  }
  
  .average-stats-content {
    font-size: 16px;
    color: #555;
  }
  
  /* Tableaux de statistiques */
  .stats-table {
    margin-top: 20px;
  }
  
  /* Style des en-têtes et cellules de tableau */
  .v-data-table__wrapper th {
    font-size: 14px;
    font-weight: bold;
    color: #555;
  }
  
  .v-data-table__wrapper td {
    font-size: 14px;
    color: #666;
    padding: 12px 16px;
  }
  
  /* Style pour les logos et les noms d'équipes */
  .team-info {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .team-logo {
    width: 32px;
    height: 32px;
    object-fit: cover;
    border-radius: 50%;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  }
  
  /* Effet de survol pour les lignes de tableau */
  .v-data-table__wrapper tbody tr:hover {
    background-color: rgba(0, 123, 255, 0.1);
    transition: background-color 0.3s ease;
  }
  
  /* Message d'absence de données */
  .no-data {
    text-align: center;
    color: #999;
    margin-top: 20px;
  }
  </style>
  
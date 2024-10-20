<template>
    <v-container class="match-details-container">
      <v-card class="match-details-card">
        <v-card-title class="match-details-title">
          Détails du match
        </v-card-title>
        
        <v-card-text>
          <div v-if="matchDetails">
            <!-- Informations générales sur le match -->
            <div class="team-info">
              <div class="team">
                <img :src="matchDetails.homeTeam.logo" alt="Logo Domicile" class="team-logo" />
                <span class="team-name">{{ matchDetails.homeTeam.fullName }}</span>
              </div>
              <div class="vs">vs</div>
              <div class="team">
                <img :src="matchDetails.awayTeam.logo" alt="Logo Exterieur" class="team-logo" />
                <span class="team-name">{{ matchDetails.awayTeam.fullName }}</span>
              </div>
            </div>
  
            <!-- Date et heure du match -->
            <div class="match-info">
              <div class="date">{{ formatDate(matchDetails.date) }}</div>
              <div class="time">{{ formatTime(matchDetails.time) }}</div>
            </div>
  
            <!-- Résultat du match -->
            <div v-if="matchDetails.gameState == 'OFF'" class="match-result">
              <div>Score : {{ matchDetails.homeTeam.score }} - {{ matchDetails.awayTeam.score }}</div>
              <div>Match terminé</div>
            </div>
            <div v-else class="live-info">
                <div v-if="matchDetails.gameState == 'LIVE' || matchDetails.gameState == 'CRIT' || matchDetails.gameState == 'FINAL'" class="mb-4">Score : {{ matchDetails.homeTeam.score }} - {{ matchDetails.awayTeam.score }}</div>
              <span v-if="matchDetails.gameState == 'LIVE' || matchDetails.gameState == 'CRIT'" class="live-badge">En Direct</span>
              <span v-if="matchDetails.gameState == 'FINAL'" class="live-badge">Match terminé</span>
              <div v-else>Match à venir</div>
            </div>
            <div v-if="matchDetails.summary && matchDetails.summary.scoring.length">
            <h3>Résumé des buts</h3>
            <div v-for="(period, index) in matchDetails.summary.scoring" :key="index" class="period">
              <h4>Période {{ index + 1 }}</h4>
              <div v-if="period.goals && period.goals.length">
                <ul>
                  <li v-for="(goal, i) in period.goals" :key="i" class="goal">
                    <span>{{ goal.timeInPeriod }} - 
                        <router-link :to="`/player/${goal.playerId}`" class="player-link">
                            {{ goal.name.default }}
                        </router-link> 
                        a marqué ({{ goal.teamAbbrev?.default }})
                        </span>
                  </li>
                </ul>
              </div>
              <div v-else>
                <span>Aucun but marqué pendant cette période.</span>
              </div>
            </div>
          </div>
          </div>
  
          <v-alert type="info" v-else>
            Chargement des détails du match...
          </v-alert>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    props: ['id'], // L'ID du match est passé depuis le routeur
    data() {
      return {
        matchDetails: null,
      };
    },
    methods: {
      async fetchMatchDetails() {
        try {
          const baseURL =
            process.env.VUE_APP_NODE_ENV === "development"
              ? process.env.VUE_APP_API_URL_LOCAL
              : process.env.VUE_APP_API_URL_PROD;
  
          const response = await axios.get(`${baseURL}/match/${this.id}`);
          console.log(response.data)
          this.matchDetails = {
            homeTeam: {
                fullName: response.data.homeTeam.placeName.default + " " + response.data.homeTeam.name.default,
              name: response.data.homeTeam.abbrev,
              logo: response.data.homeTeam.logo,
              score: response.data.homeTeam.score,
            },
            awayTeam: {
                fullName: response.data.awayTeam.placeName.default + " " + response.data.awayTeam.name.default,
              name: response.data.awayTeam.abbrev,
              logo: response.data.awayTeam.logo,
              score: response.data.awayTeam.score,
            },
            date: response.data.gameDate,
            time: response.data.startTimeUTC,
            isLive: response.data.isLive,
            isFinished: response.data.isFinished,
            gameState: response.data.gameState,
            summary: response.data.summary,
          };
        } catch (error) {
          console.error('Erreur lors de la récupération des détails du match :', error);
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
      this.fetchMatchDetails();
    },
  };
  </script>
  
  <style scoped>
  /* Conteneur principal */
.match-details-container {
  padding: 20px;
  max-width: 1000px;
  margin: 20px auto;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

/* Carte contenant les détails du match */
.match-details-card {
  padding: 30px;
  text-align: center;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
}

.match-details-card:hover {
  transform: translateY(-5px);
}

/* Titre de la carte */
.match-details-title {
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Informations sur les équipes */
.team-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.team {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.team-logo {
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
  border-radius: 50%;
  border: 2px solid #ddd;
}

.team-name {
  font-size: 20px;
  font-weight: 600;
  color: #555;
  text-align: center;
  text-transform: capitalize;
}

.vs {
  font-size: 32px;
  font-weight: bold;
  color: #777;
}

/* Informations sur la date et l'heure du match */
.match-info {
  margin-bottom: 30px;
  font-size: 18px;
  font-weight: 500;
  color: #444;
}

.date,
.time {
  margin: 10px 0;
  color: #888;
}

/* Résultat du match */
.match-result {
  font-size: 22px;
  font-weight: bold;
  color: #007bff;
  margin-bottom: 20px;
}

.live-info {
  font-size: 22px;
  font-weight: bold;
  color: red;
}

.live-badge {
  background-color: red;
  color: white;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 16px;
  text-transform: uppercase;
  font-weight: 600;
}

/* Styles des périodes et des buts */
.period {
  margin-bottom: 25px;
}

.goal {
  margin: 5px 0;
  font-size: 18px;
  font-weight: 500;
  color: #555;
  padding-left: 20px;
  position: relative;
}

/* Style pour les liens des joueurs */
.player-link {
  color: #007bff; /* Couleur bleu par défaut pour les liens */
  text-decoration: none; /* Supprime le soulignement par défaut */
  font-weight: bold; /* Met le texte en gras */
  transition: color 0.3s ease, text-decoration 0.3s ease; /* Animation de transition pour le changement de couleur */
}

.player-link:hover {
  color: #0056b3; /* Couleur plus sombre au survol */
  text-decoration: underline; /* Ajoute un soulignement au survol */
  cursor: pointer; /* Change le curseur pour indiquer qu'il s'agit d'un lien */
}

.goal:before {
  content: "⚽";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
  color: #007bff;
}

ul {
  list-style-type: none;
  padding: 0;
}

h3 {
  font-weight: bold;
  margin-top: 30px;
  font-size: 22px;
  color: #333;
  text-transform: uppercase;
  letter-spacing: 1px;
}

h4 {
  margin: 15px 0;
  font-size: 20px;
  color: #444;
  text-transform: capitalize;
}

/* Responsive design */
@media (max-width: 768px) {
  .team-info {
    flex-direction: column;
  }

  .team-logo {
    width: 80px;
    height: 80px;
  }

  .vs {
    font-size: 24px;
    margin: 20px 0;
  }

  .match-details-container {
    padding: 15px;
  }

  .match-details-card {
    padding: 20px;
  }
}

  </style>
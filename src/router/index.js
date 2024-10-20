import { createRouter, createWebHashHistory } from 'vue-router'
import LoginPage from '@/components/LoginPage.vue';
import MatchWeek from '@/components/MatchWeek.vue';
import PlayerSearch from '@/components/PlayerSearch.vue';
import PlayerStats from '@/components/PlayerStats.vue';
import TeamStats from '@/components/TeamStats.vue';
import MilestonePage from '@/components/MilestonePage.vue';
import TopPlayers from '@/components/TopPlayers.vue';
import ScoreWeek from '@/components/ScoreWeek.vue';
import MatchDetails from '@/components/MatchDetails.vue';
const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/matchs-week',
    name: 'matchsWeek',
    component: MatchWeek
  },
  {
    path: '/scores-week',
    name: 'scoresWeek',
    component: ScoreWeek
  },
  {
    path: '/match/:id', // Utilise le paramètre id pour l'ID du match
    name: 'MatchDetails',
    component: MatchDetails,
    props: true, // Pour passer l'ID en tant que prop
  },
  {
    path: '/milestones',
    name: 'milestones',
    component: MilestonePage
  },
  {
    path: '/teams-stats',
    name: 'teamsStats',
    component: TeamStats
  },
  {
    path: '/player-search',
    name: 'PlayerSearch',
    component: PlayerSearch,
  },
  {
    path: '/player/:id',
    name: 'PlayerStats',
    component: PlayerStats,
  },
  {
    path: '/top-players',
    name: 'TopPlayers',
    component: TopPlayers,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

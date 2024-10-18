import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginPage from '@/components/LoginPage.vue';
import MatchWeek from '@/components/MatchWeek.vue';
import PlayerSearch from '@/components/PlayerSearch.vue';
import PlayerStats from '@/components/PlayerStats.vue';
import TeamStats from '@/components/TeamStats.vue';
import MilestonePage from '@/components/MilestonePage.vue';
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
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
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

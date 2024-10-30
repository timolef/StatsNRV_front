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
import ComparePlayers from '@/components/ComparePlayers.vue';
import RegisterPage from '@/components/RegisterPage.vue';
import ProfilePage from '@/components/ProfilePage.vue';
import { useAuth } from '../composables/useAuth';
import AbonnementPage from '@/components/AbonnementPage.vue';
import LegalMentions from '@/components/LegalMentions.vue';
let decodedPayload = null
let payload = null
let isPremium = 0
const decodeTokenManually = (token) => {
  if(token) {
    payload = token.split('.')[1]; // Obtenir la partie payload du JWT
    decodedPayload = JSON.parse(atob(payload));
  }
   // Décoder le base64
  console.log("Données décodées:", decodedPayload);
  if(decodedPayload) {
    isPremium = decodedPayload.is_premium
    decodedPayload.is_premium = isPremium
  }
  return decodedPayload;
};
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
    path: '/subscription',
    name: 'subscription',
    component: AbonnementPage
  },
  {
    path: '/scores-week',
    name: 'scoresWeek',
    component: ScoreWeek,
  },
  {
    path: '/legal-mentions',
    name: 'legalMentions',
    component: LegalMentions,
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfilePage
  },
  {
    path: '/match/:id', // Utilise le paramètre id pour l'ID du match
    name: 'MatchDetails',
    component: MatchDetails,
    props: true,
    beforeEnter: (to, from, next) => {
      const { getToken } = useAuth();
      const token = getToken();

      if (token) {
        try {
          // Décodage du token
          const decoded = decodeTokenManually(token);

          // Vérification si l'utilisateur est premium
          if (decoded.is_premium) {
            next(); // L'utilisateur est premium, on peut continuer
          } else {
            // Rediriger vers la page des matchs s'il n'est pas premium
            next('/matchs-week');
          }
        } catch (error) {
          console.error('Erreur lors du décodage du token:', error);
          next('/matchs-week'); // En cas d'erreur, rediriger
        }
      } else {
        // Si aucun token, rediriger vers les matchs
        next('/matchs-week');
      }
    } // Pour passer l'ID en tant que prop
  },
  {
    path: '/compare-players', // Utilise le paramètre id pour l'ID du match
    name: 'ComparePlayers',
    component: ComparePlayers,
    props: true, // Pour passer l'ID en tant que prop
    beforeEnter: (to, from, next) => {
      const { getToken } = useAuth();
      const token = getToken();

      if (token) {
        try {
          // Décodage du token
          const decoded = decodeTokenManually(token);

          // Vérification si l'utilisateur est premium
          if (decoded.is_premium) {
            next(); // L'utilisateur est premium, on peut continuer
          } else {
            // Rediriger vers la page des matchs s'il n'est pas premium
            next('/matchs-week');
          }
        } catch (error) {
          console.error('Erreur lors du décodage du token:', error);
          next('/matchs-week'); // En cas d'erreur, rediriger
        }
      } else {
        // Si aucun token, rediriger vers les matchs
        next('/matchs-week');
      }
    }
  },{ 
    path: '/milestones', 
    component: MilestonePage,
    beforeEnter: (to, from, next) => {
      const { getToken } = useAuth();
      const token = getToken();

      if (token) {
        try {
          // Décodage du token
          const decoded = decodeTokenManually(token);

          // Vérification si l'utilisateur est premium
          if (decoded.is_premium) {
            next(); // L'utilisateur est premium, on peut continuer
          } else {
            // Rediriger vers la page des matchs s'il n'est pas premium
            next('/matchs-week');
          }
        } catch (error) {
          console.error('Erreur lors du décodage du token:', error);
          next('/matchs-week'); // En cas d'erreur, rediriger
        }
      } else {
        // Si aucun token, rediriger vers les matchs
        next('/matchs-week');
      }
    }
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage
  },
  {
    path: '/teams-stats',
    name: 'teamsStats',
    component: TeamStats,
    beforeEnter: (to, from, next) => {
      const { getToken } = useAuth();
      const token = getToken();

      if (token) {
        try {
          // Décodage du token
          const decoded = decodeTokenManually(token);

          // Vérification si l'utilisateur est premium
          if (decoded.is_premium) {
            next(); // L'utilisateur est premium, on peut continuer
          } else {
            // Rediriger vers la page des matchs s'il n'est pas premium
            next('/matchs-week');
          }
        } catch (error) {
          console.error('Erreur lors du décodage du token:', error);
          next('/matchs-week'); // En cas d'erreur, rediriger
        }
      } else {
        // Si aucun token, rediriger vers les matchs
        next('/matchs-week');
      }
    }
  },
  {
    path: '/player-search',
    name: 'PlayerSearch',
    component: PlayerSearch,
    beforeEnter: (to, from, next) => {
      const { getToken } = useAuth();
      const token = getToken();

      if (token) {
        try {
          // Décodage du token
          const decoded = decodeTokenManually(token);

          // Vérification si l'utilisateur est premium
          if (decoded.is_premium) {
            next(); // L'utilisateur est premium, on peut continuer
          } else {
            // Rediriger vers la page des matchs s'il n'est pas premium
            next('/matchs-week');
          }
        } catch (error) {
          console.error('Erreur lors du décodage du token:', error);
          next('/matchs-week'); // En cas d'erreur, rediriger
        }
      } else {
        // Si aucun token, rediriger vers les matchs
        next('/matchs-week');
      }
    }
  },
  {
    path: '/player/:id',
    name: 'PlayerStats',
    component: PlayerStats,
    beforeEnter: (to, from, next) => {
      const { getToken } = useAuth();
      const token = getToken();

      if (token) {
        try {
          // Décodage du token
          const decoded = decodeTokenManually(token);

          // Vérification si l'utilisateur est premium
          if (decoded.is_premium) {
            next(); // L'utilisateur est premium, on peut continuer
          } else {
            // Rediriger vers la page des matchs s'il n'est pas premium
            next('/matchs-week');
          }
        } catch (error) {
          console.error('Erreur lors du décodage du token:', error);
          next('/matchs-week'); // En cas d'erreur, rediriger
        }
      } else {
        // Si aucun token, rediriger vers les matchs
        next('/matchs-week');
      }
    }
  },
  {
    path: '/top-players',
    name: 'TopPlayers',
    component: TopPlayers,
    beforeEnter: (to, from, next) => {
      const { getToken } = useAuth();
      const token = getToken();

      if (token) {
        try {
          // Décodage du token
          const decoded = decodeTokenManually(token);

          // Vérification si l'utilisateur est premium
          if (decoded.is_premium) {
            next(); // L'utilisateur est premium, on peut continuer
          } else {
            // Rediriger vers la page des matchs s'il n'est pas premium
            next('/matchs-week');
          }
        } catch (error) {
          console.error('Erreur lors du décodage du token:', error);
          next('/matchs-week'); // En cas d'erreur, rediriger
        }
      } else {
        // Si aucun token, rediriger vers les matchs
        next('/matchs-week');
      }
    }
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

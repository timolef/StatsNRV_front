<template>
  <v-navigation-drawer app permanent color="primary" dark class="navbar">
    <v-toolbar-title class="navbar-title">StatsNRV</v-toolbar-title>

    <v-list dense>
      <v-list-item v-for="item in navItems" :key="item.title" class="nav-item">
        <v-list-item-title>
          <router-link :to="item.route" class="nav-link" active-class="active-link">
            {{ item.title }}
          </router-link>
        </v-list-item-title>
      </v-list-item>
      <v-list-item v-if="isPremium == 1" class="nav-item">
        <v-list-item-title>
          <router-link to="/teams-stats" class="nav-link" active-class="active-link">
            Classement équipes
          </router-link>
        </v-list-item-title>
        <v-list-item-title>
          <router-link to="/milestones" class="nav-link" active-class="active-link">
            Paliers
          </router-link>
        </v-list-item-title>
        <v-list-item-title>
          <router-link to="/player-search" class="nav-link" active-class="active-link">
            Recherche joueurs
          </router-link>
        </v-list-item-title>
        <v-list-item-title>
          <router-link to="/top-players" class="nav-link" active-class="active-link">
            Performances
          </router-link>
        </v-list-item-title>
        <v-list-item-title>
          <router-link to="/compare-players" class="nav-link" active-class="active-link">
            Comparer joueurs
          </router-link>
        </v-list-item-title>
      </v-list-item>
      <v-list-item v-if="isAuthenticated" class="nav-item">
        <v-list-item-title>
          <router-link to="/profile" class="nav-link" active-class="active-link">
            Profil
          </router-link>
        </v-list-item-title>
      </v-list-item>
    </v-list>
    <div v-if="isAuthenticated">
    <div class="user-info ml-8">
      <v-icon left>mdi-account</v-icon>
      <span>@{{ user.pseudo }}</span> <!-- Affichage du nom de l'utilisateur -->
      
    </div>
    <div>
      <v-btn color="secondary" class="logout-btn ml-12" @click="logout">Déconnexion</v-btn>
    </div>
  </div>

    <v-btn v-else color="secondary" class="login-btn" @click="$router.push('/login')">
      Connexion
    </v-btn>
  </v-navigation-drawer>
</template>

<script>
import { useAuth } from '../composables/useAuth';
import { ref, computed, onMounted } from 'vue';
import jwt_decode from 'jwt-decode';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const { getToken, clearToken } = useAuth();
    const user = ref(null);
    const token = ref(getToken());

    const navItems = [
      { title: "Matchs", route: "/matchs-week" },
      { title: "Résultats", route: "/scores-week" },
    ];

    // Calculer si l'utilisateur est authentifié
    const isAuthenticated = computed(() => !!token.value);
    let payload = null
    let isPremium = false
    let decodedPayload = null
    const decodeTokenManually = (token) => {
      if(token) {
        payload = token.split('.')[1]; // Obtenir la partie payload du JWT
        decodedPayload = JSON.parse(atob(payload));
      }
       // Décoder le base64
      console.log("Données décodées:", decodedPayload);
      if(decodedPayload) {
        isPremium = decodedPayload.is_premium
      }
      return decodedPayload;
    };
    // Utilise cette fonction pour décoder le token
    const decoded = decodeTokenManually(getToken());
    if(decoded) {
      user.value = {
      mail: decoded.email,
      exp: decoded.exp,
            id: decoded.id,
            pseudo: decoded.pseudo
    };
    }
    
    // Fonction pour décoder le token JWT et récupérer les informations utilisateur
    const decodeToken = () => {
      const token = getToken();
      if (token) {
        try {
          const decoded = jwt_decode(token)
          console.log("decoded : ", decoded)
          user.value = {
            mail: decoded.email, // Utiliser le nom ou l'email du token
            exp: decoded.exp,
            id: decoded.id,
            pseudo: decoded.pseudo
          };

          console.log("Utilisateur décodé:", user.value);
        } catch (error) {
          console.error('Erreur lors du décodage du token:', error);
        }
      }
    };

    onMounted(() => {
      decodeToken();
    });

    const logout = () => {
      clearToken();
      user.value = null;
      token.value = null;
      router.push('/login');
    };

    return {
      navItems,
      user,
      token,
      isAuthenticated,
      logout,
      isPremium
    };
  },
};
</script>

<style scoped>
.navbar {
  width: 240px; /* Ajuster la largeur du menu */
  background: linear-gradient(135deg, #1e3c72, #2a5298); /* Dégradé de fond */
}

.navbar-title {
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  font-size: 24px;
  padding: 16px;
  color: #fff;
  text-align: center;
}

.nav-item {
  margin: 8px 0;
}

.nav-link {
  color: #e0e0e0;
  font-family: 'Roboto', sans-serif;
  font-size: 18px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  text-decoration: none;
  padding: 12px 16px;
  transition: all 0.3s ease;
  display: block;
  border-radius: 8px;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateX(10px); /* Effet de translation lors du survol */
}

.active-link {
  background-color: rgba(255, 255, 255, 0.3);
  font-weight: bold;
}

.user-info {
  display: flex;
  align-items: center;
  margin-top: auto;
  padding: 16px;
  color: white;
}

.user-info v-icon {
  margin-right: 8px;
}

.logout-btn {
  margin-top: 16px;
}

.login-btn {
  margin: 16px;
  color: white;
  width: 100%;
}

@media (max-width: 600px) {
  .navbar {
    width: 100%;
    position: fixed;
    z-index: 10;
  }

  .nav-link {
    font-size: 16px;
    padding: 10px;
  }
}
</style>

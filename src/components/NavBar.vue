<template>
  <v-navigation-drawer
    app
    permanent
    color="primary"
    dark
    class="navbar"
  >
    <v-toolbar-title class="navbar-title">StatsNRV</v-toolbar-title>

    <v-list dense>
      <v-list-item
        v-for="item in navItems"
        :key="item.title"
        class="nav-item"
      >
        <v-list-item-title>
          <router-link
            :to="item.route"
            class="nav-link"
            active-class="active-link"
          >
            {{ item.title }}
          </router-link>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      navItems: [
        { title: "Matchs", route: "/matchs-week" },
        { title: "Résultats", route: "/scores-week" },
        { title: "Classement équipes", route: "/teams-stats" },
        { title: "Recherche joueur", route: "/player-search" },
        { title: "Paliers", route: "/milestones" },
        { title: "Performances", route: "/top-players" },
      ],
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
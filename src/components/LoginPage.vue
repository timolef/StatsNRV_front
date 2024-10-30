<template>
  <v-container class="login-container">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="login-card" elevation="4">
          <v-card-title class="text-h5">Connexion</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="login">
              <v-text-field label="Email" v-model="email" required></v-text-field>
              <v-text-field label="Mot de passe" type="password" v-model="password" required></v-text-field>
              <v-btn type="submit" color="primary" block class="mb-2">Connexion</v-btn>
              <v-btn block @click="$router.push('/register')" color="secondary">
                Pas encore inscrit ?
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useAuth } from '../composables/useAuth';
import { ref } from "vue";
import { useRouter } from 'vue-router';

export default {
  setup() {
    const { setToken } = useAuth();
    const email = ref('');
    const password = ref('');
    const router = useRouter();

    const login = async () => {
      try {
        let baseURL = process.env.VUE_APP_NODE_ENV === 'development'
          ? process.env.VUE_APP_API_URL_LOCAL
          : process.env.VUE_APP_API_URL_PROD;

        const response = await fetch(`${baseURL}/api/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: email.value, password: password.value }),
        });

        const data = await response.json();
        if (response.ok && data.token) {
          setToken(data.token); // Mise à jour du token
          router.push('/matchs-week')
          setTimeout(function(){
            
          window.location.reload()
          }, 50)
        } else {
          alert('Email ou mot de passe incorrect');
        }
      } catch (err) {
        console.error(err);
      }
    };

    return {
      email,
      password,
      login,
    };
  },
};
</script>

<style scoped>
.login-container {
  height: 100vh; /* S'assurer que le conteneur prend toute la hauteur */
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
}

.login-card {
  padding: 20px;
  border-radius: 12px; /* Arrondir les coins */
  background-color: #f9f9f9; /* Couleur de fond claire */
}

v-card-title {
  text-align: center;
  color: #3f51b5; /* Couleur de texte principale */
}

.login-card .v-btn {
  border-radius: 8px; /* Arrondir les boutons */
  font-weight: bold; /* Rendre les boutons plus visibles */
}

.login-card .v-btn.mb-2 {
  margin-bottom: 16px;
}

.login-card .v-btn.secondary {
  background-color: #f44336; /* Couleur pour le bouton secondaire */
  color: #fff;
}
.v-card-title {
  font-weight: bold;
  color: #1976d2;
}

.login-card .v-text-field {
  margin-bottom: 16px;
}

.v-card {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Ajout d'ombre pour un effet de profondeur */
}

</style>

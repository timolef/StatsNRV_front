<template>
  <v-container class="register-container">
    <v-card class="register-card" elevation="8">
      <v-card-title class="text-h5 text-center">Créer un compte</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="register">
          <v-text-field 
            label="Email" 
            v-model="email" 
            required 
            outlined 
            dense 
            color="primary">
          </v-text-field>

          <v-text-field 
            label="Pseudo" 
            v-model="pseudo" 
            required 
            outlined 
            dense 
            color="primary">
          </v-text-field>

          <v-text-field 
            label="Mot de passe" 
            type="password" 
            v-model="password" 
            required 
            outlined 
            dense 
            color="primary">
          </v-text-field>

          <v-btn type="submit" color="primary" class="mt-4 mb-2" block>
            S'inscrire
          </v-btn>

          <v-btn @click="$router.push('/login')" color="secondary" block>
            Déjà inscrit ?
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      pseudo: ''
    };
  },
  methods: {
    async register() {
      try {
        let baseURL = null;
        if (process.env.VUE_APP_NODE_ENV === "development") {
          baseURL = process.env.VUE_APP_API_URL_LOCAL;
        } else {
          baseURL = process.env.VUE_APP_API_URL_PROD;
        }
        console.log(baseURL)
        const response = await fetch(`${baseURL}/api/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: this.email, password: this.password, pseudo: this.pseudo }),
        });

        const data = await response.json();
        if (data.message === 'User created') {
          this.$router.push('/login');
        } else {
          alert(data.message);
        }
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.register-card {
  width: 100%;
  max-width: 400px;
  padding: 20px;
  border-radius: 12px;
  background-color: #fff;
}

.v-text-field input {
  border-radius: 8px;
}

.v-btn {
  border-radius: 8px;
}

.v-card-title {
  font-weight: bold;
  color: #1976d2;
}

.mt-4 {
  margin-top: 16px;
}

.v-btn:hover {
  transform: translateY(-2px);
  transition: transform 0.3s ease;
}

@media (max-width: 600px) {
  .register-card {
    margin: 20px;
    padding: 16px;
  }
}
</style>

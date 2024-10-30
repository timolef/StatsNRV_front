<template>
    <v-container class="profile-container">
      <v-card class="profile-card" elevation="8">
        <v-card-title class="text-h5 text-center">Mon Profil</v-card-title>
        <v-card-subtitle class="text-center">{{ user.email }}</v-card-subtitle>
        <v-card-subtitle class="text-center">{{ user.pseudo }}</v-card-subtitle>
  
        <v-card-text>
          <v-form @submit.prevent="updateProfile">
            <v-text-field
              label="Email"
              v-model="email"
              outlined
              dense
              color="primary"
              required
            ></v-text-field>
  
            <v-text-field
              label="Pseudo"
              v-model="pseudo"
              outlined
              dense
              color="primary"
              required
            ></v-text-field>
  
            <v-btn type="submit" color="primary" block class="mt-4">
              Mettre à jour
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script>
  import { useAuth } from '../composables/useAuth';
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  
  export default {
    setup() {
      const router = useRouter();
      const { getToken, clearToken, updateUserProfile } = useAuth(); // Assuming you have an updateUserProfile method
      const user = ref({
        email: '',
        pseudo: ''
      });
      const email = ref('');
      const pseudo = ref('');
  
      const fetchUserData = () => {
        const token = getToken();
        if (token) {
          // Assume decodeToken function already decodes the JWT and extracts the user info
          const decodedToken = JSON.parse(atob(token.split('.')[1]));
          user.value = {
            email: decodedToken.email,
            pseudo: decodedToken.pseudo
          };
          email.value = user.value.email;
          pseudo.value = user.value.pseudo;
        }
      };
  
      onMounted(() => {
        fetchUserData();
      });
  
      const updateProfile = async () => {
        try {
          await updateUserProfile(email.value, pseudo.value); // Placeholder function for updating user profile
          alert('Profil mis à jour avec succès');
        } catch (error) {
          console.error('Erreur lors de la mise à jour du profil :', error);
          alert('Échec de la mise à jour du profil.');
        }
      };
  
      const logout = () => {
        clearToken();
        router.push('/login');
      };
  
      return {
        user,
        email,
        pseudo,
        updateProfile,
        logout
      };
    }
  };
  </script>
  
  <style scoped>
  .profile-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f5f5f5;
  }
  
  .profile-card {
    width: 100%;
    max-width: 500px;
    padding: 20px;
    border-radius: 12px;
    background-color: #fff;
  }
  
  .v-card-title,
  .v-card-subtitle {
    margin-bottom: 16px;
    font-family: 'Roboto', sans-serif;
    text-align: center;
  }
  
  .mt-4 {
    margin-top: 16px;
  }
  
  .mt-2 {
    margin-top: 8px;
  }
  </style>
  
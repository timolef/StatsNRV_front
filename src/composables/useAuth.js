// src/composables/useAuth.js
import { ref } from 'vue';

const token = ref(localStorage.getItem('token'));

export function useAuth() {
  const setToken = (newToken) => {
    token.value = newToken;
    localStorage.setItem('token', newToken); // Stocker le token dans localStorage
  };

  const getToken = () => {
    return token.value;
  };

  const clearToken = () => {
    token.value = null;
    localStorage.removeItem('token'); // Supprimer le token de localStorage
  };

  return {
    token,
    setToken,
    getToken,
    clearToken
  };
}
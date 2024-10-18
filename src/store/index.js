import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    user: null,
    token: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
    },
  },
  actions: {
    async login({ commit }, credentials) {
      const response = await axios.post('http://localhost:5000/login', credentials);
      commit('setToken', response.data.token);
      // Store token in local storage
      localStorage.setItem('token', response.data.token);
    },
    async register(_, userData) {
      await axios.post('http://localhost:5000/register', userData);
    },
    logout({ commit }) {
      commit('setToken', null);
      localStorage.removeItem('token');
    },
  },
});
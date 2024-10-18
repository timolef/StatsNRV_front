<template>
    <v-container>
      <v-form @submit.prevent="login">
        <v-text-field label="Username" v-model="username" />
        <v-text-field label="Password" type="password" v-model="password" />
        <v-btn type="submit">Login</v-btn>
      </v-form>
    </v-container>
  </template>
  
  <script>
  import { mapActions } from 'vuex';
  
  export default {
    data() {
      return {
        username: '',
        password: '',
      };
    },
    methods: {
      ...mapActions(['login']),
      async login() {
        await this.login({ username: this.username, password: this.password });
        this.$router.push('/');
      },
    },
  };
  </script>
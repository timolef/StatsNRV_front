<template>
    <v-container class="subscription-container" fluid>
      <v-row>
        <v-col cols="12" md="8" offset-md="2" class="text-center">
          <h1 class="mb-4">Devenir Membre Premium</h1>
          <v-card class="subscription-card" elevation="5">
            <v-card-text>
              <p class="subscription-text">
                Pour accéder à nos fonctionnalités Premium et débloquer du contenu exclusif, 
                vous pouvez souscrire à notre abonnement.
              </p>
              <p class="subscription-text">
                <strong>Tarifs d'abonnement :</strong>
              </p>
              <ul class="subscription-list">
                <li>5€ pour le premier mois, puis 8€ par mois</li>
                <li>80€ par an (économisez 16€ par an)</li>
              </ul>
              <p class="subscription-text">
                Actuellement, pour vous abonner, veuillez nous contacter directement via 
                <strong>Discord (@leftim)</strong> ou <strong>Twitter</strong>. Le paiement se fait via <strong>PayPal</strong>.
              </p>
              <p class="subscription-text">
                Pour toute question ou pour démarrer le processus d'abonnement, vous pouvez nous joindre via :
              </p>
              <v-btn
                class="contact-btn"
                color="info"
                href="https://twitter.com/leftim59"
                target="_blank"
              >
                <v-icon left>mdi-twitter</v-icon> Twitter
              </v-btn>
              <p class="mt-4">
                Une fois le paiement effectué, nous vous activerons votre compte Premium manuellement.
              </p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    name: "AbonnementPage",
  };
  </script>
  
  <style scoped>
  .subscription-container {
    padding-top: 40px;
  }
  
  .subscription-card {
    padding: 20px;
  }
  
  .subscription-text {
    font-size: 18px;
    margin-bottom: 20px;
  }
  
  .subscription-list {
    font-size: 18px;
    text-align: left;
    margin-bottom: 20px;
    padding-left: 20px;
  }
  
  .contact-btn {
    margin: 10px;
    width: 180px;
    font-size: 16px;
  }
  
  h1 {
    font-family: 'Roboto', sans-serif;
    font-weight: bold;
    color: #3f51b5;
  }
  
  p, li {
    font-family: 'Roboto', sans-serif;
    line-height: 1.6;
    color: #333;
  }
  
  @media (max-width: 600px) {
    .subscription-text, .subscription-list {
      font-size: 16px;
    }
  }
  </style>
  
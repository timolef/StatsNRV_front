<template>
    <v-container class="legal-mentions-container" fluid>
      <v-row>
        <v-col cols="12" md="8" offset-md="2" class="text-center">
          <h1 class="mb-4">Mentions Légales</h1>
          <v-card class="legal-card" elevation="5">
            <v-card-text>
              <div class="legal-section">
                <h2>Éditeur du site</h2>
                <p><strong>Nom :</strong> Timothée Lefebvre</p>
                <p><strong>Email :</strong> <a href="mailto:timotheelefebvre0@gmail.com">timotheelefebvre0@gmail.com</a></p>
                <p><strong>Téléphone :</strong> 0781707769</p>
                <p><strong>Adresse :</strong> [Votre adresse ici, si nécessaire]</p>
              </div>
              <div class="legal-section">
                <h2>Hébergeur du site</h2>
                <p><strong>Nom :</strong> Vercel Inc.</p>
                <p><strong>Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, USA</p>
                <p><strong>Téléphone :</strong> [Téléphone de l'hébergeur, si nécessaire]</p>
              </div>
              <div class="legal-section">
                <h2>Propriété intellectuelle</h2>
                <p>Tous les éléments du site <strong>StatsNRV</strong>, y compris les textes, images, logos, et autres, sont protégés par la législation sur la propriété intellectuelle. Leur reproduction sans l'accord écrit préalable de l'éditeur est interdite.</p>
                <p>Les marques citées sur le site sont la propriété de leurs titulaires respectifs.</p>
              </div>
              <div class="legal-section">
                <h2>Responsabilité éditoriale</h2>
                <p>L'éditeur décline toute responsabilité concernant les liens hypertextes présents sur le site menant à d'autres ressources sur Internet. Les contenus de ces sites tiers ne relèvent pas de notre responsabilité.</p>
              </div>
              <div class="legal-section">
                <h2>Données personnelles</h2>
                <p>Les données personnelles collectées sur le site <strong>StatsNRV</strong> sont utilisées exclusivement dans le cadre de l’abonnement Premium. Conformément au RGPD, vous disposez du droit d'accès, de modification et de suppression de vos données. Pour exercer vos droits, veuillez nous contacter à <a href="mailto:timotheelefebvre0@gmail.com">timotheelefebvre0@gmail.com</a>.</p>
                <p>Nous nous engageons à protéger vos données et à respecter votre vie privée.</p>
              </div>
              <div class="legal-section">
                <h2>Cookies</h2>
                <p>Ce site utilise des cookies pour améliorer l’expérience utilisateur. Vous pouvez choisir de désactiver les cookies dans les paramètres de votre navigateur. Pour en savoir plus sur notre politique relative aux cookies, consultez notre <a href="/politique-de-cookies">politique de cookies</a>.</p>
              </div>
              <div class="legal-section">
                <h2>Conditions générales de vente</h2>
                <p>L'abonnement Premium est facturé à 5€ le premier mois, puis à 8€ par mois ou 80€ par an. L'abonnement peut être résilié à tout moment, sans remboursement du mois en cours.</p>
                <p>Les modalités de paiement sont définies sur notre page de paiement.</p>
              </div>
              <div class="legal-section">
                <h2>Droit applicable</h2>
                <p>Ces mentions légales sont régies par le droit français. En cas de litige, les tribunaux français seront seuls compétents.</p>
              </div>
              <div class="legal-section">
                <h2>Contact</h2>
                <p>Pour toute question ou réclamation, vous pouvez nous contacter par e-mail à <a href="mailto:timotheelefebvre0@gmail.com">timotheelefebvre0@gmail.com</a>.</p>
              </div>
              <div class="legal-section">
                <h2>Modifications des mentions légales</h2>
                <p>Nous nous réservons le droit de modifier ces mentions légales à tout moment. Les utilisateurs seront informés des changements par la mise à jour de cette page.</p>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    name: "MentionsLegalesPage",
  };
  </script>
  
  <style scoped>
  .legal-mentions-container {
    padding-top: 40px;
  }
  
  .legal-card {
    padding: 20px;
  }
  
  .legal-section {
    margin-bottom: 20px;
  }
  
  h1 {
    font-family: 'Roboto', sans-serif;
    font-weight: bold;
    color: #3f51b5;
  }
  
  h2 {
    font-family: 'Roboto', sans-serif;
    font-weight: bold;
    color: #3f51b5;
    margin-top: 20px;
  }
  
  p {
    font-family: 'Roboto', sans-serif;
    line-height: 1.6;
    color: #333;
  }
  
  a {
    color: #3f51b5;
    text-decoration: none;
  }
  
  a:hover {
    text-decoration: underline;
  }
  
  @media (max-width: 600px) {
    h1 {
      font-size: 24px;
    }
  
    h2 {
      font-size: 20px;
    }
  
    p {
      font-size: 16px;
    }
  }
  </style>
  
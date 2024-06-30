<template>
    <div class="home">
      <h1 class="title">Benvenuti in Appart</h1>
      <router-link class="link" to="/login">Login</router-link>
      <router-link class="link" to="/registration">Registrazione</router-link>
      <p class="description">
        Siamo una startup dedicata al tenant scoring. La nostra missione è creare un ponte di fiducia tra inquilini e proprietari.
      </p>
      <p class="mission">
        Da un lato, aiutiamo chi cerca casa a presentarsi con un profilo verificato. Attraverso il nostro sistema di valutazione, gli inquilini possono dimostrare la loro affidabilità, storia di pagamenti puntuali e attitudine personale.
      </p>
      <p class="guarantee">
        Dall'altro lato, offriamo una garanzia ai proprietari. Grazie al nostro tenant scoring, i proprietari possono prendere decisioni informate sulla scelta degli inquilini, riducendo il rischio di affitti problematici.
      </p>
      <p class="passion">
        Siamo appassionati di creare un ecosistema equo e trasparente per tutti gli attori del mercato immobiliare.
      </p>
      <img src="../assets/home_slide.png" alt="slide" class="slide"/>
    </div>
  </template>
  
  <style scoped>
  .home {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    font-family: Arial, sans-serif;
  }
  
  .title {
    font-size: 28px;
    color: #333;
    margin-bottom: 1rem;
  }
  
  .description,
  .mission,
  .guarantee,
  .passion {
    font-size: 16px;
    color: #666;
    margin-bottom: 1rem;
  }

  .slide {
    max-width: 100%;
    margin-bottom: 1rem;
    /* Personalizza gli stili del logo */
    }
  
  /* Add additional styling as needed */
  </style>
  
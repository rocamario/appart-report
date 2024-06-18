<template>
    <header class="header">
      <img src="../assets/appart.png" alt="Appart Logo" />
      <router-link class="link" to="/">Home</router-link>
      <!-- Add other navigation links as needed -->
    </header>
  </template>
  
  <style scoped>
  .header {
    background-color: #f8f8f8;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  img {
    max-width: 100px;
  }
  
  .link {
    color: #a25af9;
    margin-right: 1rem;
    text-decoration: none;
  }
  </style>
  
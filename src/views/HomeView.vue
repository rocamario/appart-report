<script setup>
import Hero from '@/components/Hero.vue';
import HomeCards from '@/components/HomeCards.vue';
import DossierListings from '@/components/DossierListings.vue';
</script>

<template>
  <Hero />
  <HomeCards />
  <!-- This is for the home page of the landlors:
  <DossierListings :limit="3" :showButton="true" />
  -->
</template>

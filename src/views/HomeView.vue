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

  <!-- DEVELOPMENT PURPOSE LINKS -->
  <section class="absolute bottom-0 left-0 w-full bg-gray-100 border-t border-gray-300 p-4">
    <h3 class="text-lg font-bold mb-2">Code Development Purpose Links</h3>
    <div class="flex space-x-4">
      <RouterLink
        to="/apartments"
        class="text-xs text-gray-500 hover:text-gray-700 flex items-center"
      >
        Dashboard proprietario
      </RouterLink>
      <RouterLink
        to="/myDossier"
        class="text-xs text-gray-500 hover:text-gray-700 flex items-center"
      >
        Vista dossier
      </RouterLink>
    </div>
  </section>

</template>

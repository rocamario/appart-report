<script setup>
import { RouterLink } from 'vue-router';
import DossierListing from './DossierListing.vue';
import { reactive, onMounted } from 'vue';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import axios from 'axios';

defineProps({
  limit: Number,
  showButton: {
    type: Boolean,
    default: false,
  },
});

const state = reactive({
  dossiers: [],
  isLoading: true,
});

onMounted(async () => {
  try {
    const response = await axios.get('https://mocked-be-appart.vercel.app/dossiers');
    state.dossiers = response.data;
  } catch (error) {
    console.error('Error fetching dossiers', error);
  } finally {
    state.isLoading = false;
  }
});
</script>

<template>
  <section class="bg-blue-50 px-4 py-10">
    <div class="container-xl lg:container m-auto">
      <h2 class="text-3xl font-bold text-violet-500 mb-6 text-center">
        Sfoglia i dossiers
      </h2>
      <!-- Show loading spinner while loading is true -->
      <div v-if="state.isLoading" class="text-center text-gray-500 py-6">
        <PulseLoader />
      </div>

      <!-- Show dossier listing when done loading -->
      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DossierListing
          v-for="dossier in state.dossiers.slice(0, limit || state.dossiers.length)"
          :key="dossier.id"
          :dossier="dossier"
        />
      </div>
    </div>
  </section>

  <section v-if="showButton" class="m-auto max-w-lg my-10 px-6">
    <RouterLink
      to="/dossiers"
      class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
      >Sfoglia tutti i dossiers</RouterLink
    >
  </section>
</template>

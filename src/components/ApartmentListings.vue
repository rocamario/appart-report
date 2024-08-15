<script setup>
import { RouterLink } from 'vue-router';
import ApartmentListing from './ApartmentListing.vue';
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
  apartment: [],
  isLoading: true,
});

onMounted(async () => {
  try {
    const response = await axios.get('https://mocked-be-appart.vercel.app/apartments'); // endpoint cambia se tenant o landlord
    state.apartments = response.data;
  } catch (error) {
    console.error('Error fetching apartments', error);
  } finally {
    state.isLoading = false;
  }
});
</script>

<template>
  <section class="bg-blue-50 px-4 py-10">
    <div class="container-xl lg:container m-auto">
      <!-- Show loading spinner while loading is true -->
      <div v-if="state.isLoading" class="text-center text-gray-500 py-6">
        <PulseLoader />
      </div>

      <!-- Show apartment listing when done loading -->
      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ApartmentListing
          v-for="apartment in state.apartments.slice(0, limit || state.apartments.length)"
          :key="apartment.id"
          :apartment="apartment"
        />
      </div>
    </div>
  </section>

  <section v-if="showButton" class="m-auto max-w-lg my-10 px-6">
    <RouterLink
      to="/apartments"
      class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
      >Sfoglia tutti gli appartamenti</RouterLink
    >
  </section>
</template>

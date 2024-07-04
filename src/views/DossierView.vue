<script setup>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import BackButton from '@/components/BackButton.vue';
import { reactive, onMounted } from 'vue';
import { useRoute, RouterLink, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import axios from 'axios';

const route = useRoute();
const router = useRouter();
const toast = useToast();

const dossierId = route.params.id;

const state = reactive({
  dossier: {},
  isLoading: true,
});

const deletedossier = async () => {
  try {
    const confirm = window.confirm('Sei sicuro di voler eliminare il tuo dossier?');
    if (confirm) {
      await axios.delete(`http://localhost:8000/dossiers/${dossierId}`);
      toast.success('Dossier eliminato');
      router.push('/dossiers');
    }
  } catch (error) {
    console.error('Error deleting dossier', error);
    toast.error('Dossier non eliminato, riprova');
  }
};

onMounted(async () => {
  try {
    const response = await axios.get(`http://localhost:8000/dossiers/${dossierId}`);
    state.dossier = response.data;
  } catch (error) {
    console.error('Error fetching dossier', error);
  } finally {
    state.isLoading = false;
  }
});
</script>

<template>
  <BackButton />
  <section v-if="!state.isLoading" class="bg-violet-50">
    <div class="container m-auto py-10 px-6">
      <div class="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
        <main>
          <div
            class="bg-white p-6 rounded-lg shadow-md text-center md:text-left"
          >
            <div class="text-gray-500 mb-4">{{ state.dossier.type }}</div>
            <h1 class="text-3xl font-bold mb-4">{{ state.dossier.title }}</h1>
            <div
              class="text-gray-500 mb-4 flex align-middle justify-center md:justify-start"
            >
              <i class="pi pi-map-marker text-xl text-orange-700 mr-2"></i>
              <p class="text-orange-700">{{ state.dossier.location }}</p>
            </div>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 class="text-violet-800 text-lg font-bold mb-6">
              Nel dettaglio
            </h3>

            <p class="mb-4">
              {{ state.dossier.description }}
            </p>

            <h3 class="text-violet-800 text-lg font-bold mb-2">Salary</h3>

            <p class="mb-4">{{ state.dossier.salary }} / Year</p>
          </div>
        </main>

        <!-- Sidebar -->
        <aside>
          <!-- Company Info -->
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-bold mb-6">Company Info</h3>

            <h2 class="text-2xl">{{ state.dossier.company.name }}</h2>

            <p class="my-2">
              {{ state.dossier.company.description }}
            </p>

            <hr class="my-4" />

            <h3 class="text-xl">Contact Email:</h3>

            <p class="my-2 bg-violet-100 p-2 font-bold">
              {{ state.dossier.company.contactEmail }}
            </p>

            <h3 class="text-xl">Contact Phone:</h3>

            <p class="my-2 bg-violet-100 p-2 font-bold">
              {{ state.dossier.company.contactPhone }}
            </p>
          </div>

          <!-- Manage -->
          <div class="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 class="text-xl font-bold mb-6">Manage dossier</h3>
            <RouterLink
              :to="`http://localhost:8000/dossiers/edit/${state.dossier.id}`"
              class="bg-violet-500 hover:bg-violet-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
              >Edit dossier</RouterLink
            >
            <button
              @click="deletedossier"
              class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
            >
              Delete dossier
            </button>
          </div>
        </aside>
      </div>
    </div>
  </section>

  <div v-else class="text-center text-gray-500 py-6">
    <PulseLoader />
  </div>
</template>

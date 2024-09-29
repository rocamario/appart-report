<script setup>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import BackButton from '@/components/BackButtonDossier.vue';
import { reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import axios from 'axios';
import certification from '@/assets/certification.png';

const route = useRoute();
const router = useRouter();
const toast = useToast();

const dossierId = route.params.id;

const state = reactive({
  dossier: {},
  isLoading: true,
});

onMounted(async () => {
  try {
    const response = await axios.get(`https://mocked-be-appart.vercel.app/dossiers/${dossierId}`);
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
            <h1 class="text-3xl font-bold mb-4">{{ state.dossier.personalInfo.firstName }} {{ state.dossier.personalInfo.lastName }}</h1>
            <div class="text-gray-500 mb-4">{{ state.dossier.personalInfo.age }} anni</div>
            <p class="my-2">
              {{ state.dossier.financialInfo.employmentStatus }}
            </p>
            <hr class="my-4" />

            <h3 class="text-xl">Email:</h3>

            <p class="my-2 bg-violet-100 p-2 font-bold">
              {{ state.dossier.personalInfo.contactEmail }}
            </p>

            <h3 class="text-xl">Telefono:</h3>

            <p class="my-2 bg-violet-100 p-2 font-bold">
              {{ state.dossier.personalInfo.contactPhone }}
            </p>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 class="text-violet-800 text-lg font-bold mb-6">
              Biografia
            </h3>

            <p class="mb-4">
              {{ state.dossier.bio }}
            </p>

            <h3 class="text-violet-800 text-lg font-bold mb-2">A proposito della ricerca</h3>

            <p class="mb-4">Data ingresso : {{ state.dossier.searchDetails.moveInDate }}</p>
            <p class="mb-4">Periodo del soggiorno: {{ state.dossier.searchDetails.leaseTerm }}</p>

            <h3 class="text-violet-800 text-lg font-bold mb-2">Altre informazioni</h3>

            <p class="mb-4">Animali: {{ state.dossier.additionalInfo.pets }}</p>
            <p class="mb-4">Fumatore: {{ state.dossier.additionalInfo.smoking }}</p>
          </div>
        </main>

        <!-- Sidebar -->
        <aside>
          <!-- Financial Information -->
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-bold mb-6">Informazioni sul budget</h3>

            <!-- TODO: check if budget is higher than apartment rent cost-->
            <img class="h-20 w-auto" :src="certification" alt="Budget certification" />
            <h2 class="text-2xl">Approvato da Appart</h2>

            <hr class="my-4" />
            
            <!-- Psychometric test Information -->
            <h3 class="text-xl font-bold mb-6">Risultato del test psicometrico</h3>
            <h2 class="text-2xl">{{ state.dossier.additionalInfo.testResult }}</h2>

          </div>
        </aside>
      </div>
    </div>
  </section>

  <div v-else class="text-center text-gray-500 py-6">
    <PulseLoader />
  </div>
</template>

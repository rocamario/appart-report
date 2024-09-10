<script setup>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import BackButton from '@/components/BackButton.vue';
import { reactive, ref, onMounted } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import axios from 'axios';
import certification from '@/assets/certification.png';
import { userRole, setUserRole } from '@/userState.js';

// Set user role and log it
setUserRole('tenant');
console.log(userRole.value);

const router = useRouter();
const toast = useToast();

// TODO: get the right dossierId
const dossierId = 1;

// Reactive state
const state = reactive({
  dossier: {},
  isLoading: true
});

// Documents upload state
const showUploadForm = ref(false);
const identityFile = ref(null);
const incomeFile = ref(null);
const bankStatementFile = ref(null);

// Toggle document upload form
const toggleDocumentUpload = () => {
  showUploadForm.value = !showUploadForm.value;
};

// Handle file changes
const handleIdentityFileChange = (event) => {
  identityFile.value = event.target.files[0] || null;
};
const handleIncomeFileChange = (event) => {
  incomeFile.value = event.target.files[0] || null;
};
const handleBankStatementsFileChange = (event) => {
  bankStatementFile.value = event.target.files[0] || null;
};

// Upload documents to backend
const uploadDocuments = async () => {
  if (!identityFile.value && !incomeFile.value && !bankStatementFile.value) {
    toast.error('Nessun documento selezionato');
    return;
  }

  const formData = new FormData();
  if (identityFile.value) {
    formData.append('identityDocument', identityFile.value);
  }
  if (incomeFile.value) {
    formData.append('incomeProof', incomeFile.value);
  }
  if (bankStatementFile.value) {
    formData.append('bankStatement', bankStatementFile.value);
  }

  try {
    await axios.post(`https://mocked-be-appart.vercel.app/dossiers/${dossierId}/upload-documents`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    toast.success('Documenti caricati con successo!');
  } catch (error) {
    console.error('Error uploading documents', error);
    toast.error('Errore durante il caricamento dei documenti');
  }
};

// Delete dossier
const deletedossier = async () => {
  try {
    const confirm = window.confirm('Sei sicuro di voler eliminare il tuo dossier?');
    if (confirm) {
      await axios.delete(`https://mocked-be-appart.vercel.app/dossiers/${dossierId}`);
      toast.success('Dossier eliminato');
      router.push('/dossiers');
    }
  } catch (error) {
    console.error('Error deleting dossier', error);
    toast.error('Dossier non eliminato, riprova!');
  }
};

// Fetch dossier on component mount
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
  <section v-if="!state.isLoading" class="bg-violet-50">
    <div class="container m-auto py-10 px-6">
      <div class="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
        <main>
          <div class="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
            <h1 class="text-3xl font-bold mb-4">{{ state.dossier.personalInfo.firstName }} {{ state.dossier.personalInfo.lastName }}</h1>
            <div class="text-gray-500 mb-4">{{ state.dossier.personalInfo.age }} anni</div>
            <p class="my-2">{{ state.dossier.financialInfo.employmentStatus }}</p>
            <div class="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
              <i class="pi pi-map-marker text-xl text-orange-700 mr-2"></i>
              <p class="text-orange-700">{{ state.dossier.searchDetails.desiredCity }}</p>
            </div>
            <hr class="my-4" />
            <h3 class="text-xl">Email:</h3>
            <p class="my-2 bg-violet-100 p-2 font-bold">{{ state.dossier.personalInfo.contactEmail }}</p>
            <h3 class="text-xl">Telefono:</h3>
            <p class="my-2 bg-violet-100 p-2 font-bold">{{ state.dossier.personalInfo.contactPhone }}</p>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 class="text-violet-800 text-lg font-bold mb-6">Biografia</h3>
            <p class="mb-4">{{ state.dossier.bio }}</p>
            <h3 class="text-violet-800 text-lg font-bold mb-2">La mia ricerca</h3>
            <p class="mb-4">Città: {{ state.dossier.searchDetails.desiredCity }}</p>
            <p class="mb-4">Quartiere: 
              <span v-if="state.dossier.searchDetails.desiredNeighborhoods.length > 0">
                {{ state.dossier.searchDetails.desiredNeighborhoods.join(', ') }}
              </span>
              <span v-else>Nessun quartiere specificato</span>
            </p>
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
            <img class="h-20 w-auto" :src="certification" alt="Budget certification" />
            <h2 class="text-2xl">Approvato da Appart</h2>
            <h2 class="text-2xl">Budget: {{ state.dossier.financialInfo.budget }}</h2>
            <hr class="my-4" />
            <h3 class="text-xl font-bold mb-6">Risultato del test psicometrico</h3>
            <h2 class="text-2xl">{{ state.dossier.additionalInfo.testResult }}</h2>
          </div>

          <!-- Manage -->
          <div class="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 class="text-xl font-bold mb-6">Gestisci dossier</h3>
            <button
              @click="toggleDocumentUpload"
              class="bg-violet-500 hover:bg-violet-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
            >
              Carica documenti
            </button>
            <form v-if="showUploadForm" @submit.prevent="uploadDocuments" enctype="multipart/form-data" class="mt-4">
              <div class="mb-4">
                <label class="block text-gray-700 font-bold mb-2" for="identityDocument">
                  Documento d'identità (Carta d'identità o Passaporto)
                </label>
                <input
                  type="file"
                  id="identityDocument"
                  @change="handleIdentityFileChange"
                  accept=".pdf,.jpg,.jpeg,.png"
                  class="w-full"
                />
              </div>
              <div class="mb-4">
                <label class="block text-gray-700 font-bold mb-2" for="incomeProof">
                  Prova di reddito (ultime 3 buste paga o contratto di lavoro o dichiarazione dei redditi)
                </label>
                <input
                  type="file"
                  id="incomeProof"
                  @change="handleIncomeFileChange"
                  accept=".pdf,.jpg,.jpeg,.png"
                  class="w-full"
                />
              </div>
              <div class="mb-4">
                <label class="block text-gray-700 font-bold mb-2" for="bankStatement">
                  Estratto conto degli ultimi tre mesi
                </label>
                <input
                  type="file"
                  id="bankStatement"
                  @change="handleBankStatementsFileChange"
                  accept=".pdf,.jpg,.jpeg,.png"
                  class="w-full"
                />
              </div>
              <button
                type="submit"
                class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
              >
                Invia documenti
              </button>
            </form>

            <RouterLink
              :to="`/dossiers/edit/${state.dossier.id}`"
              class="bg-violet-500 hover:bg-violet-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
            >
              Aggiorna dossier
            </RouterLink>
            <button
              @click="deletedossier"
              class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
            >
              Elimina dossier
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

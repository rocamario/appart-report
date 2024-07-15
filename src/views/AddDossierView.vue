<script setup>
import router from '@/router';
import { reactive } from 'vue';
import { useToast } from 'vue-toastification';
import axios from 'axios';

const form = reactive({
  personalInfo: {
    firstName: '',
    lastName: '',
    age: '',
    contactEmail: '',
    contactPhone: '',
  },
  bio: '',
  searchDetails: {
    desiredCity: '',
    desiredNeighborhoods: [],
    moveInDate: '',
    leaseTerm: '',
  },
  financialInfo: {
    budget: '',
    maxBudget: '',
    employmentStatus: '',
  },
  additionalInfo: {
    testResult: '',
    pets: '',
    smoking: '',
  },
});

const toast = useToast();

const handleSubmit = async () => {

  const newdossier = {
  personalInfo: {
    firstName: form.personalInfo.firstName,
    lastName: form.personalInfo.lastName,
    age: form.personalInfo.age,
    contactEmail: form.personalInfo.contactEmail,
    contactPhone: form.personalInfo.contactPhone,
  },
  bio: form.bio,
  searchDetails: {
    desiredCity: form.searchDetails.desiredCity,
    desiredNeighborhoods: [...form.searchDetails.desiredNeighborhoods],
    moveInDate: form.searchDetails.moveInDate,
    leaseTerm: form.searchDetails.leaseTerm,
  },
  financialInfo: {
    budget: form.financialInfo.budget,
    maxBudget: form.financialInfo.maxBudget,
    employmentStatus: form.financialInfo.employmentStatus,
  },
  additionalInfo: {
    pets: form.additionalInfo.pets,
    smoking: form.additionalInfo.smoking,
  },
};


  try {
    const response = await axios.post('https://mocked-be-appart.vercel.app/dossiers', newdossier);
    toast.success('Dossier aggiunto');
    router.push(`/dossiers/${response.data.id}`);
  } catch (error) {
    console.error('Error fetching dossier', error);
    toast.error('Errore! Il dossier non è stato aggiunto.');
  }
};
</script>

<template>
  <section class="bg-violet-50">
    <div class="container m-auto max-w-2xl py-24">
      <div
        class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"
      >
        <form @submit.prevent="handleSubmit">
          <h2 class="text-3xl text-center font-semibold mb-6">Aggiungi il tuo dossier</h2>

          <!-- Personal Information-->
          <h3 class="text-2xl mb-5">Informazioni personali</h3>

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2"
              >Nome</label
            >
            <input
              type="text"
              v-model="form.personalInfo.firstName"
              id="firstName"
              name="firstName"
              class="border rounded w-full py-2 px-3 mb-2"
              placeholder="Mario"
              required
            />
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2"
              >Cognome</label
            >
            <input
              type="text"
              v-model="form.personalInfo.lastName"
              id="lastName"
              name="lastName"
              class="border rounded w-full py-2 px-3 mb-2"
              placeholder="Rossi"
              required
            />
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2"
              >Età</label
            >
            <input
              type="text"
              v-model="form.personalInfo.age"
              id="age"
              name="age"
              class="border rounded w-full py-2 px-3 mb-2"
              placeholder="35"
              required
            />
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2"
              >Email</label
            >
            <input
              type="text"
              v-model="form.personalInfo.contactEmail"
              id="contactEmail"
              name="contactEmail"
              class="border rounded w-full py-2 px-3 mb-2"
              placeholder="mario.rossi@example.com"
              required
            />
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2"
              >Telefono</label
            >
            <input
              type="text"
              v-model="form.personalInfo.contactPhone"
              id="contactPhone"
              name="contactPhone"
              class="border rounded w-full py-2 px-3 mb-2"
              placeholder="222-222-222"
              required
            />
          </div>

          <!-- Bio -->

          <div class="mb-4">
            <label for="bio" class="block text-gray-700 font-bold mb-2"
              >Biografia</label
            >
            <textarea
              id="bio"
              v-model="form.bio"
              name="bio"
              class="border rounded w-full py-2 px-3"
              rows="4"
              placeholder="Parla di te, delle caratteristiche dell'alloggio che cerchi, etc"
            ></textarea>
          </div>

          <!--Search Details-->
          <h3 class="text-2xl mb-5">La tua ricerca</h3>

          <div class="mb-4">
            <label for="desiredCity" class="block text-gray-700 font-bold mb-2"
              >Città</label
            >
            <select
              v-model="form.searchDetails.desiredCity"
              id="desiredCity"
              name="desiredCity"
              class="border rounded w-full py-2 px-3"
              required
            >
              <option value="Milano">Milano</option>
              <option value="Roma">Roma</option>
              <option value="Firenze">Firenze</option>
              <option value="Napoli">Napoli</option>
            </select>
          </div>

          <!-- TODO: Neighborhoods preference input list-->

          <!-- TODO: Move-in date input-->

          <div class="mb-4">
            <label for="leaseTerm" class="block text-gray-700 font-bold mb-2"
              >Periodo di soggiorno</label
            >
            <select
              v-model="form.searchDetails.leaseTerm"
              id="leaseTerm"
              name="leaseTerm"
              class="border rounded w-full py-2 px-3"
              required
            >
              <option value="Meno di 1 anno">Meno di 1 anno</option>
              <option value="1 anno">1 anno</option>
              <option value="Tra 1 e 3 anni">Tra 1 e 3 anni</option>
              <option value="Più di 3 anni">Più di 3 anni</option>
            </select>
          </div>
          
          <!-- Financial Information-->

          <h3 class="text-2xl mb-5">Informazioni sul budget</h3>

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2"
              >Budget mensile</label
            >
            <input
              type="text"
              v-model="form.financialInfo.budget"
              id="budget"
              name="budget"
              class="border rounded w-full py-2 px-3 mb-2"
              placeholder="1500€"
              required
            />
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2"
              >Stipendio/Risorse mensili</label
            >
            <input
              type="text"
              v-model="form.financialInfo.maxBudget"
              id="maxBudget"
              name="maxBudget"
              class="border rounded w-full py-2 px-3 mb-2"
              placeholder="3500€"
              required
            />
          </div>

          <div class="mb-4">
            <label for="type" class="block text-gray-700 font-bold mb-2"
              >Occupazione</label
            >
            <select
              id="employmentStatus"
              v-model="form.financialInfo.employmentStatus"
              name="employmentStatus"
              class="border rounded w-full py-2 px-3"
              required
            >
              <option value="Studente">Studente</option>
              <option value="Lavoro full-time">Lavoro full-time</option>
              <option value="Lavoro part-time">Lavoro part-time</option>
              <option value="Imprenditore">Imprenditore</option>
              <option value="Altro">Altro</option>
            </select>
          </div>

          <!-- Additional Info -->

          <h3 class="text-2xl mb-5">Altre informazioni</h3>

          <div class="mb-4">
            <label for="pets" class="block text-gray-700 font-bold mb-2"
              >Animali domestici</label
            >
            <select
              id="pets"
              v-model="form.additionalInfo.pets"
              name="pets"
              class="border rounded w-full py-2 px-3"
              required
            >
              <option value="Si">Si</option>
              <option value="No">No</option>
            </select>
          </div>

          <div class="mb-4">
            <label for="smoking" class="block text-gray-700 font-bold mb-2"
              >Fumatore</label
            >
            <select
              id="smoking"
              v-model="form.additionalInfo.smoking"
              name="smoking"
              class="border rounded w-full py-2 px-3"
              required
            >
              <option value="Si">Si</option>
              <option value="No">No</option>
            </select>
          </div>

          <div>
            <button
              class="bg-violet-500 hover:bg-violet-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Aggiungi dossier
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

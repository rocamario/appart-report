<script setup>
import { reactive, ref } from 'vue';
import { useToast } from 'vue-toastification';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const toast = useToast();

// Reactive form state
const form = reactive({
  title: '',
  description: '',
  city: '',
  price: '',
});

// Image upload handling
const imageFile = ref(null);

const handleImageUpload = (event) => {
  imageFile.value = event.target.files[0];
};

// This way of sending the data is used when dealing with images.
// To check in the API 
const handleSubmit = async () => {
  const formData = new FormData();
  formData.append('title', form.title);
  formData.append('description', form.description);
  formData.append('city', form.city);
  formData.append('price', form.price);
  if (imageFile.value) {
    formData.append('image', imageFile.value);
  }

  try {
    const response = await axios.post('https://mocked-be-appart.vercel.app/apartmentsOwned', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    toast.success('Annuncio aggiunto con successo');
    router.push(`/apartments/${response.data.id}`);  // I removed the ID so I need to change this 
  } catch (error) {
    console.error('Errore durante l\'aggiunta dell\'annuncio', error);
    toast.error('Errore! Annuncio non aggiunto.');
  }
};
</script>

<template>
    <section class="bg-violet-50">
      <div class="container m-auto max-w-2xl py-24">
        <div class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <form @submit.prevent="handleSubmit">
            <h2 class="text-3xl text-center font-semibold mb-6">Aggiungi Annuncio</h2>
  
            <!-- Title -->
            <div class="mb-4">
              <label for="title" class="block text-gray-700 font-bold mb-2">Titolo Annuncio</label>
              <input
                v-model="form.title"
                type="text"
                id="title"
                name="title"
                class="border rounded w-full py-2 px-3 mb-2"
                placeholder="Inserisci il titolo dell'annuncio"
                required
              />
            </div>
  
            <!-- Description -->
            <div class="mb-4">
              <label for="description" class="block text-gray-700 font-bold mb-2">Descrizione</label>
              <textarea
                v-model="form.description"
                id="description"
                name="description"
                class="border rounded w-full py-2 px-3"
                rows="4"
                placeholder="Descrivi l'appartamento"
                required
              ></textarea>
            </div>
  
            <!-- City -->
            <div class="mb-4">
              <label for="city" class="block text-gray-700 font-bold mb-2">Città</label>
              <input
                v-model="form.city"
                type="text"
                id="city"
                name="city"
                class="border rounded w-full py-2 px-3 mb-2"
                placeholder="Inserisci la città"
                required
              />
            </div>

            <!-- Price -->
            <div class="mb-4">
              <label for="price" class="block text-gray-700 font-bold mb-2">Prezzo</label>
              <input
                v-model.number="form.price"
                type="number" 
                id="price"
                name="price"
                class="border rounded w-full py-2 px-3 mb-2"
                placeholder="Inserisci il prezzo"
                required
                min="0"
              />
            </div>

  
            <!-- Image Upload -->
            <div class="mb-4">
              <label for="image" class="block text-gray-700 font-bold mb-2">Carica Immagine</label>
              <input
                type="file"
                id="image"
                @change="handleImageUpload"
                accept="image/*"
                class="border rounded w-full py-2 px-3 mb-2"
              />
            </div>
  
            <div>
              <button
                class="bg-violet-500 hover:bg-violet-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Aggiungi Annuncio
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  </template>
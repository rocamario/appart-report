<script setup>
import { ref } from 'vue';
import axios from 'axios';

// State variables
const isLogin = ref(true);
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const errorMessage = ref('');

// Function to toggle between login and registration forms
const toggleForm = () => {
  isLogin.value = !isLogin.value;
  clearForm();
};

// Function to clear the form fields and error message
const clearForm = () => {
  email.value = '';
  password.value = '';
  confirmPassword.value = '';
  errorMessage.value = '';
};

// Function to handle form submission
const handleSubmit = async () => {
  try {
    if (isLogin.value) {
      // Handle login
      const response = await axios.post('/api/login', {
        email: email.value,
        password: password.value,
      });
      // Handle successful login (e.g., redirect, store token)
      console.log('Login successful:', response.data);
    } else {
      // Handle registration
      if (password.value !== confirmPassword.value) {
        errorMessage.value = 'Passwords do not match';
        return;
      }
      const response = await axios.post('/api/register', {
        email: email.value,
        password: password.value,
      });
      // Handle successful registration (e.g., redirect, show success message)
      console.log('Registration successful:', response.data);
    }
  } catch (error) {
    // Handle error
    errorMessage.value = error.response?.data?.message || 'An error occurred';
  }
};
</script>

<template>
  <section class="bg-violet-700 py-20 mb-4">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div class="text-center">
        <h1 class="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
          {{ isLogin ? 'Login' : 'Registrazione' }}
        </h1>
        <p class="my-4 text-xl text-white">
          {{ isLogin ? 'Accedi al tuo account' : 'Crea un nuovo account' }}
        </p>
      </div>
      <div class="w-full max-w-md">
        <form @submit.prevent="handleSubmit" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
              Email
            </label>
            <input
              v-model="email"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              required
            />
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
              Password
            </label>
            <input
              v-model="password"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              required
            />
          </div>
          <div v-if="!isLogin" class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="confirm-password">
              Conferma Password
            </label>
            <input
              v-model="confirmPassword"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="confirm-password"
              type="password"
              placeholder="******************"
              required
            />
          </div>
          <div v-if="errorMessage" class="mb-4 text-red-500 text-sm">
            {{ errorMessage }}
          </div>
          <div class="flex items-center justify-between">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {{ isLogin ? 'Login' : 'Registrati' }}
            </button>
          </div>
        </form>
        <div class="text-center">
          <p class="text-white">
            {{ isLogin ? 'Non hai un account?' : 'Hai già un account?' }}
            <button
              @click="toggleForm"
              class="text-blue-300 hover:text-blue-500 focus:outline-none"
            >
              {{ isLogin ? 'Registrati' : 'Accedi' }}
            </button>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

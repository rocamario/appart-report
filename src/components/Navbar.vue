<script setup>
import { RouterLink, useRoute } from 'vue-router';
import logo from '@/assets/logo.png';
import { userRole } from '@/userState.js'

const isActiveLink = (routePath) => {
  const route = useRoute();
  return route.path === routePath;
};
</script>

<template>
  <nav class="bg-violet-700 border-b border-violet-500">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="flex h-20 items-center justify-between">
        <div
          class="flex flex-1 items-center justify-center md:items-stretch md:justify-start"
        >
          <!-- Logo -->
          <RouterLink class="flex flex-shrink-0 items-center mr-4" to="/">
            <img class="h-10 w-auto" :src="logo" alt="Appart" />
            <span class="hidden md:block text-white text-2xl font-bold ml-2"
              >Appart</span
            >
          </RouterLink>
          <div class="md:ml-auto">
            <div class="flex space-x-2">
              <RouterLink
                to="/"
                :class="[
                  isActiveLink('/')
                    ? 'bg-violet-900'
                    : 'hover:bg-gray-900 hover:text-white',
                  'text-white',
                  'px-3',
                  'py-2',
                  'rounded-md',
                ]"
                >Home</RouterLink
              >
              <!-- Tenant Links -->
              <template v-if="userRole === 'tenant'">
                <RouterLink
                  to="/myDossier"
                  :class="[
                    isActiveLink('/myDossier')
                      ? 'bg-violet-900'
                      : 'hover:bg-gray-900 hover:text-white',
                    'text-white',
                    'px-3',
                    'py-2',
                    'rounded-md',
                  ]"
                  >Il mio dossier</RouterLink
                >
                <RouterLink
                  to="/apartments"
                  :class="[
                    isActiveLink('/apartments')
                      ? 'bg-violet-900'
                      : 'hover:bg-gray-900 hover:text-white',
                    'text-white',
                    'px-3',
                    'py-2',
                    'rounded-md',
                  ]"
                  >Le mie applications</RouterLink
                >
              </template>

              <!-- Landlord Links -->
              <template v-if="userRole === 'landlord'">
                <RouterLink
                  to="/dossiers"
                  :class="[
                    isActiveLink('/dossiers')
                      ? 'bg-violet-900'
                      : 'hover:bg-gray-900 hover:text-white',
                    'text-white',
                    'px-3',
                    'py-2',
                    'rounded-md',
                  ]"
                  >Dossiers</RouterLink
                >
                <RouterLink
                  to="/apartments"
                  :class="[
                    isActiveLink('/apartments')
                      ? 'bg-violet-900'
                      : 'hover:bg-gray-900 hover:text-white',
                    'text-white',
                    'px-3',
                    'py-2',
                    'rounded-md',
                  ]"
                  >I miei appartamenti</RouterLink
                >
              </template>
              <RouterLink
                  to="/login-register"
                  :class="[
                    isActiveLink('/login-register')
                      ? 'bg-violet-900'
                      : 'hover:bg-gray-900 hover:text-white',
                    'text-white',
                    'px-3',
                    'py-2',
                    'rounded-md',
                  ]"
                  >Accedi</RouterLink
                >
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

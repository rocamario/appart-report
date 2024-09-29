<script setup>
import { RouterLink } from 'vue-router';
import Card from '@/components/Card.vue';
</script>

<template>
    <section class="py-4">
      <div class="container-xl lg:container m-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <Card>
            <h2 class="text-2xl font-bold">Per chi affitta</h2>
            <p class="mt-2 mb-4">
              Crea un appartamento e trova l'inquilino perfetto
            </p>
            <RouterLink
              to="/apartment/add"
              class="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
            >
              Crea appartamento
            </RouterLink>
          </Card>
          <Card bg="bg-violet-100">
            <h2 class="text-2xl font-bold">Per chi cerca casa</h2>
            <p class="mt-2 mb-4">
              Pubblica il tuo dossier e lasciati selezionare da un proprietario
            </p>
            <RouterLink
              to="/dossiers/add"
              class="inline-block bg-violet-500 text-white rounded-lg px-4 py-2 hover:bg-violet-600"
            >
              Crea il tuo dossier
            </RouterLink>
          </Card>
        </div>
      </div>
    </section>
  </template>
  
  
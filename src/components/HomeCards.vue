<script setup>
import { RouterLink } from 'vue-router';
import Card from '@/components/Card.vue';
</script>

<template>
  <section class="py-4">
    <div class="container-xl lg:container m-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
        <Card>
          <h2 class="text-2xl font-bold">Per i proprietari</h2>
          <p class="mt-2 mb-4">
            Sfoglia i dossiers e trova l'inquilino perfetto
          </p>
          <RouterLink
            to="/dossiers"
            class="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
          >
            Sfoglia i dossiers
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
            Aggiungi il tuo dossier
          </RouterLink>
        </Card>
      </div>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import Card from '@/components/Card.vue';
</script>

<template>
  <section class="py-4">
    <div class="container-xl lg:container m-auto">
      <div class="flex justify-center p-4">
        <Card bg="bg-violet-100" class="text-center">
          <h2 class="text-2xl font-bold">Area Riservata</h2>
          <p class="mt-2 mb-4">
            Se hai già un account personale, o se desideri crearne uno, accedi o registrati qui.
          </p>
          <RouterLink
            to="/login-register"
            class="inline-block bg-violet-500 text-white rounded-lg px-4 py-2 hover:bg-violet-600"
          >
          Accedi o Registrati
          </RouterLink>
        </Card>
      </div>
    </div>
  </section>
</template>

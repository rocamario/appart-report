<script setup>
import DossierListings from '@/components/DossierListings.vue';
import { userRole, setUserRole } from '@/userState.js'

setUserRole('landlord');
console.log(userRole.value);

</script>

<template>
  <DossierListings />
</template>

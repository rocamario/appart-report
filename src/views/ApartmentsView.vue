<script setup>
import ApartmentListings from '@/components/ApartmentListings.vue';
import { userRole, setUserRole } from '@/userState.js'

setUserRole('landlord');
console.log(userRole.value);

</script>

<template>
  <ApartmentListings />
</template>

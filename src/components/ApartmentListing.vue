<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  apartment: Object,
});

const showFullDescription = ref(false);

const toggleFullDescription = () => {
  showFullDescription.value = !showFullDescription.value;
};

const truncatedDescription = computed(() => {
  let description = props.apartment.description;
  if (!showFullDescription.value) {
    description = description.substring(0, 90) + '...';
  }
  return description;
});
</script>

<template>
  <div class="bg-white rounded-xl shadow-md relative">
    <div class="p-4">
      <div class="mb-6">
        <h3 class="text-xl font-bold">{{ apartment.title }}</h3>
        <div class="text-gray-600 my-2">
          <img src="../assets/mock_pic.jpeg" alt="Apartment Photo">
        </div>
      </div>

      <div class="mb-5">
        <div>
          {{ truncatedDescription }}
        </div>
        <button
          @click="toggleFullDescription"
          class="text-violet-500 hover:text-violet-600 mb-5"
        >
          {{ showFullDescription ? 'Less' : 'More' }}
        </button>
      </div>

      <div class="mb-6">
        <h3 class="text-xl font-bold">Prezzo: {{ apartment.price }}€</h3>
      </div>

      <div class="border border-gray-100 mb-5"></div>

      <div class="flex justify-between mb-4">
        <div class="text-orange-700 mb-3 flex items-center">
          <i class="pi pi-map-marker text-orange-700"></i>
          <span class="ml-1">{{ apartment.city }}</span>
        </div>

        <RouterLink
          to="/dossiers"
          class="inline-block bg-violet-500 text-white text-sm rounded px-6 py-2"
        >
          Sfoglia i dossiers
        </RouterLink>
      </div>




    </div>
  </div>
</template>

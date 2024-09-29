<script setup>
import { RouterLink } from 'vue-router';
import { ref, computed } from 'vue';

const props = defineProps({
  dossier: Object,
});

const showFullDescription = ref(false);

const toggleFullDescription = () => {
  showFullDescription.value = !showFullDescription.value;
};

const truncatedDescription = computed(() => {
  let description = props.dossier.bio;
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
        <h3 class="text-xl font-bold">{{ dossier.personalInfo.firstName }} {{ dossier.personalInfo.lastName }}</h3>
        <div class="text-gray-600 my-2">{{ dossier.personalInfo.age }} anni</div>
        <div class="text-gray-600 my-2">{{ dossier.searchDetails.leaseTerm }}</div>
        
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
      <!-- TODO: check budget is enough-->
      <h3 class="text-violet-500 mb-2">Budget: Approvato da Appart</h3>

      <div class="border border-gray-100 mb-5"></div>

      <div class="flex flex-col lg:flex-row justify-between mb-4">
        <RouterLink
          :to="'/dossiers/' + dossier.id"
          class="h-[36px] bg-violet-500 hover:bg-violet-600 text-white px-4 py-2 rounded-lg text-center text-sm"
        >
          Apri il dossier
        </RouterLink>
      </div>
    </div>
  </div>
</template>

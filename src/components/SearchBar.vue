<script setup lang="ts">
import { ref, watch } from 'vue';
import { useContactStore } from '../stores/contactStore';

const query = ref('');

const store = useContactStore();

watch(query, newQuery => {
  store.setSearchQuery(newQuery);
});
</script>

<template>
  <div class="mb-4">
    <input
      v-model="query"
      type="text"
      class="p-2 border border-gray-300 rounded w-full"
      placeholder="Поиск по имени контакта"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useContactStore } from './stores/contactStore';

import ContactForm from './components/ContactForm.vue';
import ContactList from './components/ContactList.vue';

const store = useContactStore();

onMounted(() => {
  store.fetchContacts();
});
</script>

<template>
  <main class="max-w-4xl mx-auto p-4">
    <h2 class="text-2xl font-bold mb-4 text-center">Добавить контакт</h2>

    <ContactForm />

    <ContactList />
  </main>
</template>

<style scoped></style>

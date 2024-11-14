<script setup lang="ts">
import { computed } from 'vue';
import { useContactStore } from '../stores/contactStore';
import ContactItem from './ContactItem.vue';
import SearchBar from './SearchBar';

const store = useContactStore();

const contacts = computed(() => store.filteredContacts);
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mt-14 mb-4 text-center">Контакты</h1>
    <SearchBar />
    <div v-if="contacts.length > 0">
      <div v-for="contact in contacts" :key="contact.id">
        <ContactItem :contact="contact" />
      </div>
    </div>
    <div v-else class="text-center text-gray-500">No contacts found.</div>
  </div>
</template>

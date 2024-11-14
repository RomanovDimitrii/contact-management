<script setup lang="ts">
import { ref, watch } from 'vue';
import { useContactStore } from '../stores/contactStore';
import { validateContact, validateField, hasErrors, ValidationErrors } from '../utils/validators';

interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
}

const contact = ref<Contact>({
  id: '',
  name: '',
  phone: '',
  email: ''
});
const isEditing = ref(false);

const errors = ref<ValidationErrors>({ name: '', phone: '', email: '' });

const store = useContactStore();

const handleSubmit = () => {
  errors.value = validateContact(contact.value);
  if (hasErrors(errors.value)) return;

  if (isEditing.value) {
    store.editContact(contact.value);
  } else {
    const newContact = { ...contact.value, id: Date.now().toString() };
    store.addContact(newContact);
  }
  resetForm();
};

const resetForm = () => {
  contact.value = { id: '', name: '', phone: '', email: '' };
  isEditing.value = false;
  errors.value = { name: '', phone: '', email: '' };
};

const edit = (contactToEdit: Contact) => {
  contact.value = { ...contactToEdit };
  isEditing.value = true;
};

watch(
  () => contact.value.name,
  newValue => {
    errors.value.name = validateField('name', newValue);
  }
);

watch(
  () => contact.value.phone,
  newValue => {
    errors.value.phone = validateField('phone', newValue);
  }
);

watch(
  () => contact.value.email,
  newValue => {
    errors.value.email = validateField('email', newValue);
  }
);
</script>

<template>
  <div class="mb-4">
    <form @submit.prevent="handleSubmit" novalidate>
      <div class="mb-2">
        <label for="name" class="block text-sm font-medium text-gray-700">Имя</label>
        <input
          v-model="contact.name"
          type="text"
          id="name"
          class="p-2 border border-gray-300 rounded w-full"
          placeholder="Введите имя"
        />
        <div class="text-sm text-red-500 h-5 mt-1">
          <span>{{ errors.name }}</span>
        </div>
      </div>
      <div class="mb-2">
        <label for="phone" class="block text-sm font-medium text-gray-700">Телефон</label>
        <input
          v-model="contact.phone"
          type="text"
          id="phone"
          class="p-2 border border-gray-300 rounded w-full"
          placeholder="Введите телефон"
        />
        <div class="text-sm text-red-500 h-5 mt-1">
          <span>{{ errors.phone }}</span>
        </div>
      </div>
      <div class="mb-2">
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input
          v-model="contact.email"
          type="text"
          id="email"
          class="p-2 border border-gray-300 rounded w-full"
          placeholder="Введите email"
        />
        <div class="text-sm text-red-500 h-5 mt-1">
          <span>{{ errors.email }}</span>
        </div>
      </div>
      <button type="submit" class="mt-2 p-2 bg-blue-500 text-white rounded w-full">
        {{ isEditing ? 'Обновить контакт' : 'Добавить контакт' }}
      </button>
    </form>
  </div>
</template>

<style scoped>
.text-red-500 {
  min-height: 1.25rem;
  line-height: 1.25rem;
}
</style>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { defineProps } from 'vue';
import { useContactStore } from '../stores/contactStore';
import { validateField, ValidationErrors } from '../utils/validators';

interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
}

const props = defineProps<{
  contact: Contact;
}>();

const store = useContactStore();

const contact = computed(() => {
  return store.contacts.find(c => c.id === props.contact.id) || props.contact;
});

const isEditing = ref(false);

const editData = ref<Contact>({ ...contact.value });

const errors = ref<ValidationErrors>({ name: '', phone: '', email: '' });

watch(
  () => editData.value.name,
  newValue => {
    errors.value.name = validateField('name', newValue);
  }
);

watch(
  () => editData.value.phone,
  newValue => {
    errors.value.phone = validateField('phone', newValue);
  }
);

watch(
  () => editData.value.email,
  newValue => {
    errors.value.email = validateField('email', newValue);
  }
);

const saveContact = () => {
  if (Object.values(errors.value).some(error => error)) return;

  store.editContact(editData.value);
  isEditing.value = false;
};

const cancelEdit = () => {
  editData.value = { ...contact.value };
  errors.value = { name: '', phone: '', email: '' };
  isEditing.value = false;
};

const deleteContact = () => {
  store.deleteContact(contact.value.id);
};
</script>

<template>
  <div class="p-2 border-b">
    <div class="flex justify-between items-center mb-2">
      <div>
        <p class="font-semibold">{{ contact.name }}</p>
        <p class="text-sm text-gray-600">{{ contact.phone }} - {{ contact.email }}</p>
      </div>
      <div>
        <button @click="isEditing = true" class="text-blue-500 mr-2">Edit</button>
        <button @click="deleteContact" class="text-red-500">Delete</button>
      </div>
    </div>

    <transition name="fade-slide">
      <div v-if="isEditing">
        <form @submit.prevent="saveContact" novalidate>
          <div class="mb-2">
            <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
            <input
              v-model="editData.name"
              type="text"
              id="name"
              class="p-2 border border-gray-300 rounded w-full"
              placeholder="Name"
            />
            <div class="text-sm text-red-500 h-5 mt-1">
              <span>{{ errors.name }}</span>
            </div>
          </div>
          <div class="mb-2">
            <label for="phone" class="block text-sm font-medium text-gray-700">Phone</label>
            <input
              v-model="editData.phone"
              type="text"
              id="phone"
              class="p-2 border border-gray-300 rounded w-full"
              placeholder="Phone"
            />
            <div class="text-sm text-red-500 h-5 mt-1">
              <span>{{ errors.phone }}</span>
            </div>
          </div>
          <div class="mb-2">
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input
              v-model="editData.email"
              type="email"
              id="email"
              class="p-2 border border-gray-300 rounded w-full"
              placeholder="Email"
            />
            <div class="text-sm text-red-500 h-5 mt-1">
              <span>{{ errors.email }}</span>
            </div>
          </div>
          <div class="flex justify-end">
            <button type="button" @click="cancelEdit" class="text-gray-500 mr-2">Cancel</button>
            <button type="submit" class="text-blue-500">Save</button>
          </div>
        </form>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.5s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
.text-red-500 {
  min-height: 1.25rem;
  line-height: 1.25rem;
}
</style>

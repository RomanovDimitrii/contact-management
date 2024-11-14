import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
}

export const useContactStore = defineStore('contactStore', () => {
  const contacts = ref<Contact[]>(JSON.parse(localStorage.getItem('contacts') || '[]'));
  const searchQuery = ref<string>('');

  // getters
  const filteredContacts = computed(() => {
    return (
      contacts.value.filter(contact =>
        contact.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      ) || []
    );
  });

  const fetchContacts = async (): Promise<void> => {
    if (contacts.value.length === 0) {
      try {
        const response = await fetch('/mockData.json');
        const data: Contact[] = await response.json();
        contacts.value = data;
        saveContacts(); // Сохраняем в localStorage
      } catch (error) {
        console.error('Ошибка при загрузке контактов:', error);
      }
    }
  };

  // actions
  const addContact = (contact: Contact): void => {
    contacts.value.push(contact);
    saveContacts();
  };

  const editContact = (updatedContact: Contact): void => {
    const index = contacts.value.findIndex(contact => contact.id === updatedContact.id);
    if (index !== -1) {
      contacts.value[index] = updatedContact;
      saveContacts();
    }
  };

  const deleteContact = (id: string): void => {
    contacts.value = contacts.value.filter(contact => contact.id !== id);
    saveContacts();
  };

  const setSearchQuery = (query: string): void => {
    searchQuery.value = query;
  };

  // localStorage
  const saveContacts = (): void => {
    localStorage.setItem('contacts', JSON.stringify(contacts.value));
  };

  return {
    contacts,
    searchQuery,
    filteredContacts,
    fetchContacts,
    addContact,
    editContact,
    deleteContact,
    setSearchQuery
  };
});

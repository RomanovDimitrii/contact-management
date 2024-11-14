export interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
}

export interface ValidationErrors {
  name: string;
  phone: string;
  email: string;
}

export const validateContact = (contact: Partial<Contact>): ValidationErrors => {
  const errors: ValidationErrors = { name: '', phone: '', email: '' };

  if (!contact.name) {
    errors.name = 'Имя обязательно для заполнения.';
  }

  if (!contact.phone) {
    errors.phone = 'Телефон обязателен для заполнения.';
  } else if (!/^\+?[0-9]{7,15}$/.test(contact.phone)) {
    errors.phone = 'Введите корректный номер телефона.';
  }

  if (!contact.email) {
    errors.email = 'Email обязателен для заполнения.';
  } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(contact.email)) {
    errors.email = 'Введите корректный email.';
  }

  return errors;
};

export const hasErrors = (errors: ValidationErrors): boolean => {
  return !!(errors.name || errors.phone || errors.email);
};

export const validateField = (field: keyof Contact, value: string): string => {
  switch (field) {
    case 'name':
      if (!value) {
        return 'Имя обязательно для заполнения.';
      }
      break;
    case 'phone':
      if (!value) {
        return 'Телефон обязателен для заполнения.';
      } else if (!/^\+?[0-9]{7,15}$/.test(value)) {
        return 'Введите корректный номер телефона.';
      }
      break;
    case 'email':
      if (!value) {
        return 'Email обязателен для заполнения.';
      } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
        return 'Введите корректный email.';
      }
      break;
    default:
      return '';
  }
  return '';
};

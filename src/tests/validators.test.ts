import { validateContact, hasErrors } from '../utils/validators';
import { describe, it, expect } from 'vitest';

describe('validators', () => {
  it('should validate a valid contact', () => {
    const contact = {
      id: '1',
      name: 'Фред Дерст',
      phone: '+7895645334',
      email: 'paparoach@gmail.com'
    };
    const errors = validateContact(contact);

    expect(hasErrors(errors)).toBe(false);
  });

  it('should return errors for empty fields', () => {
    const contact = { id: '1', name: '', phone: '', email: '' };
    const errors = validateContact(contact);

    expect(errors.name).toBe('Имя обязательно для заполнения.');
    expect(errors.phone).toBe('Телефон обязателен для заполнения.');
    expect(errors.email).toBe('Email обязателен для заполнения.');
  });

  it('should return error for invalid email', () => {
    const contact = { id: '1', name: 'Фред Дерст', phone: '+7895645334', email: 'invalid-email' };
    const errors = validateContact(contact);

    expect(errors.email).toBe('Введите корректный email.');
  });
});

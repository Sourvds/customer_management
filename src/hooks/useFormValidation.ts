import { useState, useCallback } from 'react';
import type { CustomerFormData } from '../types';
import { validateEmail, validatePhoneNumber } from '../utils';

export interface FormErrors {
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
}

export const useFormValidation = () => {
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = useCallback((data: Partial<CustomerFormData>): boolean => {
    const newErrors: FormErrors = {};

    if (!data.fullName?.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (data.fullName.length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    } else if (data.fullName.length > 50) {
      newErrors.fullName = 'Full name must not exceed 50 characters';
    }

    if (!data.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(data.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!data.phoneNumber?.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!validatePhoneNumber(data.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }

    if (!data.address?.trim()) {
      newErrors.address = 'Address is required';
    } else if (data.address.length < 5) {
      newErrors.address = 'Address must be at least 5 characters';
    } else if (data.address.length > 100) {
      newErrors.address = 'Address must not exceed 100 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, []);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const setFieldError = useCallback((field: keyof FormErrors, error: string) => {
    setErrors((prev) => ({
      ...prev,
      [field]: error,
    }));
  }, []);

  return {
    errors,
    validateForm,
    clearErrors,
    setFieldError,
  };
};

export default useFormValidation;

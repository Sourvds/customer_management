import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import useCustomerStore from '../store/customerStore';
import useFormValidation from '../hooks/useFormValidation';
import type { Customer, CustomerFormData } from '../types';
import toast from 'react-hot-toast';
import styles from './CustomerForm.module.css';

interface CustomerFormProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Customer;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ isOpen, onClose, initialData }) => {
  const { addCustomer, updateCustomer, setEditingCustomerId, customers } = useCustomerStore();
  const { errors, validateForm, clearErrors } = useFormValidation();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<CustomerFormData>({
    fullName: '',
    email: '',
    phoneNumber: '',
    address: '',
  });

  // Autofill suggestions
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (initialData) {
      setFormData({
        fullName: initialData.fullName,
        email: initialData.email,
        phoneNumber: initialData.phoneNumber,
        address: initialData.address,
      });
    } else {
      setFormData({
        fullName: '',
        email: '',
        phoneNumber: '',
        address: '',
      });
    }
    clearErrors();
  }, [initialData, isOpen, clearErrors]);

  // Lock/unlock body scroll when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Generate suggestions for name field
    if (name === 'fullName' && value.length > 0) {
      const matching = customers
        .filter((c) => c.fullName.toLowerCase().startsWith(value.toLowerCase()) && c.fullName !== value)
        .map((c) => c.fullName)
        .slice(0, 3);
      setSuggestions(matching);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setFormData((prev) => ({
      ...prev,
      fullName: suggestion,
    }));
    setSuggestions([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm(formData)) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      if (initialData) {
        updateCustomer(initialData.id, formData);
        toast.success('Customer updated successfully!');
        setEditingCustomerId(null);
      } else {
        addCustomer(formData);
        toast.success('Customer added successfully!');
      }

      handleClose();
    } catch (error) {
      toast.error('Failed to save customer');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      fullName: '',
      email: '',
      phoneNumber: '',
      address: '',
    });
    setSuggestions([]);
    clearErrors();
    onClose();
  };

  // Handle ESC key press
  useEffect(() => {
    const handleEscPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isLoading) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscPress);
    }

    return () => {
      document.removeEventListener('keydown', handleEscPress);
    };
  }, [isOpen, isLoading]);

  if (!isOpen) return null;

  // Render modal at document body level using Portal
  return createPortal(
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Form Modal */}
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
        <div className={styles.header}>
          <h2 id="modal-title">{initialData ? 'Edit Customer' : 'Add New Customer'}</h2>
          <button
            className={styles.closeBtn}
            onClick={handleClose}
            aria-label="Close form"
            disabled={isLoading}
          >
            <FiX size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          {/* Full Name */}
          <div className={styles.formGroup}>
            <label htmlFor="fullName" className={styles.label}>
              Full Name <span className={styles.required}>*</span>
            </label>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter customer name"
                className={`${styles.input} ${errors.fullName ? styles.error : ''}`}
                disabled={isLoading}
                autoComplete="name"
                aria-invalid={errors.fullName ? 'true' : 'false'}
                aria-describedby={errors.fullName ? 'fullName-error' : undefined}
              />
              {suggestions.length > 0 && (
                <ul className={styles.suggestions}>
                  {suggestions.map((suggestion) => (
                    <li key={suggestion} onClick={() => handleSuggestionClick(suggestion)}>
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {errors.fullName && (
              <span id="fullName-error" className={styles.errorMessage}>
                {errors.fullName}
              </span>
            )}
          </div>

          {/* Email */}
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email <span className={styles.required}>*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter email address"
              className={`${styles.input} ${errors.email ? styles.error : ''}`}
              disabled={isLoading}
              autoComplete="email"
                aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <span id="email-error" className={styles.errorMessage}>
                {errors.email}
              </span>
            )}
          </div>

          {/* Phone Number */}
          <div className={styles.formGroup}>
            <label htmlFor="phoneNumber" className={styles.label}>
              Phone Number <span className={styles.required}>*</span>
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Enter phone number"
              className={`${styles.input} ${errors.phoneNumber ? styles.error : ''}`}
              disabled={isLoading}
              autoComplete="tel"
                aria-invalid={errors.phoneNumber ? 'true' : 'false'}
              aria-describedby={errors.phoneNumber ? 'phoneNumber-error' : undefined}
            />
            {errors.phoneNumber && (
              <span id="phoneNumber-error" className={styles.errorMessage}>
                {errors.phoneNumber}
              </span>
            )}
          </div>

          {/* Address */}
          <div className={styles.formGroup}>
            <label htmlFor="address" className={styles.label}>
              Address <span className={styles.required}>*</span>
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Enter customer address"
              className={`${styles.input} ${styles.textarea} ${errors.address ? styles.error : ''}`}
              disabled={isLoading}
              autoComplete="street-address"
              rows={3}
                aria-invalid={errors.address ? 'true' : 'false'}
              aria-describedby={errors.address ? 'address-error' : undefined}
            />
            {errors.address && (
              <span id="address-error" className={styles.errorMessage}>
                {errors.address}
              </span>
            )}
          </div>

          {/* Actions */}
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button type="submit" className={styles.submitBtn} disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className={styles.spinner} />
                  Saving...
                </>
              ) : (
                initialData ? 'Update Customer' : 'Add Customer'
              )}
            </button>
          </div>
        </form>
      </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default CustomerForm;

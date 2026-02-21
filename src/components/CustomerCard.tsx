import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiEdit2, FiTrash2, FiCheck, FiX } from 'react-icons/fi';
import useCustomerStore from '../store/customerStore';
import type { Customer } from '../types';
import Avatar from './Avatar';
import styles from './CustomerCard.module.css';
import toast from 'react-hot-toast';

interface CustomerCardProps {
  customer: Customer;
  onEdit: (customer: Customer) => void;
  onDelete: (customer: Customer) => void;
  onView?: (customer: Customer) => void;
}

const CustomerCard: React.FC<CustomerCardProps> = ({ customer, onDelete, onView }) => {
  const { updateCustomer } = useCustomerStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(customer);

  useEffect(() => {
    setEditData(customer);
  }, [customer]);

  const handleInlineEdit = (field: keyof Customer, value: string) => {
    setEditData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveInlineEdit = () => {
    if (!editData.fullName.trim() || !editData.email.trim() || !editData.phoneNumber.trim()) {
      toast.error('All fields are required');
      return;
    }

    updateCustomer(customer.id, editData);
    setIsEditing(false);
    toast.success('Customer updated!');
  };

  const handleCancel = () => {
    setEditData(customer);
    setIsEditing(false);
  };

  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      layout
    >
      <div className={styles.header}>
        <div className={styles.avatar}>
          <Avatar fullName={customer.fullName} size="md" />
        </div>
        <div className={styles.actions}>
          {isEditing ? (
            <>
              <button
                className={styles.actionBtn}
                onClick={handleSaveInlineEdit}
                title="Save changes"
                aria-label="Save changes"
              >
                <FiCheck />
              </button>
              <button
                className={styles.actionBtn}
                onClick={handleCancel}
                title="Cancel editing"
                aria-label="Cancel editing"
              >
                <FiX />
              </button>
            </>
          ) : (
            <>
              <button
                className={styles.actionBtn}
                onClick={() => setIsEditing(true)}
                title="Inline edit"
                aria-label="Inline edit"
              >
                <FiEdit2 />
              </button>
              <button
                className={`${styles.actionBtn} ${styles.danger}`}
                onClick={() => onDelete(customer)}
                title="Delete customer"
                aria-label="Delete customer"
              >
                <FiTrash2 />
              </button>
            </>
          )}
        </div>
      </div>

      <div className={styles.content}>
        {isEditing ? (
          <>
            <div className={styles.editField}>
              <label>Name</label>
              <input
                type="text"
                value={editData.fullName}
                onChange={(e) => handleInlineEdit('fullName', e.target.value)}
                className={styles.editInput}
              />
            </div>
            <div className={styles.editField}>
              <label>Email</label>
              <input
                type="email"
                value={editData.email}
                onChange={(e) => handleInlineEdit('email', e.target.value)}
                className={styles.editInput}
              />
            </div>
            <div className={styles.editField}>
              <label>Phone</label>
              <input
                type="tel"
                value={editData.phoneNumber}
                onChange={(e) => handleInlineEdit('phoneNumber', e.target.value)}
                className={styles.editInput}
              />
            </div>
            <div className={styles.editField}>
              <label>Address</label>
              <input
                type="text"
                value={editData.address}
                onChange={(e) => handleInlineEdit('address', e.target.value)}
                className={styles.editInput}
              />
            </div>
          </>
        ) : (
          <>
            <h3 className={styles.name}>{customer.fullName}</h3>
            <div className={styles.field}>
              <span className={styles.label}>Email:</span>
              <a href={`mailto:${customer.email}`} className={styles.value}>
                {customer.email}
              </a>
            </div>
            <div className={styles.field}>
              <span className={styles.label}>Phone:</span>
              <a href={`tel:${customer.phoneNumber}`} className={styles.value}>
                {customer.phoneNumber}
              </a>
            </div>
            <div className={styles.field}>
              <span className={styles.label}>Address:</span>
              <p className={styles.value}>{customer.address}</p>
            </div>
            <div className={styles.field}>
              <span className={styles.label}>ID:</span>
              <span className={styles.id}>{customer.id}</span>
            </div>
          </>
        )}
      </div>

      {!isEditing && (
        <button className={styles.viewBtn} onClick={() => onView?.(customer)}>
          View Details →
        </button>
      )}
    </motion.div>
  );
};

export default CustomerCard;

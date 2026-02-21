import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiEdit2, FiTrash2, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import type { Customer } from '../types';
import Avatar from './Avatar';
import { formatDate } from '../utils';
import styles from './CustomerDetailView.module.css';

interface CustomerDetailViewProps {
  customer: Customer | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (customer: Customer) => void;
  onDelete: (customer: Customer) => void;
}

const CustomerDetailView: React.FC<CustomerDetailViewProps> = ({
  customer,
  isOpen,
  onClose,
  onEdit,
  onDelete,
}) => {
  if (!isOpen || !customer) return null;

  return (
    <>
      {/* Backdrop */}
      <motion.div
        className={styles.backdrop}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Detail Panel */}
      <motion.div
        className={styles.detailPanel}
        initial={{ x: 400, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 400, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        {/* Header */}
        <div className={styles.header}>
          <button
            className={styles.backBtn}
            onClick={onClose}
            aria-label="Go back"
          >
            <FiArrowLeft />
          </button>
          <h2>Customer Details</h2>
          <div className={styles.actions}>
            <button
              className={styles.actionBtn}
              onClick={() => onEdit(customer)}
              title="Edit customer"
              aria-label="Edit customer"
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
          </div>
        </div>

        {/* Content */}
        <div className={styles.content}>
          {/* Avatar & Name */}
          <div className={styles.profileSection}>
            <Avatar fullName={customer.fullName} size="lg" />
            <h1 className={styles.name}>{customer.fullName}</h1>
            <p className={styles.id}>{customer.id}</p>
          </div>

          {/* Details */}
          <div className={styles.detailsSection}>
            <h3 className={styles.sectionTitle}>Contact Information</h3>

            <div className={styles.detailItem}>
              <FiMail className={styles.icon} />
              <div className={styles.detailContent}>
                <p className={styles.label}>Email</p>
                <a href={`mailto:${customer.email}`} className={styles.value}>
                  {customer.email}
                </a>
              </div>
            </div>

            <div className={styles.detailItem}>
              <FiPhone className={styles.icon} />
              <div className={styles.detailContent}>
                <p className={styles.label}>Phone Number</p>
                <a href={`tel:${customer.phoneNumber}`} className={styles.value}>
                  {customer.phoneNumber}
                </a>
              </div>
            </div>

            <div className={styles.detailItem}>
              <FiMapPin className={styles.icon} />
              <div className={styles.detailContent}>
                <p className={styles.label}>Address</p>
                <p className={styles.value}>{customer.address}</p>
              </div>
            </div>

            <div className={styles.detailItem}>
              <span className={styles.icon}>📅</span>
              <div className={styles.detailContent}>
                <p className={styles.label}>Date Added</p>
                <p className={styles.value}>{formatDate(customer.createdDate)}</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className={styles.quickActions}>
            <button className={styles.quickActionBtn}>
              <FiMail /> Send Email
            </button>
            <button className={styles.quickActionBtn}>
              <FiPhone /> Call Customer
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default CustomerDetailView;

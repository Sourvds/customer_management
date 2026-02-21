import React, { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiRotateCcw } from 'react-icons/fi';
import useCustomerStore from '../store/customerStore';
import {
  Navbar,
  CustomerForm,
  CustomerList,
  SearchBar,
  FilterDropdown,
  ConfirmModal,
  DashboardStats,
  CustomerDetailView,
} from '../components';
import type { Customer } from '../types';
import toast from 'react-hot-toast';
import styles from './HomePage.module.css';

const HomePage: React.FC = () => {
  const {
    deleteCustomer,
    setFormOpen,
    isFormOpen,
    setEditingCustomerId,
    deletedCustomers,
    undoDelete,
    loadCustomers,
    isLoading,
  } = useCustomerStore();

  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isDetailViewOpen, setIsDetailViewOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState<Customer | null>(null);

  // Load customers from API on component mount
  useEffect(() => {
    loadCustomers();
  }, [loadCustomers]);

  const handleAddCustomer = useCallback(() => {
    setEditingCustomer(null);
    setEditingCustomerId(null);
    setFormOpen(true);
  }, [setFormOpen, setEditingCustomerId]);

  const handleEditCustomer = useCallback((customer: Customer) => {
    setEditingCustomer(customer);
    setEditingCustomerId(customer.id);
    setFormOpen(true);
  }, [setFormOpen, setEditingCustomerId]);

  const handleDeleteCustomer = useCallback((customer: Customer) => {
    setCustomerToDelete(customer);
    setDeleteConfirmOpen(true);
  }, []);

  const confirmDelete = useCallback(() => {
    if (customerToDelete) {
      deleteCustomer(customerToDelete.id);
      toast.success(`${customerToDelete.fullName} deleted successfully!`);
      setDeleteConfirmOpen(false);
      setCustomerToDelete(null);
      setIsDetailViewOpen(false);
    }
  }, [customerToDelete, deleteCustomer]);

  const handleViewCustomer = useCallback((customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDetailViewOpen(true);
  }, []);

  const handleCloseForm = useCallback(() => {
    setFormOpen(false);
    setEditingCustomer(null);
    setEditingCustomerId(null);
  }, [setFormOpen, setEditingCustomerId]);

  const handleUndoDelete = useCallback(() => {
    undoDelete();
    toast.success('Customer restored!');
  }, [undoDelete]);

  return (
    <div className={styles.page}>
      <Navbar />

      <div className={styles.container}>
        {/* Header with Stats */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className={styles.title}>Customer Management</h1>
          <p className={styles.subtitle}>Manage and organize your customer database efficiently</p>
        </motion.div>

        {/* Dashboard Stats */}
        <DashboardStats />

        {/* Search & Filter Bar */}
        <motion.div
          className={styles.controls}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <SearchBar />
          <div className={styles.actions}>
            <FilterDropdown />
            {deletedCustomers.length > 0 && (
              <button
                className={styles.undoBtn}
                onClick={handleUndoDelete}
                title="Restore last deleted customer"
                aria-label="Undo delete"
              >
                <FiRotateCcw /> Undo Delete
              </button>
            )}
            <button
              className={styles.addBtn}
              onClick={handleAddCustomer}
              aria-label="Add new customer"
            >
              <FiPlus /> Add Customer
            </button>
          </div>
        </motion.div>

        {/* Customer List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <CustomerList
            onEdit={handleEditCustomer}
            onDelete={handleDeleteCustomer}
            onView={handleViewCustomer}
          />
        </motion.div>
      </div>

      {/* Modals & Panels */}
      <CustomerForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        initialData={editingCustomer || undefined}
      />

      <ConfirmModal
        isOpen={deleteConfirmOpen}
        title="Delete Customer?"
        message={`Are you sure you want to delete ${customerToDelete?.fullName}? This action can be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        isDangerous
        onConfirm={confirmDelete}
        onCancel={() => {
          setDeleteConfirmOpen(false);
          setCustomerToDelete(null);
        }}
      />

      <CustomerDetailView
        customer={selectedCustomer}
        isOpen={isDetailViewOpen}
        onClose={() => setIsDetailViewOpen(false)}
        onEdit={handleEditCustomer}
        onDelete={handleDeleteCustomer}
      />
    </div>
  );
};

export default HomePage;

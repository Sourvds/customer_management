import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import useCustomerStore from '../store/customerStore';
import type { Customer } from '../types';
import { searchCustomers, sortCustomers, paginateCustomers } from '../utils';
import CustomerCard from './CustomerCard';
import EmptyState from './EmptyState';
import styles from './CustomerList.module.css';

interface CustomerListProps {
  onEdit: (customer: Customer) => void;
  onDelete: (customer: Customer) => void;
  onView?: (customer: Customer) => void;
}

const CustomerList: React.FC<CustomerListProps> = ({ onEdit, onDelete, onView }) => {
  const {
    customers,
    searchTerm,
    sortOption,
    currentPage,
    pageSize,
    setCurrentPage,
    reorderCustomers,
  } = useCustomerStore();

  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);

  // Process customers
  const processedCustomers = useMemo(() => {
    let result = [...customers];
    result = searchCustomers(result, searchTerm);
    result = sortCustomers(result, sortOption.by, sortOption.order);
    return result;
  }, [customers, searchTerm, sortOption]);

  const { data: paginatedCustomers, pages } = useMemo(() => {
    return paginateCustomers(processedCustomers, currentPage, pageSize);
  }, [processedCustomers, currentPage, pageSize]);

  // Drag & Drop handlers
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, customerId: string) => {
    setDraggedId(customerId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, customerId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverId(customerId);
  };

  const handleDragLeave = () => {
    setDragOverId(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetId: string) => {
    e.preventDefault();
    if (!draggedId || draggedId === targetId) return;

    const draggedIndex = processedCustomers.findIndex((c) => c.id === draggedId);
    const targetIndex = processedCustomers.findIndex((c) => c.id === targetId);

    if (draggedIndex === -1 || targetIndex === -1) return;

    const newOrder = [...processedCustomers];
    [newOrder[draggedIndex], newOrder[targetIndex]] = [newOrder[targetIndex], newOrder[draggedIndex]];

    reorderCustomers(newOrder);
    setDraggedId(null);
    setDragOverId(null);
  };

  if (customers.length === 0) {
    return (
      <EmptyState
        title="No Customers Yet"
        message="Start by adding your first customer to manage their information."
        icon="👤"
      />
    );
  }

  if (processedCustomers.length === 0) {
    return (
      <EmptyState
        title="No Results"
        message="Try adjusting your search or filters to find what you're looking for."
        icon="🔍"
      />
    );
  }

  return (
    <div className={styles.listContainer}>
      {/* Cards Grid */}
      <div className={styles.grid}>
        <AnimatePresence mode="popLayout">
          {paginatedCustomers.map((customer) => (
            <div
              key={customer.id}
              draggable
              onDragStart={(e) => handleDragStart(e, customer.id)}
              onDragOver={(e) => handleDragOver(e, customer.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, customer.id)}
              className={`${styles.cardWrapper} ${
                dragOverId === customer.id ? styles.dragOver : ''
              } ${draggedId === customer.id ? styles.dragging : ''}`}
            >
              <CustomerCard
                customer={customer}
                onEdit={onEdit}
                onDelete={onDelete}
                onView={onView}
              />
            </div>
          ))}
        </AnimatePresence>
      </div>

      {/* Pagination */}
      {pages > 1 && (
        <motion.div
          className={styles.pagination}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <button
            className={styles.paginationBtn}
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            <FiChevronLeft /> Previous
          </button>

          <div className={styles.pageInfo}>
            Page <span>{currentPage}</span> of <span>{pages}</span>
          </div>

          <button
            className={styles.paginationBtn}
            onClick={() => setCurrentPage(Math.min(pages, currentPage + 1))}
            disabled={currentPage === pages}
            aria-label="Next page"
          >
            Next <FiChevronRight />
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default CustomerList;

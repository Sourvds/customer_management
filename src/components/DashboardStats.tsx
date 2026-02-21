import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import useCustomerStore from '../store/customerStore';
import styles from './DashboardStats.module.css';

const DashboardStats: React.FC = () => {
  const { customers, deletedCustomers } = useCustomerStore();

  const stats = useMemo(() => {
    const total = customers.length;
    const recentDays = 7;
    const recentDate = new Date();
    recentDate.setDate(recentDate.getDate() - recentDays);

    const recent = customers.filter((c) => new Date(c.createdDate) > recentDate).length;

    return {
      total,
      recent,
      hasDeleted: deletedCustomers.length > 0,
      deletedCount: deletedCustomers.length,
    };
  }, [customers, deletedCustomers]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className={styles.statsContainer}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className={styles.statCard} variants={itemVariants}>
        <div className={styles.statIcon}>👥</div>
        <div className={styles.statContent}>
          <p className={styles.statLabel}>Total Customers</p>
          <p className={styles.statValue}>{stats.total}</p>
        </div>
      </motion.div>

      <motion.div className={styles.statCard} variants={itemVariants}>
        <div className={styles.statIcon}>✨</div>
        <div className={styles.statContent}>
          <p className={styles.statLabel}>Added This Week</p>
          <p className={styles.statValue}>{stats.recent}</p>
        </div>
      </motion.div>

      {stats.hasDeleted && (
        <motion.div className={`${styles.statCard} ${styles.warning}`} variants={itemVariants}>
          <div className={styles.statIcon}>🗑️</div>
          <div className={styles.statContent}>
            <p className={styles.statLabel}>Undo Available</p>
            <p className={styles.statValue}>{stats.deletedCount}</p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default DashboardStats;

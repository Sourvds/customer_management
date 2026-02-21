import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ConfirmModal.module.css';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDangerous?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isDangerous = false,
  onConfirm,
  onCancel,
  isLoading = false,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            role="alertdialog"
            aria-labelledby="modal-title"
            aria-describedby="modal-message"
          >
            <div className={styles.content}>
              <h2 id="modal-title" className={styles.title}>
                {title}
              </h2>
              <p id="modal-message" className={styles.message}>
                {message}
              </p>

              <div className={styles.actions}>
                <button
                  className={styles.cancelBtn}
                  onClick={onCancel}
                  disabled={isLoading}
                  aria-label={cancelText}
                >
                  {cancelText}
                </button>
                <button
                  className={`${styles.confirmBtn} ${isDangerous ? styles.dangerous : ''}`}
                  onClick={onConfirm}
                  disabled={isLoading}
                  aria-label={confirmText}
                >
                  {isLoading ? (
                    <>
                      <span className={styles.spinner} />
                      Processing...
                    </>
                  ) : (
                    confirmText
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;

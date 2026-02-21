import React, { useState } from 'react';
import { FiMenu, FiX, FiDownload, FiUpload } from 'react-icons/fi';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import useCustomerStore from '../store/customerStore';
import { exportToCSV, importFromCSV } from '../utils';
import toast from 'react-hot-toast';
import styles from './Navbar.module.css';

interface NavbarProps {
  onMenuToggle?: (isOpen: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuToggle }) => {
  const { isDarkMode, toggleDarkMode, customers, importCustomers } = useCustomerStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const toggleMenu = () => {
    const newState = !isMenuOpen;
    setIsMenuOpen(newState);
    onMenuToggle?.(newState);
  };

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      exportToCSV(customers);
      toast.success('Customers exported to CSV successfully!');
      setIsExporting(false);
    }, 500);
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const imported = await importFromCSV(file);
      importCustomers(imported);
      toast.success(`Imported ${imported.length} customers!`);
    } catch (error) {
      toast.error('Failed to import CSV file');
      console.error(error);
    }

    // Reset input
    event.target.value = '';
  };

  const handleThemeToggle = () => {
    toggleDarkMode();
    const html = document.documentElement;
    const newTheme = !isDarkMode ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* Logo */}
        <div className={styles.logo}>
          <div className={styles.logoIcon}>👥</div>
          <h1>CRM Pro</h1>
        </div>

        {/* Desktop Menu */}
        <div className={styles.desktopMenu}>
          <div className={styles.actions}>
            <button
              className={styles.iconBtn}
              onClick={handleExport}
              disabled={customers.length === 0 || isExporting}
              title="Export to CSV"
              aria-label="Export customers to CSV"
            >
              <FiDownload />
            </button>

            <label className={styles.iconBtn} title="Import from CSV" aria-label="Import customers from CSV">
              <FiUpload />
              <input
                type="file"
                accept=".csv"
                onChange={handleImport}
                className={styles.hiddenInput}
                aria-label="CSV file input"
              />
            </label>

            <button
              className={styles.iconBtn}
              onClick={handleThemeToggle}
              title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-label="Toggle theme"
            >
              {isDarkMode ? <MdLightMode /> : <MdDarkMode />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={styles.mobileMenuBtn}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen ? 'true' : 'false'}
        >
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <button
            className={styles.mobileAction}
            onClick={() => {
              handleExport();
              setIsMenuOpen(false);
            }}
            disabled={customers.length === 0}
          >
            <FiDownload /> Export to CSV
          </button>

          <label className={styles.mobileAction}>
            <FiUpload /> Import from CSV
            <input
              type="file"
              accept=".csv"
              onChange={(e) => {
                handleImport(e);
                setIsMenuOpen(false);
              }}
              className={styles.hiddenInput}
            />
          </label>

          <button className={styles.mobileAction} onClick={() => {
            handleThemeToggle();
            setIsMenuOpen(false);
          }}>
            {isDarkMode ? <MdLightMode /> : <MdDarkMode />}
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

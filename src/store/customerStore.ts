import { create } from 'zustand';
import type { Customer, DeletedCustomer, SortOption } from '../types';
import * as customerAPI from '../services/customerAPI';
import toast from 'react-hot-toast';

interface CustomerStore {
  // Customer data
  customers: Customer[];
  deletedCustomers: DeletedCustomer[];
  
  // UI state
  searchTerm: string;
  filterType: 'all' | 'recent' | 'alphabetical';
  sortOption: SortOption;
  currentPage: number;
  pageSize: number;
  isDarkMode: boolean;
  isLoading: boolean;
  
  // View state
  selectedCustomerId: string | null;
  isFormOpen: boolean;
  editingCustomerId: string | null;
  
  // Actions - Customers (API)
  loadCustomers: () => Promise<void>;
  addCustomer: (customer: Omit<Customer, 'id' | 'createdDate' | 'avatar'>) => Promise<void>;
  updateCustomer: (id: string, updates: Partial<Customer>) => Promise<void>;
  deleteCustomer: (id: string) => Promise<void>;
  undoDelete: () => Promise<void>;
  getCustomer: (id: string) => Customer | undefined;
  
  // Actions - Search & Filter
  setSearchTerm: (term: string) => void;
  setFilterType: (type: 'all' | 'recent' | 'alphabetical') => void;
  setSortOption: (option: SortOption) => void;
  
  // Actions - Pagination
  setCurrentPage: (page: number) => void;
  setPageSize: (size: number) => void;
  
  // Actions - UI
  setDarkMode: (isDark: boolean) => void;
  toggleDarkMode: () => void;
  setSelectedCustomerId: (id: string | null) => void;
  setFormOpen: (isOpen: boolean) => void;
  setEditingCustomerId: (id: string | null) => void;
  
  // Actions - Bulk operations
  reorderCustomers: (customers: Customer[]) => void;
  importCustomers: (customers: Array<Omit<Customer, 'id' | 'createdDate' | 'avatar'>>) => Promise<void>;
}

const useCustomerStore = create<CustomerStore>((set, get) => ({
  // Initial state
  customers: [],
  deletedCustomers: [],
  searchTerm: '',
  filterType: 'all',
  sortOption: { by: 'date', order: 'desc' },
  currentPage: 1,
  pageSize: 10,
  isDarkMode: localStorage.getItem('theme') === 'dark' || false,
  isLoading: false,
  selectedCustomerId: null,
  isFormOpen: false,
  editingCustomerId: null,

  // Load customers from API
  loadCustomers: async () => {
    try {
      set({ isLoading: true });
      const response = await customerAPI.fetchCustomers();
      if (response.success) {
        // Convert API data to UI format
        const customers = response.data.map((customer: any) => ({
          id: customer._id,
          fullName: customer.fullName,
          email: customer.email,
          phoneNumber: customer.phoneNumber,
          address: customer.address,
          createdDate: customer.createdAt,
          avatar: customer.fullName,
        }));
        set({ customers });
      }
    } catch (error) {
      console.error('Failed to load customers:', error);
      toast.error('Failed to load customers');
    } finally {
      set({ isLoading: false });
    }
  },

  // Add customer via API
  addCustomer: async (customerData) => {
    try {
      set({ isLoading: true });
      const response = await customerAPI.createCustomer({
        fullName: customerData.fullName,
        email: customerData.email,
        phoneNumber: customerData.phoneNumber,
        address: customerData.address,
      });

      if (response.success) {
        const newCustomer = {
          id: response.data._id,
          fullName: response.data.fullName,
          email: response.data.email,
          phoneNumber: response.data.phoneNumber,
          address: response.data.address,
          createdDate: response.data.createdAt,
          avatar: response.data.fullName,
        };
        set((state) => ({
          customers: [newCustomer, ...state.customers],
        }));
        toast.success('Customer added successfully!');
      }
    } catch (error: any) {
      console.error('Failed to add customer:', error);
      toast.error(error.message || 'Failed to add customer');
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // Update customer via API
  updateCustomer: async (id, updates) => {
    try {
      set({ isLoading: true });
      const response = await customerAPI.updateCustomer(id, {
        fullName: updates.fullName,
        email: updates.email,
        phoneNumber: updates.phoneNumber,
        address: updates.address,
      });

      if (response.success) {
        set((state) => ({
          customers: state.customers.map((c) =>
            c.id === id
              ? {
                  ...c,
                  fullName: response.data.fullName,
                  email: response.data.email,
                  phoneNumber: response.data.phoneNumber,
                  address: response.data.address,
                }
              : c
          ),
        }));
        toast.success('Customer updated successfully!');
      }
    } catch (error: any) {
      console.error('Failed to update customer:', error);
      toast.error(error.message || 'Failed to update customer');
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // Delete customer via API
  deleteCustomer: async (id) => {
    try {
      set({ isLoading: true });
      const customer = get().customers.find((c) => c.id === id);
      if (!customer) return;

      const response = await customerAPI.deleteCustomer(id);
      if (response.success) {
        set((state) => ({
          customers: state.customers.filter((c) => c.id !== id),
          deletedCustomers: [
            { ...customer, deletedAt: new Date().toISOString() },
            ...state.deletedCustomers,
          ].slice(0, 5),
        }));
        toast.success('Customer deleted successfully!');
      }
    } catch (error: any) {
      console.error('Failed to delete customer:', error);
      toast.error(error.message || 'Failed to delete customer');
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // Undo delete - restore to database
  undoDelete: async () => {
    try {
      const { deletedCustomers } = get();
      if (deletedCustomers.length === 0) return;

      const [lastDeleted, ...remaining] = deletedCustomers;
      const { deletedAt, ...customerData } = lastDeleted;

      // Recreate in database
      const response = await customerAPI.createCustomer({
        fullName: customerData.fullName,
        email: customerData.email,
        phoneNumber: customerData.phoneNumber,
        address: customerData.address,
      });

      if (response.success) {
        const restoredCustomer = {
          id: response.data._id,
          fullName: response.data.fullName,
          email: response.data.email,
          phoneNumber: response.data.phoneNumber,
          address: response.data.address,
          createdDate: response.data.createdAt,
          avatar: response.data.fullName,
        };

        set({
          customers: [restoredCustomer, ...get().customers],
          deletedCustomers: remaining,
        });
        toast.success('Customer restored successfully!');
      }
    } catch (error: any) {
      console.error('Failed to undo delete:', error);
      toast.error('Failed to restore customer');
    }
  },

  getCustomer: (id) => get().customers.find((c) => c.id === id),

  // Search & Filter actions
  setSearchTerm: (term) => set({ searchTerm: term, currentPage: 1 }),
  setFilterType: (type) => set({ filterType: type, currentPage: 1 }),
  setSortOption: (option) => set({ sortOption: option }),

  // Pagination actions
  setCurrentPage: (page) => set({ currentPage: page }),
  setPageSize: (size) => set({ pageSize: size, currentPage: 1 }),

  // UI actions
  setDarkMode: (isDark) => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    set({ isDarkMode: isDark });
  },
  toggleDarkMode: () => {
    const { isDarkMode } = get();
    const newMode = !isDarkMode;
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
    set({ isDarkMode: newMode });
  },
  setSelectedCustomerId: (id) => set({ selectedCustomerId: id }),
  setFormOpen: (isOpen) => set({ isFormOpen: isOpen }),
  setEditingCustomerId: (id) => set({ editingCustomerId: id }),

  // Reorder customers locally
  reorderCustomers: (customers) => set({ customers }),

  // Import customers from CSV
  importCustomers: async (customersToImport) => {
    try {
      set({ isLoading: true });
      // Create all imported customers in the database
      const createdCustomers = await Promise.all(
        customersToImport.map((customer) =>
          customerAPI.createCustomer({
            fullName: customer.fullName,
            email: customer.email,
            phoneNumber: customer.phoneNumber,
            address: customer.address,
          })
        )
      );

      const newCustomers = createdCustomers
        .filter((response) => response.success)
        .map((response) => ({
          id: response.data._id,
          fullName: response.data.fullName,
          email: response.data.email,
          phoneNumber: response.data.phoneNumber,
          address: response.data.address,
          createdDate: response.data.createdAt,
          avatar: response.data.fullName,
        }));

      set((state) => ({
        customers: [...newCustomers, ...state.customers],
      }));
      toast.success(`Successfully imported ${newCustomers.length} customers!`);
    } catch (error: any) {
      console.error('Failed to import customers:', error);
      toast.error('Failed to import customers');
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useCustomerStore;

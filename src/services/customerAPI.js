const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Fetch all customers
export const fetchCustomers = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/customers`);
    if (!response.ok) throw new Error('Failed to fetch customers');
    return await response.json();
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw error;
  }
};

// Fetch single customer
export const fetchCustomerById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/customers/${id}`);
    if (!response.ok) throw new Error('Failed to fetch customer');
    return await response.json();
  } catch (error) {
    console.error('Error fetching customer:', error);
    throw error;
  }
};

// Create customer
export const createCustomer = async (customerData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/customers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(customerData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create customer');
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating customer:', error);
    throw error;
  }
};

// Update customer
export const updateCustomer = async (id, customerData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/customers/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(customerData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update customer');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating customer:', error);
    throw error;
  }
};

// Delete customer
export const deleteCustomer = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/customers/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete customer');
    return await response.json();
  } catch (error) {
    console.error('Error deleting customer:', error);
    throw error;
  }
};

// Search customers
export const searchCustomers = async (query) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/customers/search?query=${encodeURIComponent(query)}`
    );
    if (!response.ok) throw new Error('Failed to search customers');
    return await response.json();
  } catch (error) {
    console.error('Error searching customers:', error);
    throw error;
  }
};

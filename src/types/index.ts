// Customer related types
export interface Customer {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  createdDate: string;
  avatar?: string;
}

export interface CustomerFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
}

export interface FilterOption {
  type: 'all' | 'recent' | 'alphabetical';
  label: string;
}

export interface SortOption {
  by: 'name' | 'date';
  order: 'asc' | 'desc';
}

// Delete history for undo
export interface DeletedCustomer extends Customer {
  deletedAt: string;
}

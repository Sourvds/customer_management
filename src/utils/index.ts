import type { Customer } from '../types';

// Generate unique ID
export const generateId = (): string => {
  return `CUST-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Generate avatar initials
export const getAvatarInitials = (fullName: string): string => {
  return fullName
    .split(' ')
    .map((name) => name[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

// Generate avatar background color based on initials
export const getAvatarColor = (initials: string): string => {
  const colors = [
    '#FFB3BA', // Pastel red
    '#FFCCCB', // Light coral
    '#FFDFBA', // Pastel orange
    '#FFFFBA', // Pastel yellow
    '#BAFFC9', // Pastel green
    '#BAE1FF', // Pastel blue
    '#E0BBE4', // Pastel purple
    '#FFDFD3', // Pastel peach
  ];
  const index = initials.charCodeAt(0) % colors.length;
  return colors[index];
};

// Validate email
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate phone number (basic)
export const validatePhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^[\d\s\-+()]{10,}$/;
  return phoneRegex.test(phone);
};

// Format date
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};

// Export customers to CSV
export const exportToCSV = (customers: Customer[]): void => {
  const headers = ['ID', 'Full Name', 'Email', 'Phone Number', 'Address', 'Created Date'];
  const rows = customers.map((c) => [c.id, c.fullName, c.email, c.phoneNumber, c.address, c.createdDate]);

  const csvContent = [
    headers.join(','),
    ...rows.map((row) =>
      row
        .map((cell) => `"${cell?.toString().replace(/"/g, '""') || ''}"`)
        .join(',')
    ),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `customers-${new Date().toISOString().split('T')[0]}.csv`;
  link.click();
};

// Import customers from CSV
export const importFromCSV = (file: File): Promise<Customer[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const csv = event.target?.result as string;
        const lines = csv.split('\n');
        const customers: Customer[] = [];

        // Skip header
        for (let i = 1; i < lines.length; i++) {
          if (!lines[i].trim()) continue;

          const values = lines[i].split(',').map((v) => v.replace(/^"|"$/g, ''));
          if (values.length >= 5) {
            customers.push({
              id: values[0] || generateId(),
              fullName: values[1] || '',
              email: values[2] || '',
              phoneNumber: values[3] || '',
              address: values[4] || '',
              createdDate: new Date().toISOString(),
            });
          }
        }
        resolve(customers);
      } catch (error) {
        reject(error);
      }
    };
    reader.readAsText(file);
  });
};

// Search and filter customers
export const searchCustomers = (
  customers: Customer[],
  searchTerm: string
): Customer[] => {
  if (!searchTerm.trim()) return customers;

  const term = searchTerm.toLowerCase();
  return customers.filter(
    (customer) =>
      customer.fullName.toLowerCase().includes(term) ||
      customer.email.toLowerCase().includes(term)
  );
};

// Sort customers
export const sortCustomers = (
  customers: Customer[],
  sortBy: 'name' | 'date',
  order: 'asc' | 'desc' = 'asc'
): Customer[] => {
  const sorted = [...customers].sort((a, b) => {
    let comparison = 0;

    if (sortBy === 'name') {
      comparison = a.fullName.localeCompare(b.fullName);
    } else if (sortBy === 'date') {
      comparison = new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime();
    }

    return order === 'asc' ? comparison : -comparison;
  });

  return sorted;
};

// Paginate customers
export const paginateCustomers = (
  customers: Customer[],
  page: number,
  pageSize: number
): { data: Customer[]; total: number; pages: number } => {
  const total = customers.length;
  const pages = Math.ceil(total / pageSize);
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  return {
    data: customers.slice(start, end),
    total,
    pages,
  };
};

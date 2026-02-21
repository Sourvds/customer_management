# 👥 CRM Pro - Customer Management System

A modern, fully-featured Customer Management System built with React, Vite, and TypeScript. Featuring a beautiful skeuomorphic design with dark/light mode support, local storage persistence, and advanced customer management capabilities.

## ✨ Features

### Core CRUD Operations
- ✅ **Add Customers** - Add new customers with automatic ID generation
- ✅ **Edit Customers** - Update customer information with inline editing support
- ✅ **Delete Customers** - Remove customers with confirmation modal
- ✅ **View Customers** - See detailed customer information in a side panel

### Search & Filter
- 🔍 **Real-time Search** - Search customers by name or email
- 📊 **Sorting Options** - Sort by date (newest/oldest) or name (A-Z/Z-A)
- 📄 **Pagination** - View customers with configurable page size
- 🎯 **Advanced Filtering** - Multiple filter options for better organization

### Customer Data
Each customer profile includes:
- Full Name
- Email Address
- Phone Number
- Physical Address
- Unique Customer ID (auto-generated)
- Created Date
- Auto-generated Avatar with initials

### Form Features
- ✅ **Real-time Validation** - Immediate feedback on form errors
- ✅ **Email & Phone Validation** - Built-in format checking
- ✅ **Autofill Suggestions** - Smart suggestions based on existing names
- ✅ **Required Field Indicators** - Clear marking of mandatory fields

### Advanced Features
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- 🌙 **Dark/Light Mode** - Theme toggle with localStorage persistence
- 💾 **Local Storage** - All data persists across browser sessions
- 📥 **CSV Import** - Bulk import customer data from CSV files
- 📤 **CSV Export** - Download all customers as CSV
- 🔄 **Drag & Drop** - Reorder customers with drag and drop
- ↩️ **Undo Delete** - Restore last deleted customer (up to 5 deletions)
- 📋 **Inline Editing** - Quick edits directly from customer cards
- 📊 **Dashboard Stats** - View total customers, recent additions, and undo status
- 🎨 **Skeuomorphic UI** - Beautiful soft shadows, gradients, and depth effects
- ✨ **Smooth Animations** - Framer Motion powered transitions
- 🔔 **Toast Notifications** - Real-time feedback for all actions
- ♿ **Accessibility** - ARIA labels, keyboard navigation, semantic HTML

## 🛠 Tech Stack

### Frontend Framework
- **React 18** - UI library with hooks
- **Vite** - Lightning-fast build tool and dev server
- **TypeScript** - Type-safe development

### State Management
- **Zustand** - Lightweight, flexible state management
- **Zustand Persist Middleware** - Automatic localStorage persistence

### Styling
- **CSS Modules** - Scoped, maintainable styles
- **Skeuomorphic Design** - Soft shadows, gradients, and depth
- **CSS Variables** - Easy theming and customization

### Animation & UI
- **Framer Motion** - Smooth animations and transitions
- **React Hot Toast** - Beautiful toast notifications
- **React Icons** - Icon library

## 🚀 Getting Started

### Installation

1. **Install dependencies** (if not already done)
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Open in browser**
   ```
   http://localhost:5173/
   ```

### Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
src/
├── components/          # Reusable React components
│   ├── Navbar.tsx
│   ├── CustomerForm.tsx
│   ├── CustomerList.tsx
│   ├── CustomerCard.tsx
│   ├── CustomerDetailView.tsx
│   ├── SearchBar.tsx
│   ├── FilterDropdown.tsx
│   ├── ConfirmModal.tsx
│   ├── DashboardStats.tsx
│   ├── Avatar.tsx
│   ├── EmptyState.tsx
│   └── *.module.css     # Component styles
├── pages/               # Page components
│   └── HomePage.tsx
├── store/               # Zustand store
│   └── customerStore.ts
├── utils/               # Utility functions
│   └── index.ts
├── hooks/               # Custom React hooks
│   └── useFormValidation.ts
├── types/               # TypeScript types
│   └── index.ts
├── styles/              # Global styles
│   └── global.css
└── App.tsx              # Main app component
```

## 🎨 Design Features

### Skeuomorphic Design
- Soft outer shadows for raised effects
- Inset shadows for pressed states
- Gradient backgrounds for depth
- Rounded corners (8px - 20px)
- Smooth transitions and animations

### Color Palette
- Light mode: Clean whites and light grays
- Dark mode: Dark grays with light text
- Accent colors: Blue, green, orange, red, purple
- All CSS colors defined as CSS variables

### Responsive Breakpoints
- Desktop: 1024px+
- Tablet: 768px - 1023px
- Mobile: < 768px
- All components fully responsive

## 💾 Local Storage

All customer data is automatically persisted to browser's localStorage:
- **Storage Key**: `customer-store`
- **Format**: JSON
- **Automatic Save**: Every action updates storage
- **Automatic Load**: Data restored on app startup

## 🔐 Data Validation

### Email Validation
- Regex pattern: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- Real-time feedback

### Phone Validation
- Minimum 10 digits/characters
- Supports special characters

### Name & Address
- Required fields
- Character limits enforced

## 📤 CSV Import/Export

### Export
- Download all customers as CSV
- Includes all fields
- Date stamped filename

### Import
- Upload CSV with customer data
- Auto-generates missing IDs
- Bulk add customers

## 🎮 Core Functions

### Add Customer
```
1. Click "Add Customer" button
2. Fill form fields
3. Form validation runs in real-time
4. Click "Add Customer" to save
5. Toast notification confirms success
```

### Edit Customer
```
1. Click edit button on card
2. Inline edit fields
3. Click checkmark to save
4. Or click X to cancel
```

### Delete Customer
```
1. Click delete button
2. Confirmation modal appears
3. Confirm or cancel
4. Undo button available for 5 deletions
```

### Search/Filter
```
1. Type in search bar to filter by name/email
2. Use sort dropdown to change order
3. Navigate pages with pagination
```

## 🌓 Dark Mode

Toggle dark mode from the navbar:
- Saves preference to localStorage
- All colors adjust automatically
- Smooth transition between modes
- WCAG AA compliant contrast

## ♿ Accessibility

- Full keyboard navigation
- ARIA labels on all interactive elements
- Semantic HTML structure
- Screen reader support
- High contrast colors
- Focus indicators

## 📝 Component Overview

| Component | Purpose |
|-----------|---------|
| Navbar | Top navigation with theme toggle and CSV operations |
| CustomerForm | Modal form for adding/editing customers |
| CustomerList | Grid layout with pagination and drag & drop |
| CustomerCard | Individual customer card with inline editing |
| CustomerDetailView | Full-screen detail panel |
| SearchBar | Real-time customer search |
| FilterDropdown | Sort and filter options |
| ConfirmModal | Delete confirmation |
| DashboardStats | Summary statistics |
| Avatar | Auto-generated customer avatar |
| EmptyState | Empty state illustration |

## 🚀 Performance

- Optimized re-renders with React hooks
- Memoized selectors in Zustand
- CSS animations (no JavaScript animations)
- Lazy loading with pagination
- Efficient search with debouncing

## 🐛 Known Limitations

- Local storage size limited (~5-10MB per domain)
- Search is client-side only
- No backend persistence
- Undo limited to last 5 deletions

## 🎯 Future Enhancements

- Backend API integration
- Advanced filtering options
- Customer groups/categories
- Activity logs
- Duplicate detection
- Contact history tracking
- Integration with email services

## 📄 License

MIT License - Feel free to use this project

---

**Built with ❤️ using React, Vite, TypeScript, and Zustand**

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

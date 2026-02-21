# 🚀 Quick Start Guide

## Getting Started

Your Customer Management System is ready to use! Follow these simple steps:

### 1. Start the Application
```bash
npm run dev
```

The application will open automatically at `http://localhost:5173/`

### 2. Access the Interface

You'll see:
- **Navbar** at the top with theme toggle and CSV options
- **Dashboard Stats** showing total customers and recent additions
- **Search Bar** and **Sort Dropdown** for filtering
- **Add Customer** button to start adding data
- **Main Grid** displaying customer cards

### 3. Add Your First Customer

Click **"Add Customer"** button:
1. Enter Full Name (required, 2-50 characters)
2. Enter Email (required, must be valid format)
3. Enter Phone Number (required, 10+ digits)
4. Enter Address (required, 5-100 characters)
5. Click **"Add Customer"**

Done! Your customer is saved.

### 4. Basic Operations

**Search**: Type customer name or email in the search bar
**Sort**: Click dropdown to sort by date or name
**Edit**: Click the edit icon or edit directly on the card
**Delete**: Click delete icon (will ask for confirmation)
**View Details**: Click "View Details →" to see full profile

### 5. Advanced Features

**Dark Mode**: Click the moon/sun icon in navbar
**CSV Export**: Click download icon to export all customers
**CSV Import**: Click upload icon to bulk import from CSV
**Drag & Drop**: Drag customer cards to reorder
**Undo Delete**: Click "Undo Delete" button if available

---

## 📋 CSV File Format

### For Import
Create a CSV file with this format:

```csv
ID,Full Name,Email,Phone Number,Address
"CUST-001","John Doe","john@example.com","+1-234-567-8900","123 Main St, City, State"
"CUST-002","Jane Smith","jane@example.com","+1-234-567-8901","456 Oak Ave, City, State"
```

- First row must be headers
- ID can be blank (auto-generated if empty)
- Phone number must be 10+ characters
- Email must be valid format

### Export
Downloaded CSV contains:
- Customer ID
- Full Name
- Email
- Phone Number
- Address
- Created Date

---

## 🎨 Theme Customization

### Switch Theme
Click the **Moon/Sun Icon** in navbar to toggle between:
- **Light Mode**: Clean, bright interface
- **Dark Mode**: Dark background with light text

Your preference is automatically saved!

### Customize Colors
Edit `/src/styles/global.css` to change:
- Background colors
- Text colors
- Accent colors
- Shadow effects

---

## 💾 Your Data

### Where is it Stored?
All data is saved in your browser's **localStorage** under the key: `customer-store`

### Backup Your Data
1. Click the **Download Icon** in navbar
2. This exports all customers to CSV
3. Save the file to your computer

### Restore Data
1. Click the **Upload Icon** in navbar
2. Select your saved CSV file
3. Customers are added to your database

---

## 📱 Mobile Usage

CRM Pro works great on mobile devices:
- Tap **Menu Icon** to access navigation
- Touch-friendly buttons and inputs
- Swipe to navigate (on supported devices)
- All features available on mobile

---

## 🔍 Finding Customers

### Search
1. Type in the **Search Bar**
2. Results filter in real-time
3. Click **X** to clear search

### Sort
1. Click the **Sort Dropdown**
2. Choose option:
   - Newest First (default)
   - Oldest First
   - A - Z (by name)
   - Z - A (by name)

### Pagination
- View **10 customers per page** (configurable)
- Use **Previous/Next** buttons to navigate
- See **page count** in center

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| Enter | Submit forms |
| Escape | Close modals |
| Tab | Navigate between fields |
| Shift+Tab | Navigate backwards |

---

## ⚠️ Important Notes

1. **Data is Local Only**
   - No backend server
   - All data stored in your browser
   - Clearing browser data = data loss
   - **Regular backups recommended**

2. **Storage Limit**
   - Browser localStorage limit: ~5-10MB
   - Supports thousands of customers
   - Export to CSV if exceeding limits

3. **Single Device**
   - Data not synced across devices
   - Use CSV export/import to transfer

4. **Private Data**
   - All data stays on your device
   - No data sent to servers
   - No tracking or analytics

---

## 🐛 Troubleshooting

### "App not loading"
- Refresh the page (Ctrl+R or Cmd+R)
- Clear browser cache
- Check internet connection for dev server

### "Customers disappeared"
- Check localStorage hasn't been cleared
- Import from your CSV backup
- Check you're using the same browser

### "CSV Import not working"
- Verify file format matches template
- Check file has headers in first row
- Ensure proper column order

### "Dark mode not saving"
- Check browser allows localStorage
- Try different browser
- Clear and re-login

---

## 📞 Tips & Tricks

1. **Bulk Import**: Import hundreds of customers at once from CSV
2. **Quick Edit**: Use inline editing on cards for fastest updates
3. **Drag Organize**: Arrange customers by dragging cards
4. **Smart Search**: Search works on name AND email
5. **Export Regularly**: Keep CSV backups of your data
6. **Mobile First**: Perfect for managing on the go
7. **Dark Mode**: Easier on eyes during long sessions
8. **Avatar Colors**: Help quickly identify customers

---

## 📊 Examples

### Example 1: Add 100 Customers Fast
1. Prepare CSV with 100 customers
2. Click **Upload Icon**
3. Select CSV file
4. All 100 added instantly!

### Example 2: Find a Customer
1. Type part of name in search
2. Results appear instantly
3. Click customer card for details
4. Edit or delete as needed

### Example 3: Daily Backup
1. Each day, click **Download Icon**
2. Save with date in filename
3. Store backups safely
4. Can restore anytime

---

## 🎯 Best Practices

✅ **DO:**
- Export data regularly as backup
- Use descriptive customer names
- Keep phone numbers consistent format
- Use email for important customers
- Archive old customers annually

❌ **DON'T:**
- Use same browser for sensitive data
- Share customer data via screenshots
- Clear browser cache without backup
- Rely on local storage as only backup
- Store sensitive info beyond what's needed

---

## 📖 Full Documentation

For complete documentation, see:
- **README.md** - Features and overview
- **IMPLEMENTATION.md** - Technical details
- **Code Comments** - In-file documentation

---

## 🎉 You're Ready!

Your CRM Pro is ready to use. Start managing customers efficiently with our beautiful, feature-rich application!

### Next Steps:
1. ✅ Start the dev server: `npm run dev`
2. ✅ Add your first customer
3. ✅ Try different features
4. ✅ Customize to your needs
5. ✅ Export data regularly

**Happy managing!** 🚀

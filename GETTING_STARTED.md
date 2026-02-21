# 🎬 GETTING STARTED - STEP BY STEP

## ⚡ 5-Minute Quick Start

### Prerequisites Check
```bash
# Verify Node.js installed
node --version

# Verify npm installed
npm --version

# Download MongoDB from: https://www.mongodb.com/try/download/community
# Install and run MongoDB
```

---

## 📋 Detailed Setup

### Phase 1: Backend Setup (10 min)

#### Step 1.1: Navigate to Server Directory
```bash
cd "C:\Users\sd710\OneDrive\Desktop\customer management\server"
```

#### Step 1.2: Install Dependencies
```bash
npm install
```

Output:
```
added 68 packages, and audited 69 packages in 5s
```

#### Step 1.3: Create .env File
Create file: `server/.env`
```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/customerDB
NODE_ENV=development
```

Or copy example:
```bash
copy .env.example .env
```

#### Step 1.4: Verify MongoDB is Running
```bash
mongosh
```

Should show:
```
Current Mongosh Log ID: ...
Connecting to: mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000...
Authenticated connection established successfully.
test>
```

Press `Ctrl+C` to exit

#### Step 1.5: Seed Database
```bash
npm run seed
```

Expected output:
```
🔗 Connected to MongoDB
🗑️  Cleared existing customers
✅ Seeded 8 sample customers
📋 Sample customers created:
   • John Anderson (john.anderson@example.com)
   • Sarah Johnson (sarah.johnson@example.com)
   • Michael Williams (michael.williams@example.com)
   • Emily Brown (emily.brown@example.com)
   • David Martinez (david.martinez@example.com)
   • Jessica Taylor (jessica.taylor@example.com)
   • Christopher Davis (christopher.davis@example.com)
   • Amanda Garcia (amanda.garcia@example.com)
```

✅ **Phase 1 Complete!**

---

### Phase 2: Frontend Setup (5 min)

#### Step 2.1: Navigate to Project Root
```bash
cd "C:\Users\sd710\OneDrive\Desktop\customer management"
```

#### Step 2.2: Install Dependencies
```bash
npm install
```

Output:
```
added 234 packages, and audited 235 packages in 25s
```

#### Step 2.3: Verify Frontend Config
Check `.env.local` exists with:
```
REACT_APP_API_URL=http://localhost:5000/api
```

✅ **Phase 2 Complete!**

---

### Phase 3: Running the Application

#### Terminal 1 - Start Backend
```bash
cd "C:\Users\sd710\OneDrive\Desktop\customer management\server"
npm start
```

Expected output:
```
🚀 Server running on http://localhost:5000
📊 API Documentation:
   GET    http://localhost:5000/api/customers
   GET    http://localhost:5000/api/customers/:id
   POST   http://localhost:5000/api/customers
   PUT    http://localhost:5000/api/customers/:id
   DELETE http://localhost:5000/api/customers/:id
   GET    http://localhost:5000/api/customers/search?query=name
```

✅ Backend ready on port 5000

#### Terminal 2 - Start Frontend
```bash
cd "C:\Users\sd710\OneDrive\Desktop\customer management"
npm run dev
```

Expected output:
```
  VITE v7.3.1  ready in 543 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

✅ Frontend ready on port 5173

#### Open Browser
```
http://localhost:5173/
```

🎉 **Application is running!**

---

## ✅ Testing the Application

### Test 1: View Dashboard
- ✅ See 8 sample customers in list
- ✅ Dashboard shows stats (Total: 8)
- ✅ Dark/Light theme toggle works

### Test 2: Add New Customer
1. Click "Add New Customer" button
2. Fill in form:
   - Name: "Test User"
   - Email: "test@example.com"
   - Phone: "+1 555-9999"
   - Address: "999 Test Street"
3. Click "Add Customer"
4. ✅ Toast shows "Customer added successfully!"
5. ✅ New customer appears in list

### Test 3: Search
1. Type "john" in search box
2. ✅ List filters to show "John Anderson"
3. Clear search
4. ✅ All customers appear again

### Test 4: Edit Customer
1. Click edit icon on any customer card
2. Fields become editable
3. Change "Full Name" to "John Updated"
4. Click check icon
5. ✅ Changes saved, list updated

### Test 5: Delete Customer
1. Click trash icon on any customer
2. Confirmation modal appears
3. Click "Delete"
4. ✅ Customer removed from list
5. ✅ "Undo" button available

### Test 6: Responsive Design
1. Open DevTools: `F12`
2. Click responsive design mode
3. Try mobile, tablet, desktop views
4. ✅ Layout adapts properly

---

## 🔍 Verification Steps

### Backend API Test
Open new terminal and test:

```bash
# Test API is responding
curl http://localhost:5000/api/customers

# Should return JSON with customer data
```

### Frontend Connection Test
Check browser DevTools (F12):

```
Console tab:
- No errors
- No CORS warnings
- Network tab shows /api/customers requests returning 200
```

### Database Test
```bash
# In terminal, connect to MongoDB
mongosh

# In MongoDB shell
use customerDB
db.customers.find()

# Should show 8 documents
```

---

## 📊 What You Can Do Now

### Customer Management
✅ **View**: See all customers in responsive grid
✅ **Add**: Create new customers with validation
✅ **Edit**: Modify customer details (modal or inline)
✅ **Delete**: Remove customers (with undo)
✅ **Search**: Find customers by name/email/phone
✅ **Sort**: Sort by date (oldest/newest)

### UI Features
✅ **Dashboard**: Statistics and recent activity
✅ **Theme**: Toggle between dark/light modes
✅ **Responsive**: Works on mobile, tablet, desktop
✅ **Animations**: Smooth transitions and modals
✅ **Notifications**: Toast messages for actions

### Data Persistence
✅ **MongoDB**: All data saved permanently
✅ **Real-time**: Updates reflect immediately
✅ **Error handling**: Validation on client & server

---

## 🛑 Stopping the Application

### Stop Backend
In Terminal 1: Press `Ctrl + C`
```
^C
[Nodemon] app crashed - waiting for file changes before starting...
```

### Stop Frontend
In Terminal 2: Press `Ctrl + C`
```
^C
```

### Restart
Just run `npm start` (backend) and `npm run dev` (frontend) again!

---

## 📱 Common Tasks

### Add Multiple Customers
1. Click "Add New Customer"
2. Fill form and click "Add Customer"
3. Repeat for each customer

### Bulk Actions
- **Drag to reorder**: Click and drag customer card
- **Export to CSV**: Click export button (already built)
- **Import from CSV**: Click import button (already built)

### Change Theme
Click moon/sun icon in top navbar

### View Customer Details
Click on customer name or avatar

---

## 🆘 Troubleshooting

### "Failed to load customers" message

**Check 1: Is backend running?**
```bash
# In Terminal 1, you should see:
🚀 Server running on http://localhost:5000
```

**Check 2: Is MongoDB running?**
```bash
# In another terminal:
mongosh
# Should connect successfully
```

**Check 3: Is .env configured?**
```bash
# Check server/.env exists with:
MONGO_URI=mongodb://127.0.0.1:27017/customerDB
```

### "Cannot connect to MongoDB"

```bash
# Start MongoDB service (Windows)
net start MongoDB

# Or start manually:
mongod
```

### Port already in use

```bash
# Find what's using port 5000
netstat -ano | findstr :5000

# Kill the process
taskkill /PID <PID> /F

# Try again
npm start
```

### Form validation errors

- **Email**: Must be valid format (e.g., test@example.com)
- **Phone**: Must have at least 10 digits
- **Name**: Required, minimum 2 characters
- **Address**: Required, minimum 5 characters

---

## 📞 Need Help?

### Error in Browser Console?
1. Open DevTools: `F12`
2. Check Console tab
3. Look for error messages
4. Check Network tab for failed requests

### Backend Issues?
1. Check Terminal 1 (backend) for error messages
2. Verify MongoDB is running
3. Check .env file is correct
4. Try `npm run seed` again

### Still Stuck?
Refer to:
- [SETUP.md](SETUP.md) - Detailed setup guide
- [FULLSTACK_IMPLEMENTATION.md](FULLSTACK_IMPLEMENTATION.md) - Architecture details
- [Browser DevTools](https://developer.chrome.com/docs/devtools/) - Debug errors

---

## ✨ Next Steps

Once everything is working:

1. **Explore the Code**
   - Check `src/pages/HomePage.tsx` (main UI)
   - Check `src/store/customerStore.ts` (state management)
   - Check `server/controllers/customerController.js` (API logic)

2. **Customize**
   - Add more fields to customer
   - Change colors in `src/styles/global.css`
   - Add new features

3. **Deploy**
   - Frontend: `npm run build`
   - Backend: Prepare for cloud hosting

---

## 🎯 Success Indicators

You'll know everything works when:

✅ Backend shows "Server running on http://localhost:5000"
✅ Frontend shows "Local: http://localhost:5173/"
✅ Browser displays customer list with 8 sample customers
✅ Can add/edit/delete customers
✅ Search works
✅ Theme toggle works
✅ No errors in browser console
✅ Toast notifications appear

---

## 🎉 You're All Set!

Your full-stack Customer Management System is ready to use!

**Started:** February 21, 2026
**Status:** ✅ Running
**Ready to:** Manage Customers!

Enjoy! 🚀

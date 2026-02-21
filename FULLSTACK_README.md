# Full-Stack Customer Management System

**Status: ✅ FULLY BUILT & READY TO USE**

A modern, professional Customer Management System with a React frontend and Node.js/Express backend connected to MongoDB.

## 🎯 Quick Start

### 1️⃣ Install Dependencies

```bash
# Backend
cd server
npm install

# Frontend (in new terminal)
npm install
```

### 2️⃣ Setup MongoDB & Environment

Create `server/.env`:
```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/customerDB
NODE_ENV=development
```

### 3️⃣ Seed Database

```bash
cd server
npm run seed
```

### 4️⃣ Start Application

**Terminal 1 - Backend:**
```bash
cd server
npm start
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

Open `http://localhost:5173/` 🎉

---

## 📋 Complete Feature Set

### Core Features
✅ Add/Edit/Delete/View customers
✅ Real-time search
✅ Sort and pagination
✅ Form validation
✅ Responsive design
✅ Dark/Light theme

### Advanced Features
✅ CSV import/export
✅ Undo delete (last 5)
✅ Inline editing
✅ Customer detail view
✅ Dashboard statistics
✅ Toast notifications
✅ Drag & drop reordering
✅ Skeuomorphic UI design

### Technical Stack
- **Frontend:** React 18 + TypeScript + Vite
- **Backend:** Node.js + Express
- **Database:** MongoDB + Mongoose
- **State:** Zustand
- **Animations:** Framer Motion
- **Styling:** CSS Modules

---

## 📁 Project Structure

```
project-root/
├── src/                 # React Frontend
│   ├── components/      # 11 reusable components
│   ├── pages/          # HomePage
│   ├── store/          # Zustand store (API integration)
│   ├── services/       # API calls (customerAPI.js)
│   ├── types/          # TypeScript types
│   ├── utils/          # Utilities
│   └── styles/         # Global styles
│
├── server/             # Node.js Backend
│   ├── config/         # Database config
│   ├── models/         # Mongoose schemas
│   ├── controllers/    # Business logic
│   ├── routes/         # API endpoints
│   ├── middleware/     # Error handling
│   └── scripts/        # Database seeding
│
└── SETUP.md           # Detailed setup guide
```

---

## 🔌 API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/customers` | Get all customers |
| GET | `/api/customers/:id` | Get single customer |
| POST | `/api/customers` | Create customer |
| PUT | `/api/customers/:id` | Update customer |
| DELETE | `/api/customers/:id` | Delete customer |
| GET | `/api/customers/search?query=` | Search customers |

---

## 📊 Database Schema

```javascript
Customer {
  _id: ObjectId,              // Auto-generated
  fullName: String,           // Required, unique index
  email: String,              // Required, unique
  phoneNumber: String,        // Required
  address: String,            // Required
  createdAt: Date,            // Auto-timestamp
  updatedAt: Date             // Auto-timestamp
}
```

---

## 🚀 Key Implementation Details

### State Management
- **Zustand store** manages all customer data
- **API integration** fetches from backend
- **Async actions** for CRUD operations
- **Error handling** with toast notifications

### Frontend-Backend Communication
1. Component calls store action
2. Store calls API service
3. API service makes HTTP request
4. Backend processes in MongoDB
5. Response returns to store
6. UI updates automatically

### Modal Implementation
- **React Portal** renders at document.body level
- **Fixed positioning** ensures centering
- **Framer Motion** animations
- **ESC key & backdrop click** closes
- **Body scroll lock** when open

---

## 🛠️ Development Commands

```bash
# Backend
cd server
npm start           # Start server
npm run dev         # Auto-reload with nodemon
npm run seed        # Seed database

# Frontend
npm run dev         # Development server
npm run build       # Production build
npm run preview     # Preview production build
```

---

## ⚙️ Configuration

### Environment Variables

**Backend** (`server/.env`):
```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/customerDB
NODE_ENV=development
```

**Frontend** (`.env.local`):
```
REACT_APP_API_URL=http://localhost:5000/api
```

### CORS Configuration
Backend allows requests from:
- `http://localhost:5173` (Vite)
- `http://localhost:3000` (Alternative port)

---

## 🧪 Testing

### API Testing
```bash
# Get all customers
curl http://localhost:5000/api/customers

# Create customer
curl -X POST http://localhost:5000/api/customers \
  -H "Content-Type: application/json" \
  -d '{"fullName":"John","email":"john@test.com","phoneNumber":"+1-555-1234","address":"123 St"}'
```

### Sample Data
Database seeded with 8 sample customers for testing

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| MongoDB connection refused | Ensure MongoDB service is running |
| Port 5000 in use | `taskkill /PID <PID> /F` then restart |
| CORS errors | Check backend running on port 5000 |
| "Failed to load customers" | Check backend logs, verify MongoDB |

For detailed troubleshooting, see [SETUP.md](SETUP.md)

---

## 📚 Documentation Files

- **README.md** (this file) - Overview & quick start
- **SETUP.md** - Detailed setup & troubleshooting guide
- **IMPLEMENTATION.md** - Technical deep dive
- **QUICKSTART.md** - User feature guide
- **PROJECT_SUMMARY.md** - Feature completeness checklist

---

## 🎉 What's Included

✅ Complete React frontend (11 components)
✅ Full Node.js/Express backend
✅ MongoDB data persistence
✅ API service layer
✅ State management with Zustand
✅ Responsive skeuomorphic UI
✅ Dark/Light theme support
✅ Form validation
✅ Error handling
✅ Database seeder
✅ Comprehensive documentation

---

## 🚀 Next Steps

1. **Install dependencies** for both frontend & backend
2. **Setup MongoDB** locally
3. **Create .env files** with configuration
4. **Seed the database** with sample data
5. **Start backend** on port 5000
6. **Start frontend** on port 5173
7. **Open browser** to http://localhost:5173/
8. **Start managing customers!** 🎯

---

## 📞 Support

For issues or questions:
1. Check [SETUP.md](SETUP.md) troubleshooting section
2. Verify MongoDB is running
3. Confirm backend server is accessible
4. Check browser developer console
5. Review backend server logs

---

**Built with ❤️ using React, Node.js, and MongoDB**

**Version:** 2.0 (Full-Stack)  
**Last Updated:** February 21, 2026  
**Status:** ✅ Production Ready

# 🚀 Full-Stack Customer Management System - Setup Guide

## 📋 Prerequisites

Before starting, ensure you have installed:

1. **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
2. **MongoDB Community Server** - [Download](https://www.mongodb.com/try/download/community)
3. **XAMPP** (Apache) - [Download](https://www.apachefriends.org/) *(Optional, for PHP/static files)*

---

## 🛠️ Installation & Setup

### Step 1: Install MongoDB (Windows)

1. Download [MongoDB Community Server](https://www.mongodb.com/try/download/community)
2. Run the installer and follow default options
3. MongoDB will install as a service and start automatically
4. Verify installation by opening Command Prompt:
   ```bash
   mongosh
   ```
   You should see the MongoDB shell prompt

### Step 2: Clone/Setup Project

Navigate to your project directory:

```bash
cd "C:\Users\sd710\OneDrive\Desktop\customer management"
```

### Step 3: Install Backend Dependencies

```bash
cd server
npm install
```

**Dependencies installed:**
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `cors` - Cross-Origin Resource Sharing
- `dotenv` - Environment variables

### Step 4: Create Backend .env File

In the `server` folder, create a file named `.env`:

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/customerDB
NODE_ENV=development
```

Or copy from `.env.example`:
```bash
copy .env.example .env
```

### Step 5: Seed Database with Sample Data

Before starting the backend, seed the database with sample customers:

```bash
npm run seed
```

You should see:
```
🔗 Connected to MongoDB
🗑️  Cleared existing customers
✅ Seeded 8 sample customers
📋 Sample customers created:
   • John Anderson (john.anderson@example.com)
   • Sarah Johnson (sarah.johnson@example.com)
   ...
```

### Step 6: Install Frontend Dependencies

In a **new terminal**, navigate to project root and install frontend deps:

```bash
cd "C:\Users\sd710\OneDrive\Desktop\customer management"
npm install
```

---

## ▶️ Running the Application

### Backend Server (Terminal 1)

```bash
cd server
npm start
```

or with auto-reload:

```bash
npm run dev
```

You should see:
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

### Frontend Development Server (Terminal 2)

```bash
cd "C:\Users\sd710\OneDrive\Desktop\customer management"
npm run dev
```

You should see:
```
  VITE v7.3.1  ready in 543 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

Open `http://localhost:5173/` in your browser!

---

## 🗄️ Database Schema

### Customer Collection

```javascript
{
  _id: ObjectId,                    // Auto-generated MongoDB ID
  fullName: String (required),      // Customer's full name
  email: String (required, unique), // Email address
  phoneNumber: String (required),   // Phone number
  address: String (required),       // Address
  createdAt: Date,                  // Auto-timestamp
  updatedAt: Date                   // Auto-timestamp
}
```

---

## 📡 API Endpoints

### Get All Customers
```
GET http://localhost:5000/api/customers
```
**Response:**
```json
{
  "success": true,
  "data": [...]
}
```

### Get Single Customer
```
GET http://localhost:5000/api/customers/:id
```

### Create Customer
```
POST http://localhost:5000/api/customers
Content-Type: application/json

{
  "fullName": "Jane Doe",
  "email": "jane@example.com",
  "phoneNumber": "+1 555-9999",
  "address": "123 Main St"
}
```

### Update Customer
```
PUT http://localhost:5000/api/customers/:id
Content-Type: application/json

{
  "fullName": "Jane Smith",
  "email": "jane.smith@example.com",
  "phoneNumber": "+1 555-8888",
  "address": "456 Oak Ave"
}
```

### Delete Customer
```
DELETE http://localhost:5000/api/customers/:id
```

### Search Customers
```
GET http://localhost:5000/api/customers/search?query=john
```

### Health Check
```
GET http://localhost:5000/api/health
```

---

## 📁 Project Structure

```
project-root/
├── client (React Frontend)
│   ├── src/
│   │   ├── components/          # Reusable components
│   │   ├── pages/               # Page components
│   │   ├── store/               # Zustand state management
│   │   ├── services/            # API calls (customerAPI.js)
│   │   ├── types/               # TypeScript types
│   │   ├── utils/               # Utility functions
│   │   ├── styles/              # Global styles
│   │   └── App.tsx
│   ├── package.json
│   └── vite.config.ts
│
├── server (Node.js Backend)
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── controllers/
│   │   └── customerController.js # Business logic
│   ├── models/
│   │   └── Customer.js          # MongoDB schema
│   ├── routes/
│   │   └── customerRoutes.js     # API routes
│   ├── middleware/
│   │   └── errorHandler.js       # Error handling
│   ├── scripts/
│   │   └── seed.js              # Database seeding
│   ├── server.js                # Entry point
│   ├── package.json
│   ├── .env
│   └── .env.example
│
└── README.md
```

---

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Ensure MongoDB service is running
```bash
# Windows: Check Services
net start MongoDB
```

### Port 5000 Already in Use
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process
taskkill /PID <PID> /F
```

### Port 5173 Already in Use
```bash
# Change Vite port in vite.config.ts or use:
npm run dev -- --port 3000
```

### CORS Error in Browser Console
- Ensure backend is running on `http://localhost:5000`
- Check `.env` file has correct `MONGO_URI`
- Backend CORS is configured for `localhost:5173` and `localhost:3000`

### "Failed to load customers" Toast
1. Check backend is running (`npm start` in server folder)
2. Check MongoDB is running
3. Check browser console for errors
4. Try seeding database again: `npm run seed`

---

## 🧪 Testing the API

### Using PowerShell/Command Prompt

```bash
# Get all customers
curl http://localhost:5000/api/customers

# Create customer
curl -X POST http://localhost:5000/api/customers `
  -H "Content-Type: application/json" `
  -d "{\"fullName\":\"Test User\",\"email\":\"test@example.com\",\"phoneNumber\":\"+1-555-1234\",\"address\":\"123 Test St\"}"

# Search
curl "http://localhost:5000/api/customers/search?query=john"
```

### Using Postman

1. Import or create requests for:
   - GET `http://localhost:5000/api/customers`
   - POST `http://localhost:5000/api/customers`
   - PUT `http://localhost:5000/api/customers/:id`
   - DELETE `http://localhost:5000/api/customers/:id`

---

## 📊 Features

✅ **CRUD Operations**
- Add customers
- Edit customers
- Delete customers
- View customer details

✅ **Search & Filter**
- Real-time search
- Sort by date, name
- Pagination

✅ **UI/UX**
- Skeuomorphic design
- Dark/Light mode
- Responsive layout
- Toast notifications
- Modal forms

✅ **Data Management**
- MongoDB persistence
- Undo delete (last 5)
- CSV export/import
- Drag & drop reordering

---

## 🚀 Deployment

### Build for Production

Frontend:
```bash
npm run build
# Creates optimized dist/ folder
```

Backend (ensure .env is set):
```bash
npm start
```

---

## 📝 Environment Variables

### Backend (.env)
```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/customerDB
NODE_ENV=development
```

### Frontend (optional)
```
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 🆘 Support

For issues or questions:
1. Check the troubleshooting section
2. Verify all ports are accessible
3. Ensure MongoDB is running
4. Check browser console for errors
5. Review backend server logs

---

## 📄 License

This project is open source and available under the ISC license.

---

**Happy coding! 🎉**

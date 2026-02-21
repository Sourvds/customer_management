require('dotenv').config();
const mongoose = require('mongoose');
const Customer = require('../models/Customer');

const sampleCustomers = [
  {
    fullName: 'John Anderson',
    email: 'john.anderson@example.com',
    phoneNumber: '+1 (555) 123-4567',
    address: '123 Main Street, New York, NY 10001',
  },
  {
    fullName: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    phoneNumber: '+1 (555) 234-5678',
    address: '456 Oak Avenue, Los Angeles, CA 90001',
  },
  {
    fullName: 'Michael Williams',
    email: 'michael.williams@example.com',
    phoneNumber: '+1 (555) 345-6789',
    address: '789 Pine Road, Chicago, IL 60601',
  },
  {
    fullName: 'Emily Brown',
    email: 'emily.brown@example.com',
    phoneNumber: '+1 (555) 456-7890',
    address: '321 Elm Street, Houston, TX 77001',
  },
  {
    fullName: 'David Martinez',
    email: 'david.martinez@example.com',
    phoneNumber: '+1 (555) 567-8901',
    address: '654 Maple Lane, Phoenix, AZ 85001',
  },
  {
    fullName: 'Jessica Taylor',
    email: 'jessica.taylor@example.com',
    phoneNumber: '+1 (555) 678-9012',
    address: '987 Cedar Drive, Philadelphia, PA 19101',
  },
  {
    fullName: 'Christopher Davis',
    email: 'christopher.davis@example.com',
    phoneNumber: '+1 (555) 789-0123',
    address: '135 Birch Court, San Antonio, TX 78201',
  },
  {
    fullName: 'Amanda Garcia',
    email: 'amanda.garcia@example.com',
    phoneNumber: '+1 (555) 890-1234',
    address: '246 Spruce Way, San Diego, CA 92101',
  },
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/customerDB';
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('🔗 Connected to MongoDB');

    // Clear existing customers
    await Customer.deleteMany({});
    console.log('🗑️  Cleared existing customers');

    // Insert sample data
    const createdCustomers = await Customer.insertMany(sampleCustomers);
    console.log(`✅ Seeded ${createdCustomers.length} sample customers`);

    // Display created customers
    console.log('\n📋 Sample customers created:');
    createdCustomers.forEach((customer) => {
      console.log(`   • ${customer.fullName} (${customer.email})`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  }
};

seedDatabase();

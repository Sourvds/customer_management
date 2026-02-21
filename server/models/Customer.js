const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Please provide a full name'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please provide a valid email address',
      ],
      index: true,
    },
    phoneNumber: {
      type: String,
      required: [true, 'Please provide a phone number'],
      match: [
        /^[\d\s\-+()]{10,}$/,
        'Please provide a valid phone number',
      ],
    },
    address: {
      type: String,
      required: [true, 'Please provide an address'],
      trim: true,
      minlength: [5, 'Address must be at least 5 characters'],
      maxlength: [500, 'Address cannot exceed 500 characters'],
    },
  },
  {
    timestamps: true,
  }
);

// Add indexes for better query performance
customerSchema.index({ fullName: 'text', email: 'text' });
customerSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Customer', customerSchema);

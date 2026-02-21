const Customer = require('../models/Customer');

// Get all customers
exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: customers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch customers',
      error: error.message,
    });
  }
};

// Get customer by ID
exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found',
      });
    }

    res.status(200).json({
      success: true,
      data: customer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch customer',
      error: error.message,
    });
  }
};

// Create customer
exports.createCustomer = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, address } = req.body;

    // Validate input
    if (!fullName || !email || !phoneNumber || !address) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    // Check if email already exists
    const existingCustomer = await Customer.findOne({ email: email.toLowerCase() });
    if (existingCustomer) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists',
      });
    }

    const customer = await Customer.create({
      fullName,
      email,
      phoneNumber,
      address,
    });

    res.status(201).json({
      success: true,
      message: 'Customer created successfully',
      data: customer,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to create customer',
      error: error.message,
    });
  }
};

// Update customer
exports.updateCustomer = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, address } = req.body;

    // Find customer
    let customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found',
      });
    }

    // Check if new email already exists (excluding current customer)
    if (email && email.toLowerCase() !== customer.email) {
      const existingCustomer = await Customer.findOne({
        email: email.toLowerCase(),
      });
      if (existingCustomer) {
        return res.status(400).json({
          success: false,
          message: 'Email already exists',
        });
      }
    }

    // Update fields
    customer.fullName = fullName || customer.fullName;
    customer.email = email || customer.email;
    customer.phoneNumber = phoneNumber || customer.phoneNumber;
    customer.address = address || customer.address;

    customer = await customer.save();

    res.status(200).json({
      success: true,
      message: 'Customer updated successfully',
      data: customer,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to update customer',
      error: error.message,
    });
  }
};

// Delete customer
exports.deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Customer deleted successfully',
      data: customer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete customer',
      error: error.message,
    });
  }
};

// Search customers
exports.searchCustomers = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a search query',
      });
    }

    const customers = await Customer.find({
      $or: [
        { fullName: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } },
        { phoneNumber: { $regex: query, $options: 'i' } },
      ],
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: customers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to search customers',
      error: error.message,
    });
  }
};

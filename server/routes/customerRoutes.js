const express = require('express');
const {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  searchCustomers,
} = require('../controllers/customerController');

const router = express.Router();

// Search route (must be before :id route)
router.get('/search', searchCustomers);

// CRUD routes
router.get('/', getAllCustomers);
router.get('/:id', getCustomerById);
router.post('/', createCustomer);
router.put('/:id', updateCustomer);
router.delete('/:id', deleteCustomer);

module.exports = router;

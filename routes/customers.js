const express = require('express');
const router = express.Router();

// @route   POST api/customers
// @desc    Get all customers
// @access  Private
router.get('/', (req, res) => {
  res.send('Get all customers')
});

// @route   POST api/customers
// @desc    Add new customer
// @access  Private
router.post('/', (req, res) => {
  res.send('Add customer')
});

// @route   PUT api/customers/:id
// @desc    Update customers
// @access  Private
router.put('/:id', (req, res) => {
  res.send('Update customers')
});

// @route   DELETE api/customers
// @desc    Delete customers
// @access  Private
router.delete('/:id', (req, res) => {
  res.send('Delete customer')
});

module.exports = router;
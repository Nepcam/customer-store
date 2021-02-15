const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const auth = require('../middleware/auth');

const Customer = require('../models/Customer');
const User = require('../models/User');

// @route    GET api/customers
// @desc     Get all customers
// @access   Private
router.get('/', auth, async (req, res) => {
	try {
		const customer = await Customer.find({ user: req.user.id }).sort({
			date: -1
		});
		res.json(customer);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route   POST api/customers
// @desc    Create new customer
// @access  Private
router.post(
  '/', 
  [ 
    auth, 
    [
      check('name', 'Name is required').not().isEmpty()
    ]
  ], 
  async (req, res) => {
    const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, email, phone, type } = req.body;

      try {
        const newCustomer = new Customer({
          name, email, phone, type, user: req.user.id 
        });

        const customer = await newCustomer.save();
        res.json(customer);
      } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error');
      }
  }
);

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
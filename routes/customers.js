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

// @route    PUT api/customers/:id
// @desc     Update a customer
// @access   Private
router.put('/:id', auth, async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		return res.status(400).json({ errors: errors.array() });

	const { name, email, phone, type } = req.body;

	// Build customer object
	const customerFields = {};
	if (name) customerFields.name = name;
	if (email) customerFields.email = email;
	if (phone) customerFields.phone = phone;
	if (type) customerFields.type = type;

	try {
		let customer = await Customer.findById(req.params.id);

		if (!customer) return res.status(404).json({ msg: 'Customer not found' });

		// Make sure user owns customer
		if (customer.user.toString() !== req.user.id)
			return res.status(401).json({ msg: 'Not authorized' });

		customer = await Customer.findByIdAndUpdate(
			req.params.id,
			{ $set: customerFields },
			{ new: true }
		);

		res.json(customer);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

// @route    DELETE api/customers/:id
// @desc     Delete a customer
// @access   Private
router.delete('/:id', auth, async (req, res) => {
	try {
		const customer = await Customer.findById(req.params.id);

		if (!customer) return res.status(404).json({ msg: 'Customer not found' });

		// Make sure user owns contact
		if (customer.user.toString() !== req.user.id)
			return res.status(401).json({ msg: 'Not authorised' });

		await Customer.findByIdAndRemove(req.params.id);

		res.json({ msg: 'Customer removed' });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

module.exports = router;
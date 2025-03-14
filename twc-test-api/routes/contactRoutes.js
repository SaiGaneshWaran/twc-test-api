const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const auth = require('../middleware/auth');

// All routes are protected
router.use(auth);

// Get all contacts
router.get('/', contactController.getContacts);

// Create a new contact
router.post('/', contactController.createContact);

// Get a contact by ID
router.get('/:id', contactController.getContactById);

// Update a contact
router.put('/:id', contactController.updateContact);

// Delete a contact
router.delete('/:id', contactController.deleteContact);

module.exports = router;
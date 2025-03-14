const Contact = require('../models/Contact');

// Get all contacts for a user
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user._id });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new contact
exports.createContact = async (req, res) => {
  try {
    const { name, email, phone, gender } = req.body;

    const contact = await Contact.create({
      name,
      email,
      phone,
      gender,
      user: req.user._id
    });

    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a contact by ID
exports.getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    // Check if the contact belongs to the logged-in user
    if (contact.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ error: 'Not authorized' });
    }

    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a contact
exports.updateContact = async (req, res) => {
  try {
    const { name, email, phone, gender } = req.body;

    let contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    // Check if the contact belongs to the logged-in user
    if (contact.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ error: 'Not authorized' });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, gender },
      { new: true }
    );

    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a contact
exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    // Check if the contact belongs to the logged-in user
    if (contact.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ error: 'Not authorized' });
    }

    await Contact.findByIdAndDelete(req.params.id);

    res.json({ message: 'Contact removed' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
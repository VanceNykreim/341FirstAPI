const express = require('express');
const router = express.Router();
const Contact = require('./models/Contact'); // Assuming you have a Contact model

// GET /contacts - Get all contacts
router.get('/', async (req, res) => {
    try {
        // Fetch all contacts from the database
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (err) {
        console.error('Error fetching contacts:', err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET /contacts/:id - Get a specific contact by ID
router.get('/:id', async (req, res) => {
    try {
        const contactId = req.params.id;
        // Fetch a contact by ID from the database
        const contact = await Contact.findById(contactId);
        if (!contact) {
            return res.status(404).json({ error: 'Contact not found' });
        }
        res.json(contact);
    } catch (err) {
        console.error('Error fetching contact:', err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST /contacts - Create a new contact
router.post('/', (req, res) => {
    // Your logic to create a new contact in the database
    res.send('Create a new contact');
});

// PUT /contacts/:id - Update a contact by ID
router.put('/:id', (req, res) => {
    const contactId = req.params.id;
    // Your logic to update a contact by ID in the database
    res.send(`Update contact with ID ${contactId}`);
});

// DELETE /contacts/:id - Delete a contact by ID
router.delete('/:id', (req, res) => {
    const contactId = req.params.id;
    // Your logic to delete a contact by ID from the database
    res.send(`Delete contact with ID ${contactId}`);
});

module.exports = router;
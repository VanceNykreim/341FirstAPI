const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Contact = require('../models/Contact'); // Assuming you have a Contact model


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
        if (!mongoose.Types.ObjectId.isValid(contactId)) {
            return res.status(400).json({ error: 'Invalid contact ID' });
        }
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
router.post('/', async (req, res) => {
    try {
        // Extract fields from the request body
        const { firstName, lastName, email, favoriteColor, birthday } = req.body;

        // Validate required fields
        if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Create a new contact in the database
        const newContact = await Contact.create({
            firstName,
            lastName,
            email,
            favoriteColor,
            birthday
        });

        // Return the new contact ID in the response body
        res.status(201).json({ id: newContact._id });
    } catch (err) {
        console.error('Error creating contact:', err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// PUT /contacts/:id - Update a contact by ID
router.put('/:id', async (req, res) => {
    try {
        const contactId = req.params.id;

        // Check if the provided ID is valid
        if (!mongoose.Types.ObjectId.isValid(contactId)) {
            return res.status(400).json({ error: 'Invalid contact ID' });
        }

        // Find the contact by ID and update its fields
        const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });

        // Check if the contact exists
        if (!updatedContact) {
            return res.status(404).json({ error: 'Contact not found' });
        }

        // Return success response
        res.status(204).json({ message: 'Contact updated successfully' });
    } catch (err) {
        console.error('Error updating contact:', err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// DELETE /contacts/:id - Delete a contact by ID
router.delete('/:id', async (req, res) => {
    try {
        const contactId = req.params.id;

        // Check if the provided ID is valid
        if (!mongoose.Types.ObjectId.isValid(contactId)) {
            return res.status(400).json({ error: 'Invalid contact ID' });
        }

        // Find the contact by ID and delete it
        const deletedContact = await Contact.findByIdAndDelete(contactId);

        // Check if the contact exists
        if (!deletedContact) {
            return res.status(404).json({ error: 'Contact not found' });
        }

        // Return success response
        res.status(200).json({ message: 'Contact deleted successfully' });
    } catch (err) {
        console.error('Error deleting contact:', err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
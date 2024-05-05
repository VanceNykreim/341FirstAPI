// models/Contact.js

const mongoose = require('mongoose');

// Define the schema for the contact
const contactSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    favoriteColor: String,
    birthday: Date
});

// Create a model for the contact using the schema
const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;

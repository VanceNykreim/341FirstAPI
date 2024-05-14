const express = require('express');
const mongoose = require('mongoose');

// Load environment variables from .env file
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Require the contacts route file
const contactsRouter = require('./routes/contacts');
const indexRouter = require('./routes/index');

app.use('/', indexRouter);

// Mount the contacts router
app.use('/contacts', contactsRouter);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err.message);
    });

// Define a mongoose schema
const NameSchema = new mongoose.Schema({
    name: String
});

// Define a mongoose model
const NameModel = mongoose.model('Name', NameSchema);

// Route to fetch a name from MongoDB
app.get('/api/name', async (req, res) => {
    try {
        // Fetch a random name from the MongoDB collection
        const randomName = await NameModel.aggregate([{ $sample: { size: 1 } }]);
        res.json(randomName);
    } catch (err) {
        console.error('Error fetching name from MongoDB:', err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

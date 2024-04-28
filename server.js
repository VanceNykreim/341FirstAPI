const express = require('express');
const app = express();

// Define a route that returns the name of someone you know
app.get('/name', (req, res) => {
  // You can replace 'Kamryn Nykreim' with the name of someone you know
  const name = 'Kamryn Nykreim';
  res.send(`Name: ${name}`);
});

// Start the server
const port = process.env.PORT || 3000; // Use environment port if available
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
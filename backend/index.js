const express = require('express');
const app = express();
const PORT = 5000;

// The Hello World endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: "Hello from the Node backend! 🚀" });
});

// Start the server
app.listen(PORT, () => {
  console.log('Backend server is running on http://localhost:${PORT}');
});
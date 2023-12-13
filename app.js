// app.js
const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());

// ReadFile Endpoint (GET /readFile)
app.get('/readFile/:fileName', async (req, res) => {
    console.log('ReadFile endpoint reached');
    const fileName = req.params.fileName;
    const filePath = path.join(__dirname, fileName);
  
    try {
      const fileContent = await fs.readFile(filePath, 'utf-8');
      res.status(200).json({ content: fileContent });
    } catch (error) {
      res.status(404).json({ error: 'File not found' });
    }
});

// WriteFile Endpoint (POST /writeFile)
app.post('/writeFile/:fileName', async (req, res) => {
    console.log('WriteFile endpoint reached');
    const fileName = req.params.fileName;
    const filePath = path.join(__dirname, fileName);
    const data = req.body.data || '';
  
    try {
      await fs.writeFile(filePath, data);
      res.status(200).json({ message: 'File successfully written' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
});

// UpdateFile Endpoint (PUT /updateFile)
app.put('/updateFile/:fileName', async (req, res) => {
    console.log('UpdateFile endpoint reached');
    const fileName = req.params.fileName;
    const filePath = path.join(__dirname, fileName);
    const newData = req.body.data || '';
  
    try {
      await fs.appendFile(filePath, `\n${newData}`);
      res.status(200).json({ message: 'File successfully updated' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

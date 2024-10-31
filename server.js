require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');

const app = express();
app.use(cors());
app.use(express.json());

// Configure Multer
const upload = multer({ dest: 'uploads/' });

// Home route
app.get('/', (req, res) => {
  res.send('Welcome to the File Metadata Microservice');
});

// File upload and metadata endpoint
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Respond with file metadata
  res.json({
    name: file.originalname,
    type: file.mimetype,
    size: file.size
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

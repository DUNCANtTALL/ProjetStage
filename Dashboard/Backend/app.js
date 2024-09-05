const express = require('express');
const fs = require('fs');
const path = require('path');
const csvParser = require('csv-parser');
const cors = require('cors');

const app = express();
const port = 3000;

const csvFilePath = path.join(__dirname, './csv/output_file.csv');

let cachedData = [];

function loadCSVData() {
  const results = [];
  fs.createReadStream(csvFilePath)
    .pipe(csvParser())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      cachedData = results;
      console.log('CSV data loaded:', cachedData.length, 'records');
    });
}

fs.watch(csvFilePath, (eventType) => {
  if (eventType === 'change') {
    console.log('CSV file changed, reloading...');
    loadCSVData();
  }
});

// Load the initial CSV data
loadCSVData();

app.use(cors({
  origin: 'http://localhost:3001', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.get('/api/attendance', (req, res) => {
  res.json(cachedData);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

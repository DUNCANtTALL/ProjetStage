const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const filePath = path.join(__dirname, 'output_file.csv');
const getAttendanceData = () => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
};

module.exports = { getAttendanceData };

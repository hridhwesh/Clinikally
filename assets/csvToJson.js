const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

const results = [];
const csvFilePath = path.join(__dirname, 'Stock.csv');

fs.createReadStream(csvFilePath)
.pipe(csv())
.on('data', (data) => results.push(data))
.on('end', () => {
  fs.writeFileSync(path.join(__dirname, 'Stock.json'), JSON.stringify(results, null, 2));
  console.log('CSV file successfully converted to JSON');
});

//script to seamlessly convert csv files to JSON files for easier data manipulation
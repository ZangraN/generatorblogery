const fs = require('fs');
const text = fs.readFileSync('extracted_template.txt', 'utf8');

console.log(text.substring(0, 500));

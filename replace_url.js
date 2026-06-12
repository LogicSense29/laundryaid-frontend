const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\USER\\Desktop\\work\\laundryaid\\src';
const search = 'https://laundryaid-backend.onrender.com';
const replace = 'http://localhost:8999';

function walk(dir) {
  fs.readdirSync(dir).forEach(file => {
    let fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes(search)) {
        fs.writeFileSync(fullPath, content.replace(new RegExp(search, 'g'), replace));
        console.log('Updated ' + fullPath);
      }
    }
  });
}

walk(dir);
console.log('Done replacing URLs');

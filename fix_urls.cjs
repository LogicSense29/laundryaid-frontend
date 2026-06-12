const fs = require('fs');
const path = require('path');

function walk(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const stat = fs.statSync(path.join(dir, file));
    if (stat.isDirectory()) {
      fileList = walk(path.join(dir, file), fileList);
    } else if (file.endsWith('.jsx') || file.endsWith('.js')) {
      fileList.push(path.join(dir, file));
    }
  }
  return fileList;
}

const files = walk(path.join(__dirname, 'src'));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  if (content.includes('http://localhost:8999')) {
    let original = content;

    // Replace "http://localhost:8999/something" with `${API_BASE_URL}/something`
    content = content.replace(/"http:\/\/localhost:8999([^"]*)"/g, (match, p1) => {
      if (p1 === "") return 'API_BASE_URL';
      return '`${API_BASE_URL}' + p1 + '`';
    });

    // Replace 'http://localhost:8999' with API_BASE_URL if single quotes are used
    content = content.replace(/'http:\/\/localhost:8999([^']*)'/g, (match, p1) => {
      if (p1 === "") return 'API_BASE_URL';
      return '`${API_BASE_URL}' + p1 + '`';
    });

    if (content !== original) {
      // Add import at top if not there
      if (!content.includes('API_BASE_URL')) {
        // Just a sanity check, shouldn't happen since we just added it
      }
      if (!content.includes('import { API_BASE_URL }')) {
        // add at top
        content = 'import { API_BASE_URL } from "@/config";\n' + content;
      }
      fs.writeFileSync(file, content, 'utf8');
      console.log(`Updated ${file}`);
    }
  }
});

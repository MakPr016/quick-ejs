#!/usr/bin/env node

const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');

const projectName = process.argv[2] || 'Project';
const projectPath = path.join(process.cwd(), projectName);
const fontSource = path.join(__dirname,'pop.ttf');

const structure = {
  "app": {
    "index.ejs": ""
  },
  "public": {
    "css": {
      "style.css": ""
    },
    "js": {
      "app.js": ""
    },
    "assets": {
      "data.json": "",
      "images": {},
      "fonts": {}
    }
  },
  "index.js": `const express = require('express');
const app = express();
const path = require('path');

const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'app'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.render('index'));

app.listen(port, () => {
  console.log('Server running at : http://localhost:3000/');
  console.log("Ctrl+C to exit");
});`
};

function createStructure(basePath, structure) {
  for (const [name, content] of Object.entries(structure)) {
    const currentPath = path.join(basePath, name);
    
    if (typeof content === 'object') {
      fs.mkdirSync(currentPath, { recursive: true });
      createStructure(currentPath, content);
    } else {
      fs.writeFileSync(currentPath, content);
    }
  }
}

function copyFont() {
  const fontDest = path.join(projectPath, 'public', 'assets', 'fonts', 'pop.ttf');
  
  if (fs.existsSync(fontSource)) {
    fs.mkdirSync(path.dirname(fontDest), { recursive: true });
    fs.copyFileSync(fontSource, fontDest);
  } else {
    console.log('Warning: Font file not found at source location');
  }
}

function initProject() {

  if (fs.existsSync(projectPath)) {
    console.log(`Error: "${projectName}" already exists!`);
    return;
  }

  try {
    createStructure(projectPath, structure);
    
    copyFont();

    exec(`cd "${projectPath}" && npm init -y`, 
      (err, stdout, stderr) => {
        if (err) {
          console.error('Installation error:', err);
          return;
        }

        const packageJsonPath = path.join(projectPath, 'package.json');
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

        packageJson.scripts = {
          ...packageJson.scripts,
          "start": "node index.js"
        };
        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

        console.log('Installing dependencies...');
        exec(`cd "${projectPath}" && npm install express ejs`, (installErr, stdout) => {
          if (installErr) {
            console.error('Installation error:', installErr);
            return;
          }
          console.log(stdout);
          console.log(`Project "${projectName}" is ready!`);
          console.log(`Run: "cd ${projectName}" && "npm start" to begin.`);
        });
      });
  } catch (error) {
    console.error('Setup error:', error);
    fs.rmSync(projectPath, { recursive: true, force: true });
  }
}

initProject();
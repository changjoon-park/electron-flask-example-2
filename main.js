const { app, BrowserWindow } = require('electron')
const path = require('path');
const { spawn } = require('child_process');

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    }
  })

  win.loadFile('index.html')

  // Path to Python venv
  const venvPath = path.join(__dirname, 'server', '.venv', 'Scripts', 'python.exe');

  // Path to Flask application
  const flaskAppPath = path.join(__dirname, 'server', 'app.py');

  // Start Flask server
  const flaskServer = spawn(venvPath, [flaskAppPath]);

  flaskServer.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  flaskServer.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  flaskServer.on('close', (code) => {
    console.log(`Flask server exited with code ${code}`);
  });
}

app.whenReady().then(createWindow)

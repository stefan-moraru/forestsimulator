const electron = require('electron');
const {app} = electron;
const {BrowserWindow} = electron;

app.on('ready', function() {

  var mainWindow = new BrowserWindow({ width: 800, height: 600 });

  mainWindow.loadURL('file://' + __dirname + '../../../public/index.html');

  mainWindow.openDevTools();

  mainWindow.on('closed', function() {
    mainWindow = null;
  });

});

app.on('window-all-closed', function() {
  app.quit();
});

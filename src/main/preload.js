// eslint-disable-next-line @typescript-eslint/no-var-requires
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    getLanguage() {
      ipcRenderer.send('get-initial-translations');
    },
    getTheme() {
      ipcRenderer.send('getModeTheme');
    },
    setTheme(mode) {
      ipcRenderer.send('setTheme', mode);
    },
    setLang(lang) {
      ipcRenderer.send('setLang', lang);
    },
    myPing() {
      ipcRenderer.send('ipc-example', 'ping');
    },
    quitApp() {
      ipcRenderer.send('close-app');
      // app.quit();
    },
    on(channel, func) {
      const validChannels = [
        'ipc-example',
        'receiveModeTheme',
        'changedThemeMode',
        'receive-initial-lang',
      ];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.on(channel, (event, ...args) => func(...args));
      }
    },
    once(channel, func) {
      const validChannels = [
        'ipc-example',
        'receiveModeTheme',
        'changedThemeMode',
        'receive-initial-lang',
      ];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.once(channel, (event, ...args) => func(...args));
      }
    },
  },
});

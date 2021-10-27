/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import path from 'path';

import { app, BrowserWindow, shell, ipcMain, nativeTheme } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';

import i18nConfig from '../configs/i18next.config';
import config from '../configs/app.config';

import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});

if (process.env.NODE_ENV === 'production') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDevelopment =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDevelopment) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('electron-debug')();
}

const installExtensions = async () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const installer = require('electron-devtools-installer');
  console.log(installer.REDUX_DEVTOOLS);
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDevelopment) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    resizable: false,
    fullscreen: true,
    fullscreenable: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  const mainSession = mainWindow.webContents.session;
  mainWindow.loadURL(resolveHtmlPath('index.html'));

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const themeCookie = await mainSession.cookies.get({
    name: 'theme',
    domain: 'localhost',
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const langCookie = await mainSession.cookies.get({
    name: 'lang',
    domain: 'localhost',
  });

  // eslint-disable-next-line no-nested-ternary
  const lang = langCookie[0]
    ? // eslint-disable-next-line no-nested-ternary
      langCookie[0].value
      ? langCookie[0].value
      : 'en'
    : 'en';

  await i18nConfig.changeLanguage(lang);

  if (!langCookie[0]) {
    mainSession.cookies.set({
      name: 'lang',
      // eslint-disable-next-line no-nested-ternary
      value: lang,
      url: 'http://localhost/',
      expirationDate: 9999999999,
    });
  }

  if (!themeCookie[0]) {
    mainSession.cookies.set({
      name: 'theme',
      // eslint-disable-next-line no-nested-ternary
      value: themeCookie[0]
        ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          // eslint-disable-next-line no-nested-ternary
          themeCookie[0].value
          ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            themeCookie[0].value
          : nativeTheme.shouldUseDarkColors
          ? 'dark'
          : 'light'
        : 'dark',
      url: 'http://localhost/',
      expirationDate: 9999999999,
    });
  }

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
  let menuBuilder = new MenuBuilder(
    mainWindow,
    config.languages,
    i18nConfig.language
  );
  menuBuilder.buildMenu();

  i18nConfig.on('languageChanged', () => {
    if (mainWindow) {
      menuBuilder = new MenuBuilder(
        mainWindow,
        config.languages,
        i18nConfig.language
      );
      menuBuilder.buildMenu();
      mainSession.cookies.set({
        name: 'lang',
        // eslint-disable-next-line no-nested-ternary
        value: i18nConfig.language,
        url: 'http://localhost/',
        expirationDate: 9999999999,
      });
      mainWindow.webContents.send('receive-initial-lang', i18nConfig.language);
    }
  });

  // Open urls in the user's browser
  mainWindow.webContents.on('new-window', (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });

  ipcMain.on('setLang', (event, arg) => {
    i18nConfig.changeLanguage(arg);
    mainSession.cookies.set({
      name: 'lang',
      // eslint-disable-next-line no-nested-ternary
      value: arg,
      url: 'http://localhost/',
      expirationDate: 9999999999,
    });
    event.reply('receive-initial-lang', arg);
  });
  ipcMain.on('setTheme', (event, arg) => {
    mainSession.cookies.set({
      name: 'theme',
      // eslint-disable-next-line no-nested-ternary
      value: arg,
      url: 'http://localhost/',
      expirationDate: 9999999999,
    });
    // console.log('bruhh', arg);
    event.reply('changedThemeMode', arg);
  });

  ipcMain.on('get-initial-translations', async (event) => {
    event.reply('receive-initial-lang', i18nConfig.language);
  });

  ipcMain.on('getModeTheme', async (event) => {
    // console.log('eh');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const themeCookie = await mainSession.cookies.get({
      name: 'theme',
      url: 'http://localhost/',
      domain: 'localhost',
    });

    event.reply(
      'receiveModeTheme',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      themeCookie[0].value
    );
  });
  ipcMain.on('close-app', () => {
    console.log('App closed!');
    app.quit();
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);

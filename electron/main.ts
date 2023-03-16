import path from 'path';
import { BrowserWindow, app, session, ipcMain, IpcMainInvokeEvent } from 'electron';
import electronReload from 'electron-reload';
import { searchDevtools } from 'electron-search-devtools';
import { load, fileInfo } from './musicLoad';
import './sqlite/song/operation';
import { findSongs, createSong, findSong, findAlbumsFromSongs } from './sqlite/song/operation';
import { createAlbum, findAlbums } from './sqlite/album/operation';
import { findArtist, findArtists } from './sqlite/artist/operation';
import { Connection, createConnection } from 'typeorm';
import { Song } from './sqlite/song/song.entity';

declare global{
  interface Window {
    sqlite: any
  }
}

let connection: Connection;
(async() => {
  connection = await createConnection();
})();

const isDev = process.env.NODE_ENV === 'development';
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = '1';

const execPath =
  process.platform === 'win32' ? '../node_modules/electron/dist/electron.exe' : '../node_modules/.bin/electron';

if (isDev) {
  electronReload(__dirname, {
    electron: path.resolve(__dirname, execPath),
    forceHardReset: true,
    hardResetMethod: 'exit',
  });
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 1280,
    minHeight: 800,
    show: false,
    backgroundColor: '#454545',
    webPreferences: {
      nodeIntegration: false,
      preload: path.resolve(__dirname, 'preload.js'),
    },
  });

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  })

  if (isDev) {
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  }

  mainWindow.setMenuBarVisibility(false);
  mainWindow.loadFile('dist/index.html');
};

app.whenReady().then(async () => {
  if (isDev) {
    const devtools = await searchDevtools('REACT');
    if (devtools) {
      await session.defaultSession.loadExtension(devtools, {
        allowFileAccess: true,
      });
    }
  }

  createWindow();
});

app.once('window-all-closed', () => app.quit());

ipcMain.handle('findSong', async (event: IpcMainInvokeEvent, id: number) => {
  return await findSong(connection, id);
})

ipcMain.handle('findSongs', async (event: IpcMainInvokeEvent, album: string, artist: string, ) => {
  return await findSongs(connection, album, artist);
})

ipcMain.handle('findAlbums', async (event: IpcMainInvokeEvent) => {
  return await findAlbums(connection);
})

ipcMain.handle('findAlbumsFromSongs', async (event: IpcMainInvokeEvent, artist: string) => {
  return await findAlbumsFromSongs(connection, artist);
})

ipcMain.handle('findArtist', async (event: IpcMainInvokeEvent, id: number) => {
  return await findArtist(connection, id);
})

ipcMain.handle('findArtists', async (event: IpcMainInvokeEvent) => {
  return await findArtists(connection);
})

ipcMain.handle('create', async (envet: IpcMainInvokeEvent, srcPath: string) => {
  const files: fileInfo[] = await load(srcPath);
  const result: Song[] = [];
  for (const file of files) {
    await createAlbum(connection, file);
    result.push(await createSong(connection, file));
  }
  return result;
})


import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('sqlite', {
    findSong: async (id: number) => await ipcRenderer.invoke('findSong', id),
    findSongs: async (album: string, artist: string,) => await ipcRenderer.invoke('findSongs', album, artist),
    findAlbums: async () => await ipcRenderer.invoke('findAlbums'),
    findAlbumsFromSongs: async (artist: string) => await ipcRenderer.invoke('findAlbumsFromSongs', artist),
    findArtist: async (id: number) => await ipcRenderer.invoke('findArtist', id),
    findArtists: async () => await ipcRenderer.invoke('findArtists'),
    create: async (srcPath: string) => await ipcRenderer.invoke('create', srcPath)
})
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {

    quit: () => ipcRenderer.invoke('quit'),
})
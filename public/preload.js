// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { contextBridge, shell } = require("electron");

// As an example, here we use the exposeInMainWorld API to expose the browsers and node versions to the main window.
// They'll be accessible at "window.versions".
process.once("loaded", () => {
    contextBridge.exposeInMainWorld("versions", process.versions);
    contextBridge.exposeInMainWorld("openLink", (url) => shell.openExternal(url));
});

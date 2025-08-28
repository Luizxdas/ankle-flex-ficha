const { app, BrowserWindow, screen } = require("electron");
const path = require("path");
const { spawn, execSync } = require("child_process");

let mainWindow;
let springBootProcess;

function createLoadingWindow() {
  loadingWindow = new BrowserWindow({
    width: 400,
    height: 200,
    frame: false,
    resizable: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });
  loadingWindow.loadFile(path.join(__dirname, "loading.html"));
}

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  mainWindow = new BrowserWindow({
    width: Math.floor(width * 0.9),
    height: Math.floor(height * 0.9),
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  mainWindow.loadURL(
    `file://${path.join(__dirname, "frontend/dist/index.html")}`
  );
}

app.on("ready", () => {
  createLoadingWindow();
  createWindow();

  const jarPath = path.join(process.resourcesPath, "backend", "app.jar");

  const javaExecutable =
    process.platform === "win32" ? "jre/bin/java.exe" : "jre/bin/java";

  const javaPath = path.join(process.resourcesPath, javaExecutable);

  springBootProcess = spawn(javaPath, ["-jar", jarPath]);

  let isApiReady = false;

  springBootProcess.stdout.on("data", (data) => {
    const log = data.toString();
    console.log(`Spring Boot: ${log}`);

    if (log.includes("Started") && !isApiReady) {
      isApiReady = true;
      console.log("API Spring Boot está pronta!");

      if (loadingWindow) {
        loadingWindow.close();
      }

      mainWindow.maximize();
      mainWindow.show();
      mainWindow.focus();
    }
  });

  springBootProcess.stderr.on("data", (data) => {
    console.error(`Spring Boot error: ${data}`);
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("before-quit", () => {
  if (springBootProcess && springBootProcess.pid) {
    try {
      if (process.platform === "win32") {
        console.log("Encerrando processo Spring Boot no Windows...");
        execSync(`taskkill /pid ${springBootProcess.pid} /f /t`);
      } else {
        console.log("Encerrando processo Spring Boot em macOS/Linux...");
        springBootProcess.kill("SIGKILL");
      }
    } catch (e) {
      console.error("Erro ao matar o processo do Spring Boot:", e);
    }
  }
});

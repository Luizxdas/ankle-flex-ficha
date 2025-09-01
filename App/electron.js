const { app, BrowserWindow, screen } = require("electron");
const path = require("path");
const fs = require("fs");
const { spawn, execSync } = require("child_process");

let mainWindow;
let springBootProcess;
let loadingWindow;

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
  let zoomLevel = 1.0;

  if (width < 1450) {
    zoomLevel = 0.9;
  }

  mainWindow = new BrowserWindow({
    width: Math.floor(width * 0.9),
    height: Math.floor(height * 0.9),
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      zoomFactor: zoomLevel,
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

  const userDataPath = app.getPath("userData");
  const dbPath = path.join(userDataPath, "banco_ficha.db");

  if (!fs.existsSync(dbPath)) {
    const defaultDbPath = path.join(process.resourcesPath, "banco_ficha.db");
    try {
      fs.copyFileSync(defaultDbPath, dbPath);
      console.log("Banco inicial copiado para:", dbPath);
    } catch (err) {
      console.error("Erro ao copiar banco inicial:", err);
    }
  }

  springBootProcess = spawn(javaPath, [
    `-Dspring.datasource.url=jdbc:sqlite:${dbPath}`,
    "-jar",
    jarPath,
  ]);

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

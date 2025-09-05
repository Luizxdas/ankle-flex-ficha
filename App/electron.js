const { app, BrowserWindow, screen } = require("electron");
const { spawn, execSync } = require("child_process");
const path = require("path");
const fs = require("fs");
const fetch = require("node-fetch");

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
    zoomLevel = 0.8;
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

async function waitForApiReady(url, timeoutMs = 30000, intervalMs = 5000) {
  const start = Date.now();

  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      const data = await res.json();

      if (data.status === "UP") {
        console.log("API está UP!");
        return true;
      }
    } catch (err) {
      console.log("Erro ao tentar conectar na API: ", err.message);
    }

    await new Promise((resolve) => setTimeout(resolve, intervalMs));
  }

  console.error("Timeout: API não iniciou dentro do limite.");
  return false;
}

app.on("ready", () => {
  createLoadingWindow();
  createWindow();

  let isApiReady = false;

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

  (async () => {
    isApiReady = await waitForApiReady(
      "http://localhost:8080/actuator/health",
      30000,
      5000
    );

    if (isApiReady) {
      if (loadingWindow) {
        loadingWindow.close();
      }
      mainWindow.maximize();
      mainWindow.show();
      mainWindow.focus();
    } else {
      const { dialog } = require("electron");
      dialog.showErrorBox(
        "Erro na Inicialização",
        "Não foi possível iniciar o servidor local. O aplicativo será fechado."
      );
      app.quit();
    }
  })();

  springBootProcess.stdout.on("data", (data) => {
    console.log(`Spring Boot: ${data}`);
  });

  springBootProcess.stderr.on("data", (data) => {
    console.error(`Spring Boot error: ${data}`);
  });

  loadingWindow.on("closed", () => {
    if (!isApiReady) {
      console.log("Usuário fechou a tela de loading antes da API iniciar.");
      app.quit();
    }
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

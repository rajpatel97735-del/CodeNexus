import { WebContainer } from "@webcontainer/api";
import FileSystem from "./FileSystem";
import ProcessManager from "./ProcessManager";
import PreviewManager from "./PreviewManager";
import FileSync from "./FileSync";

class RuntimeManager {
  constructor() {
    this.container = null;
    this.bootPromise = null;
    this.serverUrl = null;
    this.serverReadyCallbacks = [];
    this.dependenciesInstalled = false;
    this.currentFiles = [];
    this.lastPackageJson = "";
    this.isInstalling = false;
  }

  async boot() {
    if (this.container) {
      return this.container;
    }

    if (!this.bootPromise) {
      this.bootPromise = WebContainer.boot().then((container) => {
        this.container = container;

     container.on("server-ready", (port, url) => {
  this.serverUrl = url;

  PreviewManager.update(url);

  this.serverReadyCallbacks.forEach((cb) => cb(url));
});

        return container;
      });
    }

    return this.bootPromise;
  }

  onServerReady(callback) {
    this.serverReadyCallbacks.push(callback);

    if (this.serverUrl) {
      callback(this.serverUrl);
    }
  }

  async mount(files) {
    const container = await this.boot();

    if (this.currentFiles.length === 0) {
        await FileSystem.mount(container, files);
    } else {
        await FileSync.sync(container, this.currentFiles, files);
    }

    const packageFile = files.find(
        (f) => f.path === "package.json"
    );

    if (
        packageFile &&
        this.lastPackageJson !== packageFile.content
    ) {
        this.lastPackageJson = packageFile.content;
        this.dependenciesInstalled = false;
    }

    this.currentFiles = files;
}
 async installDependencies() {

    if (this.dependenciesInstalled) return;

    if (this.isInstalling) return;

    this.isInstalling = true;

    try {

        const container = await this.boot();

        console.log("📦 Running npm install...");

        const install = await container.spawn("npm", ["install"]);

        ProcessManager.setInstall(install);

        install.output.pipeTo(
            new WritableStream({
                write(data) {
                    console.log("NPM >", data);
                }
            })
        );

        const exitCode = await install.exit;

        console.log(exitCode);

        if (exitCode !== 0) {

            throw new Error("npm install failed");

        }

        this.dependenciesInstalled = true;

    } finally {

        this.isInstalling = false;

    }

}
  async startDevServer() {
    if (ProcessManager.getDev()) {
        return ProcessManager.getDev();
    }
    const container = await this.boot();

    const process = await container.spawn("npm", ["run", "dev"]);

    ProcessManager.setDev(process);

    process.output.pipeTo(
      new WritableStream({
        write(data) {
          console.log(data);
        },
      })
    );

    return process;
  }

  async stopDevServer() {
    await ProcessManager.stop();
  }

  getPreviewUrl() {
    return this.serverUrl;
  }
}

export default new RuntimeManager();
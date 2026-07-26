class ProcessManager {
  constructor() {
    this.installProcess = null;
    this.devProcess = null;
  }

  setInstall(process) {
    this.installProcess = process;
  }

  setDev(process) {
    this.devProcess = process;
  }

  getInstall() {
    return this.installProcess;
  }

  getDev() {
    return this.devProcess;
  }

  async stop() {
    if (this.devProcess) {
      try {
        this.devProcess.kill();
      } catch (err) {
        console.warn("Failed to stop dev process:", err);
      } finally {
        this.devProcess = null;
      }
    }
  }

  reset() {
    this.installProcess = null;
    this.devProcess = null;
  }
}

export default new ProcessManager();
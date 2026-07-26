class FileSystem {
  createTree(files) {
    const root = {};

    for (const file of files) {
      const parts = file.path.split("/");
      let current = root;

      while (parts.length > 1) {
        const folder = parts.shift();

        if (!current[folder]) {
          current[folder] = {
            directory: {},
          };
        }

        current = current[folder].directory;
      }

      current[parts[0]] = {
        file: {
         contents:
  typeof file.content === "string"
    ? file.content
    : JSON.stringify(file.content, null, 2),
        },
      };
    }

    return root;
  }

  async mount(container, files) {
    const tree = this.createTree(files);
    await container.mount(tree);
  }

  async writeFile(container, path, content) {
   await container.fs.writeFile(
  path,
  typeof content === "string"
    ? content
    : JSON.stringify(content, null, 2)
);
  }

  async readFile(container, path) {
    return await container.fs.readFile(path, "utf-8");
  }

  async mkdir(container, path) {
    await container.fs.mkdir(path, { recursive: true });
  }

  async remove(container, path) {
    await container.fs.rm(path, {
      recursive: true,
      force: true,
    });
  }

  async exists(container, path) {
    try {
      await container.fs.stat(path);
      return true;
    } catch {
      return false;
    }
  }
}

export default new FileSystem();